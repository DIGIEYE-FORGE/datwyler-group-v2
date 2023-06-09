import { useState } from "react";
import { AppContext } from "../../../../App";
import { useProvider } from "../../../../components/provider";
import { User } from "../../../../utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../../components/button";
import Modal from "../../../../components/modal";
import Avatar from "../../../../components/avatar";
import { useTranslation } from "react-i18next";

function ProfileTab() {
  const { t } = useTranslation();
  const { user, authApi, setUser, confirm, multiTenancyApi, tenantId } =
    useProvider<AppContext>();
  const [data, setData] = useState<User>(user!);
  const [avatarData, setAvatarData] = useState<File | null>(null);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const [datachangePassword, setDataChangePassword] = useState<{
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const deleteAccount = () => {
    confirm({
      title: "Acknowledge alert",
      description: "Are you sure you want to Acknowledge this alert?",
      onConfirm: () => {
        authApi.deleteAccount(user?.id + "").then((res) => {
          multiTenancyApi
            .removeUserFromTenant({
              userId: user?.id,
              tenantId: tenantId,
            })
            .then((res) => {
              toast.success("Account Deleted");
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              navigate("/login");
            })
            .catch((err) => {
              toast.error("Error");
            });
        });
      },
      confirmText: "Close",
      cancelText: "Cancel",
    });
  };
  return (
    <div className=" p-3 md:p-4 lg:p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6">
      <div className="card md:col-span-2 lg:col-span-2 lg:row-span-2 p-4 lg:p-6 xl:p-8 flex flex-col gap-3 md:gap-4 xl:gap-6">
        <h3 className="text-black dark:text-light font-bold text-2xl capitalize">
          {t("profile details")}
        </h3>
        <div className="flex flex-wrap gap-4 ">
          <span className="flex-1 flex-center">
            <Avatar
              user={
                avatarData
                  ? {
                      avatar: URL.createObjectURL(avatarData),
                    }
                  : user!
              }
              className="w-32 text-4xl"
            ></Avatar>
          </span>
          <div className="flex flex-col justify-center flex-[4] gap-2 md:gap-4">
            <input
              type="file"
              className="hidden"
              id="avatar"
              onChange={(e) => {
                const file = e.currentTarget.files?.[0];
                if (file) {
                  setAvatarData(file);
                  console.log("hello----", avatarData);
                  setData({
                    ...data,
                    avatar: file,
                  });
                }
              }}
            />
            <label
              htmlFor="avatar"
              className="h-[3rem] px-4 max-w-[17rem] whitespace-nowrap bg-primary/10 inline-block flex-center text-primary font-semibold rounded capitalize cursor-pointer hover:shadow-lg hover:shadow-primary/10"
            >
              {t("upload profile picture")}
            </label>
            <div className="font-light text-sm md:text-base text-[#a6a8a8] max-w-[30rem]">
              {t(
                "*Image size should be at least 320px big, and less than 500kb."
              )}
              {t("Allowed files .png and .jpg.")}
            </div>
          </div>
        </div>
        <div className=" flex-1 grid md:grid-cols-2 items-center xl:grid-cols-4 py-6 gap-4 [&>div]:flex-1 [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div>label]:capitalize [&>div>input]:py-4 md:[&>div>input]:py- xl:[&>div>input]:py-6">
          <div className="md:col-span-2">
            <label htmlFor="firstname" className="capitalize">
              {t("first name")}
            </label>
            <input
              type="text"
              id="firstname"
              value={data.firstName}
              onChange={(e) => {
                setData({
                  ...data,
                  firstName: e.currentTarget.value,
                });
              }}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="lastname">{t("last name")}</label>
            <input
              type="text"
              id="lastname"
              value={data.lastName}
              onChange={(e) => {
                setData({
                  ...data,
                  lastName: e.currentTarget.value,
                });
              }}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="contactnumber">{t("phone number")}</label>
            <input
              type="text"
              id="contactnumber"
              value={data.phoneNumber}
              onChange={(e) => {
                setData({
                  ...data,
                  phoneNumber: e.currentTarget.value,
                });
              }}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="email">{t("email")}</label>
            <input
              type="text"
              id="email"
              value={data.email}
              onChange={(e) => {
                setData({
                  ...data,
                  email: e.currentTarget.value,
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="city">{t("city")}</label>
            <input
              type="text"
              id="city"
              value={data.attributes?.city}
              onChange={(e) => {
                setData({
                  ...data,
                  attributes: {
                    ...data.attributes,
                    city: e.currentTarget.value,
                  },
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="country">{t("country")}</label>
            <input
              type="text"
              id="country"
              value={data.attributes?.country}
              onChange={(e) => {
                setData({
                  ...data,
                  attributes: {
                    ...data.attributes,
                    country: e.currentTarget.value,
                  },
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="state">{t("state")}</label>
            <input
              type="text"
              id="state"
              value={data.attributes?.state}
              onChange={(e) => {
                setData({
                  ...data,
                  attributes: {
                    ...data.attributes,
                    state: e.currentTarget.value,
                  },
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="zipcode">{t("zip code")}</label>
            <input
              type="text"
              id="zipcode"
              value={data.attributes?.zipCode}
              onChange={(e) => {
                setData({
                  ...data,
                  attributes: {
                    ...data.attributes,
                    zipCode: e.currentTarget.value,
                  },
                });
              }}
            />
          </div>
        </div>
        <div className="py-4 flex items-center [&>*]:py-2 md:[&>*]:py-3 [&>*]:w-[7rem] md:[&>*]:w-[10rem] w-fit ml-auto gap-4">
          <Button
            className=" bg-transparent text-[#0091AE]"
            style={{
              border: "1px solid #0091AE",
              color: "#0091AE",
            }}
            onClick={() => {
              setData(user!);
            }}
          >
            {t("reset")}
          </Button>
          <Button
            className=" bg-[#0091AE]/90"
            onClick={() => {
              data?.attributes == null &&
                setData({
                  ...data,
                  attributes: undefined,
                });
              authApi
                .update(
                  {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    attributes:
                      data.attributes != null ? data.attributes : undefined,
                    avatar: avatarData || data.avatar ? data.avatar : undefined,
                  },
                  user!.id
                )
                .then((res) => {
                  toast.success("updated successfully");
                  console.log(res);

                  setUser((curr) => {
                    if (res)
                      return {
                        ...curr!,
                        ...res,
                      };
                    return curr;
                  });
                })
                .catch((err) => {
                  toast.error("something went wrong");
                  console.log(err);
                });
            }}
          >
            {t("update")}
          </Button>
        </div>
      </div>
      <div className="card flex flex-col justify-evenly p-6 xl:p-12 gap-4 xl:gap-6">
        <h1 className="font-bolder capitalize font-bold text-2xl">
          {t("change password")}
        </h1>
        <p>
          {t(
            "Ensure the safety of your account by regularly updating your password. Click here to change your password and enhance your online security."
          )}
        </p>
        <Button
          onClick={() => setChangePassword(true)}
          className="flex-center text-base md:text-lg xl:text-xl py-2 md:py-3 capitalize"
        >
          <span>{t("update your security")}</span>
        </Button>
      </div>
      <div className="card flex flex-col justify-evenly p-6 xl:p-12 gap-4 xl:gap-6">
        <h1 className="font-bolder capitalize font-bold text-2xl">
          {t("close account")}
        </h1>
        <p>
          {t(
            "Please exercise caution before proceeding with closing your account. This irreversible will  permanently delete all your data and transactions."
          )}
        </p>
        <Button className="flex-center text-base md:text-lg xl:text-xl py-2 md:py-3 capitalize">
          <span>{t("Confirm Account Closure")}</span>
        </Button>
      </div>
      <Modal
        open={changePassword}
        className="w-11/12 max-w-[30rem]"
        handleClose={() => {
          setChangePassword(false);
        }}
      >
        <div className="w-[100%] h-[10%] flex items-center flex-col border-b py-2 md:py-4">
          <div className="text-black dark:text-white font-bold text-2xl first-letter:capitalize">
            {t("change password")}
          </div>
        </div>
        <div className="flex flex-col gap-4 md:gap-6 p-4">
          <div className="">
            <label htmlFor="userName" className="capitalize">
              {t("old password")}
            </label>
            <input
              type="password"
              className="h-10 w-full"
              onChange={(e) => {
                setDataChangePassword({
                  ...datachangePassword,
                  oldPassword: e.target.value,
                });
              }}
            />
          </div>
          <div className="pt-4">
            <label htmlFor="userName">{t("new password")}</label>
            <input
              type="password"
              className="h-10 w-full"
              onChange={(e) => {
                setDataChangePassword({
                  ...datachangePassword,
                  newPassword: e.target.value,
                });
              }}
            />
          </div>
          <div className="">
            <label htmlFor="userName">{t("confirm password")}</label>
            <br />
            <input
              type="password"
              className="h-10 w-full"
              onChange={(e) => {
                setDataChangePassword({
                  ...datachangePassword,
                  confirmPassword: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="flex justify-between py-2 md:py-4 border-t px-4">
          <Button
            className="py-2 md:py-3 w-[6rem] bg-transparent text-[#0091AE] capitalize"
            style={{
              border: "1px solid #0091AE",
              color: "#0091AE",
            }}
            onClick={() => {
              setChangePassword(false);
            }}
          >
            {t("cancel")}
          </Button>
          <Button
            className="py-2 md:py-3 w-[7rem] bg-[#0091AE]/90"
            onClick={() => {
              if (
                datachangePassword.newPassword !==
                datachangePassword.confirmPassword
              ) {
                toast.error("Password not match");
                return;
              }
              authApi
                .updatePassword({
                  oldPassword: datachangePassword.oldPassword,
                  newPassword: datachangePassword.newPassword,
                  id: user?.id + "",
                })
                .then((res) => {
                  toast.success("Update password success");
                  setChangePassword(false);
                })
                .catch((err) => {
                  toast.error(err.response.data.message);
                });
            }}
            disabled={
              datachangePassword.oldPassword === "" ||
              datachangePassword.newPassword === "" ||
              datachangePassword.confirmPassword === ""
            }
          >
            {t("update")}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default ProfileTab;
