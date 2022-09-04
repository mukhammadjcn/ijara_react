import React, { useEffect, useState } from "react";
import { message } from "antd";
import {
  AdvertSVG,
  AlertSVG,
  HeartFilledSVG,
  LogoutSVG,
  MessageSVG,
  ProfileSVG,
} from "src/assets/icons";
import Header from "src/components/header";
import Footer from "src/components/footer";
import { useAppSelector } from "src/hooks/index";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function Profile() {
  const user = useAppSelector((state) => state.Login.user);
  const navigate = useNavigate();
  const location = useLocation();

  const checkRoute = (key: string) => {
    return location.pathname.split("/profile")[1].includes(key) ? true : false;
  };

  const Logout = () => {
    localStorage.removeItem("access");
    window.location.href = "/";
  };

  return (
    <>
      <Header />
      <div className="profile">
        <div className="container">
          <div className="profile__sidebar">
            <div className="profile__user flex">
              <div className="img">
                {user?.name ? user?.name.slice(0, 1) : "?"}
              </div>
              <div>
                <h4>{user?.name || user?.id}</h4>
                <p>ID {user.id}</p>
              </div>
            </div>
            <div className="profile__nav">
              <div
                className={
                  location.pathname.split("/profile")[1].length == 0
                    ? "flex active"
                    : "flex"
                }
                onClick={() => navigate("/profile")}
              >
                <AdvertSVG />
                <span>E’lonlar</span>
                {/* <div className="number">4</div> */}
              </div>
              <div
                className={checkRoute("/edit") ? "flex active" : "flex"}
                onClick={() => navigate("/profile/edit")}
              >
                <ProfileSVG />
                <span>Tahrirlash</span>
                {/* <div className="number">4</div> */}
              </div>
              <div
                className={checkRoute("/saved") ? "flex active" : "flex"}
                onClick={() => navigate("/profile/saved")}
              >
                <HeartFilledSVG color="#4F5E71" />
                <span>Saqlanganlar</span>
                {/* <div className="number">4</div> */}
              </div>
              <div
                className={checkRoute("/messages") ? "flex active" : "flex"}
                onClick={() => message.info("Ishlab chiqish jarayonida")}
              >
                <MessageSVG />

                <span>Xabarlar</span>
                {/* <div className="number">4</div> */}
              </div>
              <div
                className={checkRoute("/report") ? "flex active" : "flex"}
                onClick={() => message.info("Ishlab chiqish jarayonida")}
              >
                <AlertSVG />
                <span>Shikoyatlar</span>
                {/* <div className="number">4</div> */}
              </div>
            </div>
            <div className="profile__logout" onClick={Logout}>
              <div className="flex">
                <LogoutSVG />
                <span>Chiqish</span>
              </div>
            </div>
          </div>
          <div className="profile__main">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
