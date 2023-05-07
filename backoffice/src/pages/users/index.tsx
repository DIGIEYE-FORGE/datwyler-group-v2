import Button from "../../components/button";
import AddIcon from "../../assets/icons/add.svg";
import { useState, useReducer, useEffect } from "react";
import SplitableTabs from "../../components/splitable-tabs";
import Provider, { useProvider } from "../../components/provider";
import Add from "./add";
import DataGrid, { Column } from "../../components/data-grid";
import { deleteDevice, getDevices } from "../../api/device";
import { getDeviceProfiles } from "../../api/deviceProfile";
import noDataImg from "../../assets/images/no-data.svg";
import { format } from "date-fns";
import Pagination from "../../components/pagination";
import Edit from "../devices/edit";
import { getGroups } from "../../api/group";
import useAffirm from "../../hooks/use-affirm";
import { toast } from "react-toastify";
import { getUsers, removeUserFromTenant } from "../../api/user";
import { UserContext } from "../../App";
import { useQueries, useMutation } from "@tanstack/react-query";

const NoData = () => {
  return (
    <div className="flex flex-col gap-6">
      <img src={noDataImg} alt="no data" />
    </div>
  );
};

const dateMap: {
  [key: string]: {
    lt?: Date;
    gt?: Date;
  };
} = {
  "1h": {
    gt: new Date(new Date().getTime() - 60 * 60 * 1000),
  },
  "4h": {
    gt: new Date(new Date().getTime() - 4 * 60 * 60 * 1000),
  },
  "12h": {
    gt: new Date(new Date().getTime() - 12 * 60 * 60 * 1000),
  },
  "last day": {
    gt: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
  },
  "last week": {
    gt: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
  },
};

interface Params {
  page: number;
  perPage: number;
  include: any;
  where: any;
}

type Type =
  | "page"
  | "perPage"
  | "include"
  | "where"
  | "role"
  | "email"
  | "name"
  | "updatedAt";

function paramsReducer(
  state: Params,
  action: { type: Type; payload: any }
): Params {
  switch (action.type) {
    case "page":
      return { ...state, page: action.payload };
    case "perPage":
      return { ...state, perPage: action.payload, page: 1 };
    case "include":
      return { ...state, include: action.payload, page: 1 };
    case "where":
      return { ...state, where: action.payload, page: 1 };
    case "role":
      return {
        ...state,
        page: 1,
        where: {
          ...state.where,
          role: {
            equals: action.payload ? action.payload : undefined,
          },
        },
      };
    case "email":
      return {
        ...state,
        page: 1,
        where: {
          ...state.where,
          email: {
            contains: action.payload,
            mode: "insensitive",
          },
        },
      };
    case "name":
      return {
        ...state,
        page: 1,
        where: {
          ...state.where,
          OR: [
            {
              firstName: {
                contains: action.payload,
                mode: "insensitive",
              },
            },
            {
              lastName: {
                contains: action.payload,
                mode: "insensitive",
              },
            },
          ],
        },
      };

    case "updatedAt":
      return {
        ...state,
        page: 1,
        where: {
          ...state.where,
          updatedAt: dateMap[action.payload],
        },
      };

    default:
      throw new Error("Invalid action type");
  }
}

const defaultParams: Params = {
  page: 1,
  perPage: 10,
  include: {},
  where: {},
};

interface Device {
  id?: number;
  serial?: string;
  name?: string;
  description?: string;
  [key: string]: any;
}

interface Data {
  totalResult: number;
  results: Device[];
}

interface DeviceProfile {
  id: number;
  name: string;
  [key: string]: any;
}

export type Context = {
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  rowSelected: [any, React.Dispatch<React.SetStateAction<any>>];
  updatePage: () => void;
};

