import { useEffect, useReducer, useState } from "react";
import DataGrid, { Column } from "../../../../components/data-grid";
import Pagination from "../../../../components/pagination";
import { Alert, Params } from "../../../../utils";
import { format } from "date-fns";
import Button from "../../../../components/button";
import { AiOutlineCheckCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { GiBattery25, GiLeak } from "react-icons/gi";
import { BiExport } from "react-icons/bi";
import {
  FaHandHoldingWater,
  FaTemperatureHigh,
  FaTemperatureLow,
} from "react-icons/fa";
import { useProvider } from "../../../../components/provider";
import { AppContext } from "../../../../App";
const defaultParams: Params = {
  pagination: {
    page: 1,
    perPage: 10,
  },
  include: {
    device: {
      include: {
        group: true,
        deviceProfile: true,
      },
    },
  },
};

type AlertType =
  | "low battery"
  | "high temperature"
  | "low temperature"
  | "low water level"
  | "water leak";

const alertsComponentMap: {
  [key in AlertType]: JSX.Element;
} = {
  "low battery": (
    <div className="flex items-center gap-2 text-gray-400">
      low battery <GiBattery25 />
    </div>
  ),
  "high temperature": (
    <div className="flex items-center gap-2 text-red-400">
      high temperature <FaTemperatureHigh />
    </div>
  ),
  "low temperature": (
    <div className="flex items-center gap-2 text-blue-400">
      low temperature <FaTemperatureLow />
    </div>
  ),
  "low water level": (
    <div className="flex items-center gap-2 text-yellow-500">
      low water level <FaHandHoldingWater />
    </div>
  ),
  "water leak": (
    <div className="flex items-center gap-2 text-red-400">
      water leak <GiLeak />
    </div>
  ),
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
    default:
      return state;
  }
};

function AlertsTab() {
  const [params, setParams] = useReducer(paramsReducer, defaultParams);
  const { backendApi, tenantId, confirm, user } = useProvider<AppContext>();
  const [total, setTotal] = useState(100);
  const [rows, setRows] = useState<Alert[]>([]);

  useEffect(() => {
    backendApi.getAlerts(params).then((res) => {
      setRows(res.results);
      setTotal(res.totalResult);
    });
  }, []);

  const handleAcknowledge = (id: number) => {
    confirm({
      title: "Acknolodge alert",
      description: "Are you sure you want to acknolodge this alert?",
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
            console.log("error acknolodging alert", e);
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
        onChange: () => {},
      },
    },
    {
      label: "site",
      header: "Site",
      valueGetter: (row: Alert) => row.device?.group?.name?.toUpperCase(),
      filter: {
        type: "text",
        onChange: () => {},
      },
    },
    {
      label: "System",
      header: "System",
      valueGetter: (row: Alert) =>
        row.device?.deviceProfile?.name.toUpperCase(),
      filter: {
        type: "select",
        options: [
          {
            label: "UPS",
            value: "ups",
          },
          {
            label: "Temperature",
            value: "temperature",
          },
          {
            label: "Humidity",
            value: "humidity",
          },
          {
            label: "Water cooler",
            value: "water cooler",
          },
        ],
        onChange: () => {},
      },
    },
    {
      label: "deviceID",
      header: "Device ID",
      valueGetter: (row: Alert) => row.device?.serial,
      filter: {
        type: "text",
        onChange: () => {},
      },
    },

    {
      label: "type",
      header: "Alert Type",
      valueGetter(row: Alert) {
        return alertsComponentMap[row.type as AlertType];
      },
      filter: {
        type: "select",
        options: [
          {
            label: "Low battery",
            value: "low battery",
          },
          {
            label: "High temperature",
            value: "high temperature",
          },
          {
            label: "Low temperature",
            value: "low temperature",
          },
          {
            label: "Low water level",
            value: "low water level",
          },
          {
            label: "Water leak",
            value: "water leak",
          },
        ],
        onChange: () => {},
      },
    },
    {
      label: "date",
      header: "Date",
      valueGetter: (row: Alert) =>
        format(new Date(row.updatedAt), "dd/MM/yyyy HH:mm"),
      filter: {
        type: "date",
        onChange: () => {},
      },
    },
    {
      label: "acknoledgement",
      header: "Acknoledgement",
      filter: {
        type: "select",
        options: [
          {
            label: "Acknoledged",
            value: "acknoledged",
          },
          {
            label: "Not acknoledged",
            value: "not acknoledged",
          },
        ],
        onChange: () => {},
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
            Acknolodge
          </Button>
        );
      },
    },
  ];
  return (
    <div className="flex flex-col  w-full gap-6 p-6">
      <div className="flex gap-4 items-center flex-wrap justify-end">
        <select className="min-w-[10rem] mr-auto">
          <option value="">site1</option>
          <option value="">site2</option>
        </select>
        <Pagination
          value={params.pagination}
          onChange={(v) => setParams({ type: "pagination", payload: v })}
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
        rows={rows.slice(
          (params.pagination.page - 1) * params.pagination.perPage,
          params.pagination.page * params.pagination.perPage
        )}
      ></DataGrid>
    </div>
  );
}

export default AlertsTab;
