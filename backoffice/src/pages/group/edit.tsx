import Button from "../../components/button";
import { useProvider } from "../../components/provider";
import backIcon from "../../assets/icons/back.svg";
import Input from "../../components/input";
import Textarea from "../../components/textarea";
// import Select from "../../components/select";
import Tabs, { Tab } from "../../components/tabs";
import React, { useEffect, useMemo } from "react";
// import uploadIcon from "../../assets/icons/upload.svg";
import Editor from "@monaco-editor/react";
import styled from "styled-components";
import editIcon from "../../assets/icons/orange-edit.svg";
import { updateGroup } from "../../api/group";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
const CustomInput = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  .input {
    flex-grow: 1;
    background-color: transparent;
    border: none;
  }
  .input:focus {
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

const AddIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_556_79008)">
      <rect
        width="18.0645"
        height="18.0645"
        transform="translate(0.967773 0.967773)"
        fill="white"
        fillOpacity="0.01"
      />
      <g clipPath="url(#clip1_556_79008)">
        <path
          d="M16.774 2.09595C17.0734 2.09595 17.3606 2.2149 17.5723 2.42664C17.7841 2.63837 17.903 2.92555 17.903 3.22498V16.7734C17.903 17.0728 17.7841 17.36 17.5723 17.5717C17.3606 17.7834 17.0734 17.9024 16.774 17.9024H3.22559C2.92616 17.9024 2.63898 17.7834 2.42725 17.5717C2.21551 17.36 2.09656 17.0728 2.09656 16.7734V3.22498C2.09656 2.92555 2.21551 2.63837 2.42725 2.42664C2.63898 2.2149 2.92616 2.09595 3.22559 2.09595H16.774ZM3.22559 0.966919C2.62672 0.966919 2.05237 1.20482 1.6289 1.62829C1.20543 2.05176 0.967529 2.62611 0.967529 3.22498V16.7734C0.967529 17.3722 1.20543 17.9466 1.6289 18.3701C2.05237 18.7935 2.62672 19.0314 3.22559 19.0314H16.774C17.3729 19.0314 17.9472 18.7935 18.3707 18.3701C18.7941 17.9466 19.032 17.3722 19.032 16.7734V3.22498C19.032 2.62611 18.7941 2.05176 18.3707 1.62829C17.9472 1.20482 17.3729 0.966919 16.774 0.966919H3.22559Z"
          fill="white"
        />
        <path
          d="M9.99979 5.48305C10.1495 5.48305 10.2931 5.54252 10.399 5.64839C10.5048 5.75426 10.5643 5.89784 10.5643 6.04756V9.43466H13.9514C14.1011 9.43466 14.2447 9.49414 14.3506 9.6C14.4564 9.70587 14.5159 9.84946 14.5159 9.99918C14.5159 10.1489 14.4564 10.2925 14.3506 10.3983C14.2447 10.5042 14.1011 10.5637 13.9514 10.5637H10.5643V13.9508C10.5643 14.1005 10.5048 14.2441 10.399 14.35C10.2931 14.4558 10.1495 14.5153 9.99979 14.5153C9.85007 14.5153 9.70648 14.4558 9.60061 14.35C9.49475 14.2441 9.43527 14.1005 9.43527 13.9508V10.5637H6.04817C5.89846 10.5637 5.75487 10.5042 5.649 10.3983C5.54313 10.2925 5.48366 10.1489 5.48366 9.99918C5.48366 9.84946 5.54313 9.70587 5.649 9.6C5.75487 9.49414 5.89846 9.43466 6.04817 9.43466H9.43527V6.04756C9.43527 5.89784 9.49475 5.75426 9.60061 5.64839C9.70648 5.54252 9.85007 5.48305 9.99979 5.48305Z"
          fill="white"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_556_79008">
        <rect
          width="18.0645"
          height="18.0645"
          fill="white"
          transform="translate(0.967773 0.967773)"
        />
      </clipPath>
      <clipPath id="clip1_556_79008">
        <rect
          width="18.0645"
          height="18.0645"
          fill="white"
          transform="translate(0.967773 0.967773)"
        />
      </clipPath>
    </defs>
  </svg>
);
interface Group {
  id?: string;
  name?: string;
  type?: string;
  updatedAt?: string;
  attributes?: {
    [key: string]: any;
  };
  [key: string]: any;
}
interface Object {
  [key: string]: any;
}
interface Context {
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  rowSelected: [Group, React.Dispatch<React.SetStateAction<Group>>];
  save: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  updatePage: () => void;
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

function objectAttributs(obj: Object, nembreAttributs: number[]) {
  let data = {};
  let res = nembreAttributs.map((e, index) => {
    if (obj["key" + index] && obj["val" + index]) {
      return {
        [obj["key" + index]]: obj["val" + index],
      };
    }
  });
  res.forEach((e) => {
    if (e) {
      data = { ...data, ...e };
    }
  });
  return data;
}

const Edit = () => {
  const context = useProvider<Context>();
  const [open, setOpen] = context.open;
  const updatePage = context.updatePage;
  const [rowselected, setRowselected] = context.rowSelected;
  const [, setSave] = context.save;
  const [Groupvalues, setGrouprvalues] = React.useState<Group>({
    name: "",
    updatedAt: "",
    type: "",
    attributes: {},
  });

  const [nbrAttributes, setNbrAttributes] = React.useState(
    new Array(Object.keys(rowselected.attributes || {}).length + 1).fill(1)
  );

  const [attributes, setAttributes] = React.useState<Object>({});

  useMemo(() => {
    setGrouprvalues({
      name: rowselected.name || "",
      updatedAt: rowselected.updatedAt || "",
      type: rowselected.type || "",
      attributes: rowselected.attributes || {},
    });

    Object.entries(rowselected.attributes || {}).forEach(
      ([key, value], index) => {
        setAttributes((curr) => ({
          ...curr,
          ["key" + index]: key,
          ["val" + index]: value,
        }));
      }
    );
  }, [rowselected]);

  const updateGroupMutation = useMutation({
    mutationFn: (data: { id: string; [key: string]: any }) => {
      let { id, ...rest } = data;
      return updateGroup(id, rest);
    },
    // updateGroup(data?.id, {...data}),
    onSuccess: () => {
      setOpen(false);
      toast.success("Group updated successfully");
      setSave((cur) => !cur);
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || "Error");
    },
  });
  return (
    <div className="add-edit">
      <div className="header">
        <div className="title">Group</div>
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
                  value={Groupvalues.name}
                  onChange={(e) => {
                    setGrouprvalues((curr) => ({
                      ...curr,
                      name: e.target.value,
                    }));
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
                Type
              </span>
              <CustomInput>
                <Input
                  className="input"
                  id="name"
                  value={Groupvalues.type}
                  onChange={(e) => {
                    setGrouprvalues((curr) => ({
                      ...curr,
                      type: e.target.value,
                    }));
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
                Attributes
              </span>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  flexWrap: "wrap",
                  paddingInline: "0.2rem",
                }}
              >
                {nbrAttributes.map((item, index) =>
                  index != nbrAttributes.length - 1 &&
                  nbrAttributes.length !== 1 ? (
                    <div className="grid-8 g-4" key={index}>
                      <Input
                        disabled={index < 3}
                        className="col-3"
                        value={attributes["key" + index] || ""}
                        onChange={(e) => {
                          setAttributes((curr) => ({
                            ...curr,
                            ["key" + index]: e.target.value,
                          }));
                        }}
                        iconStart={<Attribute text="key" />}
                      />
                      <Input
                        className="col-5"
                        value={attributes["val" + index] || ""}
                        onChange={(e) => {
                          setAttributes((curr) => ({
                            ...curr,
                            ["val" + index]: e.target.value,
                          }));
                        }}
                        iconStart={<Attribute text="value" />}
                      />
                    </div>
                  ) : (
                    <div className="grid-8 g-4" key={index}>
                      <Input
                        className="col-3"
                        value={attributes["key" + index] || ""}
                        onChange={(e) => {
                          setAttributes((curr) => ({
                            ...curr,
                            ["key" + index]: e.target.value,
                          }));
                        }}
                        iconStart={<Attribute text="key" />}
                      />
                      <div className="col-5 flex gap-4 ">
                        <Input
                          type="text"
                          value={attributes["val" + index] || ""}
                          onChange={(e) => {
                            setAttributes((curr) => ({
                              ...curr,
                              ["val" + index]: e.target.value,
                            }));
                          }}
                          className="w-full"
                          iconStart={<Attribute text="value" />}
                        />
                        <Button
                          onClick={() =>
                            setNbrAttributes((curr) => [...curr, 1])
                          }
                          style={{
                            padding: "0.5rem",
                          }}
                          className="h-full flex align-center"
                          color="#565E64"
                        >
                          <AddIcon />
                        </Button>
                      </div>
                    </div>
                  )
                )}
              </div>
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
                  className="input"
                  id="update_at"
                  disabled
                  value={Groupvalues.updatedAt}
                />
              </CustomInput>
            </div>
          </div>
        </Tab>
        <Tab label="test">
          <div>attributes</div>
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
          onClick={() => {
            updateGroupMutation.mutate({
              id: rowselected.id + "",
              name: Groupvalues.name,
              attributes: objectAttributs(attributes, nbrAttributes),
              type: Groupvalues.type,
            });
          }}
        >
          update
        </Button>
      </div>
    </div>
  );
};

export default Edit;