const DevicesPage = () => {
  const [open, setOpen] = useState(false);

  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const [params, dispatch] = useReducer(paramsReducer, defaultParams);
  const [deviceProfiles, setDeviceProfiles] = useState<DeviceProfile[]>([]);
  const context = useProvider<UserContext>();
  const [tenantSelected, setTenantSelected] = context.tenantSelected;
  const [groups, setGroups] = useState<any[]>([]);
  const [deviceTypes, setDeviceTypes] = useState<any[]>([]);
  const [save, setSave] = useState<boolean>(false);
  const [affirm, AffirmModal] = useAffirm({
    defautlMessage: "Are you sure?",
  });
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const [userQuery] = useQueries({
    queries: [
      {
        queryKey: ["users", params, save, tenantSelected],
        queryFn: () =>
          getUsers({
            ...params,
            where: { ...params.where, tenants: { has: tenantSelected } },
          }),
      },
    ],
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: number) =>
      removeUserFromTenant({
        tenantId: tenantSelected,
        userId: id,
      }),
    onSuccess: () => {
      setSave(!save);
      toast.success("User deleted successfully");
    },
    onError: () => {
      toast.error("Error deleting user");
    },
  });
  const columns: Column[] = [
    {
      header: "Name",
      valueGetter: (row) => row.firstName + " " + row.lastName,
      filter: {
        type: "text",
        reducerType: "name",
      },
      label: "name",
    },
    {
      header: "Role",
      valueGetter: (row) => row.role,
      filter: {
        type: "select",
        options: [
          { value: "USER", label: "USER" },
          { value: "ADMIN", label: "Admin" },
        ],
        reducerType: "role",
      },
      label: "role",
    },
    {
      header: "Email",
      valueGetter: (row) => row.email,
      filter: {
        type: "text",
        reducerType: "email",
      },
      label: "email",
    },
    {
      header: "last updated",
      valueGetter: (row) => format(new Date(row.updatedAt), "dd/MM/yyyy HH:mm"),
      filter: {
        type: "select",
        options: Object.keys(dateMap).map((key) => ({
          value: key,
          label: key,
        })),
        reducerType: "updatedAt",
      },
      label: "last updated",
    },
  ];
  return (
    <Provider
      value={{
        open: [open, setOpen],
        deviceProfiles: [deviceProfiles, setDeviceProfiles],
        groups: [groups, setGroups],
        deviceTypes: [deviceTypes, setDeviceTypes],
        rowSelected: [selectedDevice, setSelectedDevice],
        save: [save, setSave],
        updatePage: () => dispatch({ type: "page", payload: 1 }),
      }}
    >
      <SplitableTabs
        open={open}
        close={() => {
          setOpen(false);
        }}
      >
        <div className="page ">
          <div className="header">
            <div className="title">Users</div>
            <Button
              color="success"
              className="flex align-center gap-3"
              onClick={() => {
                setOpen((curr) => !curr);
                setIsEdit(false);
              }}
            >
              <span>add users</span>
              <img src={AddIcon} alt="add" />
            </Button>
          </div>
          <div className="h-full p-0  flex flex-col gap-4 p-6 ">
            <div className="flex">
              <span>users</span>
              <span className="ml-auto"></span>
              <Pagination
                total={userQuery?.data?.totalResult || 0}
                page={params?.page || 1}
                perPage={params.perPage}
                onPageChange={(page) =>
                  dispatch({ type: "page", payload: page })
                }
                onPerPageChange={(perPage) => {
                  dispatch({ type: "perPage", payload: perPage });
                }}
              />
            </div>
            <div className="flex-1">
              <DataGrid
                headerClassName="capitalize"
                rowClassName="capitalize"
                columns={columns || []}
                rowStyle={{
                  fontSize: "14px",
                }}
                rows={userQuery?.data?.results || []}
                state={
                  userQuery.isError
                    ? "error"
                    : userQuery.isLoading
                    ? "loading"
                    : "success"
                }
                filtersReducer={dispatch}
                noData={<NoData />}
                onRowSelect={({ type, row }) => {
                  if (type === "edit") {
                    setIsEdit(true);
                    setSelectedDevice(row);
                    setOpen(true);
                  } else if (type === "delete") {
                    affirm(() => {
                      deleteUserMutation.mutate(row.id);
                    });
                  } else {
                    setIsEdit(false);
                    setOpen(false);
                  }
                }}
              />
            </div>
          </div>
        </div>
        {isEdit ? <Edit /> : <Add />}
      </SplitableTabs>
      <AffirmModal />
    </Provider>
  );
};

export default DevicesPage;
