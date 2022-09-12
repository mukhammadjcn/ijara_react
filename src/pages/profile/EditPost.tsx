import React, { useEffect, useState } from "react";
import { MaskedInput } from "antd-mask-input";
import { PlusOutlined } from "@ant-design/icons";
import { BackSVG } from "src/assets/icons";
import type { UploadFile, RcFile } from "antd/es/upload/interface";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Select,
  Upload,
} from "antd";
import { CatchError, PrettyPhone } from "src/utils/index";
import SelectMap from "src/components/map/SelectMap";
import { useNavigate, useParams } from "react-router-dom";
import { metroList, regionsList } from "src/server/Host";
import { EditAdvertConfig, GetAdvertsIDConfig } from "src/server/config/Urls";

function EditPost() {
  const { Option } = Select;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { deep_link } = useParams();
  const [metro, setMetro] = useState(false);
  const [sherik, setSherik] = useState(false);
  const [loading, setLoading] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [location, setLocation] = useState<any>([]);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);

  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async (file: any) => {
    setPreviewImage(file.thumbUrl || (file.preview as string));
    setPreviewVisible(true);
  };
  const uploadPicture = (val: any) => {
    if (fileList.length < 8) {
      setFileList([...fileList, val]);
    } else {
      message.error("8 tadan ortiq rasm yuklab bo'lmaydi");
    }
    return false;
  };
  const onFinish = async (values: any) => {
    // loading true
    setLoading(true);

    if (fileList.length > 0 && location.length > 0) {
      // Making new Formadata
      const formData = new FormData();

      // Input values
      for (let item in values) {
        if (item == "phone_number") {
          formData.append(item, PrettyPhone(values[item]));
        } else {
          formData.append(item, values[item]);
        }
      }

      // Images
      fileList.forEach((item, index) =>
        formData.append(`image${index + 1}`, item as RcFile)
      );

      // Coordinates
      formData.append("latitude", location[0]);
      formData.append("longitude", location[1]);

      // Sending to API
      try {
        await EditAdvertConfig(deep_link, formData);

        // Give message to user
        message.success("Muvofaqqiyatli yangilandi !");

        // Navigate to profile
        navigate(-1);
      } catch (error) {
        CatchError(error);
      }
    } else {
      if (fileList.length < 1 && location.length < 1) {
        message.error("Iltimos manzil va rasmlarni yuklang !");
      } else if (location.length < 1) {
        message.error("Iltimos manzilni belgilang !");
      } else {
        message.error("Kamida bitta rasm yuklash kerak ");
      }
    }

    // loading false
    setLoading(false);
  };
  const deletePicture = (file: any) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };
  const GetAdvert = async (id: any) => {
    try {
      const { data } = await GetAdvertsIDConfig(id);

      // set form
      form.setFieldsValue(data);

      // set location
      setLocation([data.latitude, data.longitude]);

      // set district
      setDistricts(
        regionsList.find((region: any) => region.id == data.region).districts
      );

      // find district
      const district = regionsList
        .find((region: any) => region.id == data.region)
        .districts.find((dis: any) => dis.id == data.district);

      // set form field
      form.setFieldValue("district", district.id);
    } catch (error) {
      CatchError(error);
    }
  };

  useEffect(() => {
    GetAdvert(deep_link);
    window.scrollTo(0, 0);
  }, [deep_link]);

  return (
    <div className="create-advert" style={{ paddingTop: 0 }}>
      <button className="create-advert__back flex" onClick={() => navigate(-1)}>
        <BackSVG />
        <span>Orqaga qaytish</span>
      </button>
      <main className="create-advert__main flex">
        <div className="main">
          <Form
            name="basic"
            form={form}
            onFinish={onFinish}
            layout={"vertical"}
          >
            {/* E’lon turi */}
            <section className="main__adverts-type" id="1">
              <h2 className="title">E’lon turi</h2>

              {/* Profil turi */}
              <Form.Item
                label="Profil turi"
                name="profile_type"
                rules={[{ required: true, message: `Profil turini tanlang !` }]}
              >
                <Radio.Group optionType="button" buttonStyle="solid">
                  <Radio value="PP"> Jismoniy shaxs </Radio>
                  <Radio value="AG"> Agentlik </Radio>
                  <Radio value="UN"> Oliy ta’lim muassasasi </Radio>
                </Radio.Group>
              </Form.Item>

              {/* Ijara turi */}
              <Form.Item
                label="Ijara turi"
                name="rent_type"
                rules={[{ required: true, message: "Ijara turini tanlang !" }]}
              >
                <Radio.Group
                  optionType="button"
                  buttonStyle="solid"
                  onChange={(e) => setSherik(e.target.value === "PS")}
                >
                  <Radio value="LT"> Uzoq vaqtga</Radio>
                  <Radio value="ML"> Bir necha oy </Radio>
                  <Radio value="PS">Sheriklikka</Radio>
                </Radio.Group>
              </Form.Item>

              {/* Mulk turi */}
              <Form.Item
                label="Mulk turi"
                name="apartment_type"
                rules={[{ required: true, message: "Mulk turini tanlang !" }]}
              >
                <Radio.Group>
                  {!sherik && <Radio value="AP">Kavartira</Radio>}
                  <Radio value="CY">Xona</Radio>
                  {!sherik && <Radio value="RM">Hovli</Radio>}
                </Radio.Group>
              </Form.Item>

              {/* Manzil */}
              <div className="flex">
                <Form.Item
                  name="region"
                  label="Viloyatni tanlang"
                  style={{ width: "50%" }}
                  rules={[{ required: true, message: "Viloyatni tanlang !" }]}
                >
                  <Select
                    placeholder="Viloyatni tanlang"
                    onChange={(val) => {
                      setMetro(val == 17);
                      form.setFieldValue("district", null);
                      setDistricts(
                        regionsList.find((item: any) => item.id == val)
                          .districts
                      );
                    }}
                  >
                    {regionsList.length > 0 &&
                      regionsList.map((item: any) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="district"
                  label="Tumanni tanlang"
                  style={{ width: "50%" }}
                  rules={[{ required: true, message: "Tumanni tanlang !" }]}
                >
                  <Select placeholder="Tumanni tanlang">
                    {districts.length > 0 &&
                      districts.map((item: any) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </div>

              {/* Kimlar uchun */}
              {sherik && (
                <Form.Item
                  label="Kimlar uchun"
                  name="for_whom"
                  rules={[{ required: true, message: "Kimlar uchun ?" }]}
                >
                  <Radio.Group>
                    <Radio value="M">O‘g’il bolalar uchun</Radio>
                    <Radio value="F">Qiz bolalar uchun</Radio>
                  </Radio.Group>
                </Form.Item>
              )}

              {/* Sheriklikka nechta odam kerak */}
              {sherik && (
                <Form.Item
                  label="Sheriklikka nechta odam kerak"
                  name="number_of_partner"
                  rules={[
                    { required: true, message: "Odam sonini tanglang !" },
                  ]}
                >
                  <Radio.Group optionType="button" buttonStyle="solid">
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">3</Radio>
                    <Radio value="4">4+</Radio>
                  </Radio.Group>
                </Form.Item>
              )}
            </section>

            {/* Rasmlar */}
            <section id="2">
              <h2>Rasmlar</h2>
              <p>
                Birinchi surat e’loningiz asosiy rasmi bo’ladi. Suratlar
                tartibini ularning ustiga bosib va olib o’tish bilan
                o’zgartirishingiz mumkin.
              </p>
              <div style={{ marginTop: 16 }}>
                <Upload
                  listType="picture-card"
                  beforeUpload={uploadPicture}
                  onPreview={handlePreview}
                  onRemove={deletePicture}
                  maxCount={8}
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </div>
            </section>

            {/* Parametrlari */}
            <section className="main__adverts-parametrlar" id="3">
              <h2 className="title">Parametrlari</h2>

              {/* Xonalar soni */}
              <Form.Item
                label="Xonalar soni"
                name="number_of_rooms"
                rules={[
                  { required: true, message: "Xonalar sonini tanlang !" },
                ]}
              >
                <Radio.Group optionType="button" buttonStyle="solid">
                  <Radio value={1}>1</Radio>
                  <Radio value={2}>2</Radio>
                  <Radio value={3}>3</Radio>
                  <Radio value={4}>4</Radio>
                  <Radio value={5}>5</Radio>
                </Radio.Group>
              </Form.Item>

              {/* Uy parametrlari */}
              <div className="paramertlar">
                {/* Umumiy maydon */}
                <Form.Item
                  label="Umumiy maydon"
                  name="full_area"
                  rules={[{ required: true, message: `Maydonni to'ldiring !` }]}
                >
                  <Input addonAfter="㎡" />
                </Form.Item>

                {/* Yashash maydon */}
                <Form.Item
                  label="Yashash maydon"
                  name="live_area"
                  rules={[{ required: true, message: `Maydonni to'ldiring !` }]}
                >
                  <Input addonAfter="㎡" />
                </Form.Item>

                {/* Oshxona maydoni */}
                <Form.Item
                  label="Oshxona maydoni"
                  name="kitchen_area"
                  rules={[{ required: true, message: `Maydonni to'ldiring !` }]}
                >
                  <Input addonAfter="㎡" />
                </Form.Item>

                {/* Qavati */}
                <Form.Item
                  label="Qavati"
                  name="floor"
                  rules={[{ required: true, message: `Maydonni to'ldiring !` }]}
                >
                  <Input />
                </Form.Item>

                {/*umumiy Qavati */}
                <Form.Item
                  label="Umumiy qavati"
                  name="number_of_floors"
                  rules={[{ required: true, message: `Maydonni to'ldiring !` }]}
                >
                  <Input />
                </Form.Item>

                {/* Shift balandligi */}
                <Form.Item
                  label="Shift balandligi"
                  name="ceiling_height"
                  rules={[{ required: true, message: `Maydonni to'ldiring !` }]}
                >
                  <Input addonAfter="m" />
                </Form.Item>
              </div>

              {/* Sanuzel */}
              <Form.Item
                label="Sanuzel"
                name="wash_room"
                rules={[{ required: true, message: `Maydonni to'ldiring !` }]}
              >
                <Radio.Group optionType="button" buttonStyle="solid">
                  <Radio value="SP">Alohida</Radio>
                  <Radio value="MX">Aralash</Radio>
                  <Radio value="MT">2 va undan ko‘p</Radio>
                </Radio.Group>
              </Form.Item>

              {/* Mebeli */}
              <Form.Item
                label="Mebeli"
                name="is_furnished"
                rules={[{ required: true, message: `Maydonni to'ldiring !` }]}
              >
                <Radio.Group optionType="button" buttonStyle="solid">
                  <Radio value={true}>Ha</Radio>
                  <Radio value={false}>Yo‘q</Radio>
                </Radio.Group>
              </Form.Item>
            </section>

            {/* Qo‘shimcha qulayliklar */}
            <section className="main__adverts-qoshimcha" id="4">
              <h2 className="title">Qo‘shimcha qulayliklar</h2>

              {/* Uydagi jihozlar */}
              <div className="paramertlar">
                <Form.Item noStyle name="have_internet" valuePropName="checked">
                  <Checkbox>Internet</Checkbox>
                </Form.Item>
                <Form.Item name="have_tv" valuePropName="checked" noStyle>
                  <Checkbox>Televizor</Checkbox>
                </Form.Item>
                <Form.Item
                  name="have_washing_machine"
                  valuePropName="checked"
                  noStyle
                >
                  <Checkbox>Kir yuvish mashinasi</Checkbox>
                </Form.Item>
                <Form.Item
                  name="have_air_conditioner"
                  valuePropName="checked"
                  noStyle
                >
                  <Checkbox>Konditsioner</Checkbox>
                </Form.Item>
                <Form.Item name="have_kitchen" valuePropName="checked" noStyle>
                  <Checkbox>Oshxona</Checkbox>
                </Form.Item>
                <Form.Item
                  name="have_refrigerator"
                  valuePropName="checked"
                  noStyle
                >
                  <Checkbox>Muzlatkich</Checkbox>
                </Form.Item>
                <Form.Item name="have_tv_cable" valuePropName="checked" noStyle>
                  <Checkbox>Kabelli TV</Checkbox>
                </Form.Item>
                <Form.Item name="have_balcony" valuePropName="checked" noStyle>
                  <Checkbox>Balkon</Checkbox>
                </Form.Item>
              </div>

              {metro && (
                <div>
                  {/* Yaqinida joylashgan metro */}
                  <Form.Item
                    label="Yaqinida joylashgan metro"
                    name="near_metro"
                    rules={[
                      { required: true, message: `Maydonni to'ldiring !` },
                    ]}
                  >
                    <Select placeholder="Metro nomini tanlang">
                      {metroList.length > 0 &&
                        metroList.map((item: any) => (
                          <Option key={item.id} value={item.id}>
                            {item.name}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>

                  {/* Metrogacha qanday boriladi */}
                  <Form.Item
                    label="Metrogacha qanday boriladi"
                    name="transport_to_metro"
                    rules={[
                      { required: true, message: `Maydonni to'ldiring !` },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value={false}>Piyoda</Radio>
                      <Radio value={true}>Transportda</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <div className="flex">
                    <Form.Item
                      name="distance_to_metro"
                      style={{ width: "50%" }}
                      label="Uydan metrogacha bo‘lgan masofa"
                      rules={[
                        {
                          required: true,
                          message: `Maydonni to'ldiring !`,
                        },
                      ]}
                    >
                      <Input addonAfter="metr" />
                    </Form.Item>

                    <Form.Item
                      name="time_to_metro"
                      style={{ width: "50%" }}
                      label="Metrogacha ketadigan vaqt"
                      rules={[
                        {
                          required: true,
                          message: `Maydonni to'ldiring !`,
                        },
                      ]}
                    >
                      <Input addonAfter="daqiqa" />
                    </Form.Item>
                  </div>
                </div>
              )}
            </section>

            {/* Narxi */}
            <section className="main__adverts-narx" id="5">
              <h2 className="title">Narxi</h2>

              {/* Narx */}
              <div
                className="flex"
                style={{
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  gap: 16,
                }}
              >
                <Form.Item
                  label="Oylik to'lov"
                  name="cost_per_month"
                  rules={[{ required: true, message: `Maydonni to'ldiring !` }]}
                >
                  <InputNumber
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    addonAfter="so‘m/oyiga"
                  />
                </Form.Item>

                <Form.Item name="is_negotiable" valuePropName="checked" noStyle>
                  <Checkbox>Narxi kelishiladi</Checkbox>
                </Form.Item>
              </div>

              {/* Kommunal to'lovlar */}
              <Form.Item
                label="Kommunal to'lovlar"
                name="have_utility_bills"
                rules={[{ required: true, message: `Maydonni to'ldiring !` }]}
              >
                <Radio.Group optionType="button" buttonStyle="solid">
                  <Radio value={true}>Oylik to‘lov ichida</Radio>
                  <Radio value={false}>Xisoblagichga qarab alohida</Radio>
                </Radio.Group>
              </Form.Item>

              {/* Vositachilik haqqi* */}
              <Form.Item
                label="Vositachilik haqqi"
                name="have_commission_fee"
                rules={[{ required: true, message: `Maydonni to'ldiring !` }]}
              >
                <Radio.Group optionType="button" buttonStyle="solid">
                  <Radio value={true}>Bor</Radio>
                  <Radio value={false}>Yo‘q</Radio>
                </Radio.Group>
              </Form.Item>
            </section>

            {/* Tavsif */}
            <section className="main__adverts-about" id="6">
              <h2 className="title">Tavsif</h2>

              {/* Qisqacha ma'lumot */}
              <Form.Item
                label="Qisqacha ma'lumot"
                name="description"
                rules={[{ required: true, message: `Maydonni to'ldiring !` }]}
              >
                <Input.TextArea showCount maxLength={1000} rows={5} />
              </Form.Item>
            </section>

            {/* Manzil */}
            <section className="main__adverts-map" id="7">
              <h2 className="title">Manzil</h2>
              <p>Iltimos uyingiz manzilini kartadan belgilang !</p>
              <div style={{ marginTop: 16 }} className="map">
                <SelectMap
                  setLocation={(cor: any) => {
                    setLocation(cor);
                  }}
                  defaultLocation={location}
                  location={location}
                />
              </div>
            </section>

            {/* Telefon raqam */}
            <section className="main__adverts-phone" id="8">
              <h2 className="title">Aloqa uchun ma'lumotlar</h2>

              <div className="flex" style={{ alignItems: "flex-end" }}>
                <Form.Item
                  label="Telefon raqamingiz"
                  name="phone_number"
                  style={{ flexGrow: 1 }}
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
                  <MaskedInput prefix="+998" mask={"(00) 000 00 00"} />
                </Form.Item>

                <Form.Item>
                  <Button
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    style={{ float: "right" }}
                  >
                    Ma'lumotlarni junatish
                  </Button>
                </Form.Item>
              </div>
            </section>

            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </Form>
        </div>
      </main>
    </div>
  );
}

export default EditPost;
