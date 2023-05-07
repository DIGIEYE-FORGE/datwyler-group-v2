import { useReducer, useState } from "react";
import DataGrid, { Column } from "../../../../components/data-grid";
import Pagination from "../../../../components/pagination";
import { Params } from "../../../../utils";
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
const defaultParams: Params = {
  pagination: {
    page: 1,
    perPage: 10,
  },
};

type AlertType =
  | "low battery"
  | "high temperature"
  | "low temperature"
  | "low water level"
  | "water leak";

type Alert = {
  createdAt: string;
  deviceID?: string;
  deviceType?: "ups" | "temperature" | "humidity" | "water cooler";
  alertType: AlertType;
  location?: "site1" | "site2";
  acknoledged?: boolean;
  acknoledgedBy?: string;
};

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

const generateDummyData = (total: number): Alert[] => {
  return Array.from({ length: total }, (_, i) => ({
    createdAt: new Date(Math.random() * 1000000000000).toISOString(),
    deviceID: `deviceID${i}`,
    deviceType: ["ups", "temperature", "humidity", "water cooler"][
      Math.floor(Math.random() * 4)
    ] as any,
    alertType: [
      "low battery",
      "high temperature",
      "low temperature",
      "low water level",
      "water leak",
    ][Math.floor(Math.random() * 5)] as any,
    location: ["site1", "site2"][Math.floor(Math.random() * 2)] as any,
    acknoledged: Math.random() > 0.5,
    acknoledgedBy: `user ${i}`,
  }));
};

function AlertsTab() {
  const [params, setParams] = useReducer(paramsReducer, defaultParams);
  const [total, setTotal] = useState(100);
  const [rows, setRows] = useState(generateDummyData(total));

  const columns: Column[] = [
    {
      label: "date",
      header: "Date",
      valueGetter: (row) => format(new Date(row.createdAt), "dd/MM/yyyy HH:mm"),
      filter: {
        type: "date",
        onChange: () => {},
      },
    },
    {
      label: "deviceID",
      header: "Device ID",
      field: "deviceID",
      filter: {
        type: "text",
        onChange: () => {},
      },
    },
    {
      label: "deviceType",
      header: "Device Type",
      field: "deviceType",
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
      label: "alertType",
      header: "Alert Type",
      valueGetter(row: Alert) {
        return alertsComponentMap[row.alertType];
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
      label: "location",
      header: "Location",
      field: "location",
      filter: {
        type: "select",
        options: [
          {
            label: "Site1",
            value: "site1",
          },
          {
            label: "Site2",
            value: "site2",
          },
        ],
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
        if (row.acknoledged)
          return (
            <div className="flex items-center gap-2">
              {row.acknoledgedBy}
              <AiOutlineCheckCircle className="text-green-500" />
            </div>
          );
        return (
          <div className=" text-center  outline outline-1 outline-primary text-primary rounded w-fit px-2 py-1 hover:bg-primary/5 active:bg-primary/5 cursor-pointer">
            Acknolodge
          </div>
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
        headClassName="h-[5.5rem] bg-[#E7EAEB] text-[#697681] [&>*]:px-2 "
        rowClassName="h-[4rem] [&>*]:px-2 even:bg-[#E7EAEB] hover:bg-[#d1d8da]"
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
