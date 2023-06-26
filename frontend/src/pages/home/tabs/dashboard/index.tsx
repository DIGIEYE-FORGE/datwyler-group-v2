import { useEffect, useRef, useState } from "react";
import { BsAlarm, BsCpu, BsDoorClosedFill } from "react-icons/bs";
import { TbBellRinging } from "react-icons/tb";
import { GiLeak } from "react-icons/gi";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import Tooltip from "../../../../components/tooltip";
import For from "../../../../components/for";
import Card from "../../../../components/card";
import { GiSmokeBomb } from "react-icons/gi";
import Provider, { useProvider } from "../../../../components/provider";
import { AppContext } from "../../../../App";
import { Alert, DashboardData, strTake } from "../../../../utils";
import GeographicalMap from "./goegraphical-map";
import { format } from "date-fns";
import Loader from "../../../../components/loader";
import Button from "../../../../components/button";
import Overview from "./history";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const dashboardData = useProvider<DashboardData | null>();
  return (
    <div className="w-full flex gap-6 flex-wrap ">
      <Card className="metric-card ">
        <div className=" rounded bg-primary/10 p-2 capitalize">
          {t("online devices")}
        </div>
        <div className="flex-1 flex justify-between items-center p-2 ">
          <span className="text-2xl">
            {dashboardData?.devices?.online ?? 0} /
            {dashboardData?.devices?.total ?? 0}
          </span>
          <span className="w-[2.75rem] aspect-square flex-center bg-primary/20 rounded-full">
            <BsCpu className="text-primary" fontSize={24} />
          </span>
        </div>
      </Card>
      <Card className="metric-card ">
        <div className=" rounded bg-primary/10 p-2 capitalize">
          {t("critical alarms")}
        </div>
        <div className="flex-1 flex justify-between items-center p-2 ">
          <span className="text-2xl">{dashboardData?.criticalAlarms ?? 0}</span>
          <span className="w-[2.75rem] aspect-square flex-center bg-accent/20 rounded-full">
            <BsAlarm className="text-accent" fontSize={24} />
          </span>
        </div>
      </Card>
      <Card className="metric-card ">
        <div className=" rounded bg-primary/10 p-2 capitalize">
          {t("door alarms")}
        </div>
        <div className="flex-1 flex justify-between items-center p-2 ">
          <span className="text-2xl">{dashboardData?.doorAlarms ?? 0}</span>
          <span className="w-[2.75rem] aspect-square flex-center bg-[#F86F28]/20 rounded-full">
            <BsDoorClosedFill color="#F86F28" fontSize={24} />
          </span>
        </div>
      </Card>
      <Card className="metric-card ">
        <div className=" rounded bg-primary/10 p-2 capitalize">
          {t("water leak")}
        </div>
        <div className="flex-1 flex justify-between items-center p-2 ">
          <span className="text-2xl">
            {dashboardData?.waterLeakAlarms ?? 0}
          </span>
          <span className="w-[2.75rem] aspect-square flex-center bg-blue-500/20 rounded-full">
            <GiLeak className="text-blue-500" fontSize={24} />
          </span>
        </div>
      </Card>
      <Card className="metric-card ">
        <div className=" rounded bg-primary/10 p-2 capitalize">
          {t("smoke alarms")}
        </div>
        <div className="flex-1 flex justify-between items-center p-2 ">
          <span className="text-2xl">{dashboardData?.smokeAlarms ?? 0}</span>
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
  const { t } = useTranslation();

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
        <span className="first-letter:uppercase">{t(title || "")}</span>
        <span className="options">
          <IconButton
            onClick={chartFullscreen}
            className="hidden md:inline-block"
          >
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
  const [data, setData] = useState(alarms);
  return (
    <Chart title="UPS" className="flex h-full ">
      <div className="flex gap-3  h-[calc(100%-3rem)] p-3">
        <div className="flex-[3] md:flex-[3] flex justify-center items-center h-full relative">
          <span className="absolute top-0 left-0 h-[2.5rem] w-full">
            <input type="text" 
            placeholder="Search"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "") {
                setData(alarms);
                return;
              }
              const filtered = alarms.filter((alarm) =>
                alarm?.type?.toLowerCase().includes(value.toLowerCase()) ||
                alarm?.message?.toLowerCase().includes(value.toLowerCase()) ||
                alarm?.level?.toLowerCase().includes(value.toLowerCase())
              );
              setData(filtered);
            }
            }
            className="w-full h-full border p-2"/>
          </span>
          <div className="h-20  md:h-1/2 max-h-full aspect-square rounded-full  outline  outline-4 md:outline-8 outline-primary   relative">
            <div className="absolute-center flex flex-col items-center">
              <div className="text-2xl md:text-5xl text-black dark:text-white">
                {alarms.length}
              </div>
              <div className="font-xl text-[#00323C]">Alarm</div>
            </div>
          </div>
        </div>
        <div className=" flex-[4] flex flex-col gap-2  overflow-auto ">
          <For each={alarms}>
            {(alarm) => (
              <div className="flex  items-center gap-2 p-2 shadow-inner">
                <div className="p-2 aspect-square flex-center bg-[#F86F28]/20 rounded-full">
                  <TbBellRinging
                    color="#F86F28"
                    className="text-base md:text-2xl"
                  />
                </div>
                <div className="flex flex-col md:flex-row  flex-1 items-center [&>*]:flex-1 text-xs sm:text-sm md:text-base">
                  <span>{strTake(alarm.type, 20)}</span>
                  <span>
                    {format(new Date(alarm.createdAt), "dd/MM/yy HH:mm")}
                  </span>
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
  const [data, setData] = useState<any>(alarms);
  const context = useProvider<any>();
  const [shearch, setShearch] = useState("");
  return (
    <Chart title="cooling unit" className="flex h-full ">
      <div className="flex gap-3  h-[calc(100%-3rem)] p-3">
        <div className="flex-[3] md:flex-[3] flex justify-center items-center h-full relative">
          <span className="absolute top-0 left-0 h-[2.5rem] w-full">
            <input type="text" 
            placeholder="Search"
            onChange={(e)=>{
              const value = e.target.value;
              if (value === "") {
                setData(alarms);
                return;
              }
              setData(alarms.filter((alarm: Alert)=>
              alarm?.type?.toLowerCase().includes(value.toLowerCase()) ||
              alarm?.message?.toLowerCase().includes(value.toLowerCase()) ||
              alarm?.level?.toLowerCase().includes(value.toLowerCase())))
            }}
            className="w-full h-full border p-2"/>
          </span>
          <div className="h-20  md:h-1/2 max-h-full aspect-square rounded-full  outline  outline-4 md:outline-8 outline-primary   relative">
            <div className="absolute-center flex flex-col items-center">
              <div className="text-2xl md:text-5xl text-black dark:text-white">
                {data.length}
              </div>
              <div className="font-xl text-[#00323C]">Alarm</div>
            </div>
          </div>
        </div>
        <div className=" flex-[4] flex flex-col gap-2  overflow-auto ">
          <For each={alarms}>
            {(alarm) => (
              <div className="flex  items-center gap-2 p-2 shadow-inner">
                <div className="p-2 aspect-square flex-center bg-[#F86F28]/20 rounded-full">
                  <TbBellRinging
                    color="#F86F28"
                    className="text-base md:text-2xl"
                  />
                </div>
                <div className="flex flex-col md:flex-row  flex-1 items-center [&>*]:flex-1 text-xs sm:text-sm md:text-base">
                  <span>{strTake(alarm.type, 20)}</span>
                  <span>
                    {format(new Date(alarm.createdAt), "dd/MM/yy HH:mm")}
                  </span>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </Chart>
  );
}

function DashboardTab() {
  const { t } = useTranslation();
  const context = useProvider<AppContext>();
  const { backendApi, tenantId, activeTab, loginState } = context;
  const [data, setData] = useState<DashboardData | {}>({});
  const [state, setState] = useState<"idle" | "loading" | "error">("loading");
  const [where, setWhere] = useState<any>({});
  async function fetchDashboardData(firstTime = false) {
    try {
      if (firstTime) setState("loading");
      const data = await backendApi.getDashboardData();
      setState("idle");
      setData(data);
    } catch (err) {
      console.error(err);
      setState("error");
    }
  }

  useEffect(() => {
    if (activeTab !== 0 || loginState !== "idle") return;
    fetchDashboardData(true);
    const interval = setInterval(() => {
      if (activeTab !== 0) return;
      fetchDashboardData();
    }, 8000);
    return () => clearInterval(interval);
  }, [tenantId, loginState, activeTab]);
  if (state === "error")
    return (
      <div className="w-full h-full flex-center flex-col gap-4">
        <h1 className="text-6xl first-letter:capitalize">
          {t("something went wrong")}!
        </h1>
        <p className="first-letter:capitalize">{t("please try again later")}</p>
        <Button onClick={() => fetchDashboardData(true)}>{t("retry")}</Button>
      </div>
    );
  return (
    <Provider
      value={{
        ...context,
        ...data,
        where,
        setWhere,
      }}
    >
      <div className="container text-sm md:text-base items-center w-full min-h-full flex flex-col gap-6 overflow-x-hidden p-4 sm:p-4 md:p-6 ">
        <Metrics />
        <div className="w-full h-full  grid xl:grid-cols-3 gap-4 auto-rows-fr">
          <RecentAlarms />
          <GeographicalMap />
          <WaterFlow />
          <Overview />
        </div>
        {state === "loading" && (
          <div className="absolute z-[999] bg-[#7f7f7f]/50  w-full h-full flex-center">
            <Loader />
          </div>
        )}
      </div>
    </Provider>
  );
}

export default DashboardTab;
