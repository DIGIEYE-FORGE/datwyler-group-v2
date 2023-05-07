import React from "react";
import styled from "styled-components";
import Input from "../input";
import Select from "../select";
import Popover from "../popover";
import Card from "../card";
import Button from "../button";
import LoadingTable from "../loading-table";

const Edit = styled.div`
  color: #4e5064;
  path {
    fill: #4e5064;
  }
  &:hover {
    color: #006ba9;
    path {
      fill: #006ba9;
    }
  }
`;
const Delete = styled.div`
  color: #4e5064;
  path {
    fill: #4e5064;
  }
  &:hover {
    color: #951129;
    path {
      fill: #951129;
    }
  }
`;

const EditIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_244_186125)">
      <path d="M0.7325 11.9491C0.263627 12.4178 0.000141594 13.0536 0 13.7166L0 14.9997H1.28312C1.94611 14.9996 2.58189 14.7361 3.05063 14.2672L11.39 5.92786L9.07188 3.60974L0.7325 11.9491Z" />
      <path d="M14.4651 0.534416C14.3129 0.382063 14.1322 0.261201 13.9332 0.178739C13.7343 0.0962771 13.5211 0.053833 13.3057 0.053833C13.0904 0.053833 12.8771 0.0962771 12.6782 0.178739C12.4793 0.261201 12.2985 0.382063 12.1463 0.534416L9.95508 2.72629L12.2732 5.04442L14.4651 2.85317C14.6174 2.70097 14.7383 2.52024 14.8208 2.32131C14.9032 2.12237 14.9457 1.90914 14.9457 1.69379C14.9457 1.47844 14.9032 1.26521 14.8208 1.06627C14.7383 0.86734 14.6174 0.68661 14.4651 0.534416Z" />
    </g>
    <defs>
      <clipPath id="clip0_244_186125">
        <rect width="15" height="15" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const DeleteIcon = () => (
  <svg
    width="17"
    height="19"
    viewBox="0 0 17 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.6247 3.16665H13.1705C12.7917 1.32492 11.1716 0.002375 9.29132 0H7.70797C5.82768 0.002375 4.20755 1.32492 3.82882 3.16665H1.37466C0.937439 3.16665 0.583008 3.52109 0.583008 3.95831C0.583008 4.39553 0.937439 4.75 1.37466 4.75H2.16632V15.0417C2.16895 17.2267 3.93963 18.9974 6.12466 19H10.8747C13.0597 18.9974 14.8304 17.2267 14.833 15.0417V4.75H15.6247C16.0619 4.75 16.4163 4.39557 16.4163 3.95835C16.4163 3.52112 16.0619 3.16665 15.6247 3.16665ZM7.70801 13.4583C7.70801 13.8956 7.35358 14.25 6.91635 14.25C6.47909 14.25 6.12466 13.8956 6.12466 13.4583V8.70835C6.12466 8.27112 6.47909 7.91669 6.91632 7.91669C7.35354 7.91669 7.70797 8.27112 7.70797 8.70835V13.4583H7.70801ZM10.8747 13.4583C10.8747 13.8956 10.5202 14.25 10.083 14.25C9.64579 14.25 9.29135 13.8956 9.29135 13.4583V8.70835C9.29135 8.27112 9.64579 7.91669 10.083 7.91669C10.5202 7.91669 10.8747 8.27112 10.8747 8.70835V13.4583ZM5.46838 3.16665C5.80511 2.21847 6.70182 1.58453 7.70801 1.58331H9.29135C10.2975 1.58453 11.1942 2.21847 11.531 3.16665H5.46838Z"
      fill="#4E5064"
    />
  </svg>
);

