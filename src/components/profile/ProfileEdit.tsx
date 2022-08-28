import { Button, Form, Input, message, Modal, Upload } from "antd";
import { MaskedInput } from "antd-mask-input";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";

function ProfileEdit() {
  const [fileList, setFileList] = useState<string | Blob>("");
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);

  const handlePreview = async (file: any) => {
    setPreviewImage(file.thumbUrl || (file.preview as string));
    setPreviewVisible(true);
  };
  const handleCancel = () => setPreviewVisible(false);

  // Api---------------------------------------------
  const sendLogo = async (val: any) => {
    if (Object.keys(fileList).length > 0) {
      const data = new FormData();
      data.append("name", val.name);
      data.append("img", fileList);
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
          name="password"
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Parolingiz"
            name="password"
            rules={[{ required: true }]}
          >
            <Input placeholder="Parolingizni kiriting" size="large" />
          </Form.Item>

          <Form.Item
            label="Yangi parolingiz"
            name="new-password"
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
          initialValues={{ remember: true }}
          autoComplete="off"
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
            name="phone"
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
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
          onFinish={sendLogo}
        >
          <Form.Item label="Upload" valuePropName="fileList">
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
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            label="OTM yoki agentlik nomi"
            name="name"
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
