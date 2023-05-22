import { useEffect, useState } from "react";
import Button from "../../../../components/button";
import Pagination from "../../../../components/pagination";
import { Params, User } from "../../../../utils";
import { RiUserAddLine } from "react-icons/ri";
import DataGrid, { Column } from "../../../../components/data-grid";
import Avatar from "../../../../components/avatar";
import { MdMoreVert } from "react-icons/md";
import { IconButton } from "../dashboard";
import Popover from "../../../../components/popover";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";
import { useProvider } from "../../../../components/provider";
import { AppContext } from "../../../../App";
import { z } from "zod";
import { RegisterUser } from "../../../../api/auth";
import { toast } from "react-toastify";
import AddUser from "./add-user";

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
  const { tenantId, multiTenancyApi } = useProvider<AppContext>();
  const [open, setOpen] = useState<boolean>(false);

  const [params, setParams] = useState<Params>(defaultParams);

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
          value={params.pagination}
          total={users.length}
          onChange={(value) => {
            setParams({ ...params, pagination: value });
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
          (params.pagination.page - 1) * params.pagination.perPage,
          params.pagination.page * params.pagination.perPage
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
      <AddUser
        users={users}
        setUsers={setUsers}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}

export default AdminTab;
