import { useDeferredValue, useEffect, useRef, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { BsCpu, BsPlusCircle } from "react-icons/bs";
import { TbCpuOff, TbBellRinging } from "react-icons/tb";
import { AiOutlineMinusCircle, AiOutlinePlus } from "react-icons/ai";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import Tooltip from "../../../../components/tooltip";
import { motion } from "framer-motion";
import { ReactComponent as WorldMapSvg } from "../../../../assets/world.svg";
import WroldMap from "../../../../components/world-map";
import ReactApexChart from "react-apexcharts";
import For from "../../../../components/for";
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
  return (
    <div className="w-full flex gap-6 flex-wrap">
      <div className="metric-card ">
        <div className="title rounded bg-[#00323C]/10 p-2">Online devices</div>
        <div className="flex-1 flex justify-between items-center p-2 ">
          <span className="text-3xl">178</span>
          <span className="w-[2.75rem] aspect-square flex-center bg-[#796EB0]/20 rounded-full">
            <BsCpu color="#796EB0" fontSize={24} />
          </span>
        </div>
      </div>
      <div className="metric-card ">
        <div className="title rounded bg-[#00323C]/10 p-2">Online devices</div>
        <div className="flex-1 flex justify-between items-center p-2 ">
          <span className="text-3xl">178</span>
          <span className="w-[2.75rem] aspect-square flex-center bg-[#B9567E]/20 rounded-full">
            <TbCpuOff color="#B9567E" fontSize={24} />
          </span>
        </div>
      </div>
      <div className="metric-card ">
        <div className="title rounded bg-[#00323C]/10 p-2">Critical alarms</div>
        <div className="flex-1 flex justify-between items-center p-2 ">
          <span className="text-3xl">178</span>
          <span className="w-[2.75rem] aspect-square flex-center bg-[#F86F28]/20 rounded-full">
            <TbBellRinging color="#F86F28" fontSize={24} />
          </span>
        </div>
      </div>
      <div className="metric-card ">
        <div className="title rounded bg-[#00323C]/10 p-2">Online devices</div>
        <div className="flex-1 flex justify-between items-center p-2 ">
          <span className="text-3xl">178</span>
          <span className="w-[2.75rem] aspect-square flex-center bg-[#E41E0A]/20 rounded-full">
            <FiAlertTriangle color="#E41E0A" fontSize={24} />
          </span>
        </div>
      </div>

      <div className="card p-4 flex curso h-[7.125rem] flex-1 gap-2 flex-center capitalize dashed cursor-pointer hover:shadow-lg active:shadow-md min-w-[10rem]">
        <span>
          <AiOutlinePlus fontSize={24} />
        </span>
        <span>Add metric</span>
      </div>
    </div>
  );
}

