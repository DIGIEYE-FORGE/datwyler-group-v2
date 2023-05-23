import Button from "../../components/button";
import React from "react";
import { useProvider } from "../../components/provider";
import backIcon from "../../assets/icons/back.svg";
import Input from "../../components/input";
import Textarea from "../../components/textarea";
import Select from "../../components/select";
import Steps, { Step } from "../../components/steps";
import SelectV2 from "../../components/select-version2";
import AddIconGren from "../../assets/icons/add-icon-gren.svg";
import { postdeviceProfile } from "../../api/deviceProfile";
import { toast } from "react-toastify";
import { Protocol, DeviceTypes, Decoder, ContextDeviceProfile } from ".";
import deleteIcon from "../../assets/icons/trash.svg";
import addIcon from "../../assets/icons/add-outlined.svg";
import { useMutation } from "@tanstack/react-query";
import { UserContext } from "../../App";

const AddIcon = () => <img src={addIcon} alt="delete-icon" />;
const DeleteIcon = () => <img src={deleteIcon} alt="delete-icon" />;
const Attribute = ({ text }: { text: React.ReactNode }) => (
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

const Add = () => {
  const context = useProvider<ContextDeviceProfile>();
  const [, setOpen] = context.open;
  const [protocol] = context.protocol;
  const [index, setIndex] = React.useState(0);
  const [decoder] = context.decoders;
  const [deviceTypes] = context.deviceTypes;
  const [, setOpenModal] = context.openModal;
  const [, setSave] = context.save;
  const updatePage = context.updatePage;
  const [attributes, setAttributes] = React.useState<[string, string][]>([
    ["", ""],
  ]);
  const [dataProfile, setDataProfile] = React.useState({
    name: "",
    description: "",
    deviceTypeId: "",
    protocolId: "",
    decoderId: "",
    cridentialsType: "",
    file: {
      name: "",
    },
  });

  const clearData = () => {
    setDataProfile({
      name: "",
      description: "",
      deviceTypeId: "",
      protocolId: "",
      decoderId: "",
      cridentialsType: "",
      file: {
        name: "",
      },
    });
    setAttributes([["", ""]]);
    setIndex(0);
  };

  const PostDevicePropfile = useMutation({
    mutationFn: (data: any) => postdeviceProfile(data),
    onSuccess: (data) => {
      setOpen(false);
      toast.success("success");
      setSave((curr:boolean) => !curr);
      clearData();
    },
    onError: (err: any) => {
      toast.error(err?.message || "error");
    },
  });
  const saveProfile = async () => {
    let formData = new FormData();
    formData.append("name", dataProfile.name);
    formData.append("description", dataProfile.description);
    formData.append("protocolId", dataProfile.protocolId.toString());
    formData.append("deviceTypeId", dataProfile.deviceTypeId.toString());
    formData.append("decoderId", dataProfile.decoderId.toString());
    formData.append("cridentialsType", dataProfile.cridentialsType);
    formData.append("file", (dataProfile.file as any) || "");
    formData.append('tenantId',localStorage.getItem('tenantId') || '')
    formData.append(
      "attributes",
      JSON.stringify(Object.fromEntries(attributes))
    );
    await PostDevicePropfile.mutateAsync(formData);
  };

  const back = () => {
    clearData();
    setIndex(0);
    setOpen((curr:boolean) => !curr);
  };
  return (
    <div className="add-edit ">
      <div className="header">
        <div className="title">device Profile</div>
        <Button variant="indicator" className="flex gap-4" onClick={back}>
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
        <Steps index={index}>
          <Step label="Configuration ">
            <div className="row-input ">
              <label htmlFor="deviceprofileId">Name *</label>
              <div>
                <Input
                  id="deviceprofileId"
                  placeholder="example"
                  value={dataProfile.name || ""}
                  onChange={(e) => {
                    setDataProfile({
                      ...dataProfile,
                      name: e.target.value,
                    });
                  }}
                />
              </div>

              <label>device Type *</label>
              <div>
                <Select
                  value={dataProfile.deviceTypeId || ""}
                  onChange={(e) => {
                    setDataProfile({
                      ...dataProfile,
                      deviceTypeId: e.target.value,
                    });
                  }}
                >
                  <option value="">none</option>
                  {deviceTypes.map((item: DeviceTypes) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </div>
              <label htmlFor="credentialsType">credentials type *</label>
              <div>
                <Select
                  id="credentialsType"
                  value={dataProfile.cridentialsType || ""}
                  onChange={(e) => {
                    setDataProfile({
                      ...dataProfile,
                      cridentialsType: e.target.value,
                    });
                  }}
                >
                  <option value="">none</option>
                  {["TOKEN", "CERTIFICATE", "USERPASSWORD"].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </div>
              <label htmlFor="protocol">Protocol</label>
              <div>
                <Select
                  value={dataProfile.protocolId || ""}
                  onChange={(e) => {
                    setDataProfile({
                      ...dataProfile,
                      protocolId: e.target.value,
                    });
                  }}
                >
                  <option value="">none</option>
                  {protocol.map((item: Protocol) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </div>
              <label>decoder</label>
              <div>
                <SelectV2
                  value={+dataProfile.decoderId || ""}
                  onChange={(e: any) => {
                    setDataProfile({
                      ...dataProfile,
                      decoderId: e,
                    });
                  }}
                  data={decoder
                    ?.map((item: Decoder) => ({
                      value: item.id,
                      label: item.name,
                    }))
                    .concat({
                      value: "",
                      label: (
                        <div
                          onClick={() => setOpenModal(true)}
                          style={{
                            backgroundColor: "#ffffff",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            gap: "1rem",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img src={AddIconGren} alt="add" />
                          <span
                            style={{
                              color: "#007D59",
                            }}
                          >
                            Add Decoder
                          </span>
                        </div>
                      ),
                    })}
                ></SelectV2>
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
          </Step>
          <Step label="Addons">
            <div className="body">
              <div className="row-input">
                <label>Upload image</label>
                <div className="flex">
                  <Input
                    type="file"
                    id="upload"
                    onChange={(e: any) => {
                      setDataProfile({
                        ...dataProfile,
                        file: e.target.files![0],
                      });
                    }}
                    style={{
                      position: "absolute",
                      pointerEvents: "none",
                      display: "none",
                    }}
                  />
                  <Input
                    className="w-full"
                    value={dataProfile.file?.name || ""}
                    onChange={() => {}}
                    placeholder="No file choosen"
                    style={{
                      caretColor: "transparent",
                      cursor: "default",
                    }}
                    iconStart={
                      <Attribute
                        text={
                          <label
                            htmlFor="upload"
                            style={{
                              cursor: "pointer",
                              whiteSpace: "nowrap",
                            }}
                          >
                            choose file
                          </label>
                        }
                      />
                    }
                  />
                </div>
                <label>description</label>
                <div>
                  <Textarea
                    id="description"
                    placeholder="description"
                    onChange={(e) => {
                      setDataProfile({
                        ...dataProfile,
                        description: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </Step>
        </Steps>
      </div>
      <div className="footer">
        <Button onClick={back} variant="outlined" color="#CDCED6">
          <span style={{ color: "#4e5064" }}>cancel</span>
        </Button>
        <Button
          disabled={
            !(
              dataProfile.deviceTypeId &&
              dataProfile.cridentialsType &&
              dataProfile.name
            )
          }
          onClick={() => {
            setIndex((curr) => +!curr);
          }}
          color="#006BA9"
        >
          {index == 0 ? "next" : "previous"}
        </Button>
        <Button
          style={{
            display: index == 0 ? "none" : "block",
          }}
          onClick={saveProfile}
          color="#006BA9"
        >
          save
        </Button>
      </div>
    </div>
  );
};

export default Add;
