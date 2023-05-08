import { useReducer, useState } from "react";
import DataGrid, { Column } from "../../../../components/data-grid";
import Pagination from "../../../../components/pagination";
import { Params, classNames } from "../../../../utils";
import { format } from "date-fns";
import Button from "../../../../components/button";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BiExport } from "react-icons/bi";

const defaultParams: Params = {
  pagination: {
    page: 1,
    perPage: 10,
  },
};

type Device = {
  deviceID?: string;
  deviceType?: "ups" | "temperature" | "humidity" | "water cooler";
  site: string;
  alertsCount?: number;
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

const generateDummyData = (total: number): Device[] => {
  return Array.from({ length: total }, (_, i) => ({
    createdAt: new Date(Math.random() * 1000000000000).toISOString(),
    deviceID: `deviceID${i}`,
    deviceType: ["ups", "temperature", "humidity", "water cooler"][
      Math.floor(Math.random() * 4)
    ] as any,
    name: `deviceName${i}`,
    site: ["site1", "site2"][Math.floor(Math.random() * 2)],
    alertsCount: Math.floor(Math.random() * 10),
  }));
};

function DevicesTab() {
  const [params, setParams] = useReducer(paramsReducer, defaultParams);
  const [total, setTotal] = useState(100);
  const [rows, setRows] = useState(generateDummyData(total));

  const columns: Column[] = [
    {
      label: "location",
      header: "Location",
      field: "site",
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
      label: "system",
      header: "System",
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
      label: "Serial",
      header: "Serial",
      field: "deviceID",
      filter: {
        type: "text",
        onChange: () => {},
      },
    },

    {
      label: "alertsCount",
      header: "alerts Count",
      valueGetter: (row) => (
        <span
          className={classNames("text-lg", {
            "text-primary": row.alertsCount === 0,
            "text-accent": row.alertsCount > 0,
          })}
        >
          {row.alertsCount}
        </span>
      ),
      filter: {
        type: "text",
        onChange: () => {},
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

export default DevicesTab;
