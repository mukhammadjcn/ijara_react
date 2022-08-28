import React, { useState } from "react";
import { Alert, Button, Checkbox, Form, Input } from "antd";
import { MaskedInput } from "antd-mask-input";
import { CatchError, PrettyPhone } from "src/utils/index";
import { Link, useNavigate } from "react-router-dom";
import { RegisterCheckConfig, RegisterConfig } from "src/server/config/Urls";

function SignupForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [phone, setPhone] = useState<null | string>(null);
  const [accept, setAccept] = useState(false);
  const [smsSend, setSmsSend] = useState(false);
  const [phoneExist, setPhoneExist] = useState<null | boolean>(null);

  const submitPhone = async ({ phone_number }: any) => {
    // set Phone
    setPhone(PrettyPhone(phone_number));

    // API request
    try {
      const { data } = await RegisterConfig({
        phone_number: PrettyPhone(phone_number),
      });
      setSmsSend(true);
      setPhoneExist(false);
    } catch {
      setPhoneExist(true);
    }
  };
  const submitCode = async ({ code }: any) => {
    try {
      const { data } = await RegisterCheckConfig({
        phone_number: phone,
        code: code,
      });
      localStorage.setItem("access", data.access);
      navigate("/profile");
    } catch (error) {
      CatchError(error);
    }
  };

  return (
    <>
      {smsSend ? (
        <Form form={form} layout="vertical" onFinish={submitCode}>
          {phoneExist == false && (
            <Alert
              message={`Sizning +${phone} raqamingizga sms kod yuborildi, ushbu koddan parol sifatida foydalaning !`}
              type="success"
              style={{ marginBottom: 16 }}
            />
          )}

          <div>
            <Form.Item label="Kodni kiriting" name="code">
              <Input size="large" />
            </Form.Item>
            <Button type="primary" size="large" htmlType="submit">
              Ro'yhatdan o'tish
            </Button>
          </div>
        </Form>
      ) : (
        <Form form={form} layout="vertical" onFinish={submitPhone}>
          {phoneExist === true && (
            <Alert
              message="Bu raqam avval ro'yhatdan o'tgan"
              type="error"
              style={{ marginBottom: 16 }}
            />
          )}
          <div>
            <Form.Item
              label="Telefon raqamingiz"
              name="phone_number"
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

            <Checkbox
              className="accept-shartlar"
              onChange={(val) => setAccept(val.target.checked)}
            >
              <Link to={""}>Foydalanish shartlari</Link> qabul qilaman
            </Checkbox>

            <Button
              type="primary"
              size="large"
              htmlType="submit"
              disabled={!accept}
            >
              Ro'yhatdan o'tish
            </Button>
          </div>
        </Form>
      )}
    </>
  );
}

export default SignupForm;
