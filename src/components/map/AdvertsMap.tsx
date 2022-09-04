import React, { useEffect, useState } from "react";
import {
  Map,
  YMaps,
  Placemark,
  Clusterer,
  ZoomControl,
  TypeSelector,
  SearchControl,
  GeolocationControl,
} from "@pbe/react-yandex-maps";
import { CatchError } from "src/utils/index";
import { GetMapListConfig } from "src/server/config/Urls";
import { Button, message, Radio } from "antd";
import { useSearchParams } from "react-router-dom";

function AdvertsMap() {
  const [searchParams, setSearchParams] = useSearchParams();
  const latitude = searchParams.get("lat") || null;
  const longtitude = searchParams.get("long") || null;
  const [adverts, setAdverts] = useState([]);
  const [location, setLocation] = useState<any>([latitude, longtitude]);
  const [radius, setRadius] = useState(searchParams.get("rad") || null);

  const options = [
    { label: "1 km", value: "1000" },
    { label: "5 km", value: "5000" },
    { label: "10 km", value: "10000" },
    { label: "Hammasi", value: "100000000" },
  ];

  const handleMakeParams = (key: any, value: any) => {
    if (value) {
      if (searchParams.has(key)) searchParams.set(key, value);
      else searchParams.append(key, value);
    } else searchParams.delete(key);
    setSearchParams(searchParams);
  };

  const getRadius = ({ target: { value } }: any) => {
    setRadius(value);
    handleMakeParams("rad", value);
  };

  const getLocation = (val: any) => {
    handleMakeParams("lat", val.get("coords")[0]);
    handleMakeParams("long", val.get("coords")[1]);
    setLocation([val.get("coords")[0], val.get("coords")[1]]);
  };

  const clearOptions = () => {
    setSearchParams("");
    setRadius(null);
    setLocation([null, null]);
    setAdverts([]);
  };

  const GetAdverts = async () => {
    if (radius && location[0]) {
      try {
        const { data } = await GetMapListConfig({
          latitude: location[0],
          longitude: location[1],
          radius: radius,
        });

        setAdverts(data.result);
        if (data.result.length == 0) {
          message.info("Ushbu parametrlar bilan birorta uy topilmadi");
        }
      } catch (error) {
        CatchError(error);
      }
    } else {
      message.info(
        `Ma'lumotlarni olish uchun radiusni va xaritadan manzilni belgilang !`
      );
    }
  };

  useEffect(() => {
    if ((radius && location[0], location[1])) {
      GetAdverts();
    }
  }, []);

  return (
    <>
      <div className="maps__form">
        <h2 className="title">Xarita orqali qidiruvga xush kelibsiz !</h2>
        <div className="flex">
          <Radio.Group
            value={radius}
            options={options}
            onChange={getRadius}
            optionType="button"
            buttonStyle="solid"
          />

          <Button type="dashed" onClick={clearOptions}>
            Tozalash
          </Button>
          <Button type="primary" onClick={GetAdverts}>
            Qidirish
          </Button>
        </div>
      </div>
      <div className="maps__map">
        <YMaps
          query={{
            apikey: "e6aa58e7-5bdf-4dda-8530-65637a1e591e",
            lang: "uz_Uz",
          }}
        >
          <Map
            defaultState={{
              center: [41.312081, 69.279799],
              zoom: 13,
            }}
            width={"100%"}
            height={500}
            onClick={getLocation}
          >
            <ZoomControl />
            <TypeSelector />
            <SearchControl />
            <GeolocationControl />
            <Placemark
              geometry={location}
              options={{ preset: "islands#redDotIcon" }}
            />

            <Clusterer
              options={{
                groupByCoordinates: false,
              }}
            >
              {adverts.map((item: any) => (
                <Placemark
                  key={item.deep_link}
                  geometry={[item.latitude, item.longitude]}
                  options={{
                    hideIconOnBalloonOpen: false, //запрет на скрытие метки по клику на балун
                    balloonOffset: [-1.5, -14],
                    preset: "islands#blueCircleDotIcon",
                  }}
                  modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
                  properties={{
                    balloonContent: ` <a href='/search/${item.deep_link}' target='_blank' class="maps__content">
                                        <div class="image">
                                            <img src=${item.image1} alt=${item.deep_link} />
                                        </div>
                                        <div class="info">
                                            <h2>
                                            ${item.cost_per_month}
                                            so‘m
                                            </h2>
                                            <div class="flex">
                                            <div>
                                            <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            >
                                            <path
                                                d="M13 11L21.2 2.79999"
                                                stroke="#101010"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M22.0002 6.8V2H17.2002"
                                                stroke="#101010"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
                                                stroke="#101010"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            </svg> <span>${item.full_area} м²</span>
                                            </div>
                                            <div>
                                            <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            >
                                            <path
                                                d="M10.5 19.9V4.1C10.5 2.6 9.86 2 8.27 2H4.23C2.64 2 2 2.6 2 4.1V19.9C2 21.4 2.64 22 4.23 22H8.27C9.86 22 10.5 21.4 10.5 19.9Z"
                                                stroke="#101010"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M22 10.9V4.1C22 2.6 21.36 2 19.77 2H15.73C14.14 2 13.5 2.6 13.5 4.1V10.9C13.5 12.4 14.14 13 15.73 13H19.77C21.36 13 22 12.4 22 10.9Z"
                                                stroke="#101010"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M22 19.9V18.1C22 16.6 21.36 16 19.77 16H15.73C14.14 16 13.5 16.6 13.5 18.1V19.9C13.5 21.4 14.14 22 15.73 22H19.77C21.36 22 22 21.4 22 19.9Z"
                                                stroke="#101010"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            </svg> <span>${item?.number_of_rooms}-xonali</span>
                                            </div>
                                            <div>
                                            <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            >
                                            <path
                                                d="M13 22H5C3 22 2 21 2 19V11C2 9 3 8 5 8H10V19C10 21 11 22 13 22Z"
                                                stroke="#101010"
                                                strokeWidth="1.5"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M10.11 4C10.03 4.3 10 4.63 10 5V8H5V6C5 4.9 5.9 4 7 4H10.11Z"
                                                stroke="#101010"
                                                strokeWidth="1.5"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M14 8V13"
                                                stroke="#101010"
                                                strokeWidth="1.5"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M18 8V13"
                                                stroke="#101010"
                                                strokeWidth="1.5"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M17 17H15C14.45 17 14 17.45 14 18V22H18V18C18 17.45 17.55 17 17 17Z"
                                                stroke="#101010"
                                                strokeWidth="1.5"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M6 13V17"
                                                stroke="#101010"
                                                strokeWidth="1.5"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M10 19V5C10 3 11 2 13 2H19C21 2 22 3 22 5V19C22 21 21 22 19 22H13C11 22 10 21 10 19Z"
                                                stroke="#101010"
                                                strokeWidth="1.5"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            </svg>
                                                <span>
                                                ${item.floor}/${item.number_of_floors}
                                                </span>
                                            </div>
                                            </div>
                                        </div>
                </a>`,
                  }}
                />
              ))}
            </Clusterer>
          </Map>
        </YMaps>
      </div>
    </>
  );
}

export default AdvertsMap;
