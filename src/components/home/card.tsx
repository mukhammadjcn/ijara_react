import React, { useEffect, useState } from "react";
import { message, Skeleton, Statistic } from "antd";
import {
  BusSVG,
  WalkSVG,
  MetroSVG,
  HeartSVG,
  LocationSVG,
  HeartFilledSVG,
} from "src/assets/icons";
import {
  CatchError,
  CheckApartment,
  FindDistrict,
  FindMetro,
  FindRegion,
  prettyDate,
} from "src/utils/index";
import { Link, useNavigate } from "react-router-dom";
import { token } from "src/server/Host";
import { PostLIkeConfig } from "src/server/config/Urls";

function Card({ data, getList }: any) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const LikePost = async () => {
    if (token) {
      try {
        const response = await PostLIkeConfig({
          deep_link: data.deep_link,
        });
        if (response.data.status == "added") {
          setLiked(true);
          message.success("E'lon sevimlilarga qo'shildi");
        } else {
          setLiked(false);
          message.warning("E'lon sevimlilardan o'chirildi");
        }

        // Get adverts list again
        getList();
      } catch (error) {
        CatchError(error);
      }
    } else {
      message.error("E'lonni sevimlilarga qo'shish uchun tizimga kiring !");
    }
  };

  useEffect(() => {
    setLiked(data?.like);
  }, [data]);

  if (data) {
    return (
      <div className="card">
        <div className="card__images">
          <div className="card__carousel">
            <img
              src={data.image1.replace("http", "https")}
              alt=""
              onClick={() => navigate(`/search/${data.deep_link}`)}
            />
          </div>
          <span className="card__date">{prettyDate(data.updated_at)}</span>
          <div className="card__like">
            {liked ? (
              <div onClick={LikePost}>
                <HeartFilledSVG />
              </div>
            ) : (
              <div onClick={LikePost}>
                <HeartSVG color={"white"} />
              </div>
            )}
          </div>
        </div>
        <div className="card__info">
          <Link to={`/search/${data.deep_link}`}>
            <h4 className="price">
              <Statistic
                title=""
                groupSeparator={" "}
                value={data.cost_per_month}
                style={{ display: "inline-block" }}
              />{" "}
              so‘m
            </h4>
          </Link>
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
          <div className="about flex">
            <b>
              {data?.number_of_rooms} xonali{" "}
              {CheckApartment(data?.apartment_type)}
            </b>
            <hr />
            <b>{data.full_area} м²</b>
            <hr />
            <b>
              {data.floor}/{data?.number_of_floors} qavat
            </b>
          </div>
          <div className="location flex">
            <LocationSVG />
            <span>
              {FindRegion(data.region)},{" "}
              {FindDistrict(data.region, data.district)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card__images">
        <div className="card__carousel">
          <Skeleton.Image active={true} />
        </div>
      </div>
      <div className="card__info">
        <Skeleton active={true} />
      </div>
    </div>
  );
}

export default Card;
