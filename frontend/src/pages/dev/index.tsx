import { useProvider } from "../../components/provider";
import { AppContext } from "../../App";
import Modal from "../../components/modal";
import { useEffect, useState } from "react";
import Button from "../../components/button";

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
      <h1 className="text-6xl">data</h1>
    </div>
  );
}
export default DevPage;
