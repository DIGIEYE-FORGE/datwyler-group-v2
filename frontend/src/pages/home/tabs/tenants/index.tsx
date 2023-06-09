import { useCallback, useEffect, useState } from "react";
import Pagination from "../../../../components/pagination";
import Button from "../../../../components/button";
import { BsHouseAdd } from "react-icons/bs";
import { useProvider } from "../../../../components/provider";
import { AppContext } from "../../../../App";
import DataGrid, { Column } from "../../../../components/data-grid";
import { Tenant } from "../../../../utils";
import { format } from "date-fns";
import Popover from "../../../../components/popover";
import { MdDelete, MdEdit, MdMoreVert } from "react-icons/md";
import { IconButton } from "../dashboard";
import Modal from "../../../../components/modal";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function TenantsTab() {
  const { t } = useTranslation();
  const { tenantId, multiTenancyApi, confirm } = useProvider<AppContext>();
  const [data, setData] = useState<any[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "error">("loading");
  const [tenant, setTenant] = useState<Tenant | null>(null);

  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
  });

  const getTenants = useCallback(async () => {
    try {
      setState("loading");
      const data = await multiTenancyApi.getTenants({
        tenantId,
      });
      setData(data);
      setState("idle");
    } catch (err) {
      console.error(err);
      setState("error");
    }
  }, [tenantId]);

  const handleDelete = useCallback((id: number) => {
    confirm({
      title: t("delete"),
      description: t("Are you sure you want to delete this tenant?"),
      onConfirm: async () => {
        try {
          if (!tenantId) return;
          await multiTenancyApi.deleteTenant({
            id,
          });
          toast.success(t("operation successful"));
          getTenants();
        } catch (err) {
          console.error(err);
          toast.error(t("operation failed"));
        }
      },
    });
  }, []);

  const handleSave = useCallback(async () => {
    try {
      if (!tenant || !tenantId) return;
      const res = await multiTenancyApi.addEditTenant({
        id: tenant?.id,
        name: tenant?.name,
        parentId: tenantId,
      });
      toast.success(t("operation successful"));
      setTenant(null);
      getTenants();
      console.log(res);
    } catch (err) {
      console.error(err);
      toast.error(t("operation failed"));
    }
  }, [tenantId, tenant]);

  useEffect(() => {
    getTenants();
  }, [tenantId]);

  const columns: Column[] = [
    {
      label: t("name"),
      header: t("name"),
      field: "name",
    },
    {
      label: t("number of subtenants"),
      header: t("number of subtenants"),
      valueGetter: (row: Tenant) => row._count?.children || 0,
    },
    {
      label: t("number of users"),
      header: t("number of users"),
      valueGetter: (row: Tenant) => row._count?.users || 0,
    },
    {
      label: t("creation date"),
      header: t("creation date"),
      valueGetter: (row: Tenant) =>
        format(new Date(row?.createdAt!), "dd/MM/yyyy HH:mm"),
    },
  ];

  return (
    <div className="flex flex-col  gap-6 p-6 ">
      <div className="flex gap-4 items-center flex-wrap w-fit ml-auto">
        <Pagination
          value={pagination}
          onChange={setPagination}
          total={data?.length || 0}
        />
        <Button
          className="flex items-center gap-2 capitalize"
          onClick={() =>
            setTenant({
              name: "",
            })
          }
        >
          {t("add")}
          <BsHouseAdd className="text-lg" />
        </Button>
      </div>
      <DataGrid
        loading={state === "loading"}
        error={state === "error"}
        className="table-fixed  w-full text-left "
        headClassName="h-[5.5rem] bg-dark/5 dark:bg-light/5 text-[#697681] [&>*]:px-2 "
        rowClassName="h-[4rem] [&>*]:px-2 even:bg-dark/5 dark:even:bg-light/5 hover:bg-dark/10 dark:hover:bg-light/10 shadow shadow-[#7f7f7f]/20"
        columns={columns}
        rows={data}
        action={(row: Tenant) => (
          <Popover>
            <IconButton>
              <MdMoreVert className="text-xl" />
            </IconButton>
            <div className="card  aspect-square -translate-x-1/2 px-2 pt-4  flex flex-col  ">
              <button
                className="flex w-[7rem] items-center justify-between  p-2 hover:text-info hover:"
                onClick={() => setTenant(row)}
              >
                <span>{t("edit")}</span>
                <MdEdit className="text-xl" />
              </button>
              <button
                onClick={() => handleDelete(row.id as number)}
                className="flex w-[7rem] items-center justify-between p-2 hover:text-danger"
              >
                <span> {t("delete")}</span>
                <MdDelete className="text-xl" />
              </button>
            </div>
          </Popover>
        )}
      ></DataGrid>
      <Modal
        open={!!tenant}
        handleClose={() => setTenant(null)}
        className="w-11/12  max-w-[30rem] flex flex-col gap-4"
      >
        <div className="text-center py-4 border-b text-xl capitalize">
          {tenant?.id ? t("edit") : t("add")}
        </div>
        <div className="flex gap-4 items-center px-4">
          <label htmlFor="name" className="capitalize">
            {t("name")} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder={t("name") || "name"}
            className="flex-1"
            value={tenant?.name}
            onChange={(e) => setTenant({ ...tenant, name: e.target.value })}
          />
        </div>
        <div className="flex p-4 justify-between">
          <Button variant="outlined" onClick={() => setTenant(null)}>
            {t("cancel")}
          </Button>
          <Button onClick={handleSave}>{t("save")}</Button>
        </div>
      </Modal>
    </div>
  );
}

export default TenantsTab;