const ColumnsSelect = () => (
  <svg
    className="pointer"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_244_185528)">
      <path
        d="M5.83333 0H3.33333C1.49238 0 0 1.49238 0 3.33333V5.83333C0 7.67428 1.49238 9.16667 3.33333 9.16667H5.83333C7.67428 9.16667 9.16667 7.67428 9.16667 5.83333V3.33333C9.16667 1.49238 7.67428 0 5.83333 0Z"
        fill="#696C81"
      />
      <path
        d="M5.83333 10.8333H3.33333C1.49238 10.8333 0 12.3257 0 14.1667V16.6667C0 18.5076 1.49238 20 3.33333 20H5.83333C7.67428 20 9.16667 18.5076 9.16667 16.6667V14.1667C9.16667 12.3257 7.67428 10.8333 5.83333 10.8333Z"
        fill="#696C81"
      />
      <path
        d="M11.6663 5.83333H14.1663V8.33333C14.1663 8.55435 14.2541 8.76631 14.4104 8.92259C14.5667 9.07887 14.7787 9.16667 14.9997 9.16667C15.2207 9.16667 15.4327 9.07887 15.5889 8.92259C15.7452 8.76631 15.833 8.55435 15.833 8.33333V5.83333H18.333C18.554 5.83333 18.766 5.74553 18.9223 5.58925C19.0785 5.43297 19.1663 5.22101 19.1663 5C19.1663 4.77898 19.0785 4.56702 18.9223 4.41074C18.766 4.25446 18.554 4.16667 18.333 4.16667H15.833V1.66667C15.833 1.44565 15.7452 1.23369 15.5889 1.07741C15.4327 0.921129 15.2207 0.833332 14.9997 0.833332C14.7787 0.833332 14.5667 0.921129 14.4104 1.07741C14.2541 1.23369 14.1663 1.44565 14.1663 1.66667V4.16667H11.6663C11.4453 4.16667 11.2334 4.25446 11.0771 4.41074C10.9208 4.56702 10.833 4.77898 10.833 5C10.833 5.22101 10.9208 5.43297 11.0771 5.58925C11.2334 5.74553 11.4453 5.83333 11.6663 5.83333Z"
        fill="#696C81"
      />
      <path
        d="M11.6663 16.6667H18.333C18.554 16.6667 18.766 16.5789 18.9223 16.4226C19.0785 16.2663 19.1663 16.0543 19.1663 15.8333C19.1663 15.6123 19.0785 15.4004 18.9223 15.2441C18.766 15.0878 18.554 15 18.333 15H11.6663C11.4453 15 11.2334 15.0878 11.0771 15.2441C10.9208 15.4004 10.833 15.6123 10.833 15.8333C10.833 16.0543 10.9208 16.2663 11.0771 16.4226C11.2334 16.5789 11.4453 16.6667 11.6663 16.6667Z"
        fill="#696C81"
      />
    </g>
    <defs>
      <clipPath id="clip0_244_185528">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const ColumnActions = () => (
  <svg
    width="4"
    height="16"
    viewBox="0 0 4 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 4C3.10449 4 4 3.10456 4 2C4 0.895437 3.10449 0 2 0C0.895508 0 0 0.895437 0 2C0 3.10456 0.895508 4 2 4Z"
      fill="#696C81"
    />
    <path
      d="M4 7.98438C4 9.08894 3.10449 9.98438 2 9.98438C0.895508 9.98438 0 9.08894 0 7.98438C0 6.87981 0.895508 5.98438 2 5.98438C3.10449 5.98438 4 6.87981 4 7.98438Z"
      fill="#696C81"
    />
    <path
      d="M4 14C4 15.1046 3.10449 16 2 16C0.895508 16 0 15.1046 0 14C0 12.8954 0.895508 12 2 12C3.10449 12 4 12.8954 4 14Z"
      fill="#696C81"
    />
  </svg>
);

const DataGridStyled = styled.table`
  border-collapse: collapse;
  border-spacing: 0.25em;
  table-layout: fixed;
  text-align: center;
  th {
    text-align: inherit;
    font-size: inherit;
    font-weight: inherit;
  }
  td,
  th {
    outline: none;
    border: none;
    position: relative;
  }
  thead {
    position: sticky;
    z-index: 1;
    tr {
      backdrop-filter: blur(10px);
    }
    th {
      height: 5.5em;
    }
  }
  tbody {
    tr {
      height: 4em;
      position: relative;

      td {
        position: relative;
        height: 100%;
      }
    }
  }
`;

interface Row {
  [key: string]: any;
}

interface RowSelectAction {
  type: "edit" | "delete" | "view";
  row: Row;
}

interface TextFilter {
  type: "text";
  reducerType: string;
}

interface Option {
  value: any;
  label: string | number;
}

interface SelectFilter {
  type: "select";
  options: Option[];
  reducerType: string;
}

interface Column {
  header: string | React.ReactNode;
  field?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: string;
  label: string;
  show?: boolean;
  filter?: TextFilter | SelectFilter;
  valueGetter?: (params: Row) => React.ReactNode | string;
}

