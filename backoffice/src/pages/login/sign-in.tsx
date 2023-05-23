import React, { useReducer } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";
import { auth } from "../../api/user";
import { toast } from "react-toastify";
import { useProvider } from "../../components/provider";
import { objHasEmpty, isEmail } from "../../utils";
import errorIcon from "../../assets/icons/error.svg";
import { getUserConnecter, UserContext } from "../../App";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Spinner from "../../components/spiner";

interface Context {
  setIndex: (index: number) => void;
}

// const Loading = () => {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100%",
//       }}
//     >

//     </div>
//   );
// };

const SignIn = () => {
  const [errorMessage, setErrorMessage] = React.useState("");

  const createGetMeMutation = useMutation({
    mutationFn: () => getUserConnecter(),
    onSuccess: (data) => {
      setuser(data);
    },
  });

  const createLoginMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) => auth(data),
    onSuccess: (data) => {
      if (data.accessToken && data.refreshToken)
      {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          createGetMeMutation.mutate();
          navigate("/");
      }
    },
    onError: (err: AxiosError) => {
      if (err.code == "ERR_NETWORK") {
        setErrorMessage("server is not responding");
      } else setErrorMessage("Invalid email or password");
    },
  });

  function login(data: { email: string; password: string }) {
    createLoginMutation.mutate(data);
  }

  const navigate = useNavigate();
  const context = useProvider<Context & UserContext>();

  const [, setuser] = context.user;
  const setIndex = context.setIndex;
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  return (
    <div className="form ">
      <div className="title">
        <div
          style={{
            fontWeight: "600",
            fontSize: "24px",
            textTransform: "capitalize",
          }}
        >
          sign in
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
          Let’s build something greate
        </p>
        {createLoginMutation.isError && (
          <div
            className="flex"
            style={{
              backgroundColor: "#F5C2C7",
              borderRadius: "4px",
              padding: "0.5rem 1rem",
              margin: "2rem 0",
            }}
          >
            <img src={errorIcon} alt="" />
            <p
              style={{
                color: "#842029",
              }}
            >
              <b>Error:</b> {errorMessage}
            </p>
          </div>
        )}
      </div>
      <div
        style={{
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div>
          <label htmlFor="username">email</label>
          <Input
            validations={[isEmail()]}
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
        <Button
          style={{
            height: "52px",
            fontSize: "18px",
            fontWeight: "600",
          }}
          disabled={objHasEmpty(data)}
          onClick={() => {
            login(data);
          }}
        >
          {createLoginMutation.isLoading ? <Spinner /> : "login"}
        </Button>
        <div
          className="forgot-password text-right"
          onClick={() => {
            setIndex(2);
          }}
        >
          Forgot Password?
        </div>
        <div className="text-left">
          Don’t have an account?
          <span
            className="dont-have-acount"
            onClick={() => {
              setIndex(1);
            }}
          >
            {" "}
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
