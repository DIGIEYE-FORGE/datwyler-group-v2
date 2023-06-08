import React, { useEffect, useMemo } from "react";
import { JsonObject, stringify } from "../../utils";
import Popover from "../popover";
import { TfiLayoutColumn3Alt as SelectColumnsIcon } from "react-icons/tfi";
import For from "../for";
import Show from "../show";
import Provider, { useProvider } from "../provider";
import { useTranslation } from "react-i18next";

type TextFilter = {
  type: "text" | "date";
  onChange: (value: string) => void;
};

type Option = {
  value: any;
  label: string | number;
};

type SelectFilter = {
  type: "select";
  options: Option[];
  onChange: (value: any) => void;
};

interface RowSelectAction {
  type: "edit" | "delete";
  row: JsonObject;
}

export type Column<T extends any = any> = {
  header: string | React.ReactNode;
  field?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: string;
  label: string;
  show?: boolean;
  filter?: TextFilter | SelectFilter;
  valueGetter?: (params: T) => React.ReactNode;
};

// extends props from table element
interface DataGridProps extends React.HTMLAttributes<HTMLDivElement> {
  rows: JsonObject[];
  columns: Column[];
  className?: string;
  style?: React.CSSProperties;
  noData?: React.ReactNode;
  headClassName?: string;
  headerStyle?: React.CSSProperties;
  bodyClassName?: string;
  bodyStyle?: React.CSSProperties;
  rowClassName?: string;
  action?: (row: any) => React.ReactNode;
  hideAction?: boolean;
  onRowSelect?: (params: RowSelectAction) => void;
  loading?: boolean;
  error?: boolean;
  cellMinWidth?: number;
}

type DataGridContext = DataGridProps & {
  filterdColumns: Column[];
  restColumns: Column[];
  max: number;
};

