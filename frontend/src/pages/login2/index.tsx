import React, { useState } from "react";
import loginBg from "../../assets/login-bg.png";
import { ReactComponent as Logo } from "../../assets/logo-colored.svg";
import Button from "../../components/button";
import { BiShow, BiHide, BiKey } from "react-icons/bi";
import { z } from "zod";
import { useProvider } from "../../components/provider";
import { AppContext } from "../../App";
import { toast } from "react-toastify";
const loginSchema = z.object({
  email: z.string().email({
    message: "email is not valid",
  }),
  password: z.string().min(8, {
    message: "password must be at least 8 characters",
  }),
});

function Login2Page() {
  const [showPassword, setShowPassword] = useState(false);
  const { setAccessToken, setRefreshToken, setUser, authApi, setLoginState } =
    useProvider<AppContext>();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const data = loginSchema.parse({
        email: formData.get("email"),
        password: formData.get("password"),
      });
      const { accessToken, refreshToken, user } = await authApi.login(data);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(user);
      setLoginState("idle");
    } catch (err) {
      const e: any = err;
      if (e.response?.status === 404)
        toast.error("email or password is incorrect");
      else toast.error("something went wrong. please try again later");
    }
  }

  return (
    <div className=" h-screen w-screen flex [&>*]:flex-1 [&>*]:h-full ">
      <form
        className="flex flex-col items-center justify-center gap-8 text-xl overflow-auto "
        onSubmit={submit}
      >
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
        <Button type="submit" className="w-11/12 max-w-[30rem] h-[3rem]">
          login
        </Button>
      </form>
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
