import React from "react";
import { Select } from "antd";
import {
  HeartSVG,
  LogoSVG,
  PlusSVG,
  RuSVG,
  UsaSVG,
  UserSVG,
  UzSVG,
} from "src/assets/icons";
import { Link, useNavigate, useRoutes } from "react-router-dom";

export default function Header() {
  const { Option } = Select;
  const navigate = useNavigate();
  const token = typeof window !== "undefined" && localStorage.getItem("access");

  return (
    <div className="header">
      <div className="container flex">
        <div className="header__logo">
          <Link to="/">
            <LogoSVG />
          </Link>
        </div>
        <div className="header__navbar flex">
          {/* <Select defaultValue="uz" className="header__lang" bordered={false}>
            <Option value="uz" className="header__lang-option">
              <UzSVG />
              <span>O‘zbekcha</span>
            </Option>
            <Option value="ru" className="header__lang-option">
              <RuSVG />
              <span>Ruscha</span>
            </Option>
            <Option value="en" className="header__lang-option">
              <UsaSVG />
              <span>Ingliz</span>
            </Option>
          </Select> */}
          <div className="flex item">
            <HeartSVG />
            <span>Sevimli</span>
          </div>
          <>
            {!token ? (
              <div className="flex item" onClick={() => navigate("/login")}>
                <UserSVG />
                <span>Kirish</span>
              </div>
            ) : (
              <div className="flex item" onClick={() => navigate("/profile")}>
                <UserSVG color={"#00a991"} />
                <span>Abror</span>
              </div>
            )}
          </>

          <div>
            <Link to={"/create"} className="flex plus">
              <PlusSVG />
              <span>E’lon berish</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
