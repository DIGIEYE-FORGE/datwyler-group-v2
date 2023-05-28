import { useEffect, useRef, useState } from "react";
import { BsAlarm, BsCpu, BsDoorClosedFill } from "react-icons/bs";
import { TbBellRinging } from "react-icons/tb";
import { GiLeak } from "react-icons/gi";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import Tooltip from "../../../../components/tooltip";
import ReactApexChart from "react-apexcharts";
import For from "../../../../components/for";
import Card from "../../../../components/card";
import { GiSmokeBomb } from "react-icons/gi";
import Provider, { useProvider } from "../../../../components/provider";
import { AppContext } from "../../../../App";
import { DashboardData, strTake } from "../../../../utils";
import GeographicalMap from "./goegraphical-map";
import { toast } from "react-toastify";
import { format } from "date-fns";

interface IconButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  tooltip?: string;
}

export function IconButton({ children, className, ...props }: IconButtonProps) {
  if (props.tooltip) {
    return (
      <Tooltip>
        <button
          {...props}
          className={`aspect-square rounded-full p-2 hover:bg-dark/5 active:bg-dark/10 ${className}`}
        >
          {children}
        </button>
        <div className="bg-dark/75 text-light px-2 py-1 rounded-full whitespace-nowrap">
          {props.tooltip}
        </div>
      </Tooltip>
    );
  }
  return (
    <button
      {...props}
      className={`aspect-square rounded-full p-2 hover:bg-dark/5 active:bg-dark/10 ${className}`}
    >
      {children}
    </button>
  );
}

function Metrics() {
  const dashboardData = useProvider<DashboardData | null>();
  return (
    <div className="w-full flex gap-6 flex-wrap">
      <Card className="metric-card ">
        <div className="title rounded bg-primary/10  p-2">Online devices</div>
        <div className="flex-1 flex justify-between items-center p-2 ">
          <span className="text-3xl">
            {dashboardData?.devices?.online ?? 0} /
            {dashboardData?.devices?.total ?? 0}
          </span>
          <span className="w-[2.75rem] aspect-square flex-center bg-primary/20 rounded-full">
            <BsCpu className="text-primary" fontSize={24} />
          </span>
        </div>
      </Card>
      <Card className="metric-card ">
        <div className="title rounded bg-primary/10 p-2"> Critical Alarms</div>
        <div className="flex-1 flex justify-between items-center p-2 ">
          <span className="text-3xl">{dashboardData?.criticalAlarms ?? 0}</span>
          <span className="w-[2.75rem] aspect-square flex-center bg-accent/20 rounded-full">
            <BsAlarm className="text-accent" fontSize={24} />
          </span>
        </div>
      </Card>
      <Card className="metric-card ">
        <div className="title rounded bg-primary/10 p-2">Door Alarms</div>
        <div className="flex-1 flex justify-between items-center p-2 ">
          <span className="text-3xl">{dashboardData?.doorAlarms ?? 0}</span>
          <span className="w-[2.75rem] aspect-square flex-center bg-[#F86F28]/20 rounded-full">
            <BsDoorClosedFill color="#F86F28" fontSize={24} />
          </span>
        </div>
      </Card>
      <Card className="metric-card ">
        <div className="title rounded bg-primary/10 p-2">Water leakage</div>
        <div className="flex-1 flex justify-between items-center p-2 ">
          <span className="text-3xl">
            {dashboardData?.waterLeakAlarms ?? 0}
          </span>
          <span className="w-[2.75rem] aspect-square flex-center bg-blue-500/20 rounded-full">
            <GiLeak className="text-blue-500" fontSize={24} />
          </span>
        </div>
      </Card>
      <Card className="metric-card ">
        <div className="title rounded bg-primary/10 p-2">Smoke</div>
        <div className="flex-1 flex justify-between items-center p-2 ">
          <span className="text-3xl">{dashboardData?.smokeAlarms ?? 0}</span>
          <span className="w-[2.75rem] aspect-square flex-center bg-gray-500/20 rounded-full">
            <GiSmokeBomb className="text-gray-600" fontSize={24} />
          </span>
        </div>
      </Card>
    </div>
  );
}

