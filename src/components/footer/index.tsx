import React from "react";
import { Link } from "react-router-dom";
import { FbSVG, InstSVG, LogoSVG, TgSVG, YtSVG } from "src/assets/icons";

function Footer() {
  return (
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
            <h3>Platforma</h3>
            <Link to={"#"}>Platforma haqida</Link>
            <Link to={"#"}>Erkaklarga uy topish</Link>
            <Link to={"#"}>Ayollarga uy topish</Link>
            <Link to={"#"}>Sherik izlayapmiz</Link>
            <Link to={"#"}>Mintaqalar xaritasi</Link>
          </div>
          <div className="footer__nav">
            <h3>Platforma</h3>
            <Link to={"#"}>Platforma haqida</Link>
            <Link to={"#"}>Erkaklarga uy topish</Link>
            <Link to={"#"}>Ayollarga uy topish</Link>
            <Link to={"#"}>Sherik izlayapmiz</Link>
            <Link to={"#"}>Mintaqalar xaritasi</Link>
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
  );
}

export default Footer;
