import React from "react";
import { Button, Form, Input } from "antd";
import { MaskedInput } from "antd-mask-input";
import { CatchError, PrettyPhone } from "src/utils/index";
import { useNavigate } from "react-router-dom";
import { LoginConfig } from "src/server/config/Urls";

function SigninForm({ setTab, setSection }: any) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async ({ password, phone_number }: any) => {
    try {
      const { data } = await LoginConfig({
        phone_number: PrettyPhone(phone_number),
        password,
      });
      localStorage.setItem("access", data.access);
      window.location.href = "/profile";
    } catch (error) {
      CatchError(error);
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Form.Item
        label="Telefon raqamingiz"
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

      <Form.Item
        label="Parol"
        name="password"
        rules={[
          {
            required: true,
            message: "Foydalanuvchu parolini kiriting",
          },
        ]}
      >
        <Input.Password size="large" />
      </Form.Item>

      <span
        className="password-reset"
        onClick={() => {
          setTab("reset");
          setSection("resetPassword");
        }}
      >
        Parolni unitdingizmi ?
      </span>

      <Button htmlType="submit" type="primary" size="large">
        Kirish
      </Button>
    </Form>
  );
}

export default SigninForm;
