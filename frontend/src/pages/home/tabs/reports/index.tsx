import { useReducer, useState } from "react";
import DataGrid, { Column } from "../../../../components/data-grid";
import Pagination from "../../../../components/pagination";
import { Device, Group, Params } from "../../../../utils";
import { ReactComponent as CsvIcon } from "../../../../assets/icons/csv.svg";
import { ReactComponent as PdfIcon } from "../../../../assets/icons/pdf.svg";
import Tooltip from "../../../../components/tooltip";
import { format } from "date-fns";
import Button from "../../../../components/button";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Modal from "../../../../components/modal";
import { MdOutlineClose, MdWatchLater, MdCancel } from "react-icons/md";
import Select from "react-select";
import { useProvider } from "../../../../components/provider";
import { AppContext } from "../../../../App";

const sites: Group[] = [
  {
    id: 1,
    name: "Site 1",
  },
  {
    id: 2,
    name: "Site 2",
  },
  {
    id: 3,
    name: "Site 3",
  },
];

const devices: Device[] = [
  {
    id: 1,
    name: "UPS 1",
    serial: "123456789",
  },
  {
    id: 2,
    name: "UPS 2",
    serial: "123456789",
  },
  {
    id: 3,
    name: "UPS 3",
    serial: "123456789",
  },
];

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
  const { theme } = useProvider<AppContext>();

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
            <div className="bg-white dark:bg-primary-darker px-2 py-1 border border-accent w-[7rem] text-accent capitalize text-center rounded">
              {row.type}
            </div>
          );
        return (
          <div className="bg-white dark:bg-primary-darker px-2 py-1 border border-primary text-primary capitalize rounded w-[7rem] text-center">
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

  const [open, setOpen] = useState(false);
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
        <Button
          className="flex items-center gap-2"
          onClick={() => setOpen(true)}
        >
          Generate report
          <AiOutlinePlusCircle className="text-lg" />
        </Button>
      </div>
      <DataGrid
        className=" table-fixed w-full text-left "
        headClassName="h-[5.5rem] bg-dark/5 dark:bg-light/5 text-[#697681] [&>*]:px-2 "
        rowClassName="h-[4rem] [&>*]:px-2 even:bg-dark/5 dark:even:bg-light/5 hover:bg-dark/10 dark:hover:bg-light/10"
        columns={columns}
        rows={rows.slice(
          (params.pagination.page - 1) * params.pagination.perPage,
          params.pagination.page * params.pagination.perPage
        )}
        action={action}
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
            <label
              className="w-fit"
              htmlFor="rapport-name"
              placeholder="Rapport name"
            >
              Rapport name
            </label>
            <input id="rapport-name" className="h-11" />
          </div>
          <div>
            <label className="w-fit" htmlFor="rapport-name">
              Select a site
            </label>
            <span className="text-dark">
              <Select
                classNames={{
                  option: (state) =>
                    state.isFocused ? "!bg-primary/10" : "bg-light/5",
                  control: (state) =>
                    state.isFocused
                      ? "!border-2 !border-primary !shadow-none "
                      : "border border-black/20",
                }}
                getOptionLabel={(site: Group) => site.name}
                getOptionValue={(site: Group) => site.name}
                options={sites}
                isClearable
                isMulti
                backspaceRemovesValue
              />
            </span>
          </div>
          <div>
            <label className="w-fit" htmlFor="select-devices">
              Select devices
            </label>
            <Select
              classNames={{
                option: (state) =>
                  state.isFocused ? "!bg-primary/10" : "white",
                control: (state) =>
                  state.isFocused
                    ? "!border-2 !border-primary !shadow-none"
                    : "border border-black/20",
              }}
              getOptionLabel={(device: Device) =>
                `${device.name} (${device.serial})`
              }
              getOptionValue={(device: Device) => device.name}
              options={devices}
              isClearable
              isMulti
              backspaceRemovesValue
            />
          </div>
          <div>
            <label className="w-fit" htmlFor="date-range">
              Date range
            </label>
            <Select
              classNames={{
                option: (state) =>
                  state.isFocused ? "!bg-primary/10" : "white",
                control: (state) =>
                  state.isFocused
                    ? "!border-2 !border-primary !shadow-none"
                    : "border border-black/20",
              }}
              getOptionLabel={(site: { value: string }) => site.value}
              getOptionValue={(site: { value: string }) => site.value}
              options={[
                {
                  value: "last hour",
                },
                {
                  value: "last 4 hours",
                },
                {
                  value: "last 12 hours",
                },
                {
                  value: "last day",
                },
                {
                  value: "last 2 days",
                },
                {
                  value: "last week",
                },
              ]}
              isClearable
              backspaceRemovesValue
            />
          </div>
          <div>
            <label className="w-fit" htmlFor="type">
              Format
            </label>
            <Select
              classNames={{
                option: (state) =>
                  state.isFocused ? "!bg-primary/10" : "white",
                control: (state) =>
                  state.isFocused
                    ? "!border-2 !border-primary !shadow-none"
                    : "border border-black/20",
              }}
              getOptionLabel={(site: { value: string }) => site.value}
              // getOptionValue={(site: { value: string }) => site.value + "waza"}
              options={[
                {
                  value: "PDF",
                },
                {
                  value: "CSV",
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
            className="flex items-center gap-2 py-3 px-4"
            onClick={() => setOpen(false)}
          >
            <span>Genarate</span>
            <MdWatchLater className="text-2xl" />
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default ReportsTab;
