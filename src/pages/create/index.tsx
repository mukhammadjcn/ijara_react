import React, { useState } from "react";
import { MaskedInput } from "antd-mask-input";
import { PlusOutlined } from "@ant-design/icons";
import { BackSVG, CheckFilledSVG, CheckSVG } from "src/assets/icons";
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
import { useNavigate } from "react-router-dom";
import { PostAdvertConfig } from "src/server/config/Urls";
import Header from "src/components/header";
import Footer from "src/components/footer";
import { metroList, regionsList } from "src/server/Host";

function CreateAdvert() {
  const { Option } = Select;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [metro, setMetro] = useState(false);
  const [sherik, setSherik] = useState(false);
  const [location, setLocation] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);

  // Section validation
  const [type, setType] = useState(false);
  const [images, setImages] = useState(false);
  const [parametr, setParametr] = useState(false);
  const [price, setPrice] = useState(false);
  const [about, setAbout] = useState(false);
  const [map, setMap] = useState(false);
  const [phone, setPhone] = useState(false);

  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async (file: any) => {
    setPreviewImage(file.thumbUrl || (file.preview as string));
    setPreviewVisible(true);
  };
  const checkDone = () => {
    const data = form.getFieldsValue();

    // section 1
    if (
      data.profile_type &&
      data.rent_type &&
      data.apartment_type &&
      data.region &&
      data.district
    ) {
      setType(true);
    } else {
      setType(false);
    }

    // section 2
    if (fileList.length > 0) {
      setImages(true);
    }

    // section 3
    if (
      (data.number_of_rooms &&
        data.full_area &&
        data.live_area &&
        data.kitchen_area &&
        data.number_of_floors &&
        data.ceiling_height &&
        data.wash_room &&
        data.floor) ||
      data.is_furnished
    ) {
      setParametr(true);
    } else {
      setParametr(false);
    }

    // section 5
    if (data.cost_per_month) {
      setPrice(true);
    } else {
      setPrice(false);
    }

    // section 6
    if (data.description) {
      setAbout(true);
    } else {
      setAbout(false);
    }

    if (!data.phone_number?.includes("_")) {
      setPhone(true);
    } else {
      setPhone(false);
    }
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
        await PostAdvertConfig(formData);

        // Reset fields
        form.resetFields();
        setFileList([]);
        setLocation([]);

        // Give message to user
        message.success(
          "Muvofaqqiyatli yuborildi, tez orada e'loningiz moderator tomonidan ko'rib chiqiladi !"
        );

        // Navigate to profile
        navigate("/profile");
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
  };
  const deletePicture = (file: any) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);

    if (newFileList.length >= 1) {
      setImages(true);
    } else {
      setImages(false);
    }
  };

  return (
    <>
      <Header />
      <div className="create-advert">
        <div className="container">
          <button
            className="create-advert__back flex"
            onClick={() => navigate(-1)}
          >
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
                onChange={checkDone}
                initialValues={{
                  is_negotiable: false,
                  have_internet: false,
                  have_tv: false,
                  have_washing_machine: false,
                  have_air_conditioner: false,
                  have_kitchen: false,
                  have_refrigerator: false,
                  have_tv_cable: false,
                  have_balcony: false,
                }}
              >
                {/* E’lon turi */}
                <section className="main__adverts-type" id="1">
                  <h2 className="title">E’lon turi</h2>

                  {/* Profil turi */}
                  <Form.Item
                    label="Profil turi"
                    name="profile_type"
                    rules={[
                      { required: true, message: `Profil turini tanlang !` },
                    ]}
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
                    rules={[
                      { required: true, message: "Ijara turini tanlang !" },
                    ]}
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
                    rules={[
                      { required: true, message: "Mulk turini tanlang !" },
                    ]}
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
                      rules={[
                        { required: true, message: "Viloyatni tanlang !" },
                      ]}
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
                      <Select
                        placeholder="Tumanni tanlang"
                        onChange={checkDone}
                      >
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
                      <Radio value="1">1</Radio>
                      <Radio value="2">2</Radio>
                      <Radio value="3">3</Radio>
                      <Radio value="4">4</Radio>
                      <Radio value="5">5</Radio>
                    </Radio.Group>
                  </Form.Item>

                  {/* Uy parametrlari */}
                  <div className="paramertlar">
                    {/* Umumiy maydon */}
                    <Form.Item
                      label="Umumiy maydon"
                      name="full_area"
                      rules={[
                        { required: true, message: `Maydonni to'ldiring !` },
                      ]}
                    >
                      <Input addonAfter="㎡" />
                    </Form.Item>

                    {/* Yashash maydon */}
                    <Form.Item
                      label="Yashash maydon"
                      name="live_area"
                      rules={[
                        { required: true, message: `Maydonni to'ldiring !` },
                      ]}
                    >
                      <Input addonAfter="㎡" />
                    </Form.Item>

                    {/* Oshxona maydoni */}
                    <Form.Item
                      label="Oshxona maydoni"
                      name="kitchen_area"
                      rules={[
                        { required: true, message: `Maydonni to'ldiring !` },
                      ]}
                    >
                      <Input addonAfter="㎡" />
                    </Form.Item>

                    {/* Qavati */}
                    <Form.Item
                      label="Qavati"
                      name="floor"
                      rules={[
                        { required: true, message: `Maydonni to'ldiring !` },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    {/*umumiy Qavati */}
                    <Form.Item
                      label="Umumiy qavati"
                      name="number_of_floors"
                      rules={[
                        { required: true, message: `Maydonni to'ldiring !` },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    {/* Shift balandligi */}
                    <Form.Item
                      label="Shift balandligi"
                      name="ceiling_height"
                      rules={[
                        { required: true, message: `Maydonni to'ldiring !` },
                      ]}
                    >
                      <Input addonAfter="m" />
                    </Form.Item>
                  </div>

                  {/* Sanuzel */}
                  <Form.Item
                    label="Sanuzel"
                    name="wash_room"
                    rules={[
                      { required: true, message: `Maydonni to'ldiring !` },
                    ]}
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
                    rules={[
                      { required: true, message: `Maydonni to'ldiring !` },
                    ]}
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
                    <Form.Item
                      noStyle
                      name="have_internet"
                      valuePropName="checked"
                    >
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
                    <Form.Item
                      name="have_kitchen"
                      valuePropName="checked"
                      noStyle
                    >
                      <Checkbox>Oshxona</Checkbox>
                    </Form.Item>
                    <Form.Item
                      name="have_refrigerator"
                      valuePropName="checked"
                      noStyle
                    >
                      <Checkbox>Muzlatkich</Checkbox>
                    </Form.Item>
                    <Form.Item
                      name="have_tv_cable"
                      valuePropName="checked"
                      noStyle
                    >
                      <Checkbox>Kabelli TV</Checkbox>
                    </Form.Item>
                    <Form.Item
                      name="have_balcony"
                      valuePropName="checked"
                      noStyle
                    >
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
                      rules={[
                        { required: true, message: `Maydonni to'ldiring !` },
                      ]}
                    >
                      <InputNumber
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        addonAfter="so‘m/oyiga"
                      />
                    </Form.Item>

                    <Form.Item
                      name="is_negotiable"
                      valuePropName="checked"
                      noStyle
                    >
                      <Checkbox>Narxi kelishiladi</Checkbox>
                    </Form.Item>
                  </div>

                  {/* Kommunal to'lovlar */}
                  <Form.Item
                    label="Kommunal to'lovlar"
                    name="have_utility_bills"
                    rules={[
                      { required: true, message: `Maydonni to'ldiring !` },
                    ]}
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
                    rules={[
                      { required: true, message: `Maydonni to'ldiring !` },
                    ]}
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
                    rules={[
                      { required: true, message: `Maydonni to'ldiring !` },
                    ]}
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
                        setMap(true);
                      }}
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
                      <MaskedInput
                        prefix="+998"
                        mask={"(00) 000 00 00"}
                        onBeforeInput={checkDone}
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button
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
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                </Modal>
              </Form>
            </div>
            <div className="sidebar">
              <h2>To'ldirish uchun talab qilinadi</h2>
              <div className="sidebar__box">
                <a href="#1" className="flex">
                  {type ? <CheckFilledSVG /> : <CheckSVG />}
                  <span>E’lon turi</span>
                </a>
                <a href={"#2"} className="flex">
                  {images ? <CheckFilledSVG /> : <CheckSVG />}
                  <span>Rasmlar</span>
                </a>
                <a href={"#3"} className="flex">
                  {parametr ? <CheckFilledSVG /> : <CheckSVG />}
                  <span>Parametrlari</span>
                </a>
                <a href={"#4"} className="flex">
                  {type ? <CheckFilledSVG /> : <CheckSVG />}
                  <span>Qo‘shimcha qulayliklar</span>
                </a>
                <a href={"#5"} className="flex">
                  {price ? <CheckFilledSVG /> : <CheckSVG />}
                  <span>Narxi</span>
                </a>
                <a href={"#6"} className="flex">
                  {about ? <CheckFilledSVG /> : <CheckSVG />}
                  <span>Tavsif</span>
                </a>
                <a href={"#7"} className="flex">
                  {map ? <CheckFilledSVG /> : <CheckSVG />}
                  <span>Manzil</span>
                </a>
                <a href={"#8"} className="flex">
                  {phone ? <CheckFilledSVG /> : <CheckSVG />}
                  <span>Aloqa uchun ma'lumotlar</span>
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CreateAdvert;
