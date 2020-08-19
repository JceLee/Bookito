import React, { useState } from "react";
import { Form, Input, Button, Avatar, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import ModalBtn from "../../commonComponents/ModalBtn";

// for testing
const client = {
  img:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQNOhpV67XSI4Vz5Z_L7XoWiH7UzZQDBTzS3g&usqp=CAU",
  fname: "John",
  lname: "Doe",
  email: "johndoe@gmail.com",
  phone: "7781231234",
  city: "Vancouver",
  province: "BC",
};
export default function ClientProfileView() {
  // display inputs upon edit button click
  const [edit, setEdit] = useState(false);
  const editProfile = () => {
    setEdit(true);
  };

  // save profile to db and reload page
  const saveProfile = () => {
    window.location.reload(false);
  };

  // save profile photo to db and close modal
  const saveProfilePhoto = () => {
    modalHandler();
  };

  // form layout
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  // for modal
  const [visible, setVisible] = useState(false);
  const modalHandler = () => {
    setVisible(!visible);
  };

  // for dropzone
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  // display preview after dropping image
  const preview = files.map((file) => (
    <Avatar key={file.name} size={128} src={file.preview} />
  ));

  return (
    <div className="clientProfileView">
      <Form className="profileForm" {...layout}>
        <Form.Item className="profilePhoto">
          <Avatar size={128} src={client.img} />
          {edit ? (
            <EditOutlined className="editIcon" onClick={modalHandler} />
          ) : null}
        </Form.Item>
        <Form.Item className="clientName">
          <div>
            {client.fname} {client.lname}
          </div>
        </Form.Item>
        <Form.Item label="Email" className="formItems">
          {edit ? <Input value={client.email} /> : <div>{client.email}</div>}
        </Form.Item>
        <Form.Item label="Phone" className="formItems">
          {edit ? <Input value={client.phone} /> : <div>{client.phone}</div>}
        </Form.Item>
        <Form.Item label="City" className="formItems">
          {edit ? <Input value={client.city} /> : <div>{client.city}</div>}
        </Form.Item>
        <Form.Item label="Province" className="formItems">
          {edit ? (
            <Input value={client.province} />
          ) : (
            <div>{client.province}</div>
          )}
        </Form.Item>
        <Form.Item className="formItems">
          {edit ? (
            <Button className="saveBtn" onClick={saveProfile}>
              Save
            </Button>
          ) : (
            <Button className="saveBtn" onClick={setEdit}>
              Edit
            </Button>
          )}
        </Form.Item>
      </Form>
      {/* modal */}
      <Modal
        title="Change Photo"
        visible={visible}
        onCancel={modalHandler}
        destroyOnClose={true}
        className="changePhotoModal"
        footer={false}
      >
        <div className="modalProfilePhoto">
          {files.length === 0 ? (
            <Avatar size={128} src={client.img} />
          ) : (
            preview
          )}
        </div>

        <div
          {...getRootProps({ className: "dropzone" })}
          className="dragDropContainer"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <p>Drag and drop your photo here, or click to select files</p>
          )}
        </div>
        <ModalBtn btnName="Save" onClick={saveProfilePhoto} />
      </Modal>
    </div>
  );
}
