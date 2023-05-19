import { useEffect, useState } from "react";
import DataGrid, { Column } from "../../../../components/data-grid";
import Pagination from "../../../../components/pagination";
import { Device, Params, classNames } from "../../../../utils";
import Button from "../../../../components/button";
import { BiExport } from "react-icons/bi";
import { useProvider } from "../../../../components/provider";
import { AppContext } from "../../../../App";

function DevicesTab() {
  const { tenantId, refreshToken, backendApi } = useProvider<AppContext>();
  const [total, setTotal] = useState(100);
  const [params, setParams] = useState<Params>({
    pagination: {
      page: 1,
      perPage: 6,
    },
    include: {
      group: true,
      _count: true,
      deviceProfile: true,
    },
  });

  const [rows, setRows] = useState<Device[]>([]);

  useEffect(() => {
    try {
      backendApi.getDevices(params).then((res) => {
        setRows(res.results);
        setTotal(res.totalResult);
      });
    } catch (err) {
      console.log(err);
    }
  }, [tenantId, params]);

  const columns: Column[] = [
    {
      label: "location",
      header: "Location",
      valueGetter: (row) => row.group?.name,
      filter: {
        type: "select",
        options: [
          {
            label: "Site1",
            value: "site1",
          },
          {
            label: "Site2",
            value: "site2",
          },
        ],
        onChange: () => {},
      },
    },
    {
      label: "system",
      header: "System",
      valueGetter: (row) => row.deviceProfile.name,
      filter: {
        type: "select",
        options: [
          {
            label: "UPS",
            value: "ups",
          },
          {
            label: "Temperature",
            value: "temperature",
          },
          {
            label: "Humidity",
            value: "humidity",
          },
          {
            label: "Water cooler",
            value: "water cooler",
          },
        ],
        onChange: () => {},
      },
    },
    {
      label: "Serial",
      header: "Serial",
      field: "serial",
      filter: {
        type: "text",
        onChange: () => {},
      },
    },

    {
      label: "alertsCount",
      header: "alerts Count",
      valueGetter: (row) => (
        <span
          className={classNames("text-lg text-primary", {
            "!text-accent": row._count?.alerts > 0,
          })}
        >
          {row._count?.alerts}
        </span>
      ),
      filter: {
        type: "text",
        onChange: () => {},
      },
    },
  ];
  return (
    <div className="flex flex-col  w-full gap-6 p-6">
      <div className="flex gap-4 items-center flex-wrap justify-end">
        <select className="min-w-[10rem] mr-auto">
          <option value="">site1</option>
          <option value="">site2</option>
        </select>
        <Pagination
          value={params.pagination}
          onChange={(v) => setParams({ ...params, pagination: v })}
          total={total}
        />
        <Button className="flex items-center gap-2">
          export
          <BiExport className="text-lg" />
        </Button>
      </div>
      <DataGrid
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
