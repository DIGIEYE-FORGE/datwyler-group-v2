import React, { useState } from "react";
import styled from "styled-components";
import Provider from "../../components/provider";
import Button from "../../components/button";
import Card from "../../components/card";
import AddIcon from "../../assets/icons/add.svg";
import Badge from "../../components/badge";
import Activity from "../../assets/icons/activity.svg";
import Messages from "../../assets/icons/messages.svg";
import Devices from "../../assets/icons/devices.svg";
import Stockage from "../../assets/icons/stockage.svg";
import Fleshb from "../../assets/icons/fleshb.svg";
import fleshh from "../../assets/icons/fleshh.svg";
import ProgressPie from "../../components/progress-pie";
import Info from "../../assets/icons/info.svg";
import ProgressBar from "../../components/progress-bar";
import Chart from "react-apexcharts";
const StyledHomePage = styled.div`
  .content {
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
    align-content: stretch;
    .configuration {
      grid-row: span 2;
      min-height: 356px;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      &.header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 1rem;
      }
    }
    .mesages {
      grid-column: span 4;
      grid-row: span 2;
      min-height: 10rem;
    }
    .datatransmission {
      grid-row: span 2;
      min-height: 305px;
    }
    .connection {
      min-height: 363px;
      grid-column: span 4;
      grid-row: span 2;
    }
    .statistics {
      min-height: 191px;
    }
  }

  @media (max-width: 1200px) {
    .content {
      grid-template-columns: repeat(4, 1fr);
      .configuration,
      .datatransmission,
      .statistics {
        order: 1;
      }
      .statistics {
        grid-column: span 2;
        grid-row: span 2;
      }
    }
  }
  @media (max-width: 768px) {
    .content {
      grid-template-columns: repeat(2, 1fr);
      .mesages,
      .connection {
        grid-column: span 2;
      }
    }
  }
`;

const axisChart = {
  options: {
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false,
      },
    },
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  },
  series: [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ],
};
const CardWrapper = styled.div`
  display: flex;
  border-radius: 4px;
  background-color: #fff;
  /* width: 16rem; */
  height: 125px;
  gap: 0.5rem;
  flex-direction: column;
  padding: 0 9px;
  .titleBg {
    font-family: "Work Sans";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 150%;
    color: #000000;
  }
  .titleSm {
    font-family: "Work Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
  }
`;
const HomePage = () => {
  const [open, setOpen] = useState(false);

  return (
    <Provider value={{}}>
      <StyledHomePage>
        <div className="page container">
          <div className="header">
            <div className="title">devices</div>
            <Button
              color="success"
              className="flex align-center gap-3"
              onClick={() => {
                // setOpen((curr) => !curr);
                // setIsEdit(false);
              }}
            >
              <span>add Block</span>
              <img src={AddIcon} alt="add" />
            </Button>
          </div>
          <div className="content ">
            <CardWrapper className="p-2">
              <div className="flex justify-between  align-center p-3">
                <span className="titleBg">Device total</span>
                <Badge className="mr-auto" color="#772F75">
                  <img src={Devices} alt="img" />
                </Badge>
              </div>
              <div className="flex justify-between  align-center p-3">
                <span className="titleBg">1000</span>
                <span className="titleSm">Device</span>
              </div>
            </CardWrapper>
            <CardWrapper className="p-2">
              <div className="flex justify-between  align-center p-3">
                <span>Activity</span>
                <Badge className="mr-auto" color="#C14671">
                  <img src={Activity} alt="img" />
                </Badge>
              </div>
              <div className="flex justify-between  align-center p-3">
                <span className="titleBg">800</span>
                <span className="titleSm pr-3">online</span>
                <span className="titleBg ">100</span>
                <span className="titleSm pr-3">inActive</span>
                <span className="titleBg ">100</span>
                <span className="titleSm">offline</span>
              </div>
            </CardWrapper>
            <CardWrapper className="p-2">
              <div className="flex justify-between  align-center p-3">
                <span className="">Messages</span>
                <Badge className="mr-auto" color="#F27661">
                  <img src={Messages} alt="img" />
                </Badge>
              </div>
              <div className="flex justify-between  align-center p-3">
                <div>
                  <span className="titleBg">1000</span>
                  <span className="titleSm">Device</span>
                  <img src={Fleshb} alt="img" />
                </div>
                <div>
                  <span className="titleBg">1000</span>
                  <span className="titleSm">Device</span>
                  <img src={fleshh} alt="img" />
                </div>
              </div>
            </CardWrapper>
            <CardWrapper className="p-2">
              <div className="flex justify-between  align-center p-3">
                <span>Stockage total</span>
                <Badge className="mr-auto" color="#00B38B">
                  <img src={Stockage} alt="img" />
                </Badge>
              </div>
              <div className="flex justify-between align-center p-3">
                <ProgressPie progress={0.7} width="40px" color="#00B38B" />
                <span>Device</span>
              </div>
            </CardWrapper>

            <Card className="configuration p-3">
              <div className="heade flex justify-between  pb-5">
                <span className="titleBg">Configuration</span>
                <img src={Info} alt="info" width={25} />
              </div>
              <div className="flex flex-col gap-2">
                <span>Configuration not assigned</span>
                <ProgressBar
                  progress={0.7}
                  color="#00B4CA"
                  width="98%"
                  height="0.6rem"
                />
                <span>Config.cfg</span>
                <ProgressBar
                  progress={0.7}
                  color="#00B4CA"
                  width="98%"
                  height="0.6rem"
                />
                <span>Config.cfg</span>
                <ProgressBar
                  progress={0.7}
                  color="#00B4CA"
                  width="98%"
                  height="0.6rem"
                />
                <span>Config.cfg</span>
                <ProgressBar
                  progress={0.7}
                  color="#00B4CA"
                  width="98%"
                  height="0.6rem"
                />
                <span>Config.cfg</span>
                <ProgressBar
                  progress={0.7}
                  color="#00B4CA"
                  width="98%"
                  height="0.6rem"
                />
                <span>Config.cfg</span>
                <ProgressBar
                  progress={0.7}
                  color="#00B4CA"
                  width="98%"
                  height="0.6rem"
                />
              </div>
            </Card>
            <Card className="mesages ">
              <div className="chart-container">
                <Chart
                  options={axisChart.options}
                  series={axisChart.series}
                  type="bar"
                  height={350}
                />
              </div>
            </Card>
            <Card className="datatransmission">
              <Chart
                options={axisChart.options}
                series={axisChart.series}
                type="bar"
                height={200}
              />
            </Card>
            <Card className="connection ">
              <Chart
                options={axisChart.options}
                series={axisChart.series}
                type="line"
                height={350}
              />
            </Card>
            <Card className="statistics p-4">
              <div className="heade flex justify-between  pb-5">
                <span className="titleBg">Configuration</span>
                <img src={Info} alt="info" width={25} />
              </div>
              <div className="flex flex-col gap-2">
                <span>Configuration not assigned</span>
                <ProgressBar
                  progress={0.7}
                  color="#7586FF"
                  width="100%"
                  height="0.3rem"
                />
                <span>Config.cfg</span>
                <ProgressBar
                  progress={0.7}
                  color="#7586FF"
                  width="100%"
                  height="0.3rem"
                />
                <span>Config.cfg</span>
                <ProgressBar
                  progress={0.7}
                  color="#7586FF"
                  width="100%"
                  height="0.3rem"
                />
              </div>
            </Card>
          </div>
        </div>
      </StyledHomePage>
    </Provider>
  );
};

export default HomePage;
