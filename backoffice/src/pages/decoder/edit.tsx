import Button from "../../components/button";
import { useProvider } from "../../components/provider";
import backIcon from "../../assets/icons/back.svg";
import Input from "../../components/input";
import Textarea from "../../components/textarea";
import Tabs, { Tab } from "../../components/tabs";
import React, { useMemo } from "react";

import Editor from "@monaco-editor/react";
import styled from "styled-components";
import editIcon from "../../assets/icons/orange-edit.svg";
import { putDecoder } from "../../api/decoder";
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

interface Decoder {
  id?: string;
  name?: string;
  description?: string;
  fnc?: string;
  updatedAt?: string;
  [key: string]: any;
}
interface Context {
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  rowSelected: [Decoder, React.Dispatch<React.SetStateAction<Decoder>>];
  updatePage: () => void;
  save: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}
const XIcon = () => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="16"
      height="16"
      transform="translate(0 0.5)"
      fill="white"
      fillOpacity="0.01"
    />
    <g clipPath="url(#clip0_101_13157)">
      <rect
        width="14"
        height="14"
        transform="translate(1 1.5)"
        fill="white"
        fillOpacity="0.01"
      />
      <g clipPath="url(#clip1_101_13157)">
        <path
          d="M14.9996 8.49921C14.9996 10.3557 14.2621 12.1362 12.9494 13.449C11.6366 14.7617 9.85615 15.4992 7.99963 15.4992C6.14312 15.4992 4.36264 14.7617 3.04989 13.449C1.73713 12.1362 0.999634 10.3557 0.999634 8.49921C0.999634 6.64269 1.73713 4.86221 3.04989 3.54946C4.36264 2.2367 6.14312 1.49921 7.99963 1.49921C9.85615 1.49921 11.6366 2.2367 12.9494 3.54946C14.2621 4.86221 14.9996 6.64269 14.9996 8.49921ZM5.68438 5.56446C5.60223 5.48231 5.49081 5.43615 5.37463 5.43615C5.25845 5.43615 5.14703 5.48231 5.06488 5.56446C4.98273 5.64661 4.93658 5.75803 4.93658 5.87421C4.93658 5.99039 4.98273 6.10181 5.06488 6.18396L7.38101 8.49921L5.06488 10.8145C5.02421 10.8551 4.99194 10.9034 4.96993 10.9566C4.94791 11.0097 4.93658 11.0667 4.93658 11.1242C4.93658 11.1817 4.94791 11.2387 4.96993 11.2918C4.99194 11.345 5.02421 11.3933 5.06488 11.434C5.14703 11.5161 5.25845 11.5623 5.37463 11.5623C5.43216 11.5623 5.48912 11.5509 5.54227 11.5289C5.59542 11.5069 5.64371 11.4746 5.68438 11.434L7.99963 9.11783L10.3149 11.434C10.3556 11.4746 10.4039 11.5069 10.457 11.5289C10.5101 11.5509 10.5671 11.5623 10.6246 11.5623C10.6822 11.5623 10.7391 11.5509 10.7923 11.5289C10.8454 11.5069 10.8937 11.4746 10.9344 11.434C10.9751 11.3933 11.0073 11.345 11.0293 11.2918C11.0514 11.2387 11.0627 11.1817 11.0627 11.1242C11.0627 11.0667 11.0514 11.0097 11.0293 10.9566C11.0073 10.9034 10.9751 10.8551 10.9344 10.8145L8.61826 8.49921L10.9344 6.18396C10.9751 6.14328 11.0073 6.09499 11.0293 6.04184C11.0514 5.9887 11.0627 5.93173 11.0627 5.87421C11.0627 5.81668 11.0514 5.75972 11.0293 5.70657C11.0073 5.65342 10.9751 5.60513 10.9344 5.56446C10.8937 5.52378 10.8454 5.49151 10.7923 5.4695C10.7391 5.44748 10.6822 5.43615 10.6246 5.43615C10.5671 5.43615 10.5101 5.44748 10.457 5.4695C10.4039 5.49151 10.3556 5.52378 10.3149 5.56446L7.99963 7.88058L5.68438 5.56446Z"
          fill="#6C757D"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_101_13157">
        <rect
          width="14"
          height="14"
          fill="white"
          transform="translate(1 1.5)"
        />
      </clipPath>
      <clipPath id="clip1_101_13157">
        <rect
          width="14"
          height="14"
          fill="white"
          transform="translate(1 1.5)"
        />
      </clipPath>
    </defs>
  </svg>
);

