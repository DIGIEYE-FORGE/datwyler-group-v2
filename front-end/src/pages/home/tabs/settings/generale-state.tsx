import Input from "postcss/lib/input";
import React, { useState } from "react";
import { AppContext } from "../../../../App";
import Button from "../../../../components/button";
import { useProvider } from "../../../../components/provider";
import { User } from "../../../../utils";

function GeneraleState() {
  const { user } = useProvider<AppContext>();
  const [data, setData] = useState<User>(user!);
  return (
    <div className="w-full h-full p-[2rem] flex gap-[2rem] overflow-y-auto  flex-col md:flex-col lg:flex-row ">
      <div className="w-[100%] min-w-[30rem] ">
        <div className="bg-white/95 w-[100%] p-[3rem] ">
          <div className="w-[100] min-h-[20%] flex flex-col gap-[2rem]">
            <h3 className="text-black font-bold text-2xl">Profile details</h3>
            <div className="flex gap-[3rem] items-center sm:flex-col md:flex-row lg-fex-row xl:flex-row flex-row ">
              <div className="w-[8rem] h-[8rem] flex items-center justify-center">
                <img
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
                <label htmlFor="userName">UserName</label>
                <br />
                <input type="text" className="h-[3rem] w-[100%]" />
              </div>
              <div className="w-[50%]">
                <label htmlFor="userName">Email</label>
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
                <label htmlFor="userName">Address</label>
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
        <div className="bg-white/95 w-[100%] h-[25%] min-h-[20rem] p-[3rem] flex flex-col gap-[2rem] ">
          <div className="text-black font-bold text-2xl">Change password</div>
          <div className="text-[#656868]">
            You can permanently delete or temporarily freeze your account
          </div>
          <Button className="h-[3rem] bg-[#0091AE]/90">Change Password</Button>
        </div>
        <div className="bg-white/95 w-[100%] h-[25%] min-h-[20rem] p-[3rem] flex flex-col gap-[2rem]">
          <div className="text-black font-bold text-2xl">Close account</div>
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
    </div>
  );
}

export default GeneraleState;
