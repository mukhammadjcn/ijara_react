import React from "react";
import Lottie from "react-lottie";
import { noDataAlert } from "src/assets/lottie";

function NoData() {
  return (
    <div className="nodata-anim">
      <Lottie options={noDataAlert} height={400} width={500} />
    </div>
  );
}

export default NoData;