function Chart({
  children,
  title,
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [isChartFullscreen, setIsChartFullscreen] = useState(false);

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
              <BsFullscreenExit fontSize={20} />
            ) : (
              <BsFullscreen fontSize={20} />
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

function GeographicalMap() {
  return (
    <Chart
      title="Geographical map"
      className="xl:col-span-2   w-full overflow-x-hidden "
    >
      <div className="card-body text-dark  relative  h-[calc(100%-4rem)] w-full  ">
        <WroldMap />
      </div>
    </Chart>
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
  return (
    <Chart title="Recent alarms">
      <div className="card-body flex">
        <div className="flex-1  flex items-center">
          <div className="w-[12rem] aspect-square rounded-full border-[0.6rem] border-[#F86F28] mx-auto my-auto relative">
            <div className="absolute-center flex flex-col items-center">
              <div className="text-5xl text-black">{alerts.length}</div>
              <div className="font-xl text-[#00323C]">Alarm</div>
            </div>
          </div>
        </div>
        <div className="flex-1 h-[20rem]  p-1 overflow-y-auto flex-col gap-2">
          <For each={alerts}>
            {(alert) => (
              <div className="flex items-center gap-2 p-2 shadow-inner">
                <div className="w-[2.75rem] aspect-square flex-center bg-[#F86F28]/20 rounded-full">
                  <TbBellRinging color="#F86F28" fontSize={24} />
                </div>
                <div className="w-[100%] p-1">
                  <span className="text-xl"> {alert.name}</span>
                  <div className="flex justify-between">
                    <span>{alert.data}</span>
                    <span>{alert.time}</span>
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
  return (
    <Chart title="Water Flow">
      <div className="card-body  overflow-auto flex flex-col mt-2 px-2">
        <div className="h-[10%] ml-auto">
          <input
            type="date"
            name="data"
            id="data"
            className="w-[20rem] border-2 border-primary"
          />
        </div>
        <div className="flex-1 flex">
          <div className="w-[70%]">
            <ReactApexChart
              width={"100%"}
              height={"100%"}
              type="donut"
              options={{
                chart: {
                  type: "donut",
                  id: "donut-basic",
                },
                legend: {
                  show: false,
                },
                colors: ["#575DF5", "#5b60e7", "#7376d0", "#9a9cc5"],
                plotOptions: {
                  pie: {
                    donut: {
                      size: "60%",
                      labels: {
                        show: true,
                        name: {
                          show: true,
                          fontSize: "22px",
                          fontFamily: "Helvetica, Arial, sans-serif",
                          fontWeight: 600,
                          color: "#373d3f",
                          offsetY: -10,
                        },
                        value: {
                          show: false,
                        },
                      },
                    },
                  },
                },
              }}
              series={[20, 20, 10, 2]}
              labels={["A", "B", "C"]}
              datalabels={{
                enabled: true,
                formatter: function (val: any) {
                  return val + "";
                },
                style: {
                  colors: ["#ba2323"],
                },
              }}
            />
          </div>
          <div className="flex-1 flex flex-col p-5 gap-4 w-[30%]">
            <div className="flex gap-2">
              <span
                className={`w-[4px] rounded-sm h-[3rem] bg-[#575DF5]`}
              ></span>
              <div className="flex flex-1 flex-col">
                <div className="font-bold">20</div>
                <div className="font-normal">Leak detected</div>
              </div>
            </div>
            <div className="flex gap-2">
              <span
                className={`w-[4px] rounded-sm h-[3rem] bg-[#5b60e7]`}
              ></span>
              <div className="flex flex-1 flex-col">
                <div className="font-bold">20</div>
                <div className="font-normal">Continuous flow</div>
              </div>
            </div>
            <div className="flex gap-2">
              <span
                className={`w-[4px] rounded-sm h-[3rem] bg-[#7376d0]`}
              ></span>
              <div className="flex flex-1 flex-col">
                <div className="font-bold">10</div>
                <div className="font-normal">Backflow</div>
              </div>
            </div>
            <div className="flex gap-2">
              <span
                className={`w-[4px] rounded-sm h-[3rem] bg-[#9a9cc5]`}
              ></span>
              <div className="flex flex-1 flex-col">
                <div className="font-bold">2</div>
                <div className="font-normal">No recent flow</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Chart>
  );
}

function Overview() {
  return (
    <Chart title="Overview" className="xl:col-span-2">
      <div className="card-body  overflow-auto p-3">
        <div className="h-[15%] flex justify-between p-3">
          <div></div>
          <input
            type="date"
            name="data"
            id="data"
            className="w-[20rem] border-2 border-primary"
          />
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
            legend: {
              position: "top",
              horizontalAlign: "left",
              offsetY: -25,
              offsetX: -5,
              fontSize: "20px",
            },
            stroke: {
              width: [5, 6],
              curve: "smooth",
              dashArray: [0, 8],
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
                  // colors: "red",
                  fontSize: "12px",
                },
              },
            },
          }}
          series={[
            {
              data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 91, 80, 91],
              color: "#B9567E",
              name: "Humidity",
            },
            {
              data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
              color: "#F86F28",
              name: "Temperature",
            },
          ]}
        />
      </div>
    </Chart>
  );
}

function DashboardTab() {
  return (
    <div className="container items-center w-full min-h-full flex flex-col gap-6 overflow-x-hidden p-6">
      <Metrics />
      <div className="w-full h-full  grid xl:grid-cols-3 gap-4 auto-rows-fr">
        <RecentAlarms />
        <GeographicalMap />
        <WaterFlow />
        <Overview />
      </div>
    </div>
  );
}

export default DashboardTab;
