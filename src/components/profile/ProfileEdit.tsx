import React, { useState } from "react";
import { CatchError, PrettyPhone } from "src/utils/index";
import { MaskedInput } from "antd-mask-input";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Upload } from "antd";
import { EditPasswordConfig, EditUserConfig } from "src/server/config/Urls";

function ProfileEdit() {
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<string | Blob>("");
  const [previewVisible, setPreviewVisible] = useState(false);

  const handlePreview = async (file: any) => {
    setPreviewImage(file.thumbUrl || (file.preview as string));
    setPreviewVisible(true);
  };
  const handleCancel = () => setPreviewVisible(false);

  // Api---------------------------------------------
  const changePassword = async (val: any) => {
    try {
      await EditPasswordConfig(val);
      message.success("Muvofaqqiyatli yangilandi !");
      form1.resetFields();
    } catch (error) {
      CatchError(error);
    }
  };

  const changeUserInfo = async (val: any) => {
    try {
      await EditUserConfig({
        name: val.name,
        phone_number: PrettyPhone(val.phone_number),
      });
      message.success("Muvofaqqiyatli yangilandi !");
      form2.resetFields();
    } catch (error) {
      CatchError(error);
    }
  };

  const sendLogo = async (val: any) => {
    if (Object.keys(fileList).length > 0) {
      // Create new formdata
      const data = new FormData();
      data.append("agent_name", val.name);
      data.append("agent_logo", fileList);

      // Post to api
      await EditUserConfig(data);
      message.success("Muvofaqqiyatli yangilandi !");
      form3.resetFields();
      setPreviewImage("");
      setFileList("");
    } else {
      message.error("File ni yuklang");
    }
  };

  return (
    <div className="profile__edit">
      {/* Change password */}
      <section>
        <h2>Parolni o‘zgartirish</h2>

        <Form
          form={form1}
          name="password"
          autoComplete="off"
          layout="vertical"
          onFinish={changePassword}
        >
          <Form.Item
            label="Parolingiz"
            name="old_password"
            rules={[{ required: true }]}
          >
            <Input placeholder="Parolingizni kiriting" size="large" />
          </Form.Item>

          <Form.Item
            label="Yangi parolingiz"
            name="new_password"
            rules={[{ required: true }]}
          >
            <Input placeholder="Yangi parolingizni kiritng" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              O‘zgartirish
            </Button>
          </Form.Item>
        </Form>
      </section>

      {/* Bog‘lanish uchun ma‘lumotlarni o‘zgartirish */}
      <section>
        <h2>Bog‘lanish uchun ma‘lumotlarni o‘zgartirish</h2>

        <Form
          name="phone"
          autoComplete="off"
          form={form2}
          onFinish={changeUserInfo}
          layout="vertical"
        >
          <Form.Item
            label="Aloqa uchun shaxs ismi"
            name="name"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Aloqa uchun shaxs ismini kiriting"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Telefon raqami"
            name="phone_number"
            rules={[
              {
                required: true,
                message: "Telefon raqamingizni kiriting",
              },
              {
                pattern: /^\(\d{2}\) \d{3} \d{2} \d{2}$/,
                message: "Iltimos telefon raqamni to'liq kiriting",
              },
            ]}
          >
            <MaskedInput prefix="+998" mask={"(00) 000 00 00"} size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              O‘zgartirish
            </Button>
          </Form.Item>
        </Form>
      </section>

      {/* Oliy ta’lim muassasasi yoki agentlik logosi */}
      <section>
        <h2>Oliy ta’lim muassasasi yoki agentlik logosi</h2>

        <Form
          name="phone"
          autoComplete="off"
          layout="vertical"
          form={form3}
          onFinish={sendLogo}
        >
          <Form.Item
            label="OTM yoki agentlik nomini logosi"
            valuePropName="fileList"
          >
            <Upload
              listType="picture-card"
              beforeUpload={(val: any) => {
                setFileList(val);
                return false;
              }}
              onPreview={handlePreview}
              onRemove={() => setFileList("")}
              maxCount={1}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Yuklash</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            label="OTM yoki agentlik nomi"
            name="agent_logo"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="OTM yoki agentlik nomini kiriting"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              O‘zgartirish
            </Button>
          </Form.Item>
        </Form>
      </section>

      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
}

export default ProfileEdit;
