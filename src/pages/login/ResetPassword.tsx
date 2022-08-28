import React from "react";
import { Alert, Button, Form } from "antd";
import { MaskedInput } from "antd-mask-input";
import { BackSVG } from "src/assets/icons";
import { CatchError, PrettyPhone } from "src/utils/index";
import { ResendConfig } from "src/server/config/Urls";

function ResetPassword({ setTab, setSection, setPhone }: any) {
  const [form] = Form.useForm();

  const handleSubmit = async ({ phone }: any) => {
    try {
      const { data } = await ResendConfig({
        phone_number: PrettyPhone(phone),
      });
      setSection("confirm");
      setPhone(data.phone_number);
    } catch (error) {
      CatchError(error);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <h2 style={{ marginBottom: 16 }}>Parolingiz esdan chiqdimi?</h2>

      <Alert
        style={{ marginBottom: 16 }}
        message="Telefon raqamingizni yozing va biz sizga tasdiqlash kodini yuboramiz.
        Shundan soʼng yangi parol oʼrnatishingiz mumkin."
        type="warning"
      />

      <Form.Item
        label="Telefon raqamingiz"
        name="phone"
        rules={[
          {
            required: true,
            message: "Telefon raqamni kiriting",
          },
          {
            pattern: /^\(\d{2}\) \d{3} \d{2} \d{2}$/,
            message: "Iltimos telefon raqamni to'liq kiriting",
          },
        ]}
      >
        <MaskedInput prefix="+998" mask={"(00) 000 00 00"} size="large" />
      </Form.Item>

      <Button type="primary" size="large" htmlType="submit">
        Ro'yhatdan o'tish
      </Button>

      <button onClick={() => setTab("sign")} className="back-button">
        <BackSVG />
      </button>
    </Form>
  );
}

export default ResetPassword;
