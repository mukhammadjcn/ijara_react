import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

const MetaDecorator = ({ title, description, imageUrl, imageAlt }: any) => (
  <Helmet>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta name="description" content={description} />

    {/* <!-- Facebook Meta Tags --> */}
    <meta property="og:type" content="website" />
    <meta property="og:description" content={description} />
    <meta name="image" property="og:image" content={imageUrl} />
    <meta name="image" property="og:image:secure" content={imageUrl} />
    <meta property="og:url" content={"https://" + window.location.hostname} />

    {/* <!-- Twitter Meta Tags --> */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      property="twitter:domain"
      content={"https://" + window.location.hostname}
    />
    <meta
      property="twitter:url"
      content={"https://" + window.location.hostname}
    />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={imageUrl} />
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
