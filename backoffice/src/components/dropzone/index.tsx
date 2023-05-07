import React, {
  Dispatch,
  FunctionComponent,
  useCallback,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import Upload from "../../assets/icons/upload.png";
import "./styles.scss";

const Dropzone = ({ setFile }: { setFile: Dispatch<any> }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState("");
  const onDrop = useCallback((acceptedFiles: any) => {
    setFile(acceptedFiles[0]);
    setSelectedFileUrl(acceptedFiles[0].name);
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      multiple: false,
    });

  return (
    <div {...getRootProps()} className="dropzone2">
      <input {...getInputProps()} />
      <div className="img1">
        <img
          src={Upload}
          alt=""
          style={{ maxHeight: 30, maxWidth: 48, marginBottom: 20 }}
        />

        <p className="textdropzone2">
          Click or drag file to this area to upload
        </p>
        <p className="text2dropzone2">
          Support for a single upload or bulk upload. Maximum file size 2MB
        </p>
        <p className="text2dropzone2">
          {selectedFileUrl ? selectedFileUrl : ""}
        </p>
      </div>
    </div>
  );
};
export default Dropzone;
