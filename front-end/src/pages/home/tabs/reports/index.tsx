import { useReducer, useState } from "react";
import DataGrid, { Column } from "../../../../components/data-grid";
import Pagination from "../../../../components/pagination";
import { Params } from "../../../../utils";
import { ReactComponent as CsvIcon } from "../../../../assets/icons/csv.svg";
import { ReactComponent as PdfIcon } from "../../../../assets/icons/pdf.svg";
import Tooltip from "../../../../components/tooltip";
import { format } from "date-fns";
import Button from "../../../../components/button";
import { AiOutlinePlusCircle } from "react-icons/ai";

const defaultParams: Params = {
  pagination: {
    page: 1,
    perPage: 10,
  },
};

type Report = {
  name: string;
  createdAt: string;
  type: "alert" | "mesurement";
  format: "pdf" | "csv";
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

const generateDummyData = (total: number): Report[] => {
  return Array.from({ length: total }, (_, i) => ({
    name: `report${(i + 1).toString().padStart(2, "0")}`,
    createdAt: new Date(Math.random() * 1000000000000).toISOString(),
    format: Math.random() > 0.5 ? "pdf" : "csv",
    type: Math.random() > 0.5 ? "alert" : "mesurement",
  }));
};

const action = (row: any) => {
  if (row.format === "pdf")
    return (
      <div className="w-full h-full flex-center z-10">
        <Tooltip>
          <button className="w-[2.5rem] aspect-square rounded-full flex-center  hover:bg-dark/5 active:bg-dark/10 transition-colors ">
            <PdfIcon />
          </button>
          <div className="bg-dark/50  text-light rounded-full px-2 py-1 whitespace-nowrap mr-[4rem]">
            export as pdf
          </div>
        </Tooltip>
      </div>
    );
  return (
    <div className="w-full h-full flex-center">
      <Tooltip>
        <button className="w-[2.5rem] aspect-square rounded-full flex-center  hover:bg-dark/5 active:bg-dark/10 transition-colors">
          <CsvIcon />
        </button>
        <div className="bg-dark/50 text-light rounded-full px-2 py-1 whitespace-nowrap mr-[4rem]">
          export as csv
        </div>
      </Tooltip>
    </div>
  );
};

function ReportsTab() {
  const [params, setParams] = useReducer(paramsReducer, defaultParams);
  const [total, setTotal] = useState(100);
  const [rows, setRows] = useState(generateDummyData(305));

  const columns: Column[] = [
    {
      label: "name",
      header: "Report name",
      field: "name",
      filter: {
        type: "text",
        onChange: () => {},
      },
    },
    {
      label: "date",
      header: "Report date ",
      valueGetter: (row) => format(new Date(row.createdAt), "dd/MM/yyyy HH:mm"),
      filter: {
        type: "date",
        onChange: () => {},
      },
    },
    {
      label: "type",
      header: "Report type",
      valueGetter: (row) => {
        if (row.type === "alert")
          return (
            <div className="bg-white px-2 py-1 border border-accent w-[7rem] text-accent capitalize text-center rounded">
              {row.type}
            </div>
          );
        return (
          <div className="bg-white px-2 py-1 border border-primary text-primary capitalize rounded w-[7rem] text-center">
            {row.type}
          </div>
        );
      },
      filter: {
        type: "select",
        options: [
          { value: "alert", label: "alert" },
          { value: "mesurement", label: "mesurement" },
        ],
        onChange: () => {},
      },
    },
  ];

  return (
    <div className="flex flex-col  gap-6 p-6">
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
          Generate report
          <AiOutlinePlusCircle className="text-lg" />
        </Button>
      </div>
      <DataGrid
        className=" table-fixed w-full text-left "
        headClassName="h-[5.5rem] bg-[#E7EAEB] text-[#697681] [&>*]:px-2 "
        rowClassName="h-[4rem] [&>*]:px-2 even:bg-[#E7EAEB] hover:bg-[#d1d8da]"
        columns={columns}
        rows={rows.slice(
          (params.pagination.page - 1) * params.pagination.perPage,
          params.pagination.page * params.pagination.perPage
        )}
        action={action}
      ></DataGrid>
    </div>
  );
}

export default ReportsTab;
