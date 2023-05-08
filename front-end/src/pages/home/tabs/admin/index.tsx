import { useState } from "react";
import Button from "../../../../components/button";
import Pagination from "../../../../components/pagination";
import { Params, User } from "../../../../utils";
import { RiUserAddLine } from "react-icons/ri";
import DataGrid, { Column } from "../../../../components/data-grid";
import Avatar from "../../../../components/avatar";
import { MdCancel, MdMoreVert, MdOutlineClose, MdWatchLater } from "react-icons/md";
import { IconButton } from "../dashboard";
import Popover from "../../../../components/popover";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";
import { format } from "date-fns";
import Modal from "../../../../components/modal";
import { ReactComponent as SysAdmin } from "../../../../assets/user-password.svg"
import { ReactComponent as Admin } from "../../../../assets/admin.svg"
import { ReactComponent as Users } from "../../../../assets/user.svg"
const generateUsers = (count: number): User[] => {
  const [closePopover, setClosePopover] = useState<() => void>(() => () => {});
  const users: User[] = [];
  for (let i = 0; i < count; i++) {
    users.push({
      id: i,
      email: `isel-jao${i}@gmail.com`,
      firstName: `John${i}`,
      lastName: `Smith${i}`,
      avatar: `https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745`,
      role: ["ADMIN", "USER"][Math.floor(Math.random() * 2)],
      createdAt: new Date(),
    });
  }
  return users;
};

function deleteUsers(users: User[], ids: number[]) {
  return users.filter((user) => !ids.includes(user.id));
}

const defaultParams: Params = {
  pagination: {
    page: 1,
    perPage: 10,
  },
};

function AdminTab() {
  const [users, setUsers] = useState<User[]>(generateUsers(100));
  const [parms, setParams] = useState<Params>(defaultParams);
  const [open,setOpen] =useState<boolean>(false);
  const [activeRole,setActiveRole] = useState<"sysAdmin" | "admin" | "user">("sysAdmin");
  const [name,setName] = useState<string>("");
  const [email,setEmail] = useState<string>("");
  const [password,setPassword] = useState<string>("");
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
    {
      label: "creattion date",
      header: "Creation Date",
      valueGetter: (user) => (
        <span>{format(user.createdAt, "dd/MM/yyyy hh:mm")}</span>
      ),
      filter: {
        type: "date",
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
        <Button className="flex items-center gap-1" onClick={()=>{
          setOpen(true)
        }}>
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
        handleClose={() => setOpen(false)}
        className="bg-white w-11/12 max-w-[40rem] rounded [&>*]:border-b [&>*]:border-black/20 max-h-full overflow-auto"
      >
        <div className="flex items-center py-4  justify-between px-4">
          <span className="font-semibold">Create user</span>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full hover:bg-dark/10 active:shadow-inner w-8 h-8 flex-center"
          >
            <MdOutlineClose className="text-2xl text-gray-500" />
          </button>
        </div>
        <form className="flex flex-col gap-6 py-4 [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div]:px-6">
          <div>
            <label className="w-fit" htmlFor="rapport-name">
              Name
            </label>
            <input id="rapport-name" placeholder="name" className="h-11"  value={name} onChange={(e)=>{
              setName(e.target.value);
            }}/>
          </div>
          <div >
            Role
            <div className="flex gap-6 h-[11rem]">
              <div className={`flex-1 flex flex-col gap-2 items-center justify-center rounded cursor-pointer
              ${activeRole === "sysAdmin" ? "bg-[#0091AE] shadow-current scale-x-100 text-white":"bg-[#0091AE]/20 text-primary"}
              `} onClick={()=>{
                setActiveRole("sysAdmin");
              }}>
                <SysAdmin className={`
                 ${activeRole === "sysAdmin" ? "fill-white":"fill-primary"}`}/>
                <span className="text-2xl">Sys Admin</span>
              </div>
              <div className={`flex-1 flex flex-col gap-2 items-center justify-center rounded cursor-pointer
                ${activeRole === "admin" ?"bg-[#0091AE] shadow-current scale-x-100 text-white":"bg-[#0091AE]/20  text-primary"}
              `} onClick={()=>{
                  setActiveRole("admin");
              }}>
              <Admin className={`
                 ${activeRole === "admin" ? "fill-white":"fill-primary"}`}/>
              <span className="text-2xl">Admin</span>
              </div>
              <div className={`flex-1 flex flex-col gap-2 items-center justify-center rounded cursor-pointer
                ${activeRole === "user" ? "bg-[#0091AE] shadow-current scale-x-100 text-white":"bg-[#0091AE]/20  text-primary"}
              `} onClick={()=>{
                   setActiveRole("user");
              }}>
                <Users className={`
                 ${activeRole === "user" ? "fill-white":"fill-primary"}`}/>
                <span className="text-2xl">Regular User</span>
              </div>
            </div>
          </div>
          <div>
            <label className="w-fit" htmlFor="rapport-name">
              Email Address
            </label>
            <input id="rapport-name" placeholder="gmail@gmail.com" className="h-11"  value={email} onChange={(e)=>{
              setEmail(e.target.value);
            }}/>
          </div>
          <div>
            <label className="w-fit" htmlFor="rapport-name">
              Password
            </label>
            <input id="rapport-name" placeholder="........" type="password" className="h-11" value={password} onChange={(e)=>{
              setPassword(e.target.value);
            }} />
          </div>
        </form>
        <div className="flex justify-between items-center h-20 px-6">
          <Button
            className="flex items-center gap-2 py-3 px-4"
            variant="outlined"
            onClick={() => setOpen(false)}
          >
            <span>Cancel</span>
          </Button>
          <Button
            className="flex items-center gap-2 py-3 px-4"
            onClick={() => setOpen(false)}
          >
            <span>Add User</span>
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default AdminTab;
