import React, { useEffect, useState } from "react";
import AOS from "aos";
import { Dropdown, Input, Select, Slider, Tabs } from "antd";
import Card from "src/components/home/card";
import SliderMulti from "src/components/slider/SliderMulti";
import { CatchError } from "src/utils/index";
import { GetAdvertsListConfig } from "src/server/config/Urls";
import { Link, useNavigate } from "react-router-dom";
import Header from "src/components/header";
import Footer from "src/components/footer";
import { metroList, regionsList } from "src/server/Host";
import MetaDecorator from "src/components/meta";

function HomePage() {
  const { TabPane } = Tabs;
  const { Option } = Select;
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState<any>([]);
  const [showMetro, setShowMetro] = useState(false);
  const [districts, setDistricts] = useState<any>([]);
  const [showRegions, setShowRegions] = useState(false);
  const [adverts, setAdverts] = useState([null, null, null, null]);
  const [advertSex, setAdvertsSex] = useState([null, null, null, null]);

  const handleMakeParams = (key: any, value: any) => {
    let urlParams = new URLSearchParams(url);
    if (value) {
      if (urlParams.has(key)) urlParams.set(key, value);
      else urlParams.append(key, value);
    } else {
      urlParams.delete(key);
    }
    setUrl(urlParams.toString());
    console.log(urlParams.toString());
  };
  const handleRegion = (id: number) => {
    if (id) {
      setDistricts(regionsList.find((item: any) => item.id == id)?.districts);
    } else {
      setDistricts(null);
      handleMakeParams("district", "");
    }
    handleMakeParams("region", id);
  };
  const handleDistrict = (id: number) => {
    handleMakeParams("district", id);
  };

  // Get adverts list
  const GetAdverts = async () => {
    try {
      const { data } = await GetAdvertsListConfig();
      setAdverts(data.results.slice(0, 8));
    } catch (error) {
      CatchError(error);
    }
  };
  // Get adverts list
  const GetAdvertsSex = async (whom = "M") => {
    try {
      const { data } = await GetAdvertsListConfig(`?for_whom=${whom}`);
      setAdvertsSex(data.results.slice(0, 8));
    } catch (error) {
      CatchError(error);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh();
    GetAdverts();
    GetAdvertsSex();
  }, []);

  return (
    <>
      <MetaDecorator
        description={`Ijara.edu.uz talabalar uchun vaqtinchalik yoki doimiy uy topish uchun mahsus platforma. Bunda talabalar o'zlariga qulay bo'lgan kvartirla va uchastkalarni topishadi. Ijara.edu.uz talabar haqida qayg'uradi !`}
        imageAlt={`Ijara.edu.uz talabalar uchun vaqtinchalik yoki doimiy uy topish uchun mahsus platforma. Bunda talabalar o'zlariga qulay bo'lgan kvartirla va uchastkalarni topishadi. Ijara.edu.uz talabar haqida qayg'uradi !`}
        imageUrl={`https://backoffice.ijara.edu.uz/media/ad_images/2022/09/11/ijara.edu.uz_38LESEK.png`}
        title={""}
      />
      <Header />
      <div className="home">
        {/* Intro section */}
        <div className="home__intro">
          <div className="container">
            <h2 className="title">
              Talabalar uchun ijaraga turar joy izlash portali !
            </h2>
            <div className="home__search flex">
              {/* Viloyat */}
              <Select
                allowClear
                size="large"
                onChange={handleRegion}
                placeholder="Viloyatni tanlang"
              >
                {regionsList?.length > 0 &&
                  regionsList.map((item: any) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
              </Select>

              {/* Tuman */}
              <Select
                allowClear
                size="large"
                onChange={handleDistrict}
                placeholder="Tumanni tanlang"
              >
                {districts?.length > 0 &&
                  districts.map((item: any) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
              </Select>

              {/* Xonalar soni */}
              <Select
                allowClear
                size="large"
                mode="multiple"
                placeholder="Xonalar soni"
                onChange={(val) => {
                  handleMakeParams("number_of_rooms__in", val.join(","));
                }}
              >
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
              </Select>

              {/* Narxi */}
              <div style={{ width: 360 }}>
                <Dropdown
                  overlay={
                    <div className="search__slider">
                      <Slider
                        step={100000}
                        range
                        min={100000}
                        max={10000000}
                        tipFormatter={(val) => `${val} so'm`}
                        defaultValue={[1000000, 5000000]}
                        onAfterChange={(val) => {
                          setPrice(val);
                          handleMakeParams(
                            "cost_per_month__range",
                            val.join(",")
                          );
                        }}
                      />
                    </div>
                  }
                  trigger={["click"]}
                >
                  <div className="flex">
                    <Input
                      allowClear
                      size="large"
                      placeholder="100 000 dan"
                      value={price[0] || null}
                      style={{ width: 170, flexShrink: 0 }}
                      onChange={(e) => {
                        !e.target.value &&
                          handleMakeParams("cost_per_month__range", null);
                        !e.target.value && setPrice([]);
                      }}
                    />
                    <Input
                      allowClear
                      size="large"
                      placeholder="10 000 000 gacha"
                      value={price[1] || null}
                      style={{ width: 170, flexShrink: 0 }}
                      onChange={(e) => {
                        !e.target.value &&
                          handleMakeParams("cost_per_month__range", null);
                        !e.target.value && setPrice([]);
                      }}
                    />
                  </div>
                </Dropdown>
              </div>

              <button
                onClick={() =>
                  navigate(`/search${url.length > 1 ? "?" + url : ""}`)
                }
              >
                Qidirish
              </button>
            </div>
          </div>
        </div>

        {/* Big container */}
        <div className="container">
          {/* Adverts section */}
          <section className="home__adverts">
            <h3>E’lonlar</h3>
            <div className="home__adverts-container flex">
              {adverts.map((item, index) => (
                <div data-aos="fade-up" data-aos-delay={50 * index} key={index}>
                  <Card data={item} />
                </div>
              ))}
            </div>
          </section>

          {/* Sherik section */}
          <section className="home__partners">
            <Tabs defaultActiveKey="M" onChange={GetAdvertsSex}>
              <TabPane tab="Erkaklar uchun" key="M">
                <div className="home__partners--header">
                  <h2>Ijaraga sherik izlayapmiz!</h2>
                  <div className="flex">
                    <p>
                      Ijarada birga yashash uchun o'z hududingizdan kelgan yoki
                      birga o'qiydigan talabalarni topishingiz mumkin!
                    </p>
                    <Link to={"/search"}>Hammasini ko‘rish</Link>
                  </div>
                </div>
                <SliderMulti data={advertSex} />
              </TabPane>
              <TabPane tab="Ayollar uchun" key="F">
                <div className="home__partners--header">
                  <h2>Ijaraga sherik izlayapmiz!</h2>
                  <div className="flex">
                    <p>
                      Ijarada birga yashash uchun o'z hududingizdan kelgan yoki
                      birga o'qiydigan talabalarni topishingiz mumkin!
                    </p>
                    <Link to={"/search"}>Hammasini ko‘rish</Link>
                  </div>
                </div>
                <SliderMulti data={advertSex} />
              </TabPane>
            </Tabs>
          </section>

          {/* Usefull links */}
          <section className="home__links">
            <h3>Foydali havolalar</h3>
            <div className="flex home__links--container">
              <div className="home__links--stat">
                <h4>Ijaraga beriladigan kvartiralar</h4>
                <ul>
                  <li className="flex">
                    <span>1 - xonalilar</span>
                    <Link to={"/search?number_of_rooms__in=1"}>
                      Hammasini ko‘rish
                    </Link>
                  </li>
                  <li className="flex">
                    <span>2 - xonalilar</span>
                    <Link to={"/search?number_of_rooms__in=2"}>
                      Hammasini ko‘rish
                    </Link>
                  </li>
                  <li className="flex">
                    <span>3 - xonalilar</span>
                    <Link to={"/search?number_of_rooms__in=3"}>
                      Hammasini ko‘rish
                    </Link>
                  </li>
                  <li className="flex">
                    <span>4 - xonalilar</span>
                    <Link to={"/search?number_of_rooms__in=4"}>
                      Hammasini ko‘rish
                    </Link>
                  </li>
                  <li className="flex">
                    <span>5 - xonalilar</span>
                    <Link to={"/search?number_of_rooms__in=5"}>
                      Hammasini ko‘rish
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="home__links--vote">
                <h4>Ijaraga beriladigan kvartiralar</h4>
                <div className="flex">
                  <ul>
                    <li className="flex">
                      <Link to={"/search?region=17"}>1 so‘rov</Link>
                    </li>
                    <li className="flex">
                      <Link to={"/search?region=16"}>2 so‘rov</Link>
                    </li>
                    <li className="flex">
                      <Link to={"/search?region=15"}>3 so‘rov</Link>
                    </li>
                    <li className="flex">
                      <Link to={"/search?region=14"}>4 so‘rov</Link>
                    </li>
                    <li className="flex">
                      <Link to={"/search?region=13"}>5 so‘rov</Link>
                    </li>
                  </ul>
                  <div className="">
                    <img
                      src={require("../../assets/images/tick.png")}
                      height={120}
                      width={120}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Ommabop */}
          <section className="home__featured">
            <h3>Ommabop</h3>
            <div className="flex">
              <div className="">
                <img
                  src={require("../../assets/images/location.png")}
                  width={120}
                  height={120}
                  alt="fetaured"
                />
                <h4>Radius orqali qidiruv</h4>
                <p>
                  Radius qidiruv bo‘limi orqali siz o’zingizga yaqin bo‘lgan
                  e’lonlarni tez va oson topishingiz mumkin!
                </p>
              </div>
              <div className="">
                <img
                  src={require("../../assets/images/lock.png")}
                  width={120}
                  height={120}
                  alt="fetaured"
                />
                <h4>Shaxsiy kabinetga kirish</h4>
                <p>
                  Shaxsiy kabinetga kirish orqali siz xabarlar sevimli e’lonlar
                  va sozlamalarni boshqarishingiz mumkin.
                </p>
              </div>
              <div className="">
                <img
                  src={require("../../assets/images/file.png")}
                  width={120}
                  height={120}
                  alt="fetaured"
                />
                <h4>E’lon joylashtirish</h4>
                <p>
                  Bu bo‘lim orqali siz o’z e’loningizni joylashtirishingiz va
                  e’lon sozlamalarini boshqarishingiz mumkin.
                </p>
              </div>
            </div>
          </section>

          {/* Nearby kvatira */}
          <section className="home__nearby">
            <h3>Metroga yaqin kvartiralar</h3>
            <div className="home__nearby--wrapper">
              <div className="flex">
                {showMetro
                  ? metroList.map((item: any) => (
                      <Link
                        key={item.id}
                        to={`/search?near_metro=${item.id}`}
                        className="home__nearby--item"
                      >
                        {item.name}
                      </Link>
                    ))
                  : metroList.slice(0, 8).map((item: any) => (
                      <Link
                        key={item.id}
                        to={`/search?near_metro=${item.id}`}
                        className="home__nearby--item"
                      >
                        {item.name}
                      </Link>
                    ))}
              </div>
              {!showMetro && (
                <Link
                  to={""}
                  className="home__nearby--all"
                  onClick={() => setShowMetro(true)}
                >
                  Hammasini ko'rish
                </Link>
              )}
            </div>
          </section>

          {/* Filter viloyat */}
          <section className="home__nearby home__regions">
            <h3>Viloyatlardagi kvartiralar</h3>
            <div className="home__nearby--wrapper">
              <div className="flex">
                {showRegions
                  ? regionsList.map((item: any) => (
                      <Link
                        key={item.id}
                        to={`/search?near_metro=${item.id}`}
                        className="home__nearby--item"
                      >
                        {item.name}
                      </Link>
                    ))
                  : regionsList.slice(0, 8).map((item: any) => (
                      <Link
                        key={item.id}
                        to={`/search?region=${item.id}`}
                        className="home__nearby--item"
                      >
                        {item.name}
                      </Link>
                    ))}
              </div>
              {!showRegions && (
                <Link
                  to={""}
                  className="home__nearby--all"
                  onClick={() => setShowRegions(true)}
                >
                  Hammasini ko'rish
                </Link>
              )}
            </div>
          </section>

          <br />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
