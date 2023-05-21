import Button from "../../components/button";
import React, { useState } from "react";
import { useProvider } from "../../components/provider";
import backIcon from "../../assets/icons/back.svg";
import Textarea from "../../components/textarea";
import Select from "../../components/select";
import { postFiles } from "../../api/files";
import { toast } from "react-toastify";
import Dropzone from "../../components/dropzone";
import "../../components/dropzone/styles.scss";
import Input from "../../components/input";
import { signUp } from "../../api/user";
import { useMutation } from "@tanstack/react-query";
import { Toast } from "react-toastify/dist/components";

interface Context {
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  openModal: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  updatePage: () => void;
  save: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  tenantSelected: [number, React.Dispatch<React.SetStateAction<number>>];
}

const Add = () => {
  const [file, setFile] = useState(null);
  const context = useProvider<Context>();
  const [open, setOpen] = context.open;
  const updatePage = context.updatePage;
  const [, setSave] = context.save;
  const [tenantSelected, setTenantSelected] = context.tenantSelected;

  const postUserQuery = useMutation({
    mutationFn: (data: any) => signUp(data, tenantSelected),
    onSuccess: (data:any) => {
      setOpen(false);
      setSave(true);
      toast.success("User added successfully");
    },
    onError: (err: any) => {
      toast.error(err?.message);
    },
  });
  return (
    <form
      className="add-edit"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        if (file) {
          formData.append("avatar", file);
        }
        postUserQuery.mutateAsync(formData);
      }}
    >
      <div className="header">
        <div className="title">Add User</div>
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
        <div className="row-input ">
          <label>firt Name</label>
          <div>
            <Input id="firstName" name="firstName" placeholder="first name" />
          </div>
          <label>last name</label>
          <div>
            <Input id="lastName" name="lastName" placeholder="last name" />
          </div>
          <label>email</label>
          <div>
            <Input id="email" name="email" placeholder="Email" />
          </div>
          <label>password</label>
          <div>
            <Input
              id="password"
              type={"password"}
              name="password"
              placeholder="password"
            />
          </div>
          <label>image</label>
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

        <Button type="submit" color="#006BA9">
          send
        </Button>
      </div>
    </form>
  );
};

export default Add;
