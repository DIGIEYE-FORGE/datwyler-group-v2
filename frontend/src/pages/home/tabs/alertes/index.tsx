import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import DataGrid, { Column } from "../../../../components/data-grid";
import Pagination from "../../../../components/pagination";
import {
  Alert,
  Params,
  alarmLevels,
  classNames,
  strTake,
  systems,
} from "../../../../utils";
import { addHours, format } from "date-fns";
import Button from "../../../../components/button";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineAlert } from "react-icons/ai";
import { useProvider } from "../../../../components/provider";
import { AppContext } from "../../../../App";
import Tooltip from "../../../../components/tooltip";
import { BiExport } from "react-icons/bi";
import Modal from "../../../../components/modal";
import { MdCancel, MdOutlineClose, MdSave, MdWatchLater } from "react-icons/md";
import Select from "react-select";
import { InputActionMeta } from "react-select";
import { Input } from "postcss";
import { object } from "prop-types";
import { toast } from "react-toastify";

const defaultParams: Params = {
  pagination: {
    page: 1,
    perPage: 10,
  },
  orderBy: { createdAt: "asc" },
  include: {
    device: {
      select: {
        group: true,
        name: true,
        serial: true,
      },
    },
  },
};

const dateMap: Record<
  string,
  {
    gte: string;
    lt?: string;
  }
