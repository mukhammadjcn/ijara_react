import Lottie from "react-lottie";
import { noDataAlert } from "src/assets/lottie";

function NoData({ title = "" }) {
  return (
    <div className="nodata-anim">
      <Lottie options={noDataAlert} height={400} width={500} />
      <h2 style={{ textAlign: "center", fontSize: 18, color: "#3c474c" }}>
        {title}
      </h2>
    </div>
  );
}

export default NoData;
