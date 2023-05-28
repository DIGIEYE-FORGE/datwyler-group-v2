import Button from "../../components/button";
import { useProvider } from "../../components/provider";
import backIcon from "../../assets/icons/back.svg";
import Input from "../../components/input";
import Textarea from "../../components/textarea";
import React, { useEffect } from "react";
import Select from "../../components/select";
import { postCredntial } from "../../api/credential";

import { toast } from "react-toastify";
import Steps, { Step } from "../../components/steps";
import { createDevice, updateDevice } from "../../api/device";
import deleteIcon from "../../assets/icons/trash.svg";
import addIcon from "../../assets/icons/add-outlined.svg";
import { Context } from ".";
import { createVmqAuthAcl } from "../../api/vmqauthacl";
import { useMutation } from "@tanstack/react-query";
interface obj {
  [key: string]: any;
}

const AddIcon = () => <img src={addIcon} alt="delete-icon" />;
const DeleteIcon = () => <img src={deleteIcon} alt="delete-icon" />;

interface DeviceProfile {
  id: number;
  name: string;
  description: string;
  logo: string;
  cridentialsType?: string;
  deviceTypeId: number;
  protocolId: number;
  [key: string]: any;
}
interface Device {
  serial?: string;
  name?: string;
  description?: string;
  tags: string[];
  groupId?: string;
}
interface Group {
  id: number;
  name: string;
}

const Attribute = ({ text }: { text: string }) => (
  <div
    style={{
      height: "100%",
      padding: "0 0.5rem",
      display: "flex",
      alignItems: "center",
      textTransform: "capitalize",
      backgroundColor: "#CED4DA",
    }}
  >
    {text}
  </div>
);

