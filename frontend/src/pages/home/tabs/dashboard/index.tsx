import { useEffect, useRef, useState } from "react";
import { BsAlarm, BsCpu, BsDoorClosedFill, BsPatchPlus } from "react-icons/bs";
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
import { format, set } from "date-fns";
import Loader from "../../../../components/loader";
import Button from "../../../../components/button";
import Overview from "./history";
import { useTranslation } from "react-i18next";
import useLocalStorage from "../../../../hooks/use-local-storage";
import Modal from "../../../../components/modal";
import { RiDeleteBin5Line } from "react-icons/ri";
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

function Cards({title,icon, value, deleteWidget}:{
  title:string;
  icon:React.ReactNode;
  value:any,
  deleteWidget:(title:string)=>void
})
  {
    const [onHover,setOnHover] = useState<boolean>(false);

    return (
      <Card className="metric-card relative" onMouseMove={()=>{
        setOnHover(true)
      }} 
      onMouseLeave={()=>{
        setOnHover(false)
      }}
      >
      <div className="absolute top-0 right-0 z-40 w-full h-full bg-slate-500/60 flex justify-center items-center" style={{
        clipPath: !onHover ? "polygon(100% 1%, 100% 0, 100% 0)" :  "polygon(0 1%, 100% 0, 100% 100%, 0% 100%)"
      }}>
        <IconButton className="bg-red-500/30" onClick={()=>{
          deleteWidget(title);
        }} >
          <RiDeleteBin5Line className="text-3xl hover:text-red-500" />
        </IconButton>
      </div>
      <div className=" rounded bg-primary/10 p-2 capitalize">
        {title}
      </div>
      <div className="flex-1 flex justify-between items-center p-2 ">
        <span className="text-2xl">
          {value || 0}
        </span>
        <span className={`w-[2.75rem] aspect-square flex-center  rounded-full`} style={{
        }}>
         {icon}
        </span>
      </div>
      </Card>
    )
  }
function Metrics() {
  const { t } = useTranslation();
  const dashboardData = useProvider<DashboardData | null>()
  const context = useProvider<any>();
  const [addWidget,setAddWidget] = useState<any>({});
  const [iconActive,setIconActive] = useState<string>("");
  const {open,setOpen} = context;


  const deleteWidget = (title:string)=>{
    const newData = data.filter((item,i)=>{
      return item.title != title
    })
    setData(newData)
  }
  const [data,setData] = useState<{
    [key: string]: string | number;
  }[]>([]);
  return (
    <div className="w-full flex gap-6 flex-wrap border min-h-[6rem] shadow-xl h-fit p-2">
      {data.length == 0 ? (
        <div className="w-full h-[6rem] flex justify-center items-center">
          <IconButton onClick={()=>{
            setOpen(true)
          }}>
            <BsPatchPlus className="text-5xl m-[1rem]" />
          </IconButton>
        </div>
      ):(
      <div className="h-full w-full flex gap-6  flex-wrap">
        <For
          each={data}
          children={(item, index) => (
            <Cards title={item.title+""} value={item.value} icon={item.icon} deleteWidget={deleteWidget}/>
          )}
        />
        <button  className="w-[5rem] flex items-center justify-center" onClick={()=>{
            setOpen(true)
          }
          }>
            <BsPatchPlus className="text-5xl m-[1rem]" />
            </button>
        </div>
      )}
        <Modal
        handleClose={() => setOpen(false)}
        open={open}
        className="flex flex-col p-4 gap-4 !z-[999] w-[40rem] min-h-[10rem] h-fit"
      >
        <div>
          <h1 className="text-2xl font-bold">
            {"Add widget"}
          </h1>
        </div>
        <div>
          <label htmlFor="">title:</label>
          <input type="text" placeholder="title" className="w-full h-[2rem]" onChange={(e)=>{
            setAddWidget({
              ...addWidget,
              title:e.target.value
            })
          }}/>
          <label htmlFor="">Alert Type:</label>
          <input type="text" placeholder="Alert type" className="w-full h-[2rem]" onChange={(e)=>{
            setAddWidget({
              ...addWidget,
              alertType:e.target.value
            })
          }}/>
          <label htmlFor="">Color</label>
          <input type="color" placeholder="Color" className="w-full h-[2rem]" onChange={(e)=>{
            setAddWidget({
              ...addWidget,
              color:e.target.value
            })
          }}/>
          <label htmlFor="">Icon</label>
          <div className="w-full h- full flex flex-wrap">
            {[BsAlarm,BsCpu,BsDoorClosedFill,GiLeak,GiSmokeBomb,TbBellRinging].map((Icon,index)=>(
              <div key={index} className="w-[2.75rem] aspect-square flex-center bg-primary/20 rounded-full m-1">
                <IconButton className={`${iconActive=== Icon.name && 'bg-primary/70  hover:bg-primary/70'}`} onClick={()=>{
                  setAddWidget({
                    ...addWidget,
                    icon:<Icon fontSize={24} style={{
                      color:addWidget.color
                    }}/>
                  })
                  setIconActive(Icon.name)
                }}>
                  <Icon fontSize={24} />
                </IconButton>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <Button
            className="capitalize"
            onClick={() => {
              setOpen(false)
            }}
          >
            {t("cancel")}
          </Button>
          <Button
            className="capitalize"
            onClick={() => {
              setData([...data,addWidget])
              setOpen(false)
            }}
          >
            {t("confirm")}
          </Button>
        </div>
      </Modal>
      {/* <Card className="metric-card ">
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
      </Card> */}
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
  const context = useProvider<any>();
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
  const [open, setOpen] = useState(false);
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
        open,
        setOpen,
        setWhere,
      }}
    >
      <div className="container text-sm md:text-base items-center w-full min-h-full flex flex-col gap-6 overflow-x-hidden p-4 sm:p-4 md:p-6 ">
        <Metrics/>
        {!open && (
        <div className="w-full h-full  grid xl:grid-cols-3 gap-4 auto-rows-fr">
          <RecentAlarms />
          <GeographicalMap />
          <WaterFlow />
          <Overview />
        </div>
        )}
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
