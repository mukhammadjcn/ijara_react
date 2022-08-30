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
import Adverts from "src/components/profile/Adverts";
import ProfileEdit from "src/components/profile/ProfileEdit";
import SavedAdverts from "src/components/profile/SavedAdverts";
import Header from "src/components/header";
import Footer from "src/components/footer";
import { useAppSelector } from "src/hooks/index";

function Profile() {
  const user = useAppSelector((state) => state.Login.user);
  const [section, setSection] = useState(1);

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
              <div className="img">A</div>
              <div>
                <h2>{user.name}</h2>
                <p>ID {user.id}</p>
              </div>
            </div>
            <div className="profile__nav">
              <div
                className={section === 1 ? "flex active" : "flex"}
                onClick={() => setSection(1)}
              >
                <AdvertSVG />
                <span>E’lonlar</span>
                {/* <div className="number">4</div> */}
              </div>
              <div
                className={section === 2 ? "flex active" : "flex"}
                onClick={() => setSection(2)}
              >
                <ProfileSVG />
                <span>Profil</span>
                {/* <div className="number">4</div> */}
              </div>
              <div
                className={section === 3 ? "flex active" : "flex"}
                onClick={() => setSection(3)}
              >
                <HeartFilledSVG color="#4F5E71" />
                <span>Saqlanganlar</span>
                {/* <div className="number">4</div> */}
              </div>
              <div
                className={section === 4 ? "flex active" : "flex"}
                onClick={() => message.info("Ishlab chiqish jarayonida")}
              >
                <MessageSVG />

                <span>Xabarlar</span>
                {/* <div className="number">4</div> */}
              </div>
              <div
                className={section === 5 ? "flex active" : "flex"}
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
            {section === 1 && <Adverts />}
            {section === 2 && <ProfileEdit />}
            {section === 3 && <SavedAdverts />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
