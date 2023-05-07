import Button from "../../components/button";
import { useProvider } from "../../components/provider";
import backIcon from "../../assets/icons/back.svg";
import Input from "../../components/input";
import Textarea from "../../components/textarea";
import React from "react";
import { toast } from "react-toastify";
import Editor from "@monaco-editor/react";
import { getDecoder, postDecoder } from "../../api/decoder";
import { useMutation } from "@tanstack/react-query";

interface Context {
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  updatePage: () => void;
  save: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}
const Add = () => {
  const context = useProvider<Context>();
  const [, setSave] = context.save;
  const [, setOpen] = context.open;
  const [dataDecoder, setDataDecoder] = React.useState({
    name: "",
    description: "",
    fnc: "",
    errorname: false,
    errordescription: false,
    errorfnc: false,
  });

  const clearDataDecoder = () => {
    setDataDecoder({
      name: "",
      description: "",
      fnc: "",
      errorname: false,
      errordescription: false,
      errorfnc: false,
    });
    setOpen(false);
  };

  const postDecoderQuery = useMutation({
    mutationFn: (data: any) => postDecoder(data),
    onSuccess: (data) => {
      setOpen(false);
      toast.success("Decoder added successfully");
      setSave((cur) => !cur);
    },
    onError: (err: any) => {
      toast.error(err?.message);
    },
  });
  const AddDecoder = () => {
    postDecoderQuery.mutateAsync({
      name: dataDecoder.name,
      description: dataDecoder.description,
      fnc: dataDecoder.fnc,
    });
  };

  return (
    <div className="add-edit">
      <div className="header">
        <div className="title">Decoder</div>
        <Button
          variant="indicator"
          className="flex gap-4"
          onClick={() => setOpen((curr) => !curr)}
        >
          <span>back</span>
          <img height={12} src={backIcon} alt="back" />
        </Button>
      </div>
      <div
        className="body"
        style={{
          borderTop: "1px solid #2125293a",
        }}
      >
        <div className="row-input">
          <label htmlFor="name">name</label>
          <div>
            <Input
              id="name"
              placeholder="name"
              value={dataDecoder.name || ""}
              onChange={(e) => {
                setDataDecoder((curr) => ({
                  ...curr,
                  name: e.target.value,
                  errorname: e.target.value.length === 0 ? true : false,
                }));
              }}
            />
          </div>
          <label
            style={{
              alignSelf: "start",
              marginTop: "1rem",
            }}
            htmlFor="description"
          >
            description
          </label>
          <div>
            <Textarea
              id="description"
              placeholder="description"
              value={dataDecoder.description || ""}
              onChange={(e) => {
                setDataDecoder((curr) => ({
                  ...curr,
                  description: e.target.value,
                  errordescription: e.target.value.length === 0 ? true : false,
                }));
              }}
            />
          </div>
          <label htmlFor="name">code</label>
          <div>
            <Editor
              height={`300px`}
              language="javascript"
              defaultValue="function decoder(){/*your code here*/}"
              value={dataDecoder.fnc}
              onChange={(value, event) => {
                setDataDecoder({
                  ...dataDecoder,
                  fnc: value || "",
                  errorfnc: (value + "").length === 0 ? true : false,
                });
              }}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <Button
          onClick={() => {
            clearDataDecoder();
            setOpen(false);
          }}
          variant="outlined"
          color="#CDCED6"
        >
          <span style={{ color: "#4e5064" }}>cancel</span>
        </Button>
        <Button
          color="#006BA9"
          onClick={() => {
            AddDecoder();
          }}
        >
          save
        </Button>
      </div>
    </div>
  );
};

export default Add;
