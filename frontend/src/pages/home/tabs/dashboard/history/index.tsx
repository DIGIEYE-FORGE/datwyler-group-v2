import ReactApexChart from "react-apexcharts";
import { Chart } from "..";
import { AppContext } from "../../../../../App";
import { useProvider } from "../../../../../components/provider";
import { useCallback, useEffect, useState } from "react";
import For from "../../../../../components/for";
import Show from "../../../../../components/show";
import { format } from "date-fns";
import Button from "../../../../../components/button";
import Load from "../../../../../components/load";
import { strTake } from "../../../../../utils";

const dateMap = {
  "last hour": new Date(Date.now() - 1000 * 60 * 60),
  "last 4 hour": new Date(Date.now() - 1000 * 60 * 60 * 4),
  "last 24 hours": new Date(Date.now() - 1000 * 60 * 60 * 24),
  "last 7 days": new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
} as const;

function Overview() {
  const { theme, tenantId, backendApi, groups } = useProvider<AppContext>();
  const [groupId, setgroupId] = useState<number | "">();
  // const [history, setHistory] = useState<HistoryResponse[]>([]);
  const [date, setDate] = useState<keyof typeof dateMap>("last hour");
  const [chartHistory, setChartHistory] = useState<any>([]);
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");

  const getHistory = useCallback(async () => {
    try {
      if (!groupId) return;
      setState("loading");
      const data = await backendApi.getHistory({
        groupId,
        startDate: dateMap[date],
      });
      console.log({ data });

      setChartHistory([
        {
          color: "#EE3124",
          name: "temperature",
          data: data?.[0]?.temperature?.map((d) => ({
            x: new Date(d.createdAt).getTime(),
            y: d.value.toFixed(2),
          })),
        },
        {
          color: "#0091AE",
          name: "humidity",
          data: data?.[0]?.humidity?.map((d) => ({
            x: new Date(d.createdAt).getTime(),
            y: d.value.toFixed(2),
          })),
        },
      ]);
      console.log("i am here", { chartHistory });
      setState("idle");
    } catch (err) {
      console.error(err);
      setState("error");
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
            <option value="" disabled={!!groupId}>
              select site
            </option>
            <For each={groups}>
              {(group) => (
                <option value={group.id}>{strTake(group.name, 15)}</option>
              )}
            </For>
          </select>
          <select
            className="ml-auto  border-2 border-primary [&>*]:capitalize"
            placeholder="Select range of time"
            onChange={(e) => {
              setDate(e.target.value as any);
            }}
          >
            <option value="last hour"> last hour</option>
            <option value="last 4 hour"> last 4 hour</option>
            <option value="last 24 hours"> last 24 hours</option>
            <option value="last 7 days"> last 7 days</option>
          </select>
        </div>
        <Show when={state === "error"}>
          <div className="flex h-full flex-col gap-2">
            <div className="text-center text-red-500">Error</div>
            <p>
              Please check your internet connection and try again. If the
              problem
            </p>
            <Button onClick={getHistory}>Retry</Button>
          </div>
        </Show>
        <Show when={state === "loading"}>
          <div className="flex h-full w-full justify-center items-center">
            <Load />
          </div>
        </Show>
        <Show when={state === "idle"}>
          <ReactApexChart
            width={"100%"}
            height={"80%"}
            options={{
              chart: {
                id: "basic-bar",
                zoom: {
                  enabled: false,
                },
                toolbar: {
                  show: false,
                },
              },
              stroke: {
                width: [3, 3],
                curve: "smooth",
              },
              tooltip: {
                enabled: false,
              },

              yaxis: [
                {
                  title: {
                    text: "temperature",
                  },
                },
                {
                  opposite: true,
                  title: {
                    text: "humidity",
                  },
                },
              ],
              xaxis: {
                type: "datetime",
                labels: {
                  formatter: function (value, timestamp) {
                    return format(new Date(timestamp!), "MM/yy  HH:mm");
                  },
                },
              },
            }}
            series={chartHistory}
          />
        </Show>
      </div>
    </Chart>
  );
}

export default Overview;
