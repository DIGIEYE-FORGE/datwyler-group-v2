import loginBg from "../../assets/login-bg.png";
import { FiUser } from "react-icons/fi";
import { BiShow, BiHide, BiKey } from "react-icons/bi";
import { useState } from "react";
import { z } from "zod";
import { ReactComponent as Logo } from "../../assets/logo-colored.svg";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
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

function LoginPage() {
  const { setAccessToken, setRefreshToken, setUser, authApi, setLoginState } =
    useProvider<AppContext>();
  const [showPassword, setShowPassword] = useState(false);

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
    <div
      className="h-screen w-screen "
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
      }}
    >
      <form
        onSubmit={submit}
        className="absolute top-1/2 right-1/2 translate-x-1/2 flex flex-col bg-black/50 p-6 rounded-lg text-slate-300"
        style={{
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="flex gap-6 border-b py-3">
          <Logo />
          <div className="bg-black/50 rounded h-[2.5rem] relative">
            <FiUser
              color="white"
              className="absolute left-2 bottom-1/2 translate-y-1/2"
            />
            <input
              name="email"
              type="email"
              title="email must be valid"
              className="bg-transparent h-full px-8 "
            />
          </div>
          <div className="bg-black/50 rounded h-[2.5rem] relative">
            <BiKey
              color="white"
              className="absolute left-2 bottom-1/2 translate-y-1/2"
            />
            <input
              name="password"
              pattern=".{8,}"
              title="password must be at least 8 characters"
              type={showPassword ? "text" : "password"}
              className="bg-transparent h-full px-8 "
            />
            {showPassword ? (
              <BiHide
                color="white"
                className="absolute right-2 bottom-1/2 translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <BiShow
                color="white"
                className="absolute right-2 bottom-1/2 translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          <Button
            type="submit"
            className="w-[10rem] rounded h-[2.5rem] relative cursor-pointer capitalize"
          >
            login
          </Button>
        </div>
        <div className="py-4 flex flex-col gap-4 text-center">
          <span className="text-2xl text-light">
            Lorem ipsum dolor sit amet.
          </span>
          <span className="text-md">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim quis
            veritatis at illo excepturi asperiores!
          </span>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
