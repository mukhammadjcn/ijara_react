import React, { useEffect } from "react";
import { Select } from "antd";
import {
  HeartFilledSVG,
  HeartSVG,
  LogoSVG,
  PlusSVG,
  RuSVG,
  UsaSVG,
  UserSVG,
  UzSVG,
} from "src/assets/icons";
import { Link, useNavigate, useRoutes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/hooks/index";
import { GetUserConfig } from "src/server/config/Urls";
import { setUser } from "src/redux/slices/login";
import { CatchError } from "src/utils/index";

export default function Header() {
  const { Option } = Select;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("access");
  const user = useAppSelector((state) => state.Login.user);

  const getUser = async () => {
    if (token && !user.id) {
      try {
        const { data } = await GetUserConfig();
        dispatch(setUser(data));
      } catch (error) {
        CatchError(error);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
          <div
            className="flex item like"
            onClick={() => navigate("/profile/saved")}
          >
            <HeartFilledSVG />
            <span>Sevimlilar</span>
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
                <span>{user.name || user.id}</span>
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
