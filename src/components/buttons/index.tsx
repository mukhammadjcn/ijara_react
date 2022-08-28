import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export const SlickArrowLeft = ({
  currentSlide,
  slideCount,
  ...props
}: {
  currentSlide: any;
  slideCount: any;
}) => (
  <button
    {...props}
    className="slick-prev slick-arrow anticon anticon-left"
    aria-hidden="true"
    type="button"
  >
    <LeftOutlined />
  </button>
);
export const SlickArrowRight = ({
  currentSlide,
  slideCount,
  ...props
}: {
  currentSlide: any;
  slideCount: any;
}) => (
  <button
    {...props}
    className="slick-next slick-arrow anticon anticon-right"
    aria-hidden="true"
    type="button"
  >
    <RightOutlined />
  </button>
);
