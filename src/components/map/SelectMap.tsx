import React, { useState } from "react";
import {
  Map,
  YMaps,
  Placemark,
  ZoomControl,
  TypeSelector,
  SearchControl,
  FullscreenControl,
} from "@pbe/react-yandex-maps";

function SelectMap({
  setLocation,
  location,
}: {
  setLocation: any;
  location: any;
}) {
  return (
    <YMaps
      query={{
        apikey: "e6aa58e7-5bdf-4dda-8530-65637a1e591e",
      }}
    >
      <Map
        width={850}
        height={500}
        onClick={(val: any) => setLocation(val.get("coords"))}
        defaultState={{ center: [41.312081, 69.279799], zoom: 14 }}
      >
        <ZoomControl />
        <TypeSelector />
        <SearchControl />
        <FullscreenControl />

        <Placemark
          geometry={location}
          options={{ preset: "islands#blueHomeIcon" }}
        />
      </Map>
    </YMaps>
  );
}

export default SelectMap;
