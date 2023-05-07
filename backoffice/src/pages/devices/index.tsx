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
import Edit from "./edit";
import { getGroups } from "../../api/group";
import useAffirm from "../../hooks/use-affirm";
import { toast } from "react-toastify";
import { useMutation, useQueries } from "@tanstack/react-query";
function parseJSON(value: string) {
  try {
    return JSON.parse(value);
  } catch (error) {
    return undefined;
  }
}

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
  | "serial"
  | "isOnline"
  | "deviceProfileId"
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
    case "serial":
      return {
        ...state,
        page: 1,
        where: {
          ...state.where,
          serial: {
            contains: action.payload,
            mode: "insensitive",
          },
        },
      };
    case "isOnline":
      return {
        ...state,
        page: 1,
        where: {
          ...state.where,
          isOnline: parseJSON(action.payload),
        },
      };
    case "deviceProfileId":
      return {
        ...state,
        page: 1,
        where: {
          ...state.where,
          deviceProfileId: parseJSON(action.payload),
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
  include: {
    _count: true,
    deviceProfile: {
      select: {
        id: true,
        name: true,
      },
    },
    attributes: true,
    lastTelemetries: true,
    tags: true,
    group: true,
  },
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
  deviceProfiles: [any, React.Dispatch<React.SetStateAction<any>>];
  groups: [any, React.Dispatch<React.SetStateAction<any>>];
  deviceTypes: [any, React.Dispatch<React.SetStateAction<any>>];
  save: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  updatePage: () => void;
  tenantSelected: [number, React.Dispatch<React.SetStateAction<number>>];
};

const DevicesPage = () => {
  const [open, setOpen] = useState(false);
  const context = useProvider<Context>();
  const [save, setSave] = useState(false);
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const [params, dispatch] = useReducer(paramsReducer, defaultParams);
  const [deviceProfiles, setDeviceProfiles] = useState<DeviceProfile[]>([]);
  const [tenantSelected, setTenantSelected] = context.tenantSelected;
  const [groups, setGroups] = useState<any[]>([]);
  const [deviceTypes, setDeviceTypes] = useState<any[]>([]);
  const [affirm, AffirmModal] = useAffirm({
    defautlMessage: "Are you sure?",
  });
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const deleteDeviceQuery = useMutation((id: number) => deleteDevice(id), {
    onSuccess: () => {
      toast.success("Device deleted successfully");
      setSave(!save);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
  const [deviceQuery, deviceProfileQuery, groupQuery] = useQueries({
    queries: [
      {
        queryKey: ["devices", params, save, tenantSelected],
        queryFn: () => getDevices(params),
      },
      {
        queryKey: ["deviceProfiles"],
        queryFn: () => getDeviceProfiles({}),
        onSuccess(data: any) {
          setDeviceProfiles(data.results);
        },
      },
      {
        queryKey: ["groups"],
        queryFn: () => getGroups({}),
        onSuccess(data: any) {
          setGroups(data.results);
        },
      },
    ],
  });

  const columns: Column[] = [
    {
      header: "serial",
      field: "serial",
      filter: {
        type: "text",
        reducerType: "serial",
      },
      label: "serial",
    },
    {
      header: "connection status",
      valueGetter: (row) => (row.isOnline ? <Connected /> : <Disconnected />),
      filter: {
        type: "select",
        options: [
          { value: true, label: "connected" },
          { value: false, label: "disconnected" },
        ],
        reducerType: "isOnline",
      },
      label: "connection status",
    },
    {
      header: "profile name",
      valueGetter: (row) => row.deviceProfile?.name || "---",
      filter: {
        type: "select",
        options: (deviceProfileQuery?.data?.results || []).map(
          (item: { id: number; name: string }) => ({
            value: item.id,
            label: item.name,
          })
        ),

        reducerType: "deviceProfileId",
      },
      label: "profile name",
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
            <div className="title">devices</div>
            <Button
              color="success"
              className="flex align-center gap-3"
              onClick={() => {
                setOpen((curr) => !curr);
                setIsEdit(false);
              }}
            >
              <span>add device</span>
              <img src={AddIcon} alt="add" />
            </Button>
          </div>
          <div className="h-full p-0  flex flex-col gap-4 p-6 ">
            <div className="flex">
              <span>devices</span>
              <span className="ml-auto"></span>
              <Pagination
                total={deviceQuery?.data?.totalResult}
                page={params.page}
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
                columns={columns}
                rowStyle={{
                  fontSize: "14px",
                }}
                state={
                  deviceQuery.isLoading
                    ? "loading"
                    : deviceQuery.isError
                    ? "error"
                    : "success"
                }
                rows={deviceQuery?.data?.results || []}
                filtersReducer={dispatch}
                noData={<NoData />}
                onRowSelect={({ type, row }) => {
                  if (type === "edit") {
                    setIsEdit(true);
                    setSelectedDevice(row);
                    setOpen(true);
                  } else if (type === "delete") {
                    affirm(() => {
                      deleteDeviceQuery.mutate(row.id);
                    });
                  } else if (type === "view") {
                    setIsEdit(true);
                    setSelectedDevice(row);
                    setOpen(true);
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

function Connected() {
  return (
    <div className="flex justify-center align-center">
      <span className="outline-success text-seccess w-9 text-center py-2 rounded uppercase">
        connected
      </span>
    </div>
  );
}

function Disconnected() {
  return (
    <div className="flex justify-center align-center">
      <span className="outline-danger text-danger w-9 text-center py-2 rounded uppercase">
        disconnected
      </span>
    </div>
  );
}

export default DevicesPage;
