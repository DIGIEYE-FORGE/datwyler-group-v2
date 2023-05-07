import Button from "../../components/button";
import { useProvider } from "../../components/provider";
import backIcon from "../../assets/icons/back.svg";
import Input from "../../components/input";
import Tabs, { Tab } from "../../components/tabs";
import styled from "styled-components";
import editIcon from "../../assets/icons/orange-edit.svg";
import "leaflet/dist/leaflet.css";
import React, { useMemo } from "react";
import { putDeviceProfile } from "../../api/deviceProfile";
import { toast } from "react-toastify";
import {
  Credentials,
  DeviceTypes,
  Protocol,
  Decoder,
  Profile,
} from "../../utils";
import { updateDevice } from "../../api/device";
import { use } from "i18next";
import { useMutation } from "@tanstack/react-query";

type Attribute = {
  id: number | null;
  name: string;
  value: string;
};

const Details = styled.div`
  width: 100%;
  height: 1px;
  background-color: #21252940;
  position: relative;
  & > .details {
    text-transform: capitalize;
    position: absolute;
    left: 16px;
    transform: translateY(-50%);
    background-color: #f5f6f8;
    padding: 0 16px;
  }
`;

const CustomInput = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  .input,
  .select,
  .textarea {
    height: 2rem;
    flex-grow: 1;
    background-color: transparent;
    border: none;
  }

  .input:focus,
  .select:focus,
  .textarea:focus {
    background-color: white;
  }
  label:hover {
    cursor: pointer;
    background-color: #00000016;
  }
  .connection {
    background-color: #f5f6f8;
    border: 1px solid #18762f;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-size: 14px;
    color: #1e9b54;
  }
  .deconnection {
    background-color: #f5f6f8;
    border: 1px solid #b71c1c;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-size: 14px;
    color: #b71c1c;
  }
