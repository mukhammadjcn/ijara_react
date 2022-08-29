import React from "react";
import Lottie from "react-lottie";
import { noDataAlert } from "src/assets/lottie";

function NoData() {
  return <Lottie options={noDataAlert} height={400} width={400} />;
}

export default NoData;
