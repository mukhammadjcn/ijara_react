import React from "react";
import { Alert, Button, Form, Input, message } from "antd";
import { BackSVG } from "src/assets/icons";
import { CatchError } from "src/utils/index";
import { ChangePasswordConfig } from "src/server/config/Urls";

function VerifyPassword({ setSection, phone }: any) {
  const [form] = Form.useForm();

  const handleSubmit = async (val: any) => {
    try {
      await ChangePasswordConfig(phone, val);
      message.success(
        "Muvofaqqiyatli yangilandi, profilingizga yangi parolingiz bilan kiring !"
      );
    } catch (error) {
      CatchError(error);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <h2 style={{ marginBottom: 16 }}>Kod va yangi parolni kiriting</h2>

      <Alert
        style={{ marginBottom: 16 }}
        message={`Yangi parolingizni oʼrnatish uchun kod +${phone} yuborildi.`}
        type="warning"
      />

      <Form.Item
        name="code"
        label="SMS kodni kiriting"
        rules={[
          {
            required: true,
            message: "Iltimos paroni kirting!",
          },
          {
            min: 6,
            message: "Parol kamida 6 ta harfdan iborat bo'lishi kerak ",
          },
        ]}
      >
        <Input.Password size="large" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Yangi parol"
        rules={[
          {
            required: true,
            message: "Iltimos parolni qayta kiriting!",
          },
          {
            min: 6,
            message: "Parol kamida 6 ta harfdan iborat bo'lishi kerak ",
          },
        ]}
      >
        <Input.Password size="large" />
      </Form.Item>

      <Button type="primary" size="large" htmlType="submit">
        Tizimga kirish
      </Button>

      <button
        onClick={() => setSection("resetPassword")}
        className="back-button"
      >
        <BackSVG />
      </button>
    </Form>
  );
}

export default VerifyPassword;
