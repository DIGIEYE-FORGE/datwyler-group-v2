import { useProvider } from "../../components/provider";
import { AppContext } from "../../App";
import { useEffect, useState } from "react";
import DataGrid, { Column } from "../../components/data-grid";

const columns: Column[] = [
  {
    header: "ID",
    label: "ID",
    field: "id",
  },
  {
    header: "First Name",
    label: "First Name",
    field: "firsName",
  },
  {
    header: "Last Name",
    label: "Last Name",
    field: "lastName",
  },
  {
    header: "age",
    label: "Age",
    field: "age",
  },
];

function DevPage() {
  const { backendApi } = useProvider<AppContext>();
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    backendApi
      .getDashboardData()
      .then((data) => {
        setData(data);
        console.clear();
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="h-screen w-screen dark:bg-primary-dark dark:text-light flex flex-col p-8 gap-6 items-center">
      <h1 className=" w-[40rem]">
        <DataGrid
          className="w-full table-fixed "
          headClassName="bg-primary text-light"
          columns={columns}
          rows={[]}
        />
      </h1>
    </div>
  );
}
export default DevPage;
