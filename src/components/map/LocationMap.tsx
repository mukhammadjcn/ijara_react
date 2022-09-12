import React from "react";
import {
  Map,
  YMaps,
  Circle,
  ZoomControl,
  TypeSelector,
} from "@pbe/react-yandex-maps";

function LocationMap({ location = [41.312081, 69.279799] }) {
  return (
    <YMaps
      query={{
        apikey: "e6aa58e7-5bdf-4dda-8530-65637a1e591e",
        // lang: "uz_UZ",
      }}
    >
      <Map defaultState={{ center: location, zoom: 14 }} height={500}>
        <ZoomControl />
        <TypeSelector />

        <Circle
          geometry={[location, 500]}
          options={{
            fillColor: "#00a99163",
            strokeColor: "#00a991",
            strokeOpacity: 0.8,
            strokeWidth: 5,
          }}
        />
      </Map>
    </YMaps>
  );
}

export default LocationMap;
