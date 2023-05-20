import Button from "../../components/button";
import AddIcon from "../../assets/icons/add.svg";
import { useState, useReducer, useEffect } from "react";
import SplitableTabs from "../../components/splitable-tabs";
import Provider, { useProvider } from "../../components/provider";
import Add from "./add";
import DataGrid, { Column } from "../../components/data-grid";
import {
  deleteDeviceProfile,
  getDeviceProfiles as getDeviceProfile,
} from "../../api/deviceProfile";
import noDataImg from "../../assets/images/no-data.svg";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Pagination from "../../components/pagination";
import { getDeviceTypes } from "../../api/deviceType";
import { getCredntial } from "../../api/credential";
import { getDecoder, postDecoder } from "../../api/decoder";
import { getProtocols } from "../../api/protocol";
import Modal from "../../components/modal";
import Card from "../../components/card";
import Editor from "@monaco-editor/react";
import Edit from "./edit";
import Input from "../../components/input";
import Textarea from "../../components/textarea";
import DeleteIcon from "../../assets/icons/delete.svg";
import useAffirm from "../../hooks/use-affirm";
import { useMutation, useQueries } from "@tanstack/react-query";
import { Context } from "../devices";

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
  | "deviceTypeId"
  | "protocol"
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
    case "protocol":
      return {
        ...state,
        page: 1,
        where: {
          ...state.where,
          protocol: {
            name: {
              contains: action.payload,
              mode: "insensitive",
            },
          },
        },
      };
    case "deviceTypeId":
      return {
        ...state,
        page: 1,
        where: {
          ...state.where,
          deviceTypeId: action.payload ? +action.payload : undefined,
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
    deviceType: {
      select: {
        name: true,
      },
    },
    protocol: true,
    decoder: {
      select: {
        name: true,
      },
    },
    devices: {
      select: {
        group: {
          select: {
            name: true,
          },
        },
      },
    },
  },
  where: {},
};

interface Device {
  id: number;
  serial: string;
  name: string;
  description?: string;
  [key: string]: any;
}

type Data = {
  totalResult: number;
  results: Device[];
};
export interface DeviceType {
  id: number;
  name: string;
  [key: string]: any;
}

export type Decoder = {
  id: number;
  name: string;
  description: string;
  fnc: string;
  [key: string]: any;
};

export interface Protocol {
  id: number;
  name: string;
  [key: string]: any;
}

export type Credentials = {
  id: number;
  username: string;
  password: string;
  token: string;
  certificate: string;
  type: string;
  clientId: number;
};
export type DeviceTypes = {
  id: number;
  name: string;
  [key: string]: any;
};

export interface ContextDeviceProfile{
  decoders: [Decoder, React.Dispatch<React.SetStateAction<Decoder>>];
  deviceTypes: [DeviceTypes, React.Dispatch<React.SetStateAction<DeviceTypes>>];
  credentials: [Credentials, React.Dispatch<React.SetStateAction<Credentials>>];
  protocol: [Protocol, React.Dispatch<React.SetStateAction<Protocol>>];
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  save: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  openModal: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  updatePage: () => void;
}

