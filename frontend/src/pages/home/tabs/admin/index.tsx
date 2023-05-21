import { useCallback, useEffect, useState } from "react";
import Button from "../../../../components/button";
import Pagination from "../../../../components/pagination";
import { Params, User } from "../../../../utils";
import { RiUserAddLine } from "react-icons/ri";
import DataGrid, { Column } from "../../../../components/data-grid";
import Avatar from "../../../../components/avatar";
import { MdMoreVert, MdOutlineClose } from "react-icons/md";
import { IconButton } from "../dashboard";
import Popover from "../../../../components/popover";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";
import Modal from "../../../../components/modal";
import { ReactComponent as Users } from "../../../../assets/user.svg";
import { useProvider } from "../../../../components/provider";
import { AppContext } from "../../../../App";
import { z } from "zod";
import { RegisterUser, registerSchema } from "../../../../api/auth";
import { toast } from "react-toastify";
import { RiAdminFill, RiUserFill } from "react-icons/ri";

function deleteUsers(users: User[], ids: number[]) {
  return users.filter((user) => !ids.includes(user.id));
}

const defaultParams: Params = {
  pagination: {
    page: 1,
    perPage: 10,
  },
};

const defaultUser: RegisterUser = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "USER",
};

function AdminTab() {
  const [users, setUsers] = useState<User[]>([]);
  const { tenantId, multiTenancyApi, authApi, user } =
    useProvider<AppContext>();
  const [parms, setParams] = useState<Params>(defaultParams);
  const [open, setOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<RegisterUser>(defaultUser);
  const createUser = async () => {
    try {
      const user = await authApi.register(userData);
      const res = await multiTenancyApi.addUserToTenant({
        tenantId,
        user: {
          id: user.id,
          role: userData.role,
        },
      });
      setUsers([
        ...users,
        {
          ...userData,
          id: user.id,
          tenantName: user.tenants?.find((t) => t.id === tenantId)?.name || "",
        },
      ]);
      toast.success("User created successfully");
      setOpen(false);
      console.log("res", res);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.issues[0].message);
      } else {
        const e: any = err;
        if (!e.message) toast.error("Something went wrong");
        else toast.error(e.message);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setUserData(defaultUser);
  };

  useEffect(() => {
    multiTenancyApi.getUsers({ tenantId }).then((res) => {
      console.log("res", res);

      setUsers(res);
    });
  }, [tenantId]);

  const columns: Column[] = [
    {
      label: "name",
      header: "Name",
      valueGetter: (user) => (
        <div className="flex items-center gap-2">
          <Avatar className="w-[3rem]" user={user} />
          <span>
            {user.firstName} {user.lastName}
          </span>
        </div>
      ),
      filter: {
        type: "text",
        onChange: (value) => {},
      },
    },
    {
      label: "tenant",
      header: "Tenant",
      field: "tenantName",
      filter: {
        type: "text",
        onChange: (value) => {},
      },
    },
    {
      label: "role",
      header: "Role",
      valueGetter: (user) => <span>{user.role}</span>,
      filter: {
        type: "select",
        options: [
          {
            label: "Admin",
            value: "ADMIN",
          },
          {
            label: "User",
            value: "USER",
          },
        ],
        onChange: (value) => {},
      },
    },
    {
      label: "email",
      header: "Email Address",
      field: "email",
      filter: {
        type: "text",
        onChange: (value) => {},
      },
    },
  ];
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex gap-4">
        <span className="text-xl font-semibold">Users</span>
        <Pagination
          className="ml-auto "
          value={parms.pagination}
          total={users.length}
          onChange={(value) => {
            setParams({ ...parms, pagination: value });
          }}
        />
        <Button
          className="flex items-center gap-1"
          onClick={() => {
            setOpen(true);
          }}
        >
          <span>Add User</span>
          <RiUserAddLine className="text-lg" />
        </Button>
      </div>
      <DataGrid
        className="table-fixed  w-full  text-left "
        headClassName="h-[5.5rem] bg-dark/5 dark:bg-light/5 text-[#697681] [&>*]:px-2 "
        rowClassName="h-[4rem] [&>*]:px-2 even:bg-dark/5 dark:even:bg-light/5 hover:bg-dark/10 dark:hover:bg-light/10"
        columns={columns}
        rows={users.slice(
          (parms.pagination.page - 1) * parms.pagination.perPage,
          parms.pagination.page * parms.pagination.perPage
        )}
        action={(row) => (
          <Popover>
            <IconButton>
              <MdMoreVert className="text-xl" />
            </IconButton>
            <div className="card  aspect-square -translate-x-1/2 px-2 pt-4  flex flex-col  ">
              <button className="flex w-[6rem] items-center justify-between  p-2 hover:text-info hover:">
                <span>Edit</span>
                <FaUserEdit className="text-xl" />
              </button>
              <button className="flex w-[6rem] items-center justify-between p-2 hover:text-danger">
                <span>Delete</span>
                <AiOutlineUserDelete className="text-xl" />
              </button>
            </div>
          </Popover>
        )}
      />
      <Modal
        open={open}
        handleClose={handleClose}
        className=" bg-white  w-11/12 max-w-[40rem] rounded [&>*]:border-b [&>*]:border-black/20 max-h-full overflow-auto "
      >
        <div className="flex items-center py-4  justify-between px-4">
          <span className="font-semibold">Create user</span>
          <button
            onClick={handleClose}
            className="rounded-full hover:bg-dark/10 active:shadow-inner w-8 h-8 flex-center"
          >
            <MdOutlineClose className="text-2xl text-gray-500" />
          </button>
        </div>
        <form className="flex flex-col gap-6 py-4 [&>div]:flex [&>div]:items-center [&>div]:w-full [&>div>label]:w-[8rem] [&>div>input]:flex-1 [&>div]:gap-2 [&>div]:px-6">
          <div>
            <label className="w-fit capitalize" htmlFor="first-name">
              first name
            </label>
            <input
              id="first-name"
              placeholder="first name"
              className="h-11"
              value={userData.firstName}
              onChange={(e) => {
                setUserData({ ...userData, firstName: e.target.value });
              }}
            />
          </div>
          <div>
            <label className="w-fit capitalize" htmlFor="last-name">
              last name
            </label>
            <input
              id="last-name"
              placeholder="last name"
              className="h-11"
              value={userData.lastName}
              onChange={(e) => {
                setUserData({ ...userData, lastName: e.target.value });
              }}
            />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <span className="w-[6rem]">Role</span>
            <div
              className={` flex flex-col py-2 w-[12rem] px-3  gap-2 items-center justify-center rounded cursor-pointer ${
                userData.role === "ADMIN"
                  ? "bg-primary   text-white"
                  : "bg-primary/20 text-primary"
              }
              `}
              onClick={() => {
                setUserData({ ...userData, role: "ADMIN" });
              }}
            >
              <RiAdminFill className="text-5xl" />
              <span className={`text-2xl`}>Admin</span>
            </div>
            <div
              className={` flex flex-col py-2 w-[12rem]  gap-2 items-center justify-center rounded cursor-pointer ${
                userData.role === "USER"
                  ? "bg-primary   text-white"
                  : "bg-primary/20 text-primary"
              }
              `}
              onClick={() => {
                setUserData({ ...userData, role: "USER" });
              }}
            >
              <RiUserFill className="text-5xl" />
              <span className={`text-2xl`}>Regular User</span>
            </div>
          </div>
          <div>
            <label className="w-fit capitalize" htmlFor="email">
              email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="email address"
              className="h-11"
              value={userData.email}
              onChange={(e) => {
                setUserData({ ...userData, email: e.target.value });
              }}
            />
          </div>
          <div>
            <label className="w-fit capitalize" htmlFor="password">
              password
            </label>
            <input
              id="password"
              autoComplete="new-password"
              placeholder="password"
              type="password"
              className="h-11"
              value={userData.password}
              onChange={(e) => {
                setUserData({ ...userData, password: e.target.value });
              }}
            />
          </div>
          <div>
            <label className="w-fit capitalize" htmlFor="phonenumber">
              phone number
            </label>
            <input
              id="phonenumber"
              placeholder="phone number"
              type="text"
              className="h-11"
              value={userData.phoneNumber}
              onChange={(e) => {
                if (e.target.value === "")
                  setUserData({ ...userData, phoneNumber: undefined });
                setUserData({ ...userData, phoneNumber: e.target.value });
              }}
            />
          </div>
        </form>
        <div className="flex justify-between items-center h-20 px-6">
          <Button
            className="flex items-center gap-2 py-3 px-4"
            variant="outlined"
            onClick={handleClose}
          >
            <span>Cancel</span>
          </Button>
          <Button
            className="flex items-center gap-2 py-3 px-4"
            onClick={createUser}
          >
            <span>Add User</span>
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default AdminTab;