export const systems = ["UPS", "TEMPERATURE AND HUMIDITY", "COOLING UNIT", "Monitor_IO", "IPDU_A", "IO_Module", "POWER METER"]
const Add = () => {
  const context = useProvider<Context>();
  const [, setOpen] = context.open;
  const [groups] = context.groups;
  const [save, setSave] = context.save;
  const [tenantSelected, setTenantSelected] = context.tenantSelected;
  const [cridential, setCridential] = React.useState<string>("");
  const [attributes, setAttributes] = React.useState<[string, string][]>([
    ["", ""],
  ]);
  function isEmty(obj: obj) {
    let objs: {
      [key: string]: any;
    } = {};
    for (let key in obj) {
      if (obj[key] != "") objs[key] = obj[key];
      else objs[key] = undefined;
    }
    return objs;
  }
  const [deviceProfile, setDeviceProfile] = context.deviceProfiles;
  const [index, setIndex] = React.useState(0);
  const [deviceData, setDeviceData] = React.useState<Device>({
    serial: "",
    name: "",
    description: "",
    tags: [""],
    groupId: undefined,
  });

  // useEffect(() => {
  //   if (deviceProfile.deviceProfileId != "") {
  //     setCridential(
  //       deviceProfile.filter((element: DeviceProfile) => {
  //         if (element.id == deviceData.deviceProfileId)
  //           return element.id == deviceData.deviceProfileId;
  //       })[0]?.cridentialsType || ""
  //     );
  //   } else setCridential("");
  // }, [deviceData.deviceProfileId]);

  const [credntialsData, setCredntialsData] = React.useState({
    username: "",
    password: "",
    token: "",
    certificate: "",
    userId: JSON.parse(localStorage.getItem("user") || "{}")?.id,
  });

  const clearData = () => {
    setIndex(0);
    setDeviceData({
      serial: "",
      name: "",
      description: "",
      tags: [""],
      groupId: "",
    });
    setCredntialsData({
      username: "",
      password: "",
      token: "",
      certificate: "",
      userId: "",
    });
    setAttributes([["", ""]]);
    setOpen(false);
  };

  const postDeviceQuery = useMutation({
    mutationFn: (data: any) => createDevice(data),
    onSuccess: (data: any) => {
      setOpen(false);
      setSave((curr: any) => !curr);
    },
    onError: (error) => {
      console.log(error);
      toast.error("error");
    },
  });

  const adddevice = async () => {
    setDeviceData((curr) => ({
      ...curr,
      groupId: curr.groupId || undefined,
      tags: curr.tags.filter((e) => e.length > 0),
      description: curr.description || undefined,
      attributes: attributes.reduce((acc: any, v) => {
        if (v[0] && v[1])
          return [
            ...acc,
            {
              name: v[0],
              value: v[1],
            },
          ];
        return acc;
      }, []),
    }));
    postDeviceQuery.mutateAsync({
      ...deviceData,
      tenantId: tenantSelected + "" || undefined,
      attributes: attributes.reduce((acc: any, v) => {
        if (v[0] && v[1])
          return [
            ...acc,
            {
              name: v[0],
              value: v[1],
            },
          ];
        return acc;
      }, []),
    });
    setDeviceData({
      serial: "",
      name: "",
      description: "",
      tags: [""],
      groupId: "",
    });
  };
  return (
    <div className="add-edit ">
      <div className="header">
        <div className="title">device</div>
        <Button variant="indicator" className="flex gap-4" onClick={clearData}>
          <span>back</span>
          <img height={12} src={backIcon} alt="back" />
        </Button>
      </div>
      <div
        className="body "
        style={{
          borderTop: "1px solid #2125293a",
        }}
      >
        <div className="row-input">
          <label htmlFor="deviceId">Serial *</label>
          <div>
            <Input
              id="deviceId"
              placeholder="serial device"
              value={deviceData.serial || ""}
              onChange={(e) => {
                setDeviceData((curr) => ({
                  ...curr,
                  serial: e.target.value,
                }));
              }}
            />
          </div>
          <label htmlFor="system">system *</label>
          <div>
            <Select
              id="seytem"
              placeholder="system"
              value={deviceData.name || ""}
              onChange={(e) => {
                setDeviceData((curr) => ({
                  ...curr,
                  name: e.target.value,
                }));
              }}
            >
              <option value="" disabled>none</option>
              {
                systems.map((system) => (
                  <option value={system}>{system}</option>
                ))
              }
            </Select>
          </div>
          <label
            style={{
              alignSelf: "start",
              marginTop: "1rem",
            }}
            htmlFor="description"
          >
            description *
          </label>
          <div>
            <Textarea
              id="description"
              placeholder="description"
              value={deviceData.description || ""}
              onChange={(e) => {
                setDeviceData((curr) => ({
                  ...curr,
                  description: e.target.value,
                }));
              }}
            />
          </div>
          <label>group *</label>
          <div>
            <Select
              onChange={(e) => {
                setDeviceData((curr) => ({
                  ...curr,
                  groupId: e.target.value,
                }));
              }}
              value={deviceData.groupId || ""}
            >
              <option value="">none</option>
              {groups.map((group: Group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </Select>
          </div>
          <label>tags</label>
          <div className="flex flex-wrap gap-2">
            {deviceData.tags.map((tag, index) => (
              <Input
                key={index}
                id={`tag-${index}`}
                placeholder="Tags"
                value={tag}
                onKeyDown={(e: any) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setDeviceData((curr) => ({
                      ...curr,
                      tags: [...curr.tags, ""],
                    }));
                    setTimeout(() => {
                      document.getElementById(`tag-${index + 1}`)?.focus();
                    }, 0);
                  }
                }}
                onChange={(e) => {
                  e.preventDefault();
                  setDeviceData((curr) => {
                    const newTags = [...curr.tags];
                    newTags[index] = e.target.value;
                    return {
                      ...curr,
                      tags: newTags,
                    };
                  });
                }}
                style={{
                  width: "8.5rem",
                  maxWidth: deviceData.tags.length > 3 ? "9.5rem" : "100%",
                  flexGrow: 1,
                }}
                iconEnd={
                  deviceData.tags.length > 1 && (
                    <span
                      className="bg-slate-300 pointer h-full w-2 justify-center flex align-center rounded"
                      onClick={() => {
                        setDeviceData((curr) => {
                          const newTags = [...curr.tags];
                          newTags.splice(index, 1);
                          return {
                            ...curr,
                            tags: newTags,
                          };
                        });
                      }}
                    >
                      <DeleteIcon />
                    </span>
                  )
                }
              />
            ))}
            <Button
              onClick={() =>
                setDeviceData((curr) => ({
                  ...curr,
                  tags: [...curr.tags, ""],
                }))
              }
              style={{
                padding: "0rem",
                marginLeft: "auto",
              }}
              className="h-full flex align-center"
              color="#565E64"
            >
              <AddIcon />
            </Button>
          </div>
          <label
            style={{
              alignSelf: "start",
              marginTop: "10px",
            }}
          >
            attributes
          </label>
          <div>
            {attributes.map(([key, value], index) => {
              return (
                <div key={index}>
                  <div className="grid-8 g-4 my-2" key={index}>
                    <Input
                      className="col-3"
                      id={"key-" + index}
                      value={key}
                      onChange={(e) => {
                        setAttributes((curr) => {
                          curr[index][0] = e.target.value;
                          return [...curr];
                        });
                      }}
                      iconStart={<Attribute text="key" />}
                    />
                    <div className="col-5 flex gap-4">
                      <Input
                        className="w-full"
                        value={value}
                        onKeyDown={(e: any) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            setAttributes((curr) => {
                              return [...curr, ["", ""]];
                            });
                            setTimeout(() => {
                              document
                                .getElementById("key-" + (index + 1))
                                ?.focus();
                            }, 0);
                          }
                        }}
                        onChange={(e) => {
                          setAttributes((curr) => {
                            curr[index][1] = e.target.value;
                            return [...curr];
                          });
                        }}
                        iconStart={<Attribute text="value" />}
                      />
                      {index != attributes.length - 1 ? (
                        <Button
                          onClick={() =>
                            setAttributes((curr) => {
                              const newCurr = [...curr];
                              newCurr.splice(index, 1);
                              return newCurr;
                            })
                          }
                          style={{
                            padding: "0.4em",
                          }}
                          className="h-full flex align-center"
                          color="#FF4B55"
                        >
                          <DeleteIcon />
                        </Button>
                      ) : (
                        <Button
                          onClick={() =>
                            setAttributes((curr) => {
                              return [...curr, ["", ""]];
                            })
                          }
                          style={{
                            padding: "0rem",
                          }}
                          className="h-full flex align-center"
                          color="#565E64"
                        >
                          <AddIcon />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="footer">
        <Button
          onClick={() => setOpen(false)}
          variant="outlined"
          color="#CDCED6"
        >
          <span style={{ color: "#4e5064" }} onClick={clearData}>
            cancel
          </span>
        </Button>
        <Button
          disabled={
            !deviceData.serial ||
            !deviceData.name ||
            !deviceData.groupId ||
            !deviceData.description
          }
          color="#006BA9"
          onClick={() => {
            adddevice();
          }}
        >
          save
        </Button>
      </div>
    </div>
  );
};

export default Add;
