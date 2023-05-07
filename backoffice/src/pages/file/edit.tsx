import Button from "../../components/button";
import React, { useMemo, useState } from "react";
import { useProvider } from "../../components/provider";
import backIcon from "../../assets/icons/back.svg";
import Textarea from "../../components/textarea";
import Select from "../../components/select";
import { postFiles, updateFile } from "../../api/files";
import { toast } from "react-toastify";
import Dropzone from "../../components/dropzone";
import "../../components/dropzone/styles.scss";
import Input from "../../components/input";
import { useMutation } from "@tanstack/react-query";

interface Context {
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  openModal: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  rowSelected: [
    {
      id: string;
      name: string;
      version: string;
      description: string;
      hash: string;
      file: string;
    },
    React.Dispatch<React.SetStateAction<any>>
  ];
  updatePage: () => void;
  save: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const Add = () => {
  const [file, setFile] = useState(null);
  const context = useProvider<Context>();
  const [rowSelected] = context.rowSelected;
  const [, setOpen] = context.open;
  const [, setSave] = context.save;
  const [dataFile, setDataFile] = React.useState({
    name: "",
    version: "",
    description: "",
    hash: "",
    file: null,
    errorname: false,
    errorversion: false,
    errordescription: false,
  });

  useMemo(() => {
    if (rowSelected) {
      setDataFile({
        name: rowSelected.name,
        version: rowSelected.version,
        description: rowSelected.description,
        hash: rowSelected.hash,
        file: null,
        errorname: false,
        errorversion: false,
        errordescription: false,
      });
    }
  }, [rowSelected]);
  const clearData = () => {
    setDataFile({
      name: "",
      version: "",
      description: "",
      hash: "",
      file: null,
      errorname: false,
      errorversion: false,
      errordescription: false,
    });
    setFile(null);
  };

  const updateFileQuery = useMutation({
    mutationFn: (data: any) => {
      let id = data.get("id");
      data.delete("id");
      return updateFile(id, data);
    },
    onSuccess: (data) => {
      setOpen(false);
      toast.success("File updated successfully");
      setSave((cur) => !cur);
    },
    onError: (err: any) => {
      toast.error(err?.message);
    },
  });

  const handleUpdate = async () => {
    let formData = new FormData();
    formData.append("name", dataFile.name);
    formData.append("version", dataFile.version);
    formData.append("description", dataFile.description);
    formData.append("hash", dataFile.hash);
    if (file) {
      formData.append("file", file);
    }
    formData.append("id", rowSelected.id);
    await updateFileQuery.mutateAsync(formData);
  };
  return (
    <div className="add-edit ">
      <div className="header">
        <div className="title">Upload new file</div>
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
          <label htmlFor="deviceId">name</label>
          <div>
            <Input
              id="name"
              value={dataFile?.name || ""}
              placeholder="name"
              onChange={(e) => {
                setDataFile((curr) => ({ ...curr, name: e.target.value }));
              }}
            />
          </div>
          <label>version</label>
          <div>
            <Input
              id="version"
              value={dataFile.version}
              placeholder="version"
              onChange={(e) => {
                setDataFile((curr) => ({ ...curr, version: e.target.value }));
              }}
            />
          </div>
          <label>hash</label>
          <div>
            <Input
              id="hash"
              value={dataFile.hash}
              placeholder="hash"
              onChange={(e) => {
                setDataFile((curr) => ({ ...curr, hash: e.target.value }));
              }}
            />
          </div>
          <label>Description</label>
          <div>
            <Textarea
              name="description"
              id=""
              placeholder="description"
              value={dataFile.description}
              onChange={(e) => {
                setDataFile((curr) => ({
                  ...curr,
                  description: e.target.value,
                }));
              }}
            ></Textarea>
          </div>

          <label>Upload File</label>
          <Dropzone setFile={setFile} />
        </div>
      </div>
      <div className="footer">
        <Button
          onClick={() => setOpen((curr) => !curr)}
          variant="outlined"
          color="#CDCED6"
        >
          <span style={{ color: "#4e5064" }}>cancel</span>
        </Button>

        <Button
          onClick={() => {
            handleUpdate();
          }}
          color="#006BA9"
          disabled={updateFileQuery.isLoading}
        >
          {updateFileQuery.isLoading ? "loading" : "Upload"}
        </Button>
      </div>
    </div>
  );
};

export default Add;
