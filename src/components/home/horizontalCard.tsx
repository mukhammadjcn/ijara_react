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
import { message, Modal, Skeleton, Statistic } from "antd";
import {
  CatchError,
  FindDistrict,
  FindMetro,
  FindRegion,
  prettyDate,
} from "src/utils/index";
import { Link, useNavigate } from "react-router-dom";
import {
  ChangeAdvertConfig,
  DelAdvertsIDConfig,
  GetUserConfig,
} from "src/server/config/Urls";
import { useAppDispatch } from "src/hooks/index";
import { setUser } from "src/redux/slices/login";

function HorizontalCard({
  data = null,
  stat = true,
  canActive = false,
  rejected = false,
  getAdverts,
}: any) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getUser = async () => {
    try {
      const { data } = await GetUserConfig();
      dispatch(setUser(data));
    } catch (error) {
      CatchError(error);
    }
  };

  const DeleteAdvert = async () => {
    Modal.confirm({
      title: `E'lonni haqiqatdan o'chirmoqchimisz ?`,
      async onOk() {
        try {
          await DelAdvertsIDConfig(data?.deep_link);
          message.success("Muvofaqqiyatli o'chirildi !");
          getAdverts();
          getUser();
        } catch (error) {
          CatchError(error);
        }
      },
      centered: true,
      okText: `O'chirish`,
      cancelText: "Bekor qilish",
    });
  };

  const EditAdvert = async (status = "waiting") => {
    try {
      await ChangeAdvertConfig(data?.deep_link, { status });
      message.success("Muvofaqqiyatli yangilandi !");
      getAdverts();
      getUser();
    } catch (error) {
      CatchError(error);
    }
  };

  if (data) {
    return (
      <div className="horizontal-card">
        <div className="horizontal-card__img">
          <img
            src={data.image1}
            alt=""
            onClick={() => navigate(`/search/${data.deep_link}`)}
          />
        </div>
        <div className="horizontal-card__info">
          <Link to={`/search/${data?.deep_link}`}>
            <div className="title">
              <h2>
                Ijaraga {data?.number_of_rooms}-xonali kvartira,{" "}
                {data.full_area} м²
              </h2>
              <h2 className="price">
                <Statistic
                  title=""
                  groupSeparator={" "}
                  value={data.cost_per_month}
                  style={{ display: "inline-block" }}
                />{" "}
                so‘m
              </h2>
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
                {/* <div className="flex">
                  <HeartFilledSVG color="#4F5E71" />
                  <span>256</span>
                </div> */}
                {/* <div className="flex">
                  <MessageSVG color="#4F5E71" />
                  <span>256</span>
                </div> */}
              </div>
              {!rejected ? (
                <div className="action">
                  {canActive ? (
                    <a onClick={() => EditAdvert()}>Faollashtirish</a>
                  ) : (
                    <a onClick={() => EditAdvert("inactive")}>Yakunlash</a>
                  )}
                  <a onClick={DeleteAdvert}>O‘chirish</a>
                  <button
                    className="tahrirlash"
                    onClick={() => navigate(`/profile/post/${data?.deep_link}`)}
                  >
                    Tahrirlash
                  </button>
                </div>
              ) : (
                <div className="action">
                  <a onClick={DeleteAdvert}>O‘chirish</a>
                </div>
              )}
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
