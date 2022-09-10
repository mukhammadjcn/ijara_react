import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

const MetaDecorator = ({ title, description, imageUrl, imageAlt }: any) => (
  <Helmet>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta name="image" property="og:image" content={imageUrl} />
    <meta name="image" property="og:image:secure" content={imageUrl} />
    <meta
      property="og:url"
      content={
        "https://www.ijara.edu.uz" +
        window.location.pathname +
        window.location.search
      }
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image:alt" content={imageAlt} />
  </Helmet>
);

MetaDecorator.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
};

export default MetaDecorator;
