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

function TenantsTab() {
  const { tenantId, multiTenancyApi } = useProvider<AppContext>();
  const [data, setData] = useState<any[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "error">("loading");

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

  const handleDelete = useCallback(async (tenantId: number) => {}, []);

  useEffect(() => {
    getTenants();
  }, [tenantId]);

  const columns: Column[] = [
    {
      label: "Name",
      header: "Name",
      field: "name",
    },
    {
      label: "Subtenants",
      header: "Number of subtenants",
      valueGetter: (row: Tenant) => row._count?.children || 0,
    },
    {
      label: "Users",
      header: "Number of users",
      valueGetter: (row: Tenant) => row._count?.users || 0,
    },
    {
      label: "Created at",
      header: "Created at",
      valueGetter: (row: Tenant) =>
        format(new Date(row?.createdAt!), "dd/MM/yyyy HH:mm"),
    },
  ];

  return (
    <div className="flex flex-col  gap-6 p-6 min-w-[40rem]">
      <div className="flex gap-4 items-center flex-wrap justify-end">
        <Pagination
          value={pagination}
          onChange={setPagination}
          total={data?.length || 0}
        />
        <Button className="flex items-center gap-2">
          Add
          <BsHouseAdd className="text-lg" />
        </Button>
      </div>
      <DataGrid
        loading={state === "loading"}
        error={state === "error"}
        className="table-fixed  w-full text-left "
        headClassName="h-[5.5rem] bg-dark/5 dark:bg-light/5 text-[#697681] [&>*]:px-2 "
        rowClassName="h-[4rem] [&>*]:px-2 even:bg-dark/5 dark:even:bg-light/5 hover:bg-dark/10 dark:hover:bg-light/10  "
        columns={columns}
        rows={data}
        action={(row) => (
          <Popover>
            <IconButton>
              <MdMoreVert className="text-xl" />
            </IconButton>
            <div className="card  aspect-square -translate-x-1/2 px-2 pt-4  flex flex-col  ">
              <button className="flex w-[6rem] items-center justify-between  p-2 hover:text-info hover:">
                <span>Edit</span>
                <MdEdit className="text-xl" />
              </button>
              <button
                onClick={() => handleDelete(row.id as number)}
                className="flex w-[6rem] items-center justify-between p-2 hover:text-danger"
              >
                <span>Delete</span>
                <MdDelete className="text-xl" />
              </button>
            </div>
          </Popover>
        )}
      ></DataGrid>
    </div>
  );
}

export default TenantsTab;
