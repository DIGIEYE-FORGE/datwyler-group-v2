import Button from "../../components/button";
import React, { useState } from "react";
import { useProvider } from "../../components/provider";
import backIcon from "../../assets/icons/back.svg";
import Textarea from "../../components/textarea";
import { postFiles } from "../../api/files";
import { toast } from "react-toastify";
import Dropzone from "../../components/dropzone";
import "../../components/dropzone/styles.scss";
import Input from "../../components/input";

interface Context {
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  openModal: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  updatePage: () => void;
}

const Add = () => {
  const [file, setFile] = useState(null);
  const context = useProvider<Context>();
  const [open, setOpen] = context.open;
  const updatePage = context.updatePage;
  const [dataFile, setDataFile] = React.useState({
    name: "",
    version: "",
    discription: "",
    errorname: false,
    errorversion: false,
    errordiscription: false,
  });

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
        className="body "
        style={{
          borderTop: "1px solid #2125293a",
        }}
      >
        <div className="row-input ">
          <label htmlFor="deviceId">name</label>
          <div>
            <Input
              id="name"
              value={dataFile.name}
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
          <label>Discription</label>
          <div>
            <Textarea
              name="discription"
              id=""
              placeholder="discription"
            ></Textarea>
          </div>
          <label>Upload File</label>
          <div className="flex">
            <div className=" dropzone">
              <Dropzone setFile={setFile} />
              {/* {file?.name} */}
            </div>
          </div>
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
            let formData = new FormData();
            formData.append("name", dataFile.name);
            formData.append("version", dataFile.version);
            formData.append("file", (file as any) || "");

            postFiles(formData)
              .then((res) => {
                console.log("hiudhqsuhdiuhsqdiuhidqs", res);

                setOpen(false);
                toast.success("success");
                updatePage();
              })
              .catch((err) => {
                toast.error("error");
                console.log("error is : ", err);
              });
          }}
          color="#006BA9"
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

export default Add;
