import Button from "../../components/button";
import AddIcon from "../../assets/icons/add.svg";
import { useState, useReducer, useEffect } from "react";
import SplitableTabs from "../../components/splitable-tabs";
import Provider from "../../components/provider";
import Add from "./add";
import DataGrid, { Column } from "../../components/data-grid";
// import { getDevices } from "../../api/device";
// import { getDeviceProfiles } from "../../api/deviceProfile";
import noDataImg from "../../assets/images/no-data.svg";
import { format } from "date-fns";
import Pagination from "../../components/pagination";
// import Edit from "./edit";
import { deleteGroup, getGroups } from "../../api/group";
import useAffirm from "../../hooks/use-affirm";
import { toast } from "react-toastify";
import Edit from "./edit";
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
  | "name"
  | "ip"
  | "type"
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
    case "name":
      return {
        ...state,
        page: 1,
        where: {
          ...state.where,
          name: {
            contains: action.payload,
            mode: "insensitive",
          },
        },
      };
    case "type":
      return {
        ...state,
        page: 1,
        where: {
          ...state.where,
          type: {
            contains: action.payload,
            mode: "insensitive",
          },
        },
      };
    case "ip":
      return {
        ...state,
        page: 1,
        where: {
          ...state.where,
          attributes: {
            path: "ip",
            string_contains: action.payload,
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

const GroupPage = () => {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const [params, dispatch] = useReducer(paramsReducer, defaultParams);
  const [deviceProfiles, setDeviceProfiles] = useState<DeviceProfile[]>([]);
  const [save, setSave] = useState(false);
  const [affirm, AffirmModal] = useAffirm({
    defautlMessage: "Are you sure?",
  });
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const deleteGroupMutation = useMutation({
    mutationFn: (id: string) => deleteGroup(id),
    onSuccess: () => {
      toast.success("Group deleted successfully");
      setSave((cur) => !cur);
    },
    onError: (error: { message: string; [key: string]: any }) => {
      toast.error(error.message);
    },
  });
  const [groupQueries] = useQueries({
    queries: [
      {
        queryKey: ["groups", params, save],
        queryFn: () => getGroups(params),
      },
    ],
  });

  const columns: Column[] = [
    {
      header: "name",
      field: "name",
      filter: {
        type: "text",
        reducerType: "name",
      },
      label: "name",
    },
    {
      header: "type",
      field: "type",
      filter: {
        type: "text",
        reducerType: "type",
      },
      label: "type",
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
        save: [save, setSave],
        rowSelected: [selectedDevice, setSelectedDevice],
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
              <span>add Group</span>
              <img src={AddIcon} alt="add" />
            </Button>
          </div>
          <div className="h-full p-0  flex flex-col gap-4 p-6 ">
            <div className="flex">
              <span>devices</span>
              <span className="ml-auto"></span>
              <Pagination
                total={groupQueries?.data?.totalResult || 1}
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
                rows={groupQueries?.data?.results || []}
                state={
                  groupQueries.isError
                    ? "error"
                    : groupQueries.isLoading
                    ? "loading"
                    : "success"
                }
                filtersReducer={dispatch}
                noData={<NoData />}
                onRowSelect={({ type, row }) => {
                  if (type === "view") {
                    setIsEdit(true);
                    setSelectedDevice(row);
                    setOpen(true);
                  } else if (type === "delete") {
                    affirm(() => {
                      deleteGroupMutation.mutate(row.id);
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
export default GroupPage;
