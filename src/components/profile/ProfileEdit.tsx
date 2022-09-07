import React, { useEffect, useState } from "react";
import { CatchError, PrettyPhone } from "src/utils/index";
import { MaskedInput } from "antd-mask-input";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Image,
  Input,
  message,
  Modal,
  Upload,
  UploadFile,
} from "antd";
import {
  EditPasswordConfig,
  EditUserConfig,
  GetUserConfig,
} from "src/server/config/Urls";
import { useDispatch } from "react-redux";
import { setUser } from "src/redux/slices/login";
import { useAppSelector } from "src/hooks/index";
import { RcFile } from "antd/lib/upload";

function ProfileEdit() {
  const dispatch = useDispatch();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [previewImage, setPreviewImage] = useState("");
  const user = useAppSelector((state) => state.Login.user);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);

  const handlePreview = async (file: any) => {
    setPreviewImage(file.thumbUrl || (file.preview as string));
    setPreviewVisible(true);
  };
  const uploadPicture = (val: any) => {
    if (fileList.length < 2) {
      setFileList([...fileList, val]);
    } else {
      message.error("1 tadan ortiq rasm yuklab bo'lmaydi");
    }
    return false;
  };
  const handleCancel = () => setPreviewVisible(false);

  // Api---------------------------------------------
  const changePassword = async (val: any) => {
    try {
      await EditPasswordConfig(val);
      message.success("Muvofaqqiyatli yangilandi !");
      form1.resetFields();
      getUser();
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
      getUser();
    } catch (error) {
      CatchError(error);
    }
  };

  const sendLogo = async (val: any) => {
    if (Object.keys(fileList).length > 0) {
      try {
        // Create new formdata
        const data = new FormData();
        data.append("agent_name", val.agent_name);

        // Images
        fileList.forEach((item) => data.append(`agent_logo`, item as RcFile));

        // Post to api
        await EditUserConfig(data);
        message.success("Muvofaqqiyatli yangilandi !", 2000);

        // Reset fields
        setTimeout(() => window.location.reload(), 2000);
      } catch (error) {
        CatchError(error);
      }
    } else {
      message.error("File ni yuklang");
    }
  };

  const getUser = async () => {
    try {
      const { data } = await GetUserConfig();
      dispatch(setUser(data));
    } catch (error) {
      CatchError(error);
    }
  };

  const setDefaults = () => {
    form2.setFieldsValue({
      name: user.name,
      phone_number: user.phone_number.replace("998", ` `),
    });

    form3.setFieldsValue({
      agent_name: user.agent_name,
    });
  };

  useEffect(() => {
    setDefaults();
  }, [user]);

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
            rules={[
              { required: true, message: "Avvalgi passwordni kiriting !" },
            ]}
          >
            <Input placeholder="Parolingizni kiriting" size="large" />
          </Form.Item>

          <Form.Item
            label="Yangi parolingiz"
            name="new_password"
            rules={[{ required: true, message: "Yangi passwordni kiriting !" }]}
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
          <div
            className="flex"
            style={{ alignItems: "flex-start", justifyContent: "flex-start" }}
          >
            {user.agent_logo && (
              <div>
                <h4>Mavjud logo</h4>
                <Image width={102} height={102} src={user.agent_logo} />
              </div>
            )}
            <Form.Item label="Yangi logo" valuePropName="fileList">
              <Upload
                listType="picture-card"
                beforeUpload={uploadPicture}
                onPreview={handlePreview}
                onRemove={() => setFileList([])}
                maxCount={1}
              >
                {Object.keys(fileList).length < 1 && (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Yuklash</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </div>

          <Form.Item
            label="OTM yoki agentlik nomi"
            name="agent_name"
            rules={[
              { required: true, message: "OTM yoki agentlik nomi kiriting !" },
            ]}
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