> = {
  "last hour": {
    gte: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  "last 4 hours": {
    gte: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
  "last 24 hours": {
    gte: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  "last 7 days": {
    gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
};
const paramsReducer = (
  state: Params,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "setParams":
      return action.payload;
    case "pagination":
      return {
        ...state,
        pagination: action.payload,
      };
    case "level":
      return {
        ...state,
        where: {
          ...state.where,
          level: action.payload || undefined,
        },
      };
    case "location":
      return {
        ...state,
        where: {
          ...state.where,
          device: {
            ...state.where?.device,
            group: {
              ...state.where?.device?.group,
              location: {
                contains: action.payload,
                mode: "insensitive",
              },
            },
          },
        },
      };
    case "site":
      return {
        ...state,
        where: {
          ...state.where,
          device: {
            ...state.where?.device,
            group: {
              ...state.where?.device?.group,
              name: {
                contains: action.payload,
                mode: "insensitive",
              },
            },
          },
        },
      };
    case "system":
      return {
        ...state,
        where: {
          ...state.where,
          device: {
            ...state.where?.device,
            name: action.payload || undefined,
          },
        },
      };
    case "type":
      return {
        ...state,
        where: {
          ...state.where,
          type: {
            contains: action.payload,
            mode: "insensitive",
          },
        },
      };
    case "message":
      return {
        ...state,
        where: {
          ...state.where,
          message: {
            contains: action.payload,
            mode: "insensitive",
          },
        },
      };
    case "acknowledged":
      return {
        ...state,
        where: {
          ...state.where,
          acknowledgedBy: action.payload
            ? action.payload === "true"
              ? { not: null }
              : null
            : undefined,
        },
      };
    case "date":
      return {
        ...state,
        where: {
          ...state.where,
          updatedAt: dateMap[action.payload] || undefined,
        },
      };

    default:
      return state;
  }
};

function AlertsTab() {
  const { backendApi, tenantId, confirm, user } = useProvider<AppContext>();
  const [params, dispatch] = useReducer(paramsReducer, defaultParams);
  const [total, setTotal] = useState(0);
  const [rows, setRows] = useState<Alert[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "error">("loading");

  const getAlerts = useCallback(async () => {
    try {
      setState("loading");
      const alerts = await backendApi.getAlerts({
        ...params,
        where: {
          ...params.where,
          device: {
            ...params.where?.device,
            tenantId,
          },
        },
      });
      setState("idle");
      setRows(alerts.results);
      setTotal(alerts.totalResult);
    } catch (e) {
      setState("error");
      console.error("error getting alerts", e);
    }
  }, [params, tenantId]);

  useEffect(() => {
    getAlerts();
  }, [params, tenantId]);

  const handleAcknowledge = async (id: number) => {
    confirm({
      title: "Acknowledge alert",
      description: "Are you sure you want to Acknowledge this alert?",
      onConfirm: () => {
        backendApi
          .acklowledgeAlerts({
            id,
            user: `${user?.firstName} ${user?.lastName}`,
          })
          .then((a) => {
            getAlerts();
          })
          .catch((e) => {
            console.log("error Acknowledging  alert", e);
          });
      },
    });
  };

  const columns: Column[] = [
    {
      label: "location",
      header: "Location",
      valueGetter: (row: Alert) => row.device?.group?.location?.toUpperCase(),
      filter: {
        type: "text",
        onChange: (val) => {
          dispatch({
            type: "location",
            payload: val,
          });
        },
      },
    },
    {
      label: "site",
      header: "Site",
      valueGetter: (row: Alert) => row.device?.group?.name?.toUpperCase(),
      filter: {
        type: "text",
        onChange: (val) => {
          dispatch({
            type: "site",
            payload: val,
          });
        },
      },
    },
    {
      label: "System",
      header: "System",
      valueGetter: (row: Alert) => row.device?.name,
      filter: {
        type: "select",
        options: systems.map((system) => ({
          label: system,
          value: system,
        })),
        onChange: (val: string) => {
          dispatch({ type: "system", payload: val });
        },
      },
    },
    {
      label: "level",
      header: "level",
      valueGetter: (row: Alert) => (
        <div
          className={classNames("flex items-center gap-2", {
            "text-yellow-600": row.level === "General",
            "text-red-600": row.level === "Critical",
          })}
        >
          <span>{row.level} </span>
          <AiOutlineAlert className="text-2xl" />
        </div>
      ),
      filter: {
        type: "select",
        options: alarmLevels.map((level) => ({
          label: level,
          value: level,
        })),
        onChange: (val: string) => {
          dispatch({ type: "level", payload: val });
        },
      },
    },

    {
      label: "name",
      header: "Alert Name",
      field: "type",
      filter: {
        type: "text",
        onChange: (val) => {
          dispatch({ type: "type", payload: val });
        },
      },
    },
    {
      label: "message",
      header: "Alert Message",
      valueGetter: (row: Alert) => (
        <Tooltip>
          <span>{strTake(row.message, 25)}</span>
          <span className="card p-4 whitespace-nowrap">{row.message}</span>
        </Tooltip>
      ),
      filter: {
        type: "text",
        onChange: (val) => {
          dispatch({ type: "message", payload: val });
        },
      },
    },
    {
      label: "date",
      header: "Date",
      valueGetter: (row: Alert) =>
        format(new Date(row.updatedAt), "dd/MM/yyyy HH:mm"),
      filter: {
        type: "select",
        options: [
          {
            label: "last hour",
            value: "last hour",
          },
          {
            label: "last 4 hours",
            value: "last 4 hours",
          },
          {
            label: "last 24 hours",
            value: "last 24 hours",
          },
          {
            label: "last 7 days",
            value: "last 7 days",
          },
        ],
        onChange: (val) => {
          dispatch({ type: "date", payload: val });
        },
      },
    },
    {
      label: "Acknowledgement",
      header: "Acknowledgement",
      filter: {
        type: "select",
        options: [
          {
            label: "Acknowledged",
            value: "true",
          },
          {
            label: "Not Acknowledged",
            value: "false",
          },
        ],
        onChange: (val) => {
          dispatch({ type: "acknowledged", payload: val });
        },
      },
      valueGetter: (row: Alert) => {
        if (row.acknowledgedBy)
          return (
            <div className="flex items-center gap-2">
              {row.attributes?.user}
              <AiOutlineCheckCircle className="text-green-500" />
            </div>
          );
        return (
          <Button variant="outlined" onClick={() => handleAcknowledge(row.id)}>
            Acknowledge
          </Button>
        );
      },
    },
  ];
  const [rapportData, setRapportData] = useState({
    type: "pdf",
    name: "",
  });
  const [open, setOpen] = useState(false);

  const generateReport = useMemo(() => {
    if (!open)
      return {
        type: "pdf",
        name: "",
        tenantId: tenantId,
        where: params.where,
      };
    return {
      ...rapportData,
      tenantId: tenantId,
      where: params.where,
    };
  }, [params.where, tenantId, open, rapportData.name, rapportData.type]);

  return (
    <div className="flex flex-col  w-full gap-6 p-6 ">
      <div className="flex gap-4 items-center flex-wrap justify-end">
        <Pagination
          value={params.pagination}
          onChange={(v) => dispatch({ type: "pagination", payload: v })}
          total={total}
        />
        <Button
          className="flex items-center gap-2"
          disabled={rows.length === 0 || !params?.where?.updatedAt}
          onClick={() => {
            setOpen(true);
          }}
        >
          Generate
          <BiExport className="text-lg" />
        </Button>
      </div>
      <DataGrid
        loading={state === "loading"}
        error={state === "error"}
        className="table-fixed  w-full text-left "
        headClassName="h-[5.5rem] bg-dark/5 dark:bg-light/5 text-[#697681] [&>*]:px-2 "
        rowClassName="h-[4rem] [&>*]:px-2 even:bg-dark/5 dark:even:bg-light/5 hover:bg-dark/10 dark:hover:bg-light/10 shadow shadow-[#7f7f7f]/20"
        columns={columns}
        rows={rows}
      ></DataGrid>
      <Modal
        open={open}
        handleClose={() => setOpen(false)}
        className="bg-white w-11/12 max-w-[40rem] rounded [&>*]:border-b [&>*]:border-black/20 max-h-full overflow-auto"
      >
        <div className="flex items-center py-4  justify-between px-4">
          <span className="font-semibold">Create a raport</span>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full hover:bg-dark/10 active:shadow-inner w-8 h-8 flex-center"
          >
            <MdOutlineClose className="text-2xl text-gray-500" />
          </button>
        </div>
        <form className="flex flex-col gap-6 py-4 [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div]:px-4">
          <div>
            <label className="w-fit" htmlFor="date-range">
              name
            </label>
            <input
              className="h-12 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              type="text"
              placeholder="Name *"
              onChange={(e) => {
                setRapportData((prev) => ({ ...prev, name: e.target.value }));
              }}
            />
          </div>
          <div>
            <label className="w-fit" htmlFor="type">
              Format
            </label>
            <Select
              onChange={(v: any) => {
                setRapportData((prev) => ({ ...prev, type: v.value }));
              }}
              classNames={{
                option: (state) =>
                  state.isFocused ? "!bg-primary/10" : "white",
                control: (state) =>
                  state.isFocused
                    ? "!border-2 !border-primary !shadow-none"
                    : "border border-black/20",
              }}
              getOptionLabel={(site: { value: string }) => site.value}
              defaultValue={{ value: "pdf" }}
              options={[
                {
                  value: "pdf",
                },
                {
                  value: "csv",
                },
              ]}
              isClearable
              backspaceRemovesValue
            />
          </div>
        </form>
        <div className="flex justify-between items-center h-20 px-6">
          <Button
            className="flex items-center gap-2 py-3 px-4"
            variant="outlined"
            onClick={() => setOpen(false)}
          >
            <span>Cancel</span>
            <MdCancel className="text-2xl" />
          </Button>
          <Button
            onClick={() => {
              backendApi
                .alertsGenerate(generateReport)
                .then((res) => {
                  toast.success("Rapport generated successfully");
                  setOpen(false);
                })
                .catch((err) => {
                  toast.error("Error generating rapport");
                });
            }}
            disabled={rapportData.name === ""}
            className="flex items-center gap-2 py-3 px-4"
          >
            <span>Generate</span>
            <MdWatchLater className="text-2xl" />
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default AlertsTab;
