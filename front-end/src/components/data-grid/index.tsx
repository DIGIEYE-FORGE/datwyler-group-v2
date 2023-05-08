import React, { useEffect } from "react";
import { JsonObject, stringify } from "../../utils";
import Popover from "../popover";
import { TfiLayoutColumn3Alt as SelectColumnsIcon } from "react-icons/tfi";

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
  action?: (row: JsonObject) => React.ReactNode;
  hideAction?: boolean;
  onRowSelect?: (params: RowSelectAction) => void;
}

const DataGrid = (props: DataGridProps) => {
  const [selectedColumns, setSelectedColumns] = React.useState(props.columns);

  useEffect(() => {
    setSelectedColumns(props.columns);
  }, [props.columns]);

  return (
    <div className="w-full h-full ">
      <table className={props.className}>
        <thead>
          <tr className={props.headClassName} style={props.headerStyle}>
            {selectedColumns
              .filter((column) => column.show !== false)
              .map((column, index) => (
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
                        placeholder="Search..."
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
                        <option value="">All</option>
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
                        <label className="pointer" htmlFor={`column-${index}`}>
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
        <tbody className={`${props.bodyClassName}`} style={props.bodyStyle}>
          {props.rows.map((row, index) => (
            <tr key={index} className={props.rowClassName}>
              {selectedColumns
                .filter((column) => column.show !== false)
                .map((column, index) => {
                  const value = column.valueGetter ? (
                    column.valueGetter(row)
                  ) : (
                    <span>
                      {stringify(row[column.field || ""]) || "- - -"}{" "}
                    </span>
                  );
                  return (
                    <td
                      key={index}
                      className={column.className}
                      style={column.style}
                    >
                      {value}
                    </td>
                  );
                })}
              {!props.hideAction && (
                <td>{props.action && props.action(row)}</td>
              )}
            </tr>
          ))}
        </tbody>
        <tbody className={props.bodyClassName}>
          {props.rows.length === 0 && (
            <tr>
              <td colSpan={selectedColumns.length}>
                {props.noData || "No data"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;