interface DataGridProps {
  height?: string;
  width?: string;
  rowGap?: string;
  color?: string;
  rows: Row[];
  columns: Column[];
  className?: string;
  style?: React.CSSProperties;
  rowClassName?: string;
  rowStyle?: React.CSSProperties;
  headerClassName?: string;
  headerStyle?: React.CSSProperties;
  bodyClassName?: string;
  bodyStyle?: React.CSSProperties;
  noData?: string | React.ReactNode;
  noDataMessage?: string;
  onCreateNew?: () => void;
  onRowSelect?: (params: RowSelectAction) => void;
  state?: "loading" | "error" | "success";
  filtersReducer?: React.Dispatch<{
    type: any;
    payload: any;
  }>;
}

const DataGrid = ({ columns, rows, ...props }: DataGridProps) => {
  const [selectedColumns, setSelectedColumns] = React.useState(columns);

  const rowGap = props.rowGap || "1em";
  const height = props.height || "100%";
  const width = props.width || "100%";
  const style = props.style || {};
  const state = props.state || "success";

  React.useEffect(() => {
    setSelectedColumns(columns);
  }, [columns]);

  return (
    <div
      className="wrap  flex flex-col"
      style={{
        height,
        width,
        ...style,
      }}
    >
      {state === "success" ? (
        <DataGridStyled
          style={{
            gap: rowGap,

            width: width,
            minWidth: `${selectedColumns.length * 10}em`,
            gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
            ...style,
          }}
          className={` ${props.className}`}
        >
          <thead
            className={`${props.headerClassName}`}
            style={props.headerStyle}
          >
            <tr className={props.headerClassName}>
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
                    <div className="flex flex-col  h-full justify-evenly">
                      <div>{column.header}</div>
                      {column.filter && column.filter.type === "text" && (
                        <div className="px-4">
                          <Input
                            style={{
                              height: "38px",
                            }}
                            className="input"
                            placeholder="Search..."
                            onChange={(e) => {
                              if (props.filtersReducer && column.filter) {
                                props.filtersReducer({
                                  type: column.filter.reducerType,
                                  payload: e.target.value,
                                });
                              }
                            }}
                          />
                        </div>
                      )}
                      {column.filter && column.filter.type === "select" && (
                        <div className="px-4">
                          <Select
                            style={{
                              height: "38px",
                            }}
                            className="input"
                            onChange={(e) => {
                              if (props.filtersReducer && column.filter) {
                                props.filtersReducer({
                                  type: column.filter.reducerType,
                                  payload: e.target.value,
                                });
                              }
                            }}
                          >
                            <option value="">All</option>
                            {column.filter.options.map((option, index) => (
                              <option key={index} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Select>
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              <th className="w-3">
                <div className="h-full flex align-end mb-7  justify-center">
                  <Popover>
                    <ColumnsSelect />
                    <div className="relative ">
                      <Card
                        className="absolute t-0 r-0 z-3 w-15 p-4"
                        style={{
                          transform: "translateY(-1.5rem)",
                        }}
                      >
                        <div className="flex  w-full h-2 align-center gap-4">
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
                              const newColumns = selectedColumns.map(
                                (column) => {
                                  return {
                                    ...column,
                                    show: true,
                                  };
                                }
                              );
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
                            className="flex  w-full h-2 align-center gap-4"
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
                      </Card>
                    </div>
                  </Popover>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className={`${props.bodyClassName}`} style={props.bodyStyle}>
            {rows.map((row, index) => (
              <tr
                key={index}
                className={`${props.rowClassName}`}
                style={props.rowStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  if (props.onRowSelect)
                    props.onRowSelect({
                      type: "view",
                      row,
                    });
                }}
              >
                {selectedColumns
                  .filter((column) => column.show !== false)
                  .map((column, index) => {
                    const value = column.valueGetter ? (
                      column.valueGetter(row)
                    ) : (
                      <span>{row[column.field || ""] || "- - -"}</span>
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
                <td>
                  <Button variant="none">
                    <Delete
                      onClick={(e) => {
                        e.stopPropagation();
                        if (props.onRowSelect)
                          props.onRowSelect({
                            type: "delete",
                            row,
                          });
                      }}
                      className=" p-2 h-2 pointer"
                    >
                      <DeleteIcon />
                    </Delete>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </DataGridStyled>
      ) : state === "loading" ? (
        <LoadingTable />
      ) : (
        <></>
      )}
      {rows.length === 0 && (
        <div className="flex flex-col gap-6 justify-center align-center  h-full w-full">
          <span>{props.noData || "No data"}</span>
        </div>
      )}
    </div>
  );
};

export { type Column, type Row };

export default DataGrid;
