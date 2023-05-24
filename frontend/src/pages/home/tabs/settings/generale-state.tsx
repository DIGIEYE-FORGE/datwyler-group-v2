import Input from "postcss/lib/input";
import React, { useState } from "react";
import { AppContext } from "../../../../App";
import Button from "../../../../components/button";
import { useProvider } from "../../../../components/provider";
import { User } from "../../../../utils";
import Modal from "../../../../components/modal";
import { toast } from "react-toastify";

function GeneraleState() {
  <div className=""></div>;
  const { user ,authApi} = useProvider<AppContext>();
  const [data, setData] = useState<User>(user!);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [datachangePassword, setDataChangePassword] = useState<{
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  return (
    <div className="w-full h-full p-[2rem] flex gap-[2rem] overflow-y-auto  flex-col md:flex-col lg:flex-row">
      <div className="w-[100%] min-w-[30rem] ">
        {JSON.stringify(data)}
        <div className="card w-[100%] p-[2rem] ">
          <div className="w-[100] min-h-[20%] flex flex-col gap-[2rem]">
            <h3 className="text-black dark:text-light font-bold text-2xl">
              Profile details
            </h3>
            <div className="flex  items-center  md:flex-col lg-fex-row xl:flex-row flex-row w-[100%] ">
              <div className="w-[8rem] h-[8rem]  flex items-center justify-center">
                <img
                  className="min-w-[5rem] min-h-[5rem] rounded-full"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280d.png"
                  alt="img"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                  }}
                />
              </div>
              <div className="flex flex-col gap-[0.5rem] px-[3rem]">
                <div className="flex gap-[1rem]">
                  <input type="file" className="hidden" id="avatar" />
                  <label
                    htmlFor="avatar"
                    onClick={() => {
                      console.log("clicked");
                    }}
                  >
                    <label className="h-[3rem] w-[17rem] bg-[#0091AE]/10 inline-block flex-center text-primary font-semibold rounded">
                      Upload Profile Photo
                    </label>
                  </label>
                  <Button variant="outlined" className="px-4">
                    Delete
                  </Button>
                </div>
                <div className="font-light text-sm text-[#a6a8a8]">
                  {" "}
                  *Image size should be at least 320px big, and less than 500kb.
                  Allowed files .png and .jpg.
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100] h-[80%] flex flex-col mt-[3rem] gap-[2rem] py-[1rem]">
            <div className="flex gap-[2rem] w-[100%]">
              <div className="w-[50%]">
                <label htmlFor="userName">first Name</label>
                <br />
                <input type="text" className="h-[3rem] w-[100%]" />
              </div>
              <div className="w-[50%]">
                <label htmlFor="userName">last Name</label>
                <br />
                <input type="text" className="h-[3rem] w-[100%]" />
              </div>
            </div>
            <div className="flex gap-[2rem] w-[100%]">
              <div className="w-[50%]">
                <label htmlFor="userName">Contacts Number</label>
                <br />
                <input type="text" className="h-[3rem] w-[100%]" />
              </div>
              <div className="w-[50%]">
                <label htmlFor="userName">Address Email</label>
                <br />
                <input type="text" className="h-[3rem] w-[100%]" />
              </div>
            </div>
            <div className="flex w-[100%] gap-[1rem]">
              <div className="w-[25%]">
                <label htmlFor="userName">City</label>
                <br />
                <input type="text" className="h-[3rem] w-[100%]" />
              </div>
              <div className="w-[25%]">
                <label htmlFor="userName">State</label>
                <br />
                <input type="text" className="h-[3rem] w-[100%]" />
              </div>
              <div className="w-[25%]">
                <label htmlFor="userName">Zip Code</label>
                <br />
                <input type="text" className="h-[3rem] w-[100%]" />
              </div>
              <div className="w-[25%]">
                <label htmlFor="userName">Country</label>
                <br />
                <input type="text" className="h-[3rem] w-[100%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col min-w-[30rem] w-[25%] gap-[2rem]  max-h-[50rem] ">
        <div className="card w-[100%] h-[25%] min-h-[20rem] p-[3rem] flex flex-col gap-[2rem] ">
          <div className="text-black dark:text-white font-bold text-2xl">
            Change password
          </div>
          <div className="text-[#656868]">
            You can permanently delete or temporarily freeze your account
          </div>
          <Button className="h-[3rem] bg-[#0091AE]/90" onClick={()=>{
            setChangePassword(true)
          }}>Change Password</Button>
        </div>
        <div className="card w-[100%] h-[25%] min-h-[20rem] p-[3rem] flex flex-col gap-[2rem]">
          <div className="text-black dark:text-white font-bold text-2xl">
            Close account
          </div>
          <div className="text-[#656868]">
            You can permanently delete or temporarily freeze your account
          </div>
          <Button
            className="h-[3rem] bg-transparent text-[#0091AE]"
            style={{
              border: "1px solid #0091AE",
              color: "#0091AE",
            }}
          >
            Close Account
          </Button>
        </div>
      </div>
      <Modal open={changePassword} className="w-[40rem]"  handleClose={()=>{
        setChangePassword(false)
      }}>
        <div className="w-[100%] h-[100%] flex flex-col gap-[2rem] p-[3rem] ">
          <div className="w-[100%] h-[10%] flex items-center flex-col">
            <div className="text-black dark:text-white font-bold text-2xl">
              Change password
            </div>
            <div className="text-[#656868]">
            You can update your password here 
            </div>
          </div>
          <div className="w-[100%] h-[80%] flex flex-col gap-[2rem]">
            <div className="">
              <label htmlFor="userName">Old Password</label>
              <br />
              <input type="password" className="h-[3rem] w-[100%]"  onChange={(e)=>{
                setDataChangePassword({...datachangePassword,oldPassword:e.target.value})
              }}/>
            </div>
            <div className="">
              <label htmlFor="userName">New Password</label>
              <br />
              <input type="password" className="h-[3rem] w-[100%]"  onChange={(e)=>{
                setDataChangePassword({...datachangePassword,newPassword:e.target.value})
              }}/>
            </div>
            <div className="">
              <label htmlFor="userName">Confirm Password</label>
              <br />
              <input type="password" className="h-[3rem] w-[100%]" onChange={(e)=>{
                setDataChangePassword({...datachangePassword,confirmPassword:e.target.value})
              }}/>
            </div>
            <div className="flex justify-end  mt-[2rem] gap-[2rem]">
              <Button
                className="h-[3rem]  w-[8rem] bg-transparent text-[#0091AE]"
                style={{
                  border: "1px solid #0091AE",
                  color: "#0091AE",
                }}
                onClick={()=>{
                  setChangePassword(false)
                }}
              >
                Cancel
              </Button>
              <Button className="h-[3rem] w-[8rem] bg-[#0091AE]/90"
              onClick={()=>{
              if (datachangePassword.newPassword!==datachangePassword.confirmPassword){
                toast.error("Password not match")
                return
              }
               authApi.updatePassword({
                  oldPassword:datachangePassword.oldPassword,
                  newPassword:datachangePassword.newPassword,
                  id:user?.id+""
               }).then((res)=>{
                  toast.success("Update password success")
                  setChangePassword(false)
                }
                ).catch((err)=>{
                  toast.error(err.response.data.message)
                }
                )
              }}
              disabled={
                datachangePassword.oldPassword===""||
                datachangePassword.newPassword===""||
                datachangePassword.confirmPassword===""
              }
              >Save</Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default GeneraleState;
