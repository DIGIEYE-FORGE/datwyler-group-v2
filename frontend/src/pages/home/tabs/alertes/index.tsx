import { useEffect, useReducer, useState } from "react";
import DataGrid, { Column } from "../../../../components/data-grid";
import Pagination from "../../../../components/pagination";
import { Alert, Params, classNames } from "../../../../utils";
import { format } from "date-fns";
import Button from "../../../../components/button";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BiExport } from "react-icons/bi";
import { AiOutlineAlert } from "react-icons/ai";
import { useProvider } from "../../../../components/provider";
import { AppContext } from "../../../../App";

const defaultParams: Params = {
  pagination: {
    page: 1,
    perPage: 10,
  },
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
          level: action.payload,
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
          type: action.payload || undefined,
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
  const [total, setTotal] = useState(100);
  const [rows, setRows] = useState<Alert[]>([]);

  useEffect(() => {
    console.log("params", params);

    backendApi
      .getAlerts({
        ...params,
        where: {
          ...params.where,
          device: {
            ...params.where?.device,
            tenantId,
          },
        },
      })
      .then((res) => {
        setRows(res.results);
        setTotal(res.totalResult);
      })
      .catch((e) => {
        console.log("error getting alerts", e);
      });
  }, [params, tenantId]);

  const handleAcknowledge = (id: number) => {
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
            setRows(() => {
              const index = rows.findIndex((r) => r.id === id);
              const newRows = [...rows];
              newRows[index] = a;
              return newRows;
            });
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
        options: [
          {
            label: "UPS",
            value: "UPS",
          },
          {
            label: "PABX",
            value: "PABX",
          },
          {
            label: "HVAC",
            value: "HVAC",
          },
          {
            label: "CCTV",
            value: "CCTV",
          },
          {
            label: "Public Address",
            value: "Public Address",
          },
          {
            label: "Fire Alarm",
            value: "Fire Alarm",
          },
          {
            label: "Access Control",
            value: "Access Control",
          },
        ],
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
            "text-yellow-600": row.level === "WARNING",
            "text-red-600": row.level === "CRITICAL",
          })}
        >
          <span>{row.level} </span>
          <AiOutlineAlert className="text-2xl" />
        </div>
      ),
      filter: {
        type: "select",
        options: [
          {
            label: "Warning",
            value: "WARNING",
          },
          {
            label: "Critical",
            value: "CRITICAL",
          },
          {
            label: "Info",
            value: "INFO",
          },
        ],
        onChange: (val: string) => {
          dispatch({ type: "level", payload: val });
        },
      },
    },

    {
      label: "type",
      header: "Alert Type",
      field: "type",
      filter: {
        type: "select",
        options: [
          {
            label: "VOLTAGE",
            value: "VOLTAGE",
          },
          {
            label: "TEMPERATURE",
            value: "TEMPERATURE",
          },
          {
            label: "FIRE",
            value: "FIRE",
          },
          {
            label: "DOOR",
            value: "DOOR",
          },
        ],
        onChange: (val) => {
          dispatch({ type: "type", payload: val });
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
  return (
    <div className="flex flex-col  w-full gap-6 p-6">
      <div className="flex gap-4 items-center flex-wrap justify-end">
        <Pagination
          value={params.pagination}
          onChange={(v) => dispatch({ type: "pagination", payload: v })}
          total={total}
        />
        <Button className="flex items-center gap-2">
          export
          <BiExport className="text-lg" />
        </Button>
      </div>
      <DataGrid
        className="table-fixed  w-full  text-left "
        headClassName="h-[5.5rem] bg-dark/5 dark:bg-light/5 text-[#697681] [&>*]:px-2 "
        rowClassName="h-[4rem] [&>*]:px-2 even:bg-dark/5 dark:even:bg-light/5 hover:bg-dark/10 dark:hover:bg-light/10"
        columns={columns}
        rows={rows}
      ></DataGrid>
    </div>
  );
}

export default AlertsTab;