export function Chart({
  children,
  title,
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [isChartFullscreen, setIsChartFullscreen] = useState(false);
  const { theme } = useProvider<AppContext>();
  const alarmsRef = useRef<HTMLDivElement>(null);

  const chartFullscreen = () => {
    if (window.document.fullscreenElement === alarmsRef.current) {
      window.document.exitFullscreen();
      setIsChartFullscreen(false);
      return;
    }
    if (alarmsRef.current) {
      alarmsRef.current.requestFullscreen();
      setIsChartFullscreen(true);
    }
  };
  return (
    <div
      className={`card flex flex-col min-h-[23.5rem] max-h-[23.5rem] ${className}`}
      ref={alarmsRef}
    >
      <div className="card-header">
        <span>{title}</span>
        <span className="options">
          <IconButton onClick={chartFullscreen}>
            {isChartFullscreen ? (
              <BsFullscreenExit
                fontSize={20}
                className="dark:text-white text-black"
              />
            ) : (
              <BsFullscreen
                fontSize={20}
                className="dark:text-white text-black"
              />
            )}
          </IconButton>
          <IconButton className="hidden">
            <FiSettings fontSize={20} />
          </IconButton>
        </span>
      </div>
      {children}
    </div>
  );
}

const alerts = [
  {
    id: 1,
    name: "Device 1",
    data: "2021-05-01",
    time: "12:00",
  },
  {
    id: 2,
    name: "Device 2",
    data: "2021-05-01",
    time: "12:00",
  },
  {
    id: 3,
    name: "Device 3",
    data: "2021-05-01",
    time: "12:00",
  },
  {
    id: 4,
    name: "Device 4",
    data: "2021-05-01",
    time: "12:00",
  },
  {
    id: 5,
    name: "Device 5",
    data: "2021-05-01",
    time: "12:00",
  },
  {
    id: 6,
    name: "Device 6",
    data: "2021-05-01",
    time: "12:00",
  },
  {
    id: 7,
    name: "Device 7",
    data: "2021-05-01",
    time: "12:00",
  },
];
function RecentAlarms() {
  const dashboardData = useProvider<DashboardData | null>();
  const alarms = dashboardData?.upsAlarms ?? [];
  return (
    <Chart title="UPS" className="flex h-full ">
      <div className="flex gap-3  h-[calc(100%-3rem)] p-3">
        <div className="flex-[3] flex justify-center items-center h-full">
          <div className=" h-1/2 max-h-full aspect-square rounded-full  outline outline-8 outline-primary   relative">
            <div className="absolute-center flex flex-col items-center">
              <div className="text-5xl text-black dark:text-white">
                {alarms.length}
              </div>
              <div className="font-xl text-[#00323C]">Alarm</div>
            </div>
          </div>
        </div>
        <div className="flex-[4] flex flex-col gap-2  overflow-auto ">
          <For each={alarms}>
            {(alarm) => (
              <div className="flex items-center gap-2 p-2 shadow-inner">
                <div className="w-[2.75rem] aspect-square flex-center bg-[#F86F28]/20 rounded-full">
                  <TbBellRinging color="#F86F28" fontSize={24} />
                </div>
                <div className="w-[100%] p-1">
                  <div className="flex [&>*]:flex-1 ">
                    <span>{strTake(alarm.type, 20)}</span>
                    <span>
                      {format(new Date(alarm.createdAt), "dd/MM/yy HH:mm")}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </Chart>
  );
}

function WaterFlow() {
  const dashboardData = useProvider<DashboardData | null>();
  const alarms = dashboardData?.coolingUnitAlarms ?? [];
  return (
    <Chart title="COOLING UNIT" className="flex h-full ">
      <div className="flex gap-3  h-[calc(100%-3rem)] p-3">
        <div className="flex-[3] flex justify-center items-center h-full">
          <div className=" h-1/2 max-h-full aspect-square rounded-full  outline outline-8 outline-primary   relative">
            <div className="absolute-center flex flex-col items-center">
              <div className="text-5xl text-black dark:text-white">
                {alarms.length}
              </div>
              <div className="font-xl text-[#00323C]">Alarm</div>
            </div>
          </div>
        </div>
        <div className="flex-[4] flex flex-col gap-2  overflow-auto ">
          <For each={alarms}>
            {(alarm) => (
              <div className="flex items-center gap-2 p-2 shadow-inner">
                <div className="w-[2.75rem] aspect-square flex-center bg-[#F86F28]/20 rounded-full">
                  <TbBellRinging color="#F86F28" fontSize={24} />
                </div>
                <div className="w-[100%] p-1">
                  <div className="flex [&>*]:flex-1 ">
                    <span>{strTake(alarm.type, 20)}</span>
                    <span>
                      {format(new Date(alarm.createdAt), "dd/MM/yy HH:mm")}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </Chart>
  );
}

function Overview() {
  const { theme } = useProvider<AppContext>();
  return (
    <Chart title="Tempurature And Humidity" className="xl:col-span-2">
      <div className="card-body  overflow-auto p-3 h-full flex flex-col  gap-4">
        <select
          className="ml-auto  border-2 border-primary [&>*]:capitalize"
          placeholder="Select range of time"
        >
          <option value="">all</option>
          <option value="last hour"> last hour</option>
          <option value="last 4 hour"> last 4 hour</option>
          <option value="last 24 hours"> last 24 hours</option>
          <option value="last 7 days"> last 7 days</option>
        </select>
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

function DashboardTab() {
  const context = useProvider<AppContext>();
  const { backendApi, tenantId, activeTab, loginState } = context;
  const [data, setData] = useState<DashboardData | {}>({});

  async function fetchDashboardData() {
    try {
      const data = await backendApi.getDashboardData();
      setData(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (activeTab !== 0 || loginState !== "idle") return;
    fetchDashboardData();
    const interval = setInterval(() => {
      if (activeTab !== 0) return;
      fetchDashboardData();
    }, 8000);
    return () => clearInterval(interval);
  }, [tenantId, loginState, activeTab]);
  return (
    <Provider
      value={{
        ...context,
        ...data,
      }}
    >
      <div className="container items-center w-full min-h-full flex flex-col gap-6 overflow-x-hidden p-6 ">
        <Metrics />
        <div className="w-full h-full  grid xl:grid-cols-3 gap-4 auto-rows-fr">
          <RecentAlarms />
          <GeographicalMap />
          <WaterFlow />
          <Overview />
        </div>
      </div>
    </Provider>
  );
}

export default DashboardTab;
