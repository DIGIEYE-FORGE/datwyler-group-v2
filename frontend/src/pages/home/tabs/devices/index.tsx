import { useEffect, useState } from "react";
import DataGrid, { Column } from "../../../../components/data-grid";
import Pagination from "../../../../components/pagination";
import { Device, Params, classNames, systems } from "../../../../utils";
import Button from "../../../../components/button";
import { BiExport } from "react-icons/bi";
import { useProvider } from "../../../../components/provider";
import { AppContext } from "../../../../App";

function DevicesTab() {
  const { tenantId, refreshToken, backendApi } = useProvider<AppContext>();
  const [total, setTotal] = useState(0);
  const [params, setParams] = useState<Params>({
    pagination: {
      page: 1,
      perPage: 5,
    },
    include: {
      group: true,
      _count: true,
    },
    where:{}
  });
  const [state, setState] = useState<"idle" | "loading" | "error">("loading");

  const [rows, setRows] = useState<Device[]>([]);

  async function getDevices(params: Params) {
    try {
      setState("loading");
      const res = await backendApi.getDevices(params);
      setRows(res.results);
      setTotal(res.totalResult);

      setState("idle");
    } catch (err) {
      console.log(err);
      setState("error");
    }
  }

  useEffect(() => {
    getDevices(params);
  }, [tenantId, params]);

  const columns: Column[] = [
    {
      label: "location",
      header: "Location",
      valueGetter: (row: Device) => row.group?.location,
      filter: {
        type: "text",
        onChange:(v:any)=>{
          setParams({...params,where:{...params.where,group:{location:{
            contains:v,
            mode:"insensitive"
          }}
          }})
        }
      },
    },
    {
      label: "site",
      header: "Site",
      valueGetter: (row: Device) => row.group?.name,
      filter: {
        type: "text",
        onChange: (v:any) => {
          setParams({...params,where:{...params.where,group:{name:{
            contains:v,
            mode:"insensitive"
          }}
          }})
        },
      },
    },
    {
      label: "system",
      header: "System",
      valueGetter: (row) => row.name,
      filter: {
        type: "select",
        options: systems.map((s) => ({ label: s, value: s })),

        onChange: (v:any) => {
          setParams({...params,where:{...params.where,name:{
            contains:v,
            mode:"insensitive"
          }}})
        },
      },
    },
    {
      label: "Serial",
      header: "Serial",
      field: "serial",
      filter: {
        type: "text",
        onChange: (v:any) => {
          setParams({...params,where:{...params.where,serial:{
            contains:v,
            mode:"insensitive"
          }}})
        },
      },
    },
  ];
  return (
    <div className="flex flex-col  w-full gap-6 p-6 min-w-[40rem]">
      <div className="flex gap-4 items-center flex-wrap justify-end">
        <Pagination
          value={params.pagination}
          onChange={(v) => setParams({ ...params, pagination: v })}
          total={total}
        />
        {/* <Button className="flex items-center gap-2">
          export
          <BiExport className="text-lg" />
        </Button> */}
      </div>
      <DataGrid
        error={state === "error"}
        loading={state === "loading"}
        className="table-fixed  w-full  text-left "
        headClassName="h-[5.5rem] bg-dark/5 dark:bg-light/5 text-[#697681] [&>*]:px-2 "
        rowClassName="h-[4rem] [&>*]:px-2 even:bg-dark/5 dark:even:bg-light/5 hover:bg-dark/10 dark:hover:bg-light/10"
        columns={columns}
        rows={rows.slice(
          (params.pagination.page - 1) * params.pagination.perPage,
          params.pagination.page * params.pagination.perPage
        )}
        noData={
          <div className="min-h-[50vh]   flex justify-center items-center text-4xl">
            No data
          </div>
        }
      ></DataGrid>
    </div>
  );
}

export default DevicesTab;
