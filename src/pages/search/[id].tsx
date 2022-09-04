import React, { useEffect, useState } from "react";
import {
  BackSVG,
  BusSVG,
  DateSVG,
  HeartSVG,
  LocationSVG,
  MessageSVG,
  MetroSVG,
  ShareSVG,
  WalkSVG,
} from "src/assets/icons";
import { Carousel } from "react-responsive-carousel";
import LocationMap from "src/components/map/LocationMap";
import { Button, message, Skeleton, Statistic } from "antd";
import {
  CatchError,
  FindDistrict,
  FindMetro,
  FindRegion,
  prettyDate,
} from "src/utils/index";
import { useLocation, useNavigate } from "react-router-dom";
import { GetAdvertsIDConfig, PostLIkeConfig } from "src/server/config/Urls";
import { token } from "src/server/Host";
import Header from "src/components/header";
import Footer from "src/components/footer";
import MetaDecorator from "src/components/meta";

function SelectedAdvert() {
  const navigate = useNavigate();
  const location = useLocation();
  const [phone, setPhone] = useState(false);
  const [data, setData] = useState<any>(null);
  const [images, setImages] = useState<any>([]);

  const LikePost = async () => {
    if (token) {
      try {
        await PostLIkeConfig({
          deep_link: location.pathname.replace("/search/", ""),
        });
        message.success("Post saqlanganlarga qo'shildi");
      } catch (error) {
        CatchError(error);
      }
    } else {
      message.error("Postni saqlanganlarga qo'shish uchun tizimga kiring !");
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  const GetImages = (data: any) => {
    let arr = [];
    data.image1 !== null && arr.push(data.image1.replace("http", "https"));
    data.image2 !== null && arr.push(data.image2.replace("http", "https"));
    data.image3 !== null && arr.push(data.image3.replace("http", "https"));
    data.image4 !== null && arr.push(data.image4.replace("http", "https"));
    data.image5 !== null && arr.push(data.image5.replace("http", "https"));
    data.image6 !== null && arr.push(data.image6.replace("http", "https"));
    data.image7 !== null && arr.push(data.image7.replace("http", "https"));
    data.image8 !== null && arr.push(data.image8.replace("http", "https"));
    setImages(arr);
  };

  const GetAdvert = async (id: any) => {
    try {
      const { data } = await GetAdvertsIDConfig(id);
      setData(data);
      GetImages(data);
    } catch (error) {}
  };

  useEffect(() => {
    GetAdvert(location.pathname.replace("/search/", ""));
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (data) {
    return (
      <>
        <MetaDecorator
          title={`Ijaraga ${data?.number_of_rooms}-xonali kvartira,${" "}${
            data?.full_area
          } м²`}
          description={`Oylik to'lov: ${data.cost_per_month}, batafsil ma'lumot: ${data?.description}`}
          imageAlt={`Oylik to'lov: ${data.cost_per_month}, batafsil ma'lumot: ${data?.description}`}
          imageUrl={data.image1}
        />
        <Header />
        <div className="searchID">
          <div className="container">
            <div className="searchID__top">
              <button
                className="create-advert__back flex"
                onClick={() => navigate(-1)}
              >
                <BackSVG />
                <span>Orqaga</span>
              </button>
              <button className="create-advert__back flex">
                <ShareSVG />
                <span>Ulashish</span>
              </button>
              <button className="create-advert__back flex" onClick={LikePost}>
                <HeartSVG />
                <span>Saqlash</span>
              </button>
            </div>
            <div className="searchID__box">
              <div className="searchID__main">
                {/* Malumotlar */}
                <section>
                  <div className="flex title">
                    <h2>
                      Ijaraga {data?.number_of_rooms}-xonali kvartira,{" "}
                      {data?.full_area} м²
                    </h2>
                    <h2>
                      <Statistic
                        title=""
                        groupSeparator={" "}
                        value={data.cost_per_month}
                        style={{ display: "inline-block" }}
                      />{" "}
                      so‘m
                    </h2>
                  </div>
                  <div className="flex location">
                    <div className=" flex">
                      <LocationSVG />
                      <span>
                        {FindRegion(data.region)},{" "}
                        {FindDistrict(data.region, data.district)}
                      </span>
                    </div>
                    <span>{data?.is_negotiable && "KELISHILADI"}</span>
                  </div>
                  {data.near_metro && (
                    <div className="flex metro">
                      <div className="flex">
                        <MetroSVG />
                        <span>{FindMetro(data.near_metro)}</span>
                        <span style={{ color: "#4F5E71" }}>
                          {data?.time_to_metro} min {data?.distance_to_metro} m
                        </span>
                        {data?.transport_to_metro ? <BusSVG /> : <WalkSVG />}
                      </div>
                      <div className="flex">
                        <DateSVG />
                        <span>{prettyDate(data.updated_at)}</span>
                      </div>
                    </div>
                  )}

                  <div className="searchID__carousel">
                    <Carousel
                      autoPlay
                      showArrows
                      infiniteLoop
                      emulateTouch
                      interval={2000}
                      transitionTime={500}
                    >
                      {images.length >= 1 &&
                        images.map((image: any, index: number) => (
                          <div key={index}>
                            <img src={image} />
                          </div>
                        ))}
                    </Carousel>
                  </div>
                  <div className="searchID__info">
                    <div className="">
                      <h4>{data?.full_area} м²</h4>
                      <p>Umumiy maydon</p>
                    </div>
                    <div className="">
                      <h4>{data?.live_area} м²</h4>
                      <p>Yashash maydoni</p>
                    </div>
                    <div className="">
                      <h4>{data?.kitchen_area} м²</h4>
                      <p>Oshxona maydoni</p>
                    </div>
                    <div className="">
                      <h4>
                        {data?.floor}{" "}
                        <span>qavat {data?.number_of_floors} dan</span>
                      </h4>
                      <p>Qavati</p>
                    </div>
                  </div>
                  <div className="searchID__tavsif">
                    <h3>Tavsif</h3>
                    <p>{data?.description}</p>
                  </div>
                  <div className="searchID__manzil">
                    <h3>Manzil</h3>
                    <LocationMap location={[data.latitude, data.longitude]} />
                  </div>
                </section>

                {/* Kvartira malumotlari */}
                <section>
                  <h3>Kavartira</h3>
                  <div className="searchID__malumot">
                    <div className="flex">
                      <h4>Xona</h4>
                      <div></div>
                      <span>{data.number_of_rooms}</span>
                    </div>
                    <div className="flex">
                      <h4>Sanuzel</h4>
                      <div></div>
                      <span>
                        {data.wash_room == "SP"
                          ? "Alohida"
                          : data.wash_room == "MX"
                          ? "Aralash"
                          : "2 va undan ortiq"}
                      </span>
                    </div>
                    <div className="flex">
                      <h4>Umumiy maydon</h4>
                      <div></div>
                      <span>{data.full_area} м²</span>
                    </div>
                    <div className="flex">
                      <h4>Mebel</h4>
                      <div></div>
                      <span>{data.is_furnished ? "Bor" : "Yo'q"}</span>
                    </div>
                    <div className="flex">
                      <h4>Yashash maydoni</h4>
                      <div></div>
                      <span>{data.live_area} м²</span>
                    </div>
                    <div className="flex">
                      <h4>Shift balandliligi</h4>
                      <div></div>
                      <span>{data.ceiling_height}m</span>
                    </div>
                    <div className="flex">
                      <h4>Oshxona maydoni</h4>
                      <div></div>
                      <span>{data.kitchen_area} м²</span>
                    </div>
                    <div className="flex">
                      <h4>Vositachilik haqqi</h4>
                      <div></div>
                      <span>{data.have_commission_fee ? "Bor" : "Yo'q"}</span>
                    </div>
                    <div className="flex">
                      <h4>Qavati</h4>
                      <div></div>
                      <span>{data.floor}</span>
                    </div>
                    <div className="flex">
                      <h4>Kommunal to'lovlar</h4>
                      <div></div>
                      <span>
                        Oylik to‘lov ichida{" "}
                        {!data.have_utility_bills && "emas !"}
                      </span>
                    </div>
                  </div>
                </section>

                {/* Uy jihozlari */}
                <section>
                  <h3>Kvartirada bor</h3>
                  <div className="searchID__malumot">
                    <div className="flex">
                      <h4>Internet</h4>
                      <div></div>
                      <span>{data.have_internet ? "Bor" : "Yo'q"}</span>
                    </div>
                    <div className="flex">
                      <h4>Kabelli TV</h4>
                      <div></div>
                      <span>{data.have_tv_cable ? "Bor" : "Yo'q"}</span>
                    </div>
                    <div className="flex">
                      <h4>Kir yuvish mashinasi</h4>
                      <div></div>
                      <span>{data.have_washing_machine ? "Bor" : "Yo'q"}</span>
                    </div>
                    <div className="flex">
                      <h4>Muzlatkich</h4>
                      <div></div>
                      <span>{data.have_refrigerator ? "Bor" : "Yo'q"}</span>
                    </div>
                    <div className="flex">
                      <h4>Oshxona</h4>
                      <div></div>
                      <span>{data.have_kitchen ? "Bor" : "Yo'q"}</span>
                    </div>
                    <div className="flex">
                      <h4>Televizor</h4>
                      <div></div>
                      <span>{data.have_tv ? "Bor" : "Yo'q"}</span>
                    </div>
                    <div className="flex">
                      <h4>Balkon</h4>
                      <div></div>
                      <span>{data.have_balcony ? "Bor" : "Yo'q"}</span>
                    </div>
                    <div className="flex">
                      <h4>Konditsioner</h4>
                      <div></div>
                      <span>{data.have_air_conditioner ? "Bor" : "Yo'q"}</span>
                    </div>
                  </div>
                </section>

                {/* Contact information */}
                <section>
                  <div className="flex">
                    <div className="searchID__user">
                      <div className="profile__user flex">
                        <div className="img">
                          {data.owner_data?.name
                            ? data.owner_data?.name.slice(0, 1)
                            : "?"}
                        </div>
                        <div>
                          <h4>
                            {data.owner_data?.name || data.owner_data?.id}
                          </h4>
                          <p>ID {data.owner_data.id}</p>
                        </div>
                      </div>
                    </div>
                    {phone ? (
                      <Button size="large">
                        <a
                          href={`tel:+${data.owner_data.phone_number}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          +{data.owner_data.phone_number}
                        </a>
                      </Button>
                    ) : (
                      <Button size="large" onClick={() => setPhone(true)}>
                        Telefon raqamni ko‘rsatish
                      </Button>
                    )}
                  </div>
                </section>
              </div>
              <div className="searchID__sidebar">
                <div className="profile__user flex">
                  <div className="img">
                    {data.owner_data?.name
                      ? data.owner_data?.name.slice(0, 1)
                      : "?"}
                  </div>
                  <div>
                    <h4>{data.owner_data?.name || data.owner_data?.id}</h4>
                    <p>ID {data.owner_data.id}</p>
                  </div>
                </div>
                {phone ? (
                  <div>
                    <a
                      href={`tel:+${data.owner_data.phone_number}`}
                      target="_blank"
                      rel="noreferrer"
                      className="call"
                    >
                      <button>+ {data.owner_data.phone_number}</button>
                    </a>
                  </div>
                ) : (
                  <a onClick={() => setPhone(true)} className="call">
                    <button>Telefon raqamni ko‘rsatish</button>
                  </a>
                )}

                <button
                  className="message"
                  onClick={() => message.info("Ishlab chiqish jarayonida !")}
                >
                  <MessageSVG />
                  <span>Xabar yozish</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="searchID">
        <div className="container">
          <div className="searchID__top" style={{ marginBottom: 16 }}>
            <Skeleton.Button active />
            <Skeleton.Button active />
            <Skeleton.Button active />
          </div>
          <div className="searchID__box">
            <div className="searchID__main">
              {/* Malumotlar */}
              <section>
                <div className="flex title">
                  <Skeleton.Input active />
                  <Skeleton.Input />
                </div>
                <div className="searchID__carousel">
                  <Skeleton.Image active />
                </div>
                <div className="searchID__info">
                  <div className="">
                    <Skeleton.Button active />
                  </div>
                  <div className="">
                    <Skeleton.Button active />
                  </div>
                  <div className="">
                    <Skeleton.Button active />
                  </div>
                  <div className="">
                    <Skeleton.Button active />
                  </div>
                </div>
                <div className="searchID__tavsif">
                  <h3>Tavsif</h3>
                  <Skeleton.Input active block />
                  <Skeleton.Input active block />
                  <Skeleton.Input active block />
                </div>
                <div className="searchID__manzil">
                  <h3>Manzil</h3>
                  <Skeleton.Input active block />
                  <Skeleton.Input active block />
                  <Skeleton.Input active block />
                </div>
              </section>

              {/* Kvartira malumotlari */}
              <section>
                <h3>Kavartira</h3>
                <div className="searchID__malumot">
                  <Skeleton.Input active block />
                  <Skeleton.Input active block />
                  <Skeleton.Input active block />
                </div>
              </section>

              {/* Uy jihozlari */}
              <section>
                <h3>Kvartirada bor</h3>
                <div className="searchID__malumot">
                  <Skeleton.Input active block />
                  <Skeleton.Input active block />
                  <Skeleton.Input active block />
                </div>
              </section>

              {/* Contact information */}
              <section>
                <div className="flex">
                  <div className="searchID__user">
                    <div className="profile__user flex">
                      <Skeleton.Avatar size={"large"} active />
                      <div>
                        <Skeleton.Input active />
                      </div>
                    </div>
                  </div>
                  <Skeleton.Button active />
                </div>
              </section>
            </div>
            <div className="searchID__sidebar">
              <div className="profile__user flex">
                <Skeleton.Avatar size={"large"} active />
                <div style={{ flexGrow: 1 }}>
                  <Skeleton.Input active block />
                </div>
              </div>
              <Skeleton.Button block active />
              <Skeleton.Button block active />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SelectedAdvert;
