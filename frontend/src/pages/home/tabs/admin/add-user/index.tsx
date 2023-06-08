import React, { useState, useEffect } from "react";
import { RegisterUser } from "../../../../../api/auth";
import { useProvider } from "../../../../../components/provider";
import { AppContext } from "../../../../../App";
import { User } from "../../../../../utils";
import { toast } from "react-toastify";
import { z } from "zod";
import { MdOutlineClose } from "react-icons/md";
import { RiAdminFill, RiUserFill } from "react-icons/ri";
import Button from "../../../../../components/button";
import Modal from "../../../../../components/modal";
import { useTranslation } from "react-i18next";
const defaultUser: RegisterUser = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "USER",
};

interface Props {
  refetch: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddUser({ refetch, open, setOpen }: Props) {
  const { tenantId, multiTenancyApi, authApi } = useProvider<AppContext>();
  const [userData, setUserData] = useState<RegisterUser>(defaultUser);
  const { t } = useTranslation();

  const handleClose = () => {
    setOpen(false);
    setUserData(defaultUser);
  };

  useEffect(() => {
    if (!open) {
      setUserData(defaultUser);
    }
  }, [open]);

  const createUser = async () => {
    try {
      const user = await authApi.register(userData);
      const res = await multiTenancyApi.addUserToTenant({
        tenantId,
        user: {
          id: user.id,
          role: userData.role,
        },
      });
      refetch();
      toast.success("User created successfully");
      setOpen(false);
      console.log("res", res);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.issues[0].message);
      } else {
        const e: any = err;
        if (!e.message) toast.error("Something went wrong");
        else toast.error(e.message);
      }
    }
  };

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      className=" bg-white  w-11/12 max-w-[40rem] rounded [&>*]:border-b [&>*]:border-black/20 max-h-full overflow-auto "
    >
      <div className="flex items-center py-2 md:py-4  justify-between px-4">
        <span className="font-semibold">{t("add")}</span>
        <button
          onClick={handleClose}
          className="rounded-full hover:bg-dark/10 active:shadow-inner w-8 h-8 flex-center"
        >
          <MdOutlineClose className="text-2xl text-gray-500" />
        </button>
      </div>
      <form className="flex flex-col gap-2 sm:gap-3 md:gap-4 py-2 sm:py-3 md:py-4 [&>div]:flex [&>div]:items-center [&>div]:w-full [&>div>label]:w-[8rem] [&>div>input]:flex-1 [&>div]:gap-2 px-2 md:px-6">
        <div>
          <label className="w-fit capitalize" htmlFor="first-name">
            {t("first name")}
          </label>
          <input
            id="first-name"
            placeholder={t("first name") || "first name"}
            className="h-11"
            value={userData.firstName}
            onChange={(e) => {
              setUserData({ ...userData, firstName: e.target.value });
            }}
          />
        </div>
        <div>
          <label className="w-fit capitalize" htmlFor="last-name">
            {t("last name")}
          </label>
          <input
            id="last-name"
            placeholder={t("last name") || "last name"}
            className="h-11"
            value={userData.lastName}
            onChange={(e) => {
              setUserData({ ...userData, lastName: e.target.value });
            }}
          />
        </div>
        <div className="flex gap-6 items-center justify-between ">
          <span className="w-[6rem] capitalize">{t("role")}</span>
          <div
            className={` flex flex-col py-2 w-28 md:w-40 px-3  gap-2 items-center justify-center rounded cursor-pointer ${
              userData.role === "ADMIN"
                ? "bg-primary   text-white"
                : "bg-primary/20 text-primary"
            }
              `}
            onClick={() => {
              setUserData({ ...userData, role: "ADMIN" });
            }}
          >
            <RiAdminFill className="text-2xl sm:text-3xl md:text-5xl" />
            <span className="text-lg sm:text-xl md:text-2xl">Admin</span>
          </div>
          <div
            className={` flex flex-col py-2 w-28 md:w-40  gap-2 items-center justify-center rounded cursor-pointer ${
              userData.role === "USER"
                ? "bg-primary   text-white"
                : "bg-primary/20 text-primary"
            }
              `}
            onClick={() => {
              setUserData({ ...userData, role: "USER" });
            }}
          >
            <RiUserFill className="text-2xl sm:text-3xl md:text-5xl" />
            <span className="text-lg sm:text-xl md:text-2xl">User</span>
          </div>
        </div>
        <div>
          <label className="w-fit capitalize" htmlFor="email">
            {t("email")}
          </label>
          <input
            id="email"
            type="email"
            placeholder={t("email") || "email"}
            className="h-11"
            value={userData.email}
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
          />
        </div>
        <div>
          <label className="w-fit capitalize" htmlFor="password">
            {t("password")}
          </label>
          <input
            id="password"
            autoComplete="new-password"
            placeholder={t("password") || "password"}
            type="password"
            className="h-11"
            value={userData.password}
            onChange={(e) => {
              setUserData({ ...userData, password: e.target.value });
            }}
          />
        </div>
        <div>
          <label className="w-fit capitalize" htmlFor="phonenumber">
            {t("phone number")}
          </label>
          <input
            id="phonenumber"
            placeholder={t("phone number") || "phone number"}
            type="text"
            className="h-11"
            value={userData.phoneNumber}
            onChange={(e) => {
              if (e.target.value === "")
                setUserData({ ...userData, phoneNumber: undefined });
              setUserData({ ...userData, phoneNumber: e.target.value });
            }}
          />
        </div>
      </form>
      <div className="flex justify-between items-center py-2 md:py-4 px-6">
        <Button
          className="flex items-center gap-2 py-3 px-4"
          variant="outlined"
          onClick={handleClose}
        >
          <span>{t("cancel") || "cancel"}</span>
        </Button>
        <Button
          className="flex items-center gap-2 py-3 px-4"
          onClick={createUser}
        >
          <span>{t("add") || "add"}</span>
        </Button>
      </div>
    </Modal>
  );
}

export default AddUser;
