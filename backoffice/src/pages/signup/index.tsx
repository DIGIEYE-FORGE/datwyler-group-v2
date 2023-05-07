import React, { useEffect } from "react";
import styled from "styled-components";
import orangeImg from "../../assets/images/orange.svg";
import redImg from "../../assets/images/red.svg";
import loginBackround from "../../assets/images/login-background.jpg";
import logo from "../../assets/images/logo.svg";
import Input from "../../components/input";
import Button from "../../components/button";
import useLocalStorage from "../../hooks/use-local-storage";
import { useNavigate } from "react-router-dom";
import { auth } from "../../api/user";
import { toast } from "react-toastify";
const StyledLoginPage = styled.div`
  display: flex;
  background: linear-gradient(90deg, #fff 0 50%, #032c49 50% 100%);
  .orange {
    position: absolute;
    top: 3.2%;
    left: 25%;
  }
  .red {
    position: absolute;
    bottom: 3.2%;
    left: 5.2%;
  }
  .form-wrapper {
    position: absolute;
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
      .form {
        background-color: #fff;
        width: 70%;
        height: 80%;
        padding: 1rem;
        text-align: center;
        margin-top: 20px;
        border-radius: 10px;
      }
    }
    .right {
      width: 50%;
      height: 100%;
      position: relative;
      display: flex;
    }
    .right::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #043554ba;
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
  @media screen and (max-width: 1024px) {
    .form-wrapper {
      .right {
        display: none;
      }
    }
    .orange {
      right: 0;
      left: unset;
    }
  }
`;

const SignUpPage = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const [login, setLogin] = useLocalStorage("login", false);

  return (
    <StyledLoginPage className="w-full h-full">
      <img className="orange" width={521} src={orangeImg} alt="orange" />
      <img className="red" width={500} src={redImg} alt="red" />
      <div className="form-wrapper ">
        <div className="left">
          <img height={70} src={logo} alt="logo" />
          <div className="form">
            <div
              style={{
                fontWeight: "600",
                fontSize: "24px",
                textTransform: "capitalize",
              }}
            >
              sign up
            </div>
            <p
              className="mt-4"
              style={{
                color: "#8e929b",
                fontFamily: "Work Sans",
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "22px",
                marginBottom: "20px",
              }}
            >
              Enter details to create your account
            </p>
            <div
              style={{
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <div>
                <label htmlFor="username">Username</label>
                <Input
                  style={{
                    marginTop: "5px",
                    height: "52px",
                  }}
                  onChange={(e) => {
                    setData({
                      ...data,
                      email: e.target.value,
                    });
                  }}
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label htmlFor="username">Address e-mail</label>
                <Input
                  style={{
                    marginTop: "5px",
                    height: "52px",
                  }}
                  onChange={(e) => {
                    setData({
                      ...data,
                      email: e.target.value,
                    });
                  }}
                  type="text"
                  id="username"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex gap-5">
                <div
                  style={{
                    width: "48%",
                  }}
                >
                  <label htmlFor="password">Password</label>
                  <Input
                    style={{
                      marginTop: "5px",
                      height: "52px",
                    }}
                    id="password"
                    type="password"
                    onChange={(e) => {
                      setData({
                        ...data,
                        password: e.target.value,
                      });
                    }}
                    placeholder="Enter your password"
                  />
                </div>
                <div
                  style={{
                    width: "48%",
                  }}
                >
                  <label htmlFor="password">Configm Password</label>
                  <Input
                    style={{
                      marginTop: "5px",
                      height: "52px",
                    }}
                    id="password"
                    type="password"
                    onChange={(e) => {
                      setData({
                        ...data,
                        password: e.target.value,
                      });
                    }}
                    placeholder="Enter your  password"
                  />
                </div>
              </div>
              <Button
                style={{
                  height: "52px",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
                onClick={() => {
                  auth(data)
                    .then((res) => {
                      if (res) {
                        localStorage.setItem("user", JSON.stringify(res.data));
                        navigate("/");
                      }
                    })
                    .catch((err) => {
                      if (err.response.status === 404)
                        toast.error("email or password is incorrect");
                      else
                        toast.error(
                          "something went wrong, please try again later"
                        );
                    });
                }}
              >
                Sign up
              </Button>
              <div className="text-center">
                Already have an account?{" "}
                <span
                  className="dont-have-acount"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Sign In
                </span>
              </div>
            </div>
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
              facilis inventore nemo, laborum porro recusandae repellat ducimus?
              Ipsum odit, voluptatibus quos in cumque ad a sed itaque maiores
              rerum unde?
            </p>
          </div>
        </div>
      </div>
    </StyledLoginPage>
  );
};

export default SignUpPage;
