import React, { useEffect, useState } from "react";
import AOS from "aos";
import { Select, Tabs } from "antd";
import Card from "src/components/home/card";
import SliderMulti from "src/components/slider/SliderMulti";
import { CatchError } from "src/utils/index";
import { GetAdvertsListConfig } from "src/server/config/Urls";
import { Link } from "react-router-dom";
import Header from "src/components/header";
import Footer from "src/components/footer";

function HomePage() {
  const { Option } = Select;
  const { TabPane } = Tabs;
  const [adverts, setAdverts] = useState([null, null, null, null]);

  // Get adverts list
  const GetAdverts = async () => {
    try {
      const { data } = await GetAdvertsListConfig();
      setAdverts(data.results.slice(0, 8));
    } catch (error) {
      CatchError(error);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh();
    GetAdverts();
  }, []);

  return (
    <>
      <Header />
      <div className="home">
        {/* Intro section */}
        <div className="home__intro">
          <div className="container">
            <h2 className="title">Talabalar turar joyi yagona portali!</h2>
            <div className="home__search flex">
              <Select placeholder="Viloyatni tanlang" allowClear size="large">
                <Option value="jack">Andijon viloyati</Option>
                <Option value="lucy">Buxoro viloyati</Option>
                <Option value="Yiminghe">Jizzax viloyati</Option>
              </Select>
              <Select placeholder="Tumanni tanlang" allowClear size="large">
                <Option value="jack">Vobkent</Option>
                <Option value="lucy">Gazli</Option>
                <Option value="Yiminghe">Olot</Option>
              </Select>
              <Select placeholder="Xonalar soni" allowClear size="large">
                <Option value="jack">1</Option>
                <Option value="lucy">2</Option>
                <Option value="Yiminghe">3</Option>
              </Select>
              <Select placeholder="Narxi" allowClear size="large">
                <Option value="jack">100$ - 200$</Option>
                <Option value="lucy">200$ - 300$</Option>
                <Option value="luzcy">300$ - 400$</Option>
                <Option value="luccy">400$ - 500$</Option>
                <Option value="luxcy">500$+</Option>
              </Select>
              <Select placeholder="Radius" allowClear size="large">
                <Option value="jack">1km - 5km</Option>
                <Option value="jacck">5km - 10km</Option>
                <Option value="jacsk">10km - 15km</Option>
                <Option value="jacwk">15km+</Option>
              </Select>
              <button>Qidirmoq</button>
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
            <Tabs defaultActiveKey="men">
              <TabPane tab="Erkaklar uchun" key="men">
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
                <SliderMulti data={adverts} />
              </TabPane>
              <TabPane tab="Ayollar uchun" key="women">
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
                <SliderMulti data={adverts} />
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
                    <span>1- xonalilar</span>
                    <Link to={"/search"}>Hammasini ko‘rish</Link>
                  </li>
                  <li className="flex">
                    <span>1- xonalilar</span>
                    <Link to={"/search"}>Hammasini ko‘rish</Link>
                  </li>
                  <li className="flex">
                    <span>1- xonalilar</span>
                    <Link to={"/search"}>Hammasini ko‘rish</Link>
                  </li>
                  <li className="flex">
                    <span>1- xonalilar</span>
                    <Link to={"/search"}>Hammasini ko‘rish</Link>
                  </li>
                </ul>
              </div>
              <div className="home__links--vote">
                <h4>Ijaraga beriladigan kvartiralar</h4>
                <div className="flex">
                  <ul>
                    <li>1 so‘rov</li>
                    <li>1 so‘rov</li>
                    <li>1 so‘rov</li>
                    <li>1 so‘rov</li>
                    <li>1 so‘rov</li>
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
            <h3>Ommabob</h3>
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
                  Radius qiduruv bo‘limi orqali siz o’zingizga yaqin
                  bo‘lgane’lonlarni tez va oson topishingiz mumkin!
                </p>
              </div>
              <div className="">
                <img
                  src={require("../../assets/images/lock.png")}
                  width={120}
                  height={120}
                  alt="fetaured"
                />
                <h4>Shaxshiy kabinetga kirish</h4>
                <p>
                  Shaxsiy kabinetga kirish orqali siz xabarlar sevimli e’lonlar
                  va sozlamarni boshqarishingiz mumkin.
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
                <Link to={"/search"} className="home__nearby--item">
                  Chilonzor
                </Link>
                <Link to={""} className="home__nearby--item">
                  Yunus rajabiy
                </Link>
                <Link to={""} className="home__nearby--item">
                  Buyuk ipak yo’li
                </Link>
                <Link to={""} className="home__nearby--item">
                  Bodomzor
                </Link>
                <Link to={""} className="home__nearby--item">
                  Mirzo Ulug’bek
                </Link>
                <Link to={""} className="home__nearby--item">
                  Oybek
                </Link>
                <Link to={""} className="home__nearby--item">
                  Yunsobot
                </Link>
                <Link to={""} className="home__nearby--item">
                  Shahriston
                </Link>
              </div>
              <Link to={""} className="home__nearby--all">
                Hammasini ko'rish
              </Link>
            </div>
          </section>

          {/* Filter viloyat */}
          <section className="home__nearby home__regions">
            <h3>Viloyatlardagi kvartiralar</h3>
            <div className="home__nearby--wrapper">
              <div className="flex">
                <Link to={""} className="home__nearby--item">
                  Buxoro
                </Link>
                <Link to={""} className="home__nearby--item">
                  Samarqand
                </Link>
                <Link to={""} className="home__nearby--item">
                  Toshkent
                </Link>
                <Link to={""} className="home__nearby--item">
                  Namangan
                </Link>
                <Link to={""} className="home__nearby--item">
                  Navoiy
                </Link>
                <Link to={""} className="home__nearby--item">
                  Surxandaryo
                </Link>
                <Link to={""} className="home__nearby--item">
                  Andijon
                </Link>
                <Link to={""} className="home__nearby--item">
                  Jizzax
                </Link>
              </div>
              <Link to={""} className="home__nearby--all">
                Hammasini ko'rish
              </Link>
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
