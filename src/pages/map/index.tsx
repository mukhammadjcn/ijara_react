import React from "react";
import Footer from "src/components/footer";
import Header from "src/components/header";
import AdvertsMap from "src/components/map/AdvertsMap";

function Map() {
  return (
    <>
      <Header />
      <div className="maps">
        <div className="container">
          <AdvertsMap />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Map;
