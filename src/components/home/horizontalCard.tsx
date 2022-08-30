import React, { useState } from "react";
import {
  EyeSVG,
  BusSVG,
  DateSVG,
  WalkSVG,
  PhoneSVG,
  MetroSVG,
  MessageSVG,
  LocationSVG,
  HeartFilledSVG,
} from "src/assets/icons";
import { message, Skeleton } from "antd";
import {
  FindDistrict,
  FindMetro,
  FindRegion,
  prettyDate,
} from "src/utils/index";
import { Link } from "react-router-dom";

function HorizontalCard({ data = null, stat = true }: any) {
  if (data) {
    return (
      <div className="horizontal-card">
        <div className="horizontal-card__img">
          <img src={data.image1} alt="" />
        </div>
        <div className="horizontal-card__info">
          <Link to={`/search/${data.deep_link}`}>
            <div className="title">
              <h2>
                Ijaraga {data?.number_of_rooms}-xonali kvartira,{" "}
                {data.full_area} м²
              </h2>
              <h2>{data.cost_per_month} so‘m</h2>
            </div>
          </Link>
          <div className="info">
            <div className="flex">
              <LocationSVG />{" "}
              <span>
                {FindRegion(data.region)},{" "}
                {FindDistrict(data.region, data.district)}
              </span>
            </div>
            {data.near_metro ? (
              <div className="transport flex">
                <MetroSVG />
                <span>{FindMetro(data.near_metro)}</span>
                <span style={{ color: "#4F5E71" }}>
                  {data?.time_to_metro} min {data?.distance_to_metro} m
                </span>
                {data?.transport_to_metro ? <BusSVG /> : <WalkSVG />}
              </div>
            ) : (
              <div className="transport flex">
                <MetroSVG />
                <span>Metro mavjud emas</span>
              </div>
            )}
            <div className="flex">
              <DateSVG /> <span>{prettyDate(data.updated_at)}</span>
            </div>
          </div>
          {stat && (
            <div className="statistika">
              <div className="list">
                <div className="flex">
                  <EyeSVG />
                  <span>{data.views}</span>
                </div>{" "}
                <div className="flex">
                  <PhoneSVG />
                  <span>{data.calls}</span>
                </div>{" "}
                <div className="flex">
                  <HeartFilledSVG color="#4F5E71" />
                  <span>256</span>
                </div>
                {/* <div className="flex">
                  <MessageSVG color="#4F5E71" />
                  <span>256</span>
                </div> */}
              </div>
              <div className="action">
                <a onClick={() => message.info("Ishlab chiqish jarayonida")}>
                  Yakunlash
                </a>
                <a onClick={() => message.info("Ishlab chiqish jarayonida")}>
                  O‘chirish
                </a>
                <button
                  className="tahrirlash"
                  onClick={() => message.info("Ishlab chiqish jarayonida")}
                >
                  Tahrirlash
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="horizontal-card">
      <div className="horizontal-card__img">
        <Skeleton.Image style={{ height: 160, width: 260 }} active={true} />
      </div>
      <div className="horizontal-card__info">
        <Skeleton active={true} />
      </div>
    </div>
  );
}

export default HorizontalCard;
