import { useEffect, useReducer, useState } from "react";
import DataGrid, { Column } from "../../../../components/data-grid";
import Pagination from "../../../../components/pagination";
import { Device, License, Params } from "../../../../utils";
import { format } from "date-fns";
import Button from "../../../../components/button";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Modal from "../../../../components/modal";
import { MdOutlineClose, MdWatchLater, MdCancel } from "react-icons/md";
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

function LicenseTab() {
  const { t } = useTranslation();
  const [params, setParams] = useReducer(paramsReducer, defaultParams);
  const [total, setTotal] = useState(100);
  const [rows, setRows] = useState<License[]>([]);
  const [backUpRows, setBackUpRows] = useState<License[]>([]);
  const { theme, user, tenantId, licenseApi } = useProvider<AppContext>();
  const getLicense = async () => {
    const res = await licenseApi.getLicense({
      tenantId: tenantId,
    });
    return res;
  };

  const [createLicese, setCreateLicese] = useState<{
    name: string;
    description: string;
    numberOfUsers: number;
    numberOfDataCenters: number;
    startDate: string;
    expiredAt: string;
    tenantId?: number;
    parentId?: number;
  }>({
    name: "",
    description: "",
    tenantId: tenantId || undefined,
    parentId:
      user?.tenants?.filter(
        (tenant) => tenant.id === tenantId && tenant.parentId
      )[0]?.parentId || undefined,
    numberOfUsers: 100,
    numberOfDataCenters: 100,
    startDate: new Date().toISOString(),
    expiredAt: new Date().toISOString(),
  });

  const columns: Column[] = [
    {
      label: t("name"),
      header: t("name"),
      field: "name",
      filter: {
        type: "text",
        onChange: (e) => {
          if (e != "")
            setRows(
              backUpRows.filter(
                (row: any) => row?.name?.includes(e) || undefined
              )
            );
          else setRows(backUpRows);
        },
      },
    },
    {
      label: t("serial"),
      header: t("serial"),
      valueGetter: (row) => row.serialNumber || "----",
      filter: {
        type: "text",
        onChange: (e) => {
          if (e != "")
            setRows(
              backUpRows.filter(
                (row: any) => row?.serialNumber?.includes(e) || undefined
              )
            );
          else setRows(backUpRows);
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
            setRows(
              backUpRows.filter(
                (row: any) =>
                  new Date(row.createdAt) >= addHours(new Date(), -1)
              )
            );
          } else if (e === "last4hours") {
            setRows(
              backUpRows.filter(
                (row: any) =>
                  new Date(row.createdAt) >= addHours(new Date(), -4)
              )
            );
          } else if (e === "last12hours") {
            setRows(
              backUpRows.filter(
                (row: any) =>
                  new Date(row.createdAt) >= addHours(new Date(), -12)
              )
            );
          } else if (e === "lastday") {
            setRows(
              backUpRows.filter(
                (row: any) => new Date(row.createdAt) >= addDays(new Date(), -1)
              )
            );
          } else setRows(backUpRows);
        },
      },
    },
    {
      label: "expired",
      header: "expired",

      valueGetter: (row) => format(new Date(row.expiredAt), "dd/MM/yyyy HH:mm"),
      filter: {
        type: "select",
        options: [
          {
            value: "lasthour",
            label: "last hour",
          },
          {
            value: "last4hours",
            label: "last 4 hours",
          },
          {
            value: "last12hours",
            label: "last 12 hours",
          },
          {
            value: "lastday",
            label: "last day",
          },
        ],
        onChange: (e: string) => {
          if (e === "lasthour") {
            setRows(
              backUpRows.filter(
                (row: any) =>
                  new Date(row.expiredAt) >= addHours(new Date(), -1)
              )
            );
          } else if (e === "last4hours") {
            setRows(
              backUpRows.filter(
                (row: any) =>
                  new Date(row.expiredAt) >= addHours(new Date(), -4)
              )
            );
          } else if (e === "last12hours") {
            setRows(
              backUpRows.filter(
                (row: any) =>
                  new Date(row.expiredAt) >= addHours(new Date(), -12)
              )
            );
          } else if (e === "lastday") {
            setRows(
              backUpRows.filter(
                (row: any) => new Date(row.expiredAt) >= addDays(new Date(), -1)
              )
            );
          } else setRows(backUpRows);
        },
      },
    },
    {
      label: "Total users",
      header: "Total users",
      field: "numberOfUsers",
      filter: {
        type: "text",
        onChange: (e) => {
          if (e != "")
            setRows(
              backUpRows.filter(
                (row: any) =>
                  row?.numberOfUsers?.toString().includes(e) || undefined
              )
            );
          else setRows(backUpRows);
        },
      },
    },
    {
      label: "Total centers",
      header: "Total data centers",
      field: "numberOfDataCenters",
      filter: {
        type: "text",
        onChange: (e) => {
          if (e != "")
            setRows(
              backUpRows.filter(
                (row: any) =>
                  row?.numberOfDataCenters?.toString().includes(e) || undefined
              )
            );
          else setRows(backUpRows);
        },
      },
    },
    {
      label: "users connected",
      header: "users connected",
      valueGetter: (row) => row.users.length,
      filter: {
        type: "text",
        onChange: (e) => {
          if (e != "")
            setRows(
              backUpRows.filter(
                (row: any) =>
                  row?.users?.length?.toString().includes(e) || undefined
              )
            );
          else setRows(backUpRows);
        },
      },
    },
    {
      label: "centers connected",
      header: "data centers connected",
      valueGetter: (row) => row.dataCenters.length,
      filter: {
        type: "text",
        onChange: (e) => {
          if (e != "")
            setRows(
              backUpRows.filter(
                (row: any) =>
                  row?.dataCenters?.length?.toString().includes(e) || undefined
              )
            );
          else setRows(backUpRows);
        },
      },
    },
  ];
  const [state, setState] = useState<"idle" | "loading" | "error">("loading");
  const [open, setOpen] = useState(false);
  const [DevicesData, setDevicesData] = useState<Device[]>([]);
  const [checkUpdate, setCheckUpdate] = useState(false);

  useEffect(() => {
    setCreateLicese((prev) => ({
      ...prev,
      tenantId: tenantId,
      parentId:
        user?.tenants?.filter(
          (tenant) => tenant.id === tenantId && tenant.parentId
        )[0]?.parentId || undefined,
    }));
    getLicense()
      .then((res: any) => {
        setState("loading");
        setRows(res?.results);
        setTotal(res?.totalResult || 0);
        setBackUpRows(res?.results);
        setState("idle");
      })
      .catch((err) => {
        setState("error");
      })
      .finally(() => {
        setState("idle");
      });
  }, [tenantId]);
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
          <span>{t("create")}</span>
          <AiOutlinePlusCircle className="text-lg" />
        </Button>
      </div>
      <DataGrid
        className=" table-fixed w-full text-left "
        headClassName="h-[5.5rem] bg-dark/5 dark:bg-light/5 text-[#697681] [&>*]:px-2 "
        rowClassName="h-[4rem] [&>*]:px-2 even:bg-dark/5 dark:even:bg-light/5 hover:bg-dark/10 dark:hover:bg-light/10 shadow shadow-[#7f7f7f]/20"
        columns={columns}
        rows={rows.slice(
          (params.pagination.page - 1) * params.pagination.perPage,
          params.pagination.page * params.pagination.perPage
        )}
        action={(row: any) => <div></div>}
      ></DataGrid>
      <Modal
        open={open}
        handleClose={() => setOpen(false)}
        className="bg-white w-11/12 max-w-[40rem] rounded [&>*]:border-b [&>*]:border-black/20 max-h-full overflow-auto"
      >
        <div className="flex items-center py-2 md:py-4  justify-between px-4">
          <span className="font-semibold capitalize">
            {t("create new license")}
          </span>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full hover:bg-dark/10 active:shadow-inner w-8 h-8 flex-center"
          >
            <MdOutlineClose className="text-2xl text-gray-500" />
          </button>
        </div>
        <form className="flex flex-col gap-2 sm:gap-4 md:gap-6 py-2  md:py-4 [&>div]:flex [&>div]:flex-col [&>div]:gap-2 px-2 md:px-4">
          <div>
            <label className="w-fit capitalize" htmlFor="License-name">
              {t("name")}
            </label>
            <input
              placeholder={t("name") || "name"}
              id="License-name"
              className="h-11"
              onChange={(e) => {
                setCreateLicese({ ...createLicese, name: e.target.value });
              }}
            />
          </div>

          <div>
            <label className="w-fit capitalize" htmlFor="description">
              {t("description")}
            </label>
            <input
              placeholder={t("description") || "description"}
              id="description"
              className="h-11"
              onChange={(e) => {
                setCreateLicese({
                  ...createLicese,
                  description: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <label className="w-fit" htmlFor="startDate">
              {t("start date")}
            </label>
            <input
              placeholder={t("start date") || "startDate"}
              type="date"
              id="startDate"
              className="h-11 w-full"
              onChange={(e) => {
                setCreateLicese({
                  ...createLicese,
                  startDate: new Date(e.target.value).toISOString(),
                });
              }}
            />
          </div>
          <div>
            <label className="w-fit" htmlFor="expiredAt">
              {t("expiration date")}
            </label>
            <input
              placeholder={t("expiration date") || "expiration date"}
              type="date"
              id="expiredAt"
              className="h-11 w-full"
              onChange={(e) => {
                setCreateLicese({
                  ...createLicese,
                  expiredAt: new Date(e.target.value).toISOString(),
                });
              }}
            />
          </div>
          <div>
            <label className="w-fit" htmlFor="numberOfUsers">
              {t("number of users")}
            </label>
            <input
              placeholder={t("number of users") || "numberOfUsers"}
              type="number"
              min={0}
              id="numberOfUsers"
              className="h-11"
              onChange={(e) => {
                setCreateLicese({
                  ...createLicese,
                  numberOfUsers: +e.target.value,
                });
              }}
            />
          </div>
          <div>
            <label className="w-fit" htmlFor="numberOfDataCenters">
              {t("number of data centers")}
            </label>
            <input
              placeholder={t("number of data centers") || "numberOfDataCenters"}
              type="number"
              min={0}
              id="numberOfUsers"
              className="h-11"
              onChange={(e) => {
                setCreateLicese({
                  ...createLicese,
                  numberOfDataCenters: +e.target.value,
                });
              }}
            />
          </div>
        </form>
        <div className="flex justify-between items-center py-2 md:py-4 px-4">
          <Button
            className="flex items-center gap-2 py-2 md:py-3 px-2 md:px-4"
            variant="outlined"
            onClick={() => setOpen(false)}
          >
            <span>{t("cancel")}</span>
            <MdCancel className="text-2xl" />
          </Button>
          <Button
            className="flex items-center gap-2 py-2 md:py-3 px-2 md:px-4"
            onClick={() => {
              licenseApi
                .addLicense(createLicese)
                .then((res: any) => {
                  setRows((prev) => [...prev, res]);
                  setOpen(false);
                  setCreateLicese({
                    name: "",
                    description: "",
                    startDate: "",
                    expiredAt: "",
                    numberOfUsers: 0,
                    numberOfDataCenters: 0,
                  });
                  toast.success("License created successfully");
                })
                .catch((err) => {
                  console.log(err);
                  toast.error(
                    err?.response?.data?.error || "Something went wrong"
                  );
                });
            }}
          >
            <span>{t("create")}</span>
            <MdWatchLater className="text-2xl" />
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default LicenseTab;
