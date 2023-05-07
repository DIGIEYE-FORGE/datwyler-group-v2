import Button from "../../components/button";
import { useProvider } from "../../components/provider";
import backIcon from "../../assets/icons/back.svg";
import Input from "../../components/input";
import { useMemo, useState } from "react";
import Tabs, { Tab } from "../../components/tabs";
import uploadIcon from "../../assets/icons/upload.svg";
import styled from "styled-components";
import editIcon from "../../assets/icons/orange-edit.svg";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import Select from "../../components/select";
import "leaflet/dist/leaflet.css";
import { Context } from ".";
import { updateDevice } from "../../api/device";
import { toast } from "react-toastify";

const SmallCard = styled.div`
  background-color: #fff;
  border-radius: 4px;
  height: 56px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0 9px;
  text-transform: capitalize;
  & > div:first-child {
    font-size: 20px;
    font-weight: 40px;
    color: #0b2464;
  }
  & > div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #696c81;
  }
`;

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
  .input {
    flex-grow: 1;
    background-color: transparent;
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border-radius: 0.25em;
  }
  .input:focus {
    background-color: white;
    -webkit-appearance: listbox;
    -moz-appearance: listbox;
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

type Attribute = {
  id: number;
  name: string;
  value: string | number | boolean;
  [key: string]: string | number | boolean;
};

type UpdateDevice = {
  serial: string;
  name?: string;
  deviceProfileId: number;
  tags?: string;
  groupId?: number;
  type?: string;
  createdAt?: string;
  attributes: Attribute[];
  lastTelemetries?: Attribute[];
};

const getlatLng = (latlng: string) => {
  if (!latlng) return [0, 0];
  const lat: number = Number(latlng.split(",")[0]);
  const lng = Number(latlng.split(",")[1]);
  return [lat, lng];
};

const Edit = () => {
  const context = useProvider<Context>();
  const [, setOpen] = context.open;
  const [selectedDevice] = context.rowSelected;
  const [deviceProfiles] = context.deviceProfiles;
  const [groups] = context.groups;
  const updatePage = context.updatePage;

  const [updatedDevice, setUpdatedDevice] = useState<UpdateDevice>({
    serial: selectedDevice?.serial,
    name: selectedDevice?.name || "",
    deviceProfileId: selectedDevice?.deviceProfileId,
    tags:
      selectedDevice.tags
        .map((item: any) => {
          return item?.name;
        })
        .join(",") || "",
    groupId: selectedDevice?.groupId,
    type: selectedDevice?.group?.type || "",
    createdAt: selectedDevice?.createdAt || "",
    attributes: selectedDevice?.attributes || {
      latlng: "",
    },
    lastTelemetries: selectedDevice?.lastTelemetries || [],
  });

  useMemo(() => {
    setUpdatedDevice({
      serial: selectedDevice?.serial,
      name: selectedDevice?.name || "",
      deviceProfileId: selectedDevice?.deviceProfileId,
      tags:
        selectedDevice.tags
          .map((item: any) => {
            return item?.name;
          })
          .join(",") || "",
      groupId: selectedDevice?.groupId,
      type: selectedDevice?.group?.type || "",
      createdAt: selectedDevice?.createdAt || "",
      attributes: selectedDevice?.attributes || {
        latlng: "",
      },
      lastTelemetries: selectedDevice?.lastTelemetries || [],
    });
  }, [selectedDevice]);

  const handleUpdate = async () => {
    try {
      const data: any = {
        serial: updatedDevice.serial,
        name: updatedDevice.name,
        deviceProfileId: updatedDevice.deviceProfileId,
        tags: updatedDevice.tags?.split(","),
        groupId: updatedDevice.groupId,
        attributes: updatedDevice.attributes,
        lastTelemetries: updatedDevice.lastTelemetries,
      };
      await updateDevice(selectedDevice.id, data);
      toast.success("device updated");
      updatePage();
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }
  };

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
        <Tab label="info">
          <div
            className="grid-2 "
            style={{ padding: "25px 18px", gap: "15px" }}
          >
            <div className="grid-2" style={{ gap: "15px" }}>
              <SmallCard>
                <div>{selectedDevice._count.alerts}</div>
                <div>
                  <span>Alerts</span>
                  <img src={uploadIcon} alt="up" />
                </div>
              </SmallCard>
              <SmallCard>
                <div>{selectedDevice._count.attributes}</div>
                <div>
                  <span>attributes</span>
                  <img src={uploadIcon} alt="up" />
                </div>
              </SmallCard>
              <SmallCard>
                <div>44</div>
                <div>
                  <span>text</span>
                  <img src={uploadIcon} alt="up" />
                </div>
              </SmallCard>
              <SmallCard>
                <div>44</div>
                <div>
                  <span>text</span>
                  <img src={uploadIcon} alt="up" />
                </div>
              </SmallCard>
              <SmallCard className="col-2">
                <div>44</div>
                <div>
                  <span>text</span>
                  <img src={uploadIcon} alt="up" />
                </div>
              </SmallCard>
            </div>
            <div className="bg-light rounded">
              <MapContainer
                center={[51.505, -0.09]}
                zoom={8}
                minZoom={3}
                maxZoom={14}
                attributionControl={false}
                scrollWheelZoom={true}
                style={{ width: "100%", height: "100%" }}
              >
                <TileLayer url="https://mt.google.com/vt/lyrs=m&gl=ma&x={x}&y={y}&z={z}" />
                <Marker position={[51.505, -0.09]}></Marker>
              </MapContainer>
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
                }}
              >
                name
              </span>
              <CustomInput>
                <Input
                  className="input"
                  id="name"
                  value={updatedDevice.name || ""}
                  onChange={(e) => {
                    setUpdatedDevice({
                      ...updatedDevice,
                      name: e.target.value,
                    });
                  }}
                />
                <label htmlFor="name" className="rounded">
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
                }}
              >
                Profile
              </span>
              <CustomInput>
                <Select
                  className="input"
                  id="profilename"
                  value={updatedDevice.deviceProfileId}
                  onChange={(e) => {
                    setUpdatedDevice({
                      ...updatedDevice,
                      deviceProfileId: +e.target.value,
                    });
                  }}
                >
                  {deviceProfiles.map((item: any) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </Select>
                <label htmlFor="profilename" className="rounded">
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
                }}
              >
                Connection status
              </span>
              <CustomInput>
                {/* <div className="connection">CONNECTION</div> */}
                <div className="deconnection">DECONNECTION</div>
              </CustomInput>
            </div>
            <div className="row-input">
              <span
                style={{
                  width: "140px",
                }}
              >
                Tags
              </span>
              <CustomInput>
                <Input
                  className="input"
                  id="tags"
                  value={updatedDevice.tags || ""}
                  onChange={(e) => {
                    setUpdatedDevice({
                      ...updatedDevice,
                      tags: e.target.value,
                    });
                  }}
                />
                <label htmlFor="tags" className="rounded">
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
                }}
              >
                Group
              </span>
              <CustomInput>
                <Select
                  className="input"
                  id="groupname"
                  value={updatedDevice.groupId}
                  onChange={(e) => {
                    setUpdatedDevice({
                      ...updatedDevice,
                      groupId: +e.target.value,
                    });
                  }}
                >
                  {groups.map((item: any) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </Select>

                <label htmlFor="groupname" className="rounded">
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
                }}
              >
                Type
              </span>
              <CustomInput>
                <Input
                  className="input"
                  id="type"
                  value={updatedDevice.type || ""}
                  disabled
                />
              </CustomInput>
            </div>
            <div className="row-input">
              <span
                style={{
                  width: "140px",
                }}
              >
                Created At
              </span>
              <CustomInput>
                <Input
                  value={updatedDevice.createdAt || ""}
                  className="input"
                  id="createdat"
                  disabled
                />
              </CustomInput>
            </div>
          </div>
        </Tab>
        <Tab label="attributes">
          <div className="add-edit">
            <div className="body">
              {updatedDevice?.attributes?.map((attribute: Attribute) => {
                return (
                  <div key={attribute.id} className="row-input">
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
                          setUpdatedDevice({
                            ...updatedDevice,
                            attributes: updatedDevice.attributes.map(
                              (v: any) => {
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
        <Tab label="last Telemetries">
          <div className="add-edit">
            <div className="body">
              {updatedDevice?.lastTelemetries?.map((attribute: Attribute) => {
                return (
                  <div key={attribute.id} className="row-input">
                    <span
                      style={{
                        width: "140px",
                      }}
                    >
                      {attribute.alias || attribute.name}
                    </span>
                    <CustomInput>
                      <Input
                        disabled
                        className="input"
                        id={`attributes.value.${attribute.id}`}
                        value={attribute.value as string}
                        onChange={(e) => {
                          setUpdatedDevice({
                            ...updatedDevice,
                            attributes: updatedDevice.attributes.map(
                              (v: any) => {
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
        <Button onClick={handleUpdate} color="#006BA9">
          upload
        </Button>
      </div>
    </div>
  );
};

export default Edit;
