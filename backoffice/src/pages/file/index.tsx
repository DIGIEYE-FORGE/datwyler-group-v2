import Button from "../../components/button";
import AddIcon from "../../assets/icons/add.svg";
import { useState, useReducer, useEffect } from "react";
import SplitableTabs from "../../components/splitable-tabs";
import Provider from "../../components/provider";
import Add from "./add";
import { deleteFile, downloadFile, getFiles } from "../../api/files";
import DataGrid, { Column } from "../../components/data-grid";
import download from "../../assets/icons/download.svg";
import noDataImg from "../../assets/images/no-data.svg";
import { format } from "date-fns";
import Pagination from "../../components/pagination";
import Edit from "./edit";
import { getGroups } from "../../api/group";
import useAffirm from "../../hooks/use-affirm";
import { toast } from "react-toastify";
import { useMutation, useQueries } from "@tanstack/react-query";

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
  | "size"
  | "name"
  | "version"
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
    case "size":
      return {
        ...state,
        page: 1,
        where: {
          ...state.where,
          size: {
            gte: action.payload.length == 0 ? undefined : +action.payload,
          },
        },
      };
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
    case "version":
      return {
        ...state,
        page: 1,
        where: {
          ...state.where,
          version: {
            contains: action.payload || undefined,
            mode: "insensitive",
          },
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

const FilePage = () => {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const [params, dispatch] = useReducer(paramsReducer, defaultParams);
  const [deviceProfiles, setDeviceProfiles] = useState<DeviceProfile[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [save, setSave] = useState(false);
  const [affirm, AffirmModal] = useAffirm({
    defautlMessage: "Are you sure?",
  });
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [getFileQuery] = useQueries({
    queries: [
      {
        queryKey: ["files", params, save],
        queryFn: () => getFiles(params),
      },
    ],
  });

  const deleteFileMutation = useMutation({
    mutationFn: (id: string) => deleteFile(id),
    onSuccess: () => {
      toast.success("File deleted successfully");
      setSave((curr) => !curr);
    },
    onError: (err: { message: string; [key: string]: any }) => {
      toast.error(err.message);
    },
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
      header: "version",
      field: "version",
      filter: {
        type: "text",
        reducerType: "version",
      },
      label: "version",
    },
    {
      header: "size",
      field: "size",
      filter: {
        type: "text",
        reducerType: "size",
      },
      label: "size",
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
    {
      header: "",
      width: "2rem",
      valueGetter: (row) => {
        return (
          <Button
            style={{
              padding: "2px 4px",
            }}
            variant="text"
          >
            <div
              className="w-100 h-100 d-flex justify-content-center align-items-center"
              onClick={(e) => {
                e.stopPropagation();
                downloadFile(row.url);
              }}
            >
              <img src={download} alt="download" className="download" />
            </div>
          </Button>
        );
      },
      label: "Download",
    },
  ];
  return (
    <Provider
      value={{
        open: [open, setOpen],
        deviceProfiles: [deviceProfiles, setDeviceProfiles],
        groups: [groups, setGroups],
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
            <div className="title">Devices</div>
            <Button
              color="success"
              className="flex align-center gap-3"
              onClick={() => {
                setOpen((curr) => !curr);
                setIsEdit(false);
              }}
            >
              <span>add File</span>
              <img src={AddIcon} alt="add" />
            </Button>
          </div>
          <div className="h-full p-0  flex flex-col gap-4 p-6 ">
            <div className="flex">
              <span>files</span>
              <span className="ml-auto"></span>
              <Pagination
                total={getFileQuery?.data?.totalResult || []}
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
                  getFileQuery.isError
                    ? "error"
                    : getFileQuery.isLoading
                    ? "loading"
                    : "success"
                }
                rows={getFileQuery?.data?.results || []}
                filtersReducer={dispatch}
                noData={<NoData />}
                onRowSelect={({ type, row }) => {
                  if (type === "view") {
                    setIsEdit(true);
                    setSelectedDevice(row);
                    setOpen(true);
                  } else if (type === "delete") {
                    affirm(() => {
                      deleteFileMutation.mutate(row.id);
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
export default FilePage;
