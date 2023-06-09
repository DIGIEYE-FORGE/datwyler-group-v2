import { useEffect, useReducer, useState } from "react";
import DataGrid, { Column } from "../../../../components/data-grid";
import Pagination from "../../../../components/pagination";
import { Device, Group, Params, Report, ReportDevice } from "../../../../utils";
import { ReactComponent as CsvIcon } from "../../../../assets/icons/csv.svg";
import { ReactComponent as PdfIcon } from "../../../../assets/icons/pdf.svg";
import Tooltip from "../../../../components/tooltip";
import { format, set } from "date-fns";
import Button from "../../../../components/button";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Modal from "../../../../components/modal";
import { MdOutlineClose, MdWatchLater, MdCancel } from "react-icons/md";
import Select from "react-select";
import { useProvider } from "../../../../components/provider";
import { AppContext } from "../../../../App";
import { addHours, addDays } from "date-fns";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const defaultParams: Params = {
  pagination: {
    page: 1,
    perPage: 10,
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
    case "where":
      return {
        ...state,
        where: {
          ...state.where,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

function ReportsTab() {
  const { t } = useTranslation();
  const [params, setParams] = useReducer(paramsReducer, defaultParams);
  const [total, setTotal] = useState(100);
  const [rows, setRows] = useState<Report[]>([]);
  const { theme, backendApi, tenantId } = useProvider<AppContext>();
  const action = (row: any) => {
    if (row.format === "pdf")
      return (
        <div className="w-full h-full flex-center z-10">
          <button
            className="w-[2.5rem] aspect-square rounded-full flex-center  hover:bg-dark/5 active:bg-dark/10 transition-colors"
            onClick={() => {
              backendApi
                .downloadFile({
                  name: row.url,
                  type: row.type,
                })
                .then((res) => {})
                .catch((err) => {
                  toast.error(err.message);
                });
            }}
          >
            <PdfIcon />
          </button>
        </div>
      );
    return (
      <div className="w-full h-full flex-center">
        <Tooltip>
          <button
            onClick={() => {
              backendApi
                .downloadFile({
                  name: row.url,
                  type: row.type,
                })
                .then((res) => {})
                .catch((err) => {
                  toast.error(err.message);
                });
            }}
            className="w-[2.5rem] aspect-square rounded-full flex-center  hover:bg-dark/5 active:bg-dark/10 transition-colors"
          >
            <CsvIcon />
          </button>
          <div className="bg-dark/50 text-light rounded-full px-2 py-1 whitespace-nowrap mr-[4rem]">
            export as csv
          </div>
        </Tooltip>
      </div>
    );
  };
  const getGroups = async () => {
    const res = await backendApi.getGroups({
      pagination: {
        page: 1,
        perPage: 10,
      },
      where: {
        tenantId: tenantId,
      },
    });
    return res;
  };

  const getReports = async (params: Params) => {
    const res = await backendApi.getReports(params);
    return res;
  };

  const [createReport, setCreateReport] = useState<ReportDevice>({
    name: "",
    date: new Date(),
    format: "pdf",
    type: "alert",
    groups: [],
    devices: [],
  });

  const columns: Column[] = [
    {
      label: t("name"),
      header: t("name"),
      field: "name",
      filter: {
        type: "text",
        onChange: (e) => {
          setParams({
            type: "where",
            payload: {
              name: {
                contains: e,
                mode: "insensitive",
              },
            },
          });
        },
      },
    },
    {
      label: t("date"),
      header: t("date"),
      valueGetter: (row) => format(new Date(row.createdAt), "dd/MM/yyyy HH:mm"),
      filter: {
        type: "select",
        options: [
          {
            value: "lasthour",
            label: t("last hour") || "last hour",
          },
          {
            value: "last4hours",
            label: t("last 4 hours") || "last 4 hours",
          },
          {
            value: "last12hours",
            label: t("last 12 hours") || "last 12 hours",
          },
          {
            value: "lastday",
            label: t("last day") || "last day",
          },
        ],
        onChange: (e: string) => {
          if (e === "lasthour") {
            setParams({
              type: "where",
              payload: {
                createdAt: {
                  gte: addHours(new Date(), -1).toISOString(),
                },
              },
            });
          } else if (e === "last4hours") {
            setParams({
              type: "where",
              payload: {
                createdAt: {
                  gte: addHours(new Date(), -4).toISOString(),
                },
              },
            });
          } else if (e === "last12hours") {
            setParams({
              type: "where",
              payload: {
                createdAt: {
                  gte: addHours(new Date(), -12).toISOString(),
                },
              },
            });
          } else if (e === "lastday") {
            setParams({
              type: "where",
              payload: {
                createdAt: {
                  gte: addHours(new Date(), -24 * 1).toISOString(),
                },
              },
            });
          }
        },
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
        onChange: (e) => {
          setParams({
            type: "where",
            payload: {
              type: {
                equals: e,
              },
            },
          });
        },
      },
    },
  ];

  const [open, setOpen] = useState(false);
  const [GroupsData, setGroupsData] = useState<Group[]>([]);
  const [DevicesData, setDevicesData] = useState<Device[]>([]);
  const [checkUpdate, setCheckUpdate] = useState(false);
  useEffect(() => {
    getGroups().then((res) => {
      setGroupsData(res.results);
    });
  }, []);

  useEffect(() => {
    getReports({
      pagination: params.pagination,
      where: {
        ...params.where,
        tenantId: {
          eq: tenantId,
        },
      },
    }).then((res) => {
      console.log(res);
      setRows(res?.results || []);
      setTotal(res?.totalResult || 0);
    });
  }, [params, tenantId, checkUpdate]);

  useEffect(() => {
    if (createReport.groups && createReport.groups.length > 0) {
      const getDevices = async () => {
        const res = await backendApi.getDevices({
          pagination: {
            page: 1,
            perPage: 100,
          },
          where: {
            groupId: {
              in: createReport.groups,
            },
          },
        });
        return res;
      };
      getDevices()
        .then((res) => {
          console.log(res);
          setDevicesData(res.results);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  }, [createReport.groups]);
  return (
    <div className="flex flex-col  gap-6 p-6 ">
      <div className="flex gap-4 items-center flex-wrap w-fit ml-auto">
        <Pagination
          value={params.pagination}
          onChange={(v) => setParams({ type: "pagination", payload: v })}
          total={total}
        />
        <Button
          className="flex items-center gap-2"
          onClick={() => setOpen(true)}
        >
          {t("generate")}
          <AiOutlinePlusCircle className="text-lg" />
        </Button>
      </div>
      <DataGrid
        className=" table-fixed w-full text-left"
        headClassName="h-[5.5rem] bg-dark/5 dark:bg-light/5 text-[#697681] [&>*]:px-2 "
        rowClassName="h-[4rem] [&>*]:px-2 even:bg-dark/5 dark:even:bg-light/5 hover:bg-dark/10 dark:hover:bg-light/10 shadow shadow-[#7f7f7f]/20"
        columns={columns}
        rows={rows}
        action={action}
      ></DataGrid>
      <Modal
        open={open}
        handleClose={() => setOpen(false)}
        className="bg-white w-11/12 max-w-[40rem] rounded [&>*]:border-b [&>*]:border-black/20 max-h-full overflow-auto"
      >
        <div className="flex items-center sm:py-2 md:py-4  justify-between px-4">
          <span className="font-semibold first-letter:uppercase">
            {t("create a report")}
          </span>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full hover:bg-dark/10 active:shadow-inner w-8 h-8 flex-center"
          >
            <MdOutlineClose className="text-2xl text-gray-500" />
          </button>
        </div>
        <form className="flex flex-col gap-3 md:gap-6 py-4 [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div]:px-4">
          <div>
            <label className="w-fit" htmlFor="rapport-name">
              {t("name") || "name"}
            </label>
            <input
              placeholder={t("name") || "name"}
              id="rapport-name"
              className="h-11"
              onChange={(e) => {
                setCreateReport({ ...createReport, name: e.target.value });
              }}
            />
          </div>
          <div>
            <label className="w-fit" htmlFor="rapport-name">
              {t("site") || "site"}
            </label>
            <span className="text-dark">
              <Select
                onChange={(v: any) => {
                  setCreateReport({
                    ...createReport,
                    groups: v.map((item: Group) => item.id),
                  });
                }}
                classNames={{
                  option: (state) =>
                    state.isFocused ? "!bg-primary/10" : "bg-light/5",
                  control: (state) =>
                    state.isFocused
                      ? "!border-2 !border-primary !shadow-none "
                      : "border border-black/20",
                }}
                getOptionLabel={(GroupsData: Group) => GroupsData.name}
                getOptionValue={(GroupsData: Group) => GroupsData.name}
                options={GroupsData}
                isClearable
                isMulti
                backspaceRemovesValue
              />
            </span>
          </div>
          <div>
            <label className="w-fit capitalize" htmlFor="select-devices">
              {t("devices") || "devices"}
              <span className="text-sm text-slate-500">
                {}
                {` (${t(
                  "if no device is selected, all devices will be included in the report"
                )})`}
              </span>
            </label>
            <Select
              onChange={(v: any) =>
                setCreateReport({
                  ...createReport,
                  devices: v.map((item: Device) => item.id),
                })
              }
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
              getOptionValue={(DevicesData: Device) => DevicesData.name}
              options={DevicesData}
              isClearable
              isMulti
              backspaceRemovesValue
            />
          </div>
          <div>
            <label
              className="w-fit first-letter:uppercase"
              htmlFor="date-range"
            >
              {t("date range") || "date range"}
            </label>
            <Select
              onChange={(v: any) => {
                if (v.value === "last hour") {
                  setCreateReport({
                    ...createReport,
                    date: new Date(addHours(new Date(), -1)),
                  });
                }
                if (v.value === "last 4 hours") {
                  setCreateReport({
                    ...createReport,
                    date: new Date(addHours(new Date(), -4)),
                  });
                }
                if (v.value === "last 12 hours") {
                  setCreateReport({
                    ...createReport,
                    date: new Date(addHours(new Date(), -12)),
                  });
                }
                if (v.value === "last day") {
                  setCreateReport({
                    ...createReport,
                    date: new Date(addDays(new Date(), -24 * 1)),
                  });
                }
                if (v.value === "last 2 days") {
                  setCreateReport({
                    ...createReport,
                    date: new Date(addDays(new Date(), -24 * 2)),
                  });
                }
                if (v.value === "last week") {
                  setCreateReport({
                    ...createReport,
                    date: new Date(addDays(new Date(), -7 * 24)),
                  });
                }
              }}
              defaultValue={{
                value: "last hour",
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
            <label className="w-fit first-letter:uppercase" htmlFor="type">
              {t("format") || "format"}
            </label>
            <Select
              onChange={(v: any) => {
                if (v.value == "PDF")
                  setCreateReport({ ...createReport, format: "pdf" });
                if (v.value == "CSV") {
                  setCreateReport({ ...createReport, format: "csv" });
                }
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
              defaultValue={{ value: "PDF" }}
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
          <div>
            <label className="w-fit first-letter:uppercase" htmlFor="type">
              {t("type") || "type"}
            </label>
            <Select
              onChange={(v: any) => {
                if (v === "Alert")
                  setCreateReport({ ...createReport, type: "alert" });
                if (v === "Mesurement")
                  setCreateReport({ ...createReport, type: "mesurement" });
              }}
              defaultValue={{ value: "Alert" }}
              classNames={{
                option: (state) =>
                  state.isFocused ? "!bg-primary/10" : "white",
                control: (state) =>
                  state.isFocused
                    ? "!border-2 !border-primary !shadow-none"
                    : "border border-black/20",
              }}
              getOptionLabel={(site: { value: string }) => site.value}
              options={[
                {
                  value: "Alert",
                },
                {
                  value: "Mesurement",
                },
              ]}
              isClearable
              backspaceRemovesValue
            />
          </div>
        </form>
        <div className="flex justify-between items-center  px-4 py-2 md:py-4">
          <Button
            className="flex items-center gap-2 py-2 md:py-3 px-2 md:px-4"
            variant="outlined"
            onClick={() => setOpen(false)}
          >
            <span>{t("cancel") || "cancel"}</span>
            <MdCancel className="text-2xl" />
          </Button>
          <Button
            disabled={
              createReport.name === "" ||
              (createReport.groups && createReport.groups.length === 0)
            }
            className="flex items-center gap-2 py-2 md:py-3 px-2 md:px-4 capitalize"
            onClick={() => {
              backendApi
                .generateFile(createReport)
                .then((res) => {
                  toast.success("Report generated successfully");
                  setCheckUpdate(!checkUpdate);
                  setOpen(false);
                })
                .catch((err) => {
                  toast.error(err);
                });
            }}
          >
            <span>{t("generate")}</span>
            <MdWatchLater className="text-2xl" />
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default ReportsTab;
