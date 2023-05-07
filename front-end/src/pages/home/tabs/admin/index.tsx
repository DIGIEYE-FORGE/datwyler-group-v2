import { useState } from "react";
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
import { format } from "date-fns";

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
    <div className="flex flex-col p-6">
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
        <Button className="flex items-center gap-1">
          <span>Add User</span>
          <RiUserAddLine className="text-lg" />
        </Button>
      </div>
      <DataGrid
        className=" table-fixed w-full text-left mt-6"
        headClassName="h-[5.5rem] bg-[#E7EAEB] text-[#697681] [&>*]:px-2 "
        rowClassName="h-[4rem] [&>*]:px-2 even:bg-[#E7EAEB] hover:bg-[#d1d8da] cursor-pointer"
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
    </div>
  );
}

export default AdminTab;
