import React from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../api/user";
import { toast } from "react-toastify";
import { useProvider } from "../../components/provider";

interface Context {
  setIndex: (index: number) => void;
  tenantSelected: [number, React.Dispatch<React.SetStateAction<number>>];
}

const objHasEmpty = (obj: any): boolean => {
  return Object.values(obj).some(
    (value) => value === "" || value === null || value === undefined
  );
};

const SignUp = () => {
  const context = useProvider<Context>();
  const [tenantSelected, setTenantSelected] = context.tenantSelected;
  const setIndex = context.setIndex;
  const [data, setData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
    tenantId: tenantSelected,
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
          sign Up
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
      </div>
      <div
        style={{
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div className="flex gap-4 ">
          <div className="flex flex-col flex-1">
            <label htmlFor="firstName">firstName</label>
            <Input
              style={{
                marginTop: "5px",
                height: "52px",
              }}
              onChange={(e) => {
                setData({
                  ...data,
                  firstName: e.target.value,
                });
              }}
              type="text"
              id="firstName"
              placeholder="Enter your firstName"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="lastname">lastName</label>
            <Input
              style={{
                marginTop: "5px",
                height: "52px",
              }}
              onChange={(e) => {
                setData({
                  ...data,
                  lastName: e.target.value,
                });
              }}
              type="text"
              id="lastname"
              placeholder="Enter your lastName"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email">email</label>
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
            id="email"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <div className="flex gap-4 ">
            <div className="flex-col w-full">
              <label htmlFor="password">password</label>
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
            <div className="flex-col w-full">
              <label htmlFor="password">confirm password</label>
              <Input
                disabled={data.password === ""}
                style={{
                  marginTop: "5px",
                  height: "52px",
                }}
                id="password"
                type="password"
                onChange={(e) => {
                  setData({
                    ...data,
                    confirmpassword: e.target.value,
                  });
                }}
                placeholder="Confirm your password"
              />
            </div>
          </div>
        </div>
        <Button
          style={{
            height: "52px",
            fontSize: "18px",
            fontWeight: "600",
          }}
          onClick={() => {
            signUp(data)
              .then((res) => {
                if (res) {
                  setIndex(0);
                }
              })
              .catch((err) => {
                toast.error("something went wrong, please try again later");
              });
          }}
          disabled={objHasEmpty(data)}
        >
          sign up
        </Button>
        <div className="text-center">
          Already have an account?
          <span
            onClick={() => {
              setIndex(0);
            }}
            className="dont-have-acount"
          >
            {" "}
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