function Row({ row }: { row: JsonObject }) {
  const { filterdColumns, restColumns, max, ...props } =
    useProvider<DataGridContext>();
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <tr className={props.rowClassName} onClick={() => setOpen(!open)}>
        {filterdColumns.map((column, index) => {
          const value = column.valueGetter ? (
            column.valueGetter(row)
          ) : (
            <span>{stringify(row[column.field || ""]) || "- - -"} </span>
          );
          return (
            <td key={index} className={column.className} style={column.style}>
              {value}
            </td>
          );
        })}
        {!props.hideAction && <td>{props.action && props.action(row)}</td>}
      </tr>
      {restColumns.length > 0 && (
        <tr>
          <td colSpan={filterdColumns.length + (!props.hideAction ? 1 : 0)}>
            <div
              style={{
                maxHeight: open ? restColumns.length * 40 : 0,
                padding: open ? "0.5rem 0.5rem " : "0 0.5rem",
                overflow: "hidden",
              }}
              className="grid grid-cols-2  bg-light dark:bg-primary-dark px-2 sm:px-3 md:px-4 gap-x-2 gap-y-3 transition-[padding,max-height] duration-300 ease-in-out"
            >
              {restColumns.map((column, index) => (
                <React.Fragment key={index}>
                  <span>{column.header}</span>
                  <span>
                    {column.valueGetter ? (
                      column.valueGetter(row)
                    ) : (
                      <span>
                        {stringify(row[column.field || ""]) || "- - -"}{" "}
                      </span>
                    )}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

const DataGrid = ({ cellMinWidth = 200, ...props }: DataGridProps) => {
  const [selectedColumns, setSelectedColumns] = React.useState(
    props.columns.filter((column) => column.show !== false)
  );

  useEffect(() => {
    setSelectedColumns(props.columns);
  }, [props.columns]);

  const [innerWidth, setInnerWidth] = React.useState(window.innerWidth);
  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  const max = useMemo(() => {
    if (innerWidth < 480) return 1;
    if (innerWidth < 640) return 2;
    return Math.floor(innerWidth / cellMinWidth);
  }, [innerWidth]);

  const filterdColumns = useMemo(() => {
    return selectedColumns
      .filter((column) => column.show !== false)
      .slice(0, max);
  }, [selectedColumns, max]);

  const restColumns = useMemo(() => {
    return selectedColumns.filter((column) => column.show !== false).slice(max);
  }, [selectedColumns, max]);
  const { t } = useTranslation();

  return (
    <Provider
      value={{
        ...props,
        filterdColumns,
        restColumns,
        max,
      }}
    >
      <div className="w-full h-full ">
        <table className={props.className}>
          <thead>
            <tr className={props.headClassName} style={props.headerStyle}>
              {filterdColumns.map((column, index) => (
                <th
                  key={index}
                  className={column.className}
                  style={{
                    width: column.width,
                    ...column.style,
                  }}
                >
                  <div className="flex flex-col gap-2 h-full justify-evenly">
                    <div>{column.header}</div>
                    {column.filter && column.filter.type === "text" && (
                      <input
                        placeholder={t("search") || "search..."}
                        onChange={(e) => {
                          column.filter?.onChange(e.target.value);
                        }}
                      />
                    )}
                    {column.filter && column.filter.type === "date" && (
                      <input
                        placeholder="Search..."
                        onChange={(e) => {
                          column.filter?.onChange(e.target.value);
                        }}
                      />
                    )}
                    {column.filter && column.filter.type === "select" && (
                      <select
                        className="w-full"
                        onChange={(e) => {
                          column.filter?.onChange(e.target.value);
                        }}
                      >
                        <option value="">{t("all")}</option>
                        {column.filter.options.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </th>
              ))}
              {!props.hideAction && (
                <th className="w-[3rem]">
                  <Popover>
                    <div className=" p-2 rounded-full hover:bg-black/5 active:bg-black/10 transition-colors ">
                      <SelectColumnsIcon />
                    </div>
                    <div className="bg-light/50 dark:bg-dark/50  dark:text-light blur-background  rounded shadow-lg  mr-[9rem] w-[11.5rem] p-4">
                      <div className="flex  w-full h-[2rem] items-center gap-4">
                        <input
                          type="checkbox"
                          id={`column-all`}
                          checked={
                            selectedColumns.filter(
                              (column) => column.show !== false
                            ).length === selectedColumns.length
                          }
                          onChange={(e) => {
                            if (!e.target.value) return;
                            const newColumns = selectedColumns.map((column) => {
                              return {
                                ...column,
                                show: true,
                              };
                            });
                            setSelectedColumns(newColumns);
                          }}
                        />
                        <label className="pointer" htmlFor={`column-all`}>
                          All
                        </label>
                      </div>
                      {selectedColumns.map((column, index) => (
                        <div
                          key={index}
                          className="flex  w-full h-[2rem] items-center gap-4"
                        >
                          <input
                            type="checkbox"
                            id={`column-${index}`}
                            checked={column.show !== false}
                            onChange={(e) => {
                              if (
                                selectedColumns.filter(
                                  (column) => column.show !== false
                                ).length === 1 &&
                                !e.target.checked
                              )
                                return;
                              const newColumns = selectedColumns.map(
                                (column, i) => {
                                  if (i === index) {
                                    return {
                                      ...column,
                                      show: e.target.checked,
                                    };
                                  }
                                  return column;
                                }
                              );
                              setSelectedColumns(newColumns);
                            }}
                          />
                          <label
                            className="pointer"
                            htmlFor={`column-${index}`}
                          >
                            {column.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Popover>
                </th>
              )}
            </tr>
          </thead>
          <tbody className={`${props.bodyClassName} `} style={props.bodyStyle}>
            {props.error && (
              <tr>
                <td colSpan={filterdColumns.length + 1}>
                  <div className="flex flex-col items-center py-4 gap-4">
                    <img
                      src="/data-grid-error.svg"
                      className="w-1/2 min-h-[20rem] h-[50vh]"
                    />
                    <div className="text-center">
                      <b>Something went wrong!</b>
                      <div className="text-sm">
                        Please try again after sometime
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            )}
            {!props.error &&
              props.loading &&
              Array.from({ length: 10 }).map((_, index) => (
                <tr key={index} className={props.rowClassName}>
                  {filterdColumns.map((column, index) => (
                    <td key={index} style={column.style}>
                      <div className="animate-pulse  !bg-dark/30 !dark:bg-light/30  mx-1 rounded h-12 my-1"></div>
                    </td>
                  ))}
                  {!props.hideAction && (
                    <td>
                      <div className="animate-pulse  !bg-dark/30 !dark:bg-light/30  w-11/12 rounded h-12 my-1"></div>
                    </td>
                  )}
                </tr>
              ))}
            {!props.error &&
              !props.loading &&
              props.rows.map((row, index) => <Row key={index} row={row} />)}
            {!props.error && !props.loading && props.rows.length === 0 && (
              <tr>
                <td
                  colSpan={filterdColumns.length + (props.hideAction ? 0 : 1)}
                >
                  {props.noData || (
                    <div className="flex flex-col items-center py-4 gap-4">
                      <img
                        src="/data-grid-nodata.svg"
                        className="w-1/2 min-h-[20rem] h-[50vh]"
                      />
                      <div className="text-center">
                        <b>No data found</b>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Provider>
  );
};

export default DataGrid;