`;

interface Context {
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  selectedprofile: [Profile, React.Dispatch<React.SetStateAction<Profile>>];
  deviceTypes: [DeviceTypes, React.Dispatch<React.SetStateAction<DeviceTypes>>];
  credentials: [Credentials, React.Dispatch<React.SetStateAction<Credentials>>];
  protocol: [Protocol, React.Dispatch<React.SetStateAction<Protocol>>];
  decoders: [Decoder, React.Dispatch<React.SetStateAction<Decoder>>];
  save: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  updatePage: () => VoidFunction;
}

const Edit = () => {
  const context = useProvider<Context>();
  const [, setOpen] = context.open;
  const [profile] = context.selectedprofile;
  const [, setSave] = context.save;
  const [data, setData] = React.useState<Profile>({
    name: "",
    description: "",
    cridentialsType: "",
    deviceTypeId: 0,
    protocolId: 0,
    decoderId: 0,
    createdAt: "",
    logo: "",
    attributes: Object.entries(profile.attributes || {}).map(
      ([name, value]) => ({ name, value })
    ),
  });

  const updateDeviceProfile = useMutation({
    mutationFn: (res: { id: string; [key: string]: any }) => {
      let { id, ...rest } = res;
      return putDeviceProfile(id, rest);
    },
    onSuccess: () => {
      toast.success("Device profile updated");
      setOpen(false);
      setSave((cur) => !cur);
    },
    onError: (err: any) => {
      toast.error(err?.message);
    },
  });
  useMemo(() => {
    setData({
      name: profile.name || "",
      description: profile.description || "",
      cridentialsType: profile.cridentialsType || "",
      deviceTypeId: profile.deviceTypeId || 0,
      protocolId: profile.protocolId || 0,
      decoderId: profile.decoderId || 0,
      createdAt: profile.createdAt || "",
      logo: profile.logo || "",
      attributes: Object.entries(profile.attributes || {}).map(
        ([name, value]) => ({ name, value })
      ),
    });
  }, [profile]);
  const [protocol] = context.protocol;
  const [deviceTypes] = context.deviceTypes;
  const [decoder] = context.decoders;
  return (
    <div className="add-edit">
      <div className="header">
        <div className="title">device</div>
        <Button
          variant="indicator"
          className="flex gap-4"
          onClick={() => setOpen((curr) => !curr)}
        >
          <span>back</span>
          <img height={12} src={backIcon} alt="back" />
        </Button>
      </div>
      <Tabs>
        <Tab label="Info">
          <div className="flex" style={{ padding: "25px 18px", gap: "0.5rem" }}>
            <div
              style={{
                width: "15%",
              }}
            >
              <img
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src={`${import.meta.env.VITE_BACK_API}/${profile.logo}`}
                alt="img"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div
              className=""
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <div className="row-input">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      width: "140px",
                      textTransform: "capitalize",
                    }}
                  >
                    name
                  </span>
                  <CustomInput
                    style={{
                      width: "100%",
                    }}
                  >
                    <input
                      className="input"
                      value={data.name}
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                      style={{
                        width: "100%",
                      }}
                      id="name"
                    />
                    <label htmlFor="name" className="rounded">
                      <span className="w-2 h-2 flex justify-center align-center ">
                        <img src={editIcon} alt="edit" />
                      </span>
                    </label>
                  </CustomInput>
                </div>
              </div>
              <div className="row-input">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      width: "140px",
                      textTransform: "capitalize",
                    }}
                  >
                    created at
                  </span>
                  <CustomInput
                    style={{
                      width: "100%",
                    }}
                  >
                    <input
                      value={data.createdAt}
                      disabled
                      className="input"
                      style={{
                        width: "100%",
                      }}
                      id="createdat"
                    />
                    <label htmlFor="createdat" className="rounded">
                      <span className="w-2 h-2 flex justify-center align-center "></span>
                    </label>
                  </CustomInput>
                </div>
              </div>
            </div>
          </div>
          <Details>
            <span className="details">details</span>
          </Details>
          <div
            className="body"
            style={{
              fontSize: "14px",
              padding: "32px 0",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div className="row-input">
              <span
                style={{
                  width: "140px",
                  textTransform: "capitalize",
                }}
              >
                device type
              </span>
              <CustomInput>
                <select
                  className="input"
                  id="devicetype"
                  value={data.deviceTypeId}
                  onChange={(e) =>
                    setData({ ...data, deviceTypeId: Number(e.target.value) })
                  }
                >
                  {deviceTypes.map((deviceType: DeviceTypes, index: number) => (
                    <option key={index} value={deviceType.id}>
                      {deviceType.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="devicetype" className="rounded">
                  <span className="w-2 h-2 flex justify-center align-center ">
                    <img src={editIcon} alt="edit" />
                  </span>
                </label>
              </CustomInput>
            </div>
            <div className="row-input">
              <span
                style={{
                  width: "140px",
                  textTransform: "capitalize",
                }}
              >
                protocol
              </span>
              <CustomInput>
                <select
                  className="input"
                  id="protocol"
                  value={data.protocolId}
                  onChange={(e) =>
                    setData({ ...data, protocolId: Number(e.target.value) })
                  }
                >
                  {protocol.map((deviceType: Protocol, index: number) => (
                    <option key={index} value={deviceType.id}>
                      {deviceType.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="protocol" className="rounded">
                  <span className="w-2 h-2 flex justify-center align-center ">
                    <img src={editIcon} alt="edit" />
                  </span>
                </label>
              </CustomInput>
            </div>
            <div className="row-input">
              <span
                style={{
                  width: "140px",
                  textTransform: "capitalize",
                }}
              >
                decoder
              </span>
              <CustomInput>
                <select
                  className="input"
                  id="decoder"
                  value={data.decoderId}
                  onChange={(e) =>
                    setData({ ...data, decpderId: Number(e.target.value) })
                  }
                >
                  {decoder.map((decoder: Decoder, index: number) => (
                    <option key={index} value={decoder.id}>
                      {decoder.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="decoder" className="rounded">
                  <span className="w-2 h-2 flex justify-center align-center ">
                    <img src={editIcon} alt="edit" />
                  </span>
                </label>
              </CustomInput>
            </div>
            <div className="row-input">
              <span
                style={{
                  width: "140px",
                  textTransform: "capitalize",
                }}
              >
                credentials type
              </span>
              <CustomInput>
                <select
                  className="input"
                  id="credentials"
                  value={data.cridentialsType}
                  onChange={(e) =>
                    setData({
                      ...data,
                      cridentialsType: e.target.value,
                    })
                  }
                >
                  {["TOKEN", "CERTIFICATE", "USERPASSWORD"].map(
                    (credential, index: number) => (
                      <option key={index} value={credential}>
                        {credential}
                      </option>
                    )
                  )}
                </select>
                <label htmlFor="credentials" className="rounded">
                  <span className="w-2 h-2 flex justify-center align-center ">
                    <img src={editIcon} alt="edit" />
                  </span>
                </label>
              </CustomInput>
            </div>
            <div className="row-input">
              <span
                style={{
                  width: "140px",
                  textTransform: "capitalize",
                }}
              >
                description
              </span>
              <CustomInput>
                <textarea
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    height: "100px",
                  }}
                  className="input"
                  id="description"
                  value={data.description}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                />
                <label htmlFor="description" className="rounded">
                  <span className="w-2 h-2 flex justify-center align-center ">
                    <img src={editIcon} alt="edit" />
                  </span>
                </label>
              </CustomInput>
            </div>
          </div>
        </Tab>
        <Tab label="attributes">
          <div className="add-edit">
            <div className="body">
              {data?.attributes?.map((attribute: Attribute, index: number) => {
                return (
                  <div key={index} className="row-input">
                    <span
                      style={{
                        width: "140px",
                      }}
                    >
                      {attribute.name}
                    </span>
                    <CustomInput>
                      <Input
                        className="input"
                        id={`attributes.value.${attribute.id}`}
                        value={attribute.value as string}
                        onChange={(e) => {
                          setData({
                            ...data,
                            attributes: data.attributes.map(
                              (v: any, index: number) => {
                                if (v.id === attribute.id) {
                                  return {
                                    ...v,
                                    value: e.target.value,
                                  };
                                }
                                return v;
                              }
                            ),
                          });
                        }}
                      />
                      <label
                        htmlFor={`attributes.value.${attribute.id}`}
                        className="rounded"
                      >
                        <span className="w-2 h-2 flex justify-center align-center ">
                          <img src={editIcon} alt="edit" />
                        </span>
                      </label>
                    </CustomInput>
                  </div>
                );
              })}
            </div>
          </div>
        </Tab>
      </Tabs>
      <div className="footer">
        <Button
          onClick={() => setOpen((curr) => !curr)}
          variant="outlined"
          color="#CDCED6"
        >
          <span style={{ color: "#4e5064" }}>cancel</span>
        </Button>
        <Button
          color="#006BA9"
          onClick={async () => {
            await updateDeviceProfile.mutateAsync({
              id: profile.id + "",
              name: data.name,
              description: data.description,
              decoderId: data.decoderId + "",
              cridentialsType: data.cridentialsType,
              deviceTypeId: data.deviceTypeId + "",
              protocolId: data.protocolId + "",
            });
          }}
        >
          save
        </Button>
      </div>
    </div>
  );
};

export default Edit;
