import React, { useState } from "react";
import {
  YMaps,
  Map,
  ZoomControl,
  Clusterer,
  Placemark,
  Circle,
  SearchControl,
  GeolocationControl,
  TypeSelector,
  ObjectManager,
} from "@pbe/react-yandex-maps";

function YandexMap() {
  const [location, setLocation] = useState([]);

  return (
    <div className="searchID">
      <div className="container">
        <YMaps
          query={{
            apikey: "e6aa58e7-5bdf-4dda-8530-65637a1e591e",
          }}
        >
          <Map
            defaultState={{ center: [41.312081, 69.279799], zoom: 13 }}
            width={"100%"}
            height={500}
            onClick={(val: any) => setLocation(val.get("coords"))}
          >
            <ZoomControl />
            <TypeSelector />
            {/* <SearchControl  /> */}
            {/* <GeolocationControl /> */}

            {/* <Circle
              geometry={[[41.312081, 69.279799], 1000]}
              options={{
                draggable: true,
                fillColor: "#00a99163",
                strokeColor: "#00a991",
                strokeOpacity: 0.8,
                strokeWidth: 5,
              }}
            /> */}

            {/* <Placemark
              geometry={location}
              options={{ preset: "islands#blueHomeIcon" }}
            /> */}

            {/* <Clusterer
              options={{
                preset: "islands#invertedVioletClusterIcons",
                groupByCoordinates: false,
                // clusterIcons: [
                //   {
                //     href: "/images/location.png",
                //     size: [50, 50],
                //     offset: [-20, -20],
                //   },
                //   {
                //     href: "/images/lock.png",
                //     size: [60, 60],
                //     offset: [-30, -30],
                //   },
                // ],
                // clusterIconContentLayout: null,
                // clusterNumbers: [4],
              }}
            >
              {[
                [41.347716, 69.218813],
                [41.35069, 69.230554],
                [41.314644, 69.322311],
                [41.311388, 69.317277],
                [41.314483, 69.335046],
              ].map((coordinates, index) => (
                <Placemark
                  key={index}
                  geometry={coordinates}
                  options={{
                    hideIconOnBalloonOpen: false, //запрет на скрытие метки по клику на балун
                    balloonOffset: [3, -40],
                  }}
                  modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
                  properties={{
                    balloonContentHeader: "Balloon3",
                    balloonContent: `<a href='https://google.com/${coordinates[0]}' style='color: red' target='_blank'>Balloon3 <strong>${coordinates[0]}</strong></a>`,
                  }}
                />
              ))}
            </Clusterer> */}

            {/* <ObjectManager
              options={{
                clusterize: true,
                gridSize: 32,
              }}
              objects={{
                openBalloonOnClick: true,
                preset: "islands#greenDotIcon",
              }}
              clusters={{
                preset: "islands#redClusterIcons",
              }}
              modules={[
                "objectManager.addon.objectsBalloon",
                "objectManager.addon.objectsHint",
              ]}
              features={[
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [41.347716, 69.218813],
                  },
                  properties: {
                    hintContent: "Содержание всплывающей подсказки",
                    balloonContent: "Содержание балуна",
                  },
                },
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [41.314644, 69.322311],
                  },
                  properties: {
                    hintContent: "Содержание всплывающей подсказки",
                    balloonContent: "Содержание балуна",
                  },
                },
              ]}
            /> */}
          </Map>
        </YMaps>
      </div>
    </div>
  );
}

export default YandexMap;
