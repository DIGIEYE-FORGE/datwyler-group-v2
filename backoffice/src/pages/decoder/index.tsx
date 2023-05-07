import Button from "../../components/button";
import AddIcon from "../../assets/icons/add.svg";
import { useState, useReducer, useEffect } from "react";
import SplitableTabs from "../../components/splitable-tabs";
import Provider from "../../components/provider";
import Add from "./add";
import DataGrid, { Column } from "../../components/data-grid";
import noDataImg from "../../assets/images/no-data.svg";
import { format } from "date-fns";
import Pagination from "../../components/pagination";
import { deleteDecoder, getDecoder } from "../../api/decoder";
import Edit from "./edit";
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
  | "name"
  | "description"
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
    case "description":
      return {
        ...state,
        page: 1,
        where: {
          ...state.where,
          description: {
            contains: action.payload,
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
  id: number;
  serial: string;
  name: string;
  description?: string;
  [key: string]: any;
}

interface Data {
  totalResult: number;
  results: Device[];
}
interface deviceType {
  id: number;
  name: string;
  [key: string]: any;
}
interface Decoder {
  id: number;
  name: string;
  description?: string;
  fnc: string;
  updatedAt: string;
  [key: string]: any;
}
const DecoderPage = () => {
  const [open, setOpen] = useState<boolean | "edit">(false);
  const [params, dispatch] = useReducer(paramsReducer, defaultParams);
  const [deviceTypes, setDeviceTypes] = useState<deviceType[]>([]);
  const [rowSelected, setRowSelected] = useState<Decoder | null>(null);
  const [save, setSave] = useState<boolean>(false);
  const [affirm, AffirmModal] = useAffirm({
    defautlMessage: "Are you sure?",
  });

  const [getDecoderQuery] = useQueries({
    queries: [
      {
        queryKey: ["decoder", params, save],
        queryFn: () => getDecoder(params),
      },
    ],
  });

  const deleteDecoderMutation = useMutation({
    mutationFn: (id: string) => deleteDecoder(id),
    onSuccess: () => {
      toast.success("Delete decoder successfully");
      setSave((cur) => !cur);
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
      header: "description",
      field: "description",
      filter: {
        type: "text",
        reducerType: "description",
      },
      label: "description",
    },
    {
      header: "last updated",
      field: "updatedAt",
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
        deviceTypes: [deviceTypes, setDeviceTypes],
        updatePage: () => dispatch({ type: "page", payload: 1 }),
        rowSelected: [rowSelected, setRowSelected],
        save: [save, setSave],
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
              <span>add decoder</span>
              <img src={AddIcon} alt="add" />
            </Button>
          </div>
          <div className="h-full p-0  flex flex-col gap-4 p-6 ">
            <div className="flex">
              <span>decoder</span>
              <span className="ml-auto"></span>
              <Pagination
                total={getDecoderQuery?.data?.totalResult || 1}
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
                  getDecoderQuery.isError
                    ? "error"
                    : getDecoderQuery.isLoading
                    ? "loading"
                    : "success"
              }
                rows={getDecoderQuery?.data?.results || []}
                filtersReducer={dispatch}
                noData={<NoData />}
                onRowSelect={({ type, row }) => {
                  if (type === "view") {
                    setRowSelected(row as Decoder);
                    setOpen("edit");
                  } else if (type === "delete") {
                    affirm(async () => {
                      await deleteDecoderMutation.mutateAsync(row.id);
                    });
                  }
                }}
              />
            </div>
          </div>
        </div>
        {open === "edit" ? <Edit /> : <Add />}
      </SplitableTabs>
      <AffirmModal />
    </Provider>
  );
};
export default DecoderPage;
