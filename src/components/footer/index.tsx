import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FbSVG,
  HomeFilledSVG,
  HomeOutlinedSVG,
  InstSVG,
  LogoSVG,
  NoteFilledSVG,
  NoteOutlinedSVG,
  PhoneSVG,
  SearchFilledSVG,
  SearchOutlinedSVG,
  TgSVG,
  UserFilledSVG,
  UserOutlinedSVG,
  YtSVG,
} from "src/assets/icons";

function Footer() {
  const location = useLocation();

  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="footer__top flex">
            <div className="footer__logo">
              <Link to={"/"}>
                <LogoSVG />
              </Link>
              <div className="flex">
                <Link to={"/"}>
                  <FbSVG />
                </Link>
                <Link to={"/"}>
                  <TgSVG />
                </Link>
                <Link to={"/"}>
                  <YtSVG />
                </Link>
                <Link to={"/"}>
                  <InstSVG />
                </Link>
              </div>
            </div>
            <div className="footer__nav">
              <h3>Platforma</h3>
              <Link to={"#"}>Platforma haqida</Link>
              <Link to={"#"}>Erkaklarga uy topish</Link>
              <Link to={"#"}>Ayollarga uy topish</Link>
              <Link to={"#"}>Sherik izlayapmiz</Link>
              <Link to={"#"}>Mintaqalar xaritasi</Link>
            </div>
            <div className="footer__nav">
              <h3>Biz bilan aloqa</h3>
              <a href="tel:1006">Ishonch telefoni: 1006</a>
              <a
                href="tel:1006"
                className="flex"
                style={{ gap: 4, justifyContent: "flex-start" }}
              >
                <PhoneSVG />
                <span>+998712306464</span>
              </a>
              <a
                href="tel:1006"
                className="flex"
                style={{ gap: 4, justifyContent: "flex-start" }}
              >
                <PhoneSVG />
                <span>+998712306464</span>
              </a>
            </div>
          </div>
          <div className="footer__bottom flex">
            <span>© Ijara.edu.uz 2022</span>
            <div>
              <b>Ishlab chiqaruvchi: </b> Raqamli ta'lim texnologiyalarini
              rivojlantirish markazi
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-menu">
        <div className="container">
          <Link
            to={"/"}
            className={
              location.pathname == "/"
                ? "mobile-menu__item mobile-menu__item-active"
                : "mobile-menu__item"
            }
          >
            {location.pathname == "/" ? <HomeFilledSVG /> : <HomeOutlinedSVG />}
            <span>Asosiy</span>
          </Link>
          <Link
            to={"/search"}
            className={
              location.pathname.includes("/search")
                ? "mobile-menu__item mobile-menu__item-active"
                : "mobile-menu__item"
            }
          >
            {location.pathname.includes("/search") ? (
              <SearchFilledSVG />
            ) : (
              <SearchOutlinedSVG />
            )}

            <span>Qidirish</span>
          </Link>
          <Link
            to={"/create"}
            className={
              location.pathname.includes("/create")
                ? "mobile-menu__item mobile-menu__item-active"
                : "mobile-menu__item"
            }
          >
            {location.pathname.includes("/create") ? (
              <NoteFilledSVG />
            ) : (
              <NoteOutlinedSVG />
            )}

            <span>Yangi e'lon</span>
          </Link>
          <Link
            to={"/profile"}
            className={
              location.pathname.includes("/profile")
                ? "mobile-menu__item mobile-menu__item-active"
                : "mobile-menu__item"
            }
          >
            {location.pathname.includes("/profile") ? (
              <UserFilledSVG />
            ) : (
              <UserOutlinedSVG />
            )}
            <span>Profilim</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Footer;
