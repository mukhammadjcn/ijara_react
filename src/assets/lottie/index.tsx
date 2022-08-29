import done from "./done.json";
import alert from "./alert.json";
import nodata from "./no_data.json";

export const optionDone = {
  loop: false,
  autoplay: true,
  animationData: done,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const optionAlert = {
  loop: true,
  autoplay: true,
  animationData: alert,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const noDataAlert = {
  loop: true,
  autoplay: true,
  animationData: nodata,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
