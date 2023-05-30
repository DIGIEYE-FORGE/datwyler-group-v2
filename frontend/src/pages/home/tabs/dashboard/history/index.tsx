import ReactApexChart from "react-apexcharts";
import { Chart } from "..";
import { AppContext } from "../../../../../App";
import { useProvider } from "../../../../../components/provider";
import { useCallback, useEffect, useState } from "react";
import For from "../../../../../components/for";
import { HistoryResponse } from "../../../../../api/backend";
import Show from "../../../../../components/show";

const dateMap = {
  "last hour": new Date(Date.now() - 1000 * 60 * 60),
  "last 4 hour": new Date(Date.now() - 1000 * 60 * 60 * 4),
  "last 24 hours": new Date(Date.now() - 1000 * 60 * 60 * 24),
  "last 7 days": new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
} as const;

function Overview() {
  const { theme, tenantId, backendApi, groups } = useProvider<AppContext>();
  const [groupId, setgroupId] = useState<number | "">();
  const [history, setHistory] = useState<HistoryResponse[]>([]);
  const [date, setDate] = useState<keyof typeof dateMap>("last hour");

  const getHistory = useCallback(async () => {
    try {
      if (!groupId) return;
      const data = await backendApi.getHistory({
        groupId,
        startDate: dateMap["last hour"],
      });
      console.log({ data });

      setHistory(data);
    } catch (err) {
      console.error(err);
    }
  }, [groupId, date]);

  useEffect(() => {
    getHistory();
  }, [getHistory]);

  return (
    <Chart title="Tempurature And Humidity" className="xl:col-span-2">
      <div className="card-body  overflow-auto p-3 h-full flex flex-col  gap-4">
        <div className="flex gap-2 flex-wrap">
          <select
            name="groups"
            placeholder="groups"
            className="w-[10rem]"
            onChange={(e) => {
              setgroupId(Number(e.target.value) || "");
            }}
          >
            <option value="">none</option>
            <For each={groups}>
              {(group) => <option value={group.id}>{group.name}</option>}
            </For>
          </select>
          <Show when={history.length > 0}>
            <select>
              <For each={history}>
                {(item) => <option value={item.id}>{item.serial}</option>}
              </For>
            </select>
          </Show>
          <select
            className="ml-auto  border-2 border-primary [&>*]:capitalize"
            placeholder="Select range of time"
          >
            <option value="last hour"> last hour</option>
            <option value="last 4 hour"> last 4 hour</option>
            <option value="last 24 hours"> last 24 hours</option>
            <option value="last 7 days"> last 7 days</option>
          </select>
        </div>
        <ReactApexChart
          width={"100%"}
          height={"80%"}
          options={{
            chart: {
              id: "basic-bar",
              zoom: {
                enabled: false,
              },
              stacked: true,
              toolbar: {
                show: false,
              },
            },
            stroke: {
              width: [3, 3],
              curve: "smooth",
              // dashArray: [0, 2],
            },
            tooltip: {
              enabled: false,
            },

            yaxis: {
              labels: {
                style: {
                  colors: theme === "dark" ? "#fff" : "#373d3f",
                  fontSize: "12px",
                },
              },
            },

            xaxis: {
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              labels: {
                style: {
                  colors: theme === "dark" ? "#fff" : "#373d3f",
                  fontSize: "12px",
                },
              },
            },
          }}
          series={[
            {
              data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 91, 80, 91],
              color: "#0091AE",
              name: "Humidity",
            },
            {
              data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
              color: "#EE3124",
              name: "Temperature",
            },
          ]}
        />
      </div>
    </Chart>
  );
}

export default Overview;
