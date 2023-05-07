import React, { useEffect } from "react";
import styled from "styled-components";
import loginBackround from "../../assets/images/login-background.png";
import logo from "../../assets/images/logo.svg";
import SwipeableTabs from "../../components/swipeable-tabs";
import Provider from "../../components/provider";
import SignIn from "./sign-in";
import SignUp from "./sign-up";
import RecoverPassword from "./recover-password";
import redImg from "../../assets/images/red.svg";
import orangeImg from "../../assets/images/orange.svg";
const StyledLoginPage = styled.div`
  display: flex;
  background: linear-gradient(90deg, #fff 0 50%, #032c49 50% 100%);
  .orange {
    position: absolute;
    top: 3.2%;
    right: calc(50% - 100px);
  }
  .red {
    position: absolute;
    bottom: 3.2%;
    left: 5.2%;
  }
  .form-wrapper {
    position: absolute;
    max-height: 1000px;
    max-width: 1722px;
    min-height: 750px;
    min-width: 1200px;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 4px 100px rgba(0, 0, 0, 0.15);
    width: 90%;
    height: 80%;
    display: flex;

    .left {
      flex-grow: 1;
      height: 100%;
      background: #f4f6f9;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .tab {
        width: 540px;
        height: 584px;
        margin-top: 40px;
        .form {
          width: 100%;
          height: 100%;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;

          text-align: center;
          padding: 40px;
          border-radius: 10px;
        }
      }
    }
    .right {
      width: 50%;
      height: 100%;
      position: relative;
      display: flex;
    }
  }
  .forgot-password,
  .dont-have-acount {
    transition: color 0.3s ease;
    cursor: pointer;
    font-family: "Work Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #0b2464;
    &:hover {
      color: #032944;
      filter: drop-shadow(0px 2px 2px #0329446e);
    }
  }
  @media screen and (max-width: 1200px) {
    background: #fff;

    .form-wrapper {
      .right {
        display: none;
      }
    }
    .orange {
      right: 0;
      left: unset;
    }
    .red {
      left: 0;
    }
  }
`;

const LoginPage = () => {
  const [index, setIndex] = React.useState<number>(0);
  return (
    <Provider
      value={{
        setIndex,
      }}
    >
      <StyledLoginPage className="w-full h-full ">
        <div className="form-wrapper ">
          <div className="left ">
            <img height={70} src={logo} alt="logo" />
            <div className="tab ">
              <SwipeableTabs index={index}>
                <SignIn />
                <SignUp />
                <RecoverPassword />
              </SwipeableTabs>
            </div>
          </div>
          <div
            className="right"
            style={{
              backgroundImage: `url(${loginBackround})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              flexDirection: "column",
              justifyContent: "center",
              color: "#fff",
              padding: "41px",
            }}
          >
            <div className="absolute z-2 flex flex-col gap-6">
              <div
                style={{
                  fontSize: "30px",
                }}
              >
                Welcome to <b>DIGIEYE</b>
              </div>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum
                facilis inventore nemo, laborum porro recusandae repellat
                ducimus? Ipsum odit, voluptatibus quos in cumque ad a sed itaque
                maiores rerum unde?
              </p>
            </div>
          </div>
        </div>
      </StyledLoginPage>
    </Provider>
  );
};

export default LoginPage;
