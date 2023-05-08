import React, { useState } from "react";
import loginBg from "../../assets/login-bg.png";
import { ReactComponent as Logo } from "../../assets/logo-colored.svg";
import Button from "../../components/button";
import { BiShow, BiHide } from "react-icons/bi";
function Login2Page() {
  const [email, setEmeil] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className=" h-screen w-screen flex [&>*]:flex-1 [&>*]:h-full ">
      <div className="flex flex-col items-center justify-center gap-8 text-xl overflow-auto ">
        <Logo className="scale-[125%] my-6" />
        <div className="flex flex-col items-center justify-center ">
          <span className=" text-3xl font-bold">Sign In</span>
          <span className="">
            <span className="text-dark/50">Let's build something </span>
            <span className="text-primary font-bold">great</span>
          </span>
        </div>
        <div className="flex flex-col gap-2 w-11/12 max-w-[30rem]">
          <label htmlFor="login-email" className="capitalize">
            email
          </label>
          <input
            id="login-email"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmeil(e.target.value)}
            placeholder="Enter your email"
            className="w-full !bg-white h-[3rem]"
          />
        </div>
        <div className="flex flex-col gap-2 w-11/12 max-w-[30rem]">
          <label htmlFor="login-password" className="capitalize">
            password
          </label>
          <span className="relative">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Enter your password"
              className="w-full !bg-white h-[3rem] pr-8"
            />
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2  flex-center w-8 rounded-full aspect-square hover:bg-dark/5 active:bg-dark/10 [&>*]:text-dark/50 hover:[&>*]:text-dark/75"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BiHide /> : <BiShow />}
            </button>
          </span>
        </div>
        <Button className="w-11/12 max-w-[30rem] h-[3rem]">login</Button>
      </div>
      <div
        style={{
          backgroundImage: `url(${loginBg})`,
          backgroundSize: "cover",
          backgroundPositionX: "center",
        }}
        className="hidden lg:flex"
      ></div>
    </div>
  );
}

export default Login2Page;