const Edit = () => {
  const context = useProvider<Context>();
  const [, setOpen] = context.open;
  const [showUpdateButton, setShowUpdateButton] = React.useState(false);
  const [valueTest, setValueTest] = React.useState("");
  const [resultTest, setResultTest] = React.useState("");
  const [rowselected] = context.rowSelected;
  const [, setSave] = context.save;
  const [decodervalues, setDecodervalues] = React.useState<Decoder>({
    name: "",
    description: "",
    fnc: "",
    updatedAt: "",
  });

  const updateDecoderMutation = useMutation({
    mutationFn: (data: any) => {
      let { id, ...res } = data;
      return putDecoder(id, res);
    },
    onSuccess: (data) => {
      setOpen(false);
      toast.success("Decoder updated successfully");
      setSave((cur) => !cur);
    },
    onError: (err: any) => {
      toast.error(err?.message);
    },
  });

  useMemo(() => {
    setDecodervalues({
      name: rowselected.name || "",
      description: rowselected.description || "",
      fnc: rowselected.fnc || "",
      updatedAt: rowselected.updatedAt || "",
    });
  }, [rowselected]);

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

      <Tabs onChange={(index) => setShowUpdateButton(!!index)}>
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
                  value={decodervalues.name}
                  onChange={(e) => {
                    setDecodervalues({
                      ...decodervalues,
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
                Description
              </span>
              <CustomInput>
                <Textarea
                  className="input"
                  id="desciption"
                  value={decodervalues.description || ""}
                  onChange={(e) => {
                    setDecodervalues({
                      ...decodervalues,
                      description: e.target.value,
                    });
                  }}
                />
                <label htmlFor="desciption" className="rounded">
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
                Function
              </span>
              <CustomInput>
                <Editor
                  height={`300px`}
                  width={`25rem`}
                  language="javascript"
                  value={decodervalues.fnc || ""}
                  onChange={(e) => {
                    setDecodervalues((curr) => {
                      return {
                        ...curr,
                        fnc: e,
                      };
                    });
                  }}
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
                  className="input"
                  id="update_at"
                  disabled
                  value={decodervalues.updatedAt}
                />
              </CustomInput>
            </div>
          </div>
        </Tab>
        <Tab label="test">
          <div className="body">
            <div className="row-input">
              <Input
                style={{
                  width: "25rem",
                }}
                onChange={(e) => {
                  setValueTest(e.target.value);
                }}
                value={valueTest || ""}
                iconEnd={
                  <span className=" flex align-center mx-2">
                    <XIcon />
                  </span>
                }
              />
              <Button
                color="#006BA9"
                onClick={() => {
                  try {
                    setResultTest(
                      eval(decodervalues.fnc + " " + `decoder(${valueTest})`) ||
                        ""
                    );
                  } catch (e: any) {
                    toast.error(e.message);
                  }
                }}
              >
                Test decoder
              </Button>
            </div>
            <div className="ml-7 mt-4">code</div>
            <div className="row-input mt-2">
              <Editor
                height={`300px`}
                width={`35rem`}
                language="javascript"
                value={decodervalues.fnc || ""}
                options={{ readOnly: true }}
              />
            </div>
            <div className="ml-7 mt-4">Results</div>
            <div className="row-input mt-2">
              <Editor
                height={`300px`}
                width={`35rem`}
                language="javascript"
                value={resultTest.toString() || ""}
                options={{ readOnly: true }}
              />
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
        {!showUpdateButton && (
          <Button
            color="#006BA9"
            onClick={async () => {
              updateDecoderMutation.mutateAsync({
                id: rowselected.id,
                name: decodervalues.name,
                description: decodervalues.description,
                fnc: decodervalues.fnc,
              });
            }}
          >
            update
          </Button>
        )}
      </div>
    </div>
  );
};

export default Edit;