const DeviceProfilePage = () => {
  const [open, setOpen] = useState<boolean | "edit">(false);
  const [params, dispatch] = useReducer(paramsReducer, defaultParams);
  const [deviceTypes, setDeviceTypes] = useState<DeviceType[]>([]);
  const [decoder, setDecoder] = useState<Decoder[]>([]);
  const context = useProvider<Context>();
  const [tenantSelected, setTenantSelected] = context.tenantSelected;
  const [credentials, setCredentials] = useState<Credentials[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [protocol, setProtocol] = useState<Protocol[]>([]);
  const [profile, selectedProfile] = useState({});
  const [save, setSave] = useState<boolean>(false);
  const [saveDecoder, setSaveDecoder] = useState<boolean>(false);
  const [dataDecoder, setDataDecoder] = useState({
    name: "",
    description: "",
    fnc: "",
    errorname: false,
    errordescription: false,
    errorfnc: false,
  });
  const [affirm, AffirmModal] = useAffirm({
    defautlMessage: "Are you sure?",
  });
  const clearDataDecoder = () => {
    setDataDecoder({
      name: "",
      description: "",
      fnc: "",
      errorname: false,
      errordescription: false,
      errorfnc: false,
    });
  };

  const [
    getDeiceTypeQuery,
    getCredentialQuery,
    getDecoderQuery,
    getProtocolsQuery,
    getDeviceProfileQuery,
  ] = useQueries({
    queries: [
      {
        queryKey: ["deviceType"],
        queryFn: () => getDeviceTypes({}),
        onSuccess: (data: any) => setDeviceTypes(data.results),
      },
      {
        queryKey: ["credential"],
        queryFn: () => getCredntial({}),
        onSuccess: (data: any) => setCredentials(data.results),
      },
      {
        queryKey: ["decoder", saveDecoder],
        queryFn: () => getDecoder({}),
        onSuccess: (data: any) => setDecoder(data.results),
      },
      {
        queryKey: ["protocol"],
        queryFn: () => getProtocols({}),
        onSuccess: (data: any) => setProtocol(data.results),
      },
      {
        queryKey: ["deviceProfile", params, save, tenantSelected],
        queryFn: () => getDeviceProfile(params),
      },
    ],
  });

  const deleteDeviceProfileQuery = useMutation({
    mutationFn: (id: string) => deleteDeviceProfile(id),
    onSuccess: () => {
      toast.success("Delete success");
      setSave((curr) => !curr);
    },
    onError: (err: { message: string; [key: string]: any }) => {
      toast.error(err.message);
    },
  });

  const createDecoderQuery = useMutation({
    mutationFn: (data: { name: string; description: string; fnc: string }) =>
      postDecoder(data),
    onSuccess: () => {
      toast.success("Create success");
      setSave((curr) => !curr);
      clearDataDecoder();
      setSaveDecoder((cur) => !cur);
      setOpen(false);
      setOpenModal(false);
    },
    onError: (err: { message: string; [key: string]: any }) => {
      toast.error(err.message);
    },
  });
  const columns: Column[] = [
    {
      header: "name",
      valueGetter: (row) => {
        return (
          <div className="flex gap-4 align-center ml-6">
            {row.logo ? (
              <img
                src={`${import.meta.env.VITE_BACK_API}/${row.logo}`}
                style={{
                  width: "50px",
                  height: "50px",
                }}
                alt="logo"
              />
            ) : (
              <div
                style={{
                  width: "50px",
                  height: "50px",
                }}
              ></div>
            )}
            <div className="flex flex-column gap-2">
              <div>{row.name}</div>
              <div className="text-sm text-gray-500">ID:{row.id}</div>
            </div>
          </div>
        );
      },
      filter: {
        type: "text",
        reducerType: "name",
      },
      label: "name",
    },
    {
      header: "protocol",
      valueGetter: (row) => row.protocol?.name || "---",
      filter: {
        type: "text",
        reducerType: "protocol",
      },
      label: "protocol",
    },
    {
      header: "device type",
      valueGetter: (row) => row.deviceType?.name || "---",
      filter: {
        type: "select",
        options: deviceTypes.map((type) => {
          return {
            value: type.id,
            label: type.name,
          };
        }),
        reducerType: "deviceTypeId",
      },
      label: "device type",
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
        decoders: [decoder, setDecoder],
        credentials: [credentials, setCredentials],
        deviceTypes: [deviceTypes, setDeviceTypes],
        openModal: [openModal, setOpenModal],
        protocol: [protocol, setProtocol],
        selectedprofile: [profile, selectedProfile],
        save: [save, setSave],
        updatePage: () => dispatch({ type: "page", payload: 1 }),
      }}
    >
      <SplitableTabs
        open={open ? true : false}
        close={() => {
          setOpen(false);
        }}
      >
        <div className="page ">
          <div className="header">
            <div className="title">device</div>
            <Button
              color="success"
              className="flex align-center gap-3"
              onClick={() => setOpen((curr) => !curr)}
            >
              <span>add profile</span>
              <img src={AddIcon} alt="add" />
            </Button>
          </div>
          <div className="h-full p-0  flex flex-col gap-4 p-6 ">
            <div className="flex">
              <span>device profile</span>
              <span className="ml-auto"></span>
              <Pagination
                total={getDeviceProfileQuery?.data?.totalResult || 1}
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
                rows={getDeviceProfileQuery?.data?.results || []}
                state={
                  getDeviceProfileQuery.isError
                    ? "error"
                    : getDeviceProfileQuery.isLoading
                    ? "loading"
                    : "success"
                }
                filtersReducer={dispatch}
                noData={<NoData />}
                onRowSelect={({ type, row }) => {
                  if (type === "view") {
                    selectedProfile(row);
                    setOpen("edit");
                  } else if (type === "delete") {
                    affirm(async () => {
                      await deleteDeviceProfileQuery.mutateAsync(row.id);
                    });
                  }
                }}
              />
            </div>
          </div>
        </div>
        {open === "edit" ? <Edit /> : <Add />}
      </SplitableTabs>
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <Card className="w-35 h-45 flex flex-col gap-6">
          <div
            className="w-100 flex pt-3 pb-3 justify-between p-3"
            style={{
              borderBottom: "1px solid #cec6c6",
            }}
          >
            <div
              style={{
                fontFamily: "Work Sans",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "20px",
              }}
            >
              Create decoder
            </div>
            <Button
              variant="text"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <img src={DeleteIcon} alt="delete" />
            </Button>
          </div>
          <div className="flex flex-col gap-5 p-3" style={{ height: "100%" }}>
            <div className="w-100 flex flex-col gap-2">
              <div>Name</div>
              <Input
                placeholder="name"
                value={dataDecoder.name || ""}
                onChange={(e) => {
                  setDataDecoder({
                    ...dataDecoder,
                    name: e.target.value,
                    errorname: e.target.value.length === 0 ? true : false,
                  });
                }}
              />
            </div>
            <div className="w-100 flex flex-col gap-2">
              <div>Description</div>
              <Textarea
                placeholder="Description"
                value={dataDecoder.description || ""}
                onChange={(e) => {
                  setDataDecoder({
                    ...dataDecoder,
                    description: e.target.value,
                    errordescription:
                      e.target.value.length === 0 ? true : false,
                  });
                }}
              />
            </div>
            <div className="w-100 flex flex-col gap-2">
              <div>Decoder</div>
              <Editor
                height={`300px`}
                language="javascript"
                value={dataDecoder.fnc || ""}
                onChange={(value, event) => {
                  setDataDecoder({
                    ...dataDecoder,
                    fnc: value || "",
                    errorfnc: (value + "").length === 0 ? true : false,
                  });
                }}
              />
            </div>
          </div>
          <div
            className="w-100 flex justify-end gap-4 p-3"
            style={{
              borderTop: "1px solid #cec6c6",
            }}
          >
            <Button
              onClick={() => {
                setOpenModal(false);
                clearDataDecoder();
              }}
              style={{
                width: "100px",
                height: "40px",
              }}
              color="#6C757D"
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                createDecoderQuery.mutateAsync({
                  name: dataDecoder.name,
                  description: dataDecoder.description,
                  fnc: dataDecoder.fnc,
                });
              }}
              style={{
                width: "100px",
                height: "40px",
              }}
              color="#006BA9"
            >
              Save
            </Button>
          </div>
        </Card>
      </Modal>

      <AffirmModal />
    </Provider>
  );
};
export default DeviceProfilePage;
