import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

const MetaDecorator = ({ title, description, imageUrl, imageAlt }: any) => (
  <Helmet>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta name="description" content={description} data-rh="true" />
    <meta
      name="keywords"
      content={`Uy, uy, kvartira, ijara, bollar, tashkent, metro, oylik, novastroyka, ijaraga, makler, maklersiz, komunal, hovli, ko'p qavatli, qizlar, universitet, yotoqxona, bepul, skidka`}
    />
    <link rel="canonical" href="https://ijara.edu.uz" />

    {/* <!-- Facebook Meta Tags --> */}
    <meta property="og:type" content="website" />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={imageUrl} />
    <meta property="og:image:secure_url" content={imageUrl} />
    <meta property="og:url" content={"https://ijara.edu.uz"} />
    <meta property="og:site_name" content="Ijara edu uz" />

    {/* <!-- Twitter Meta Tags --> */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:domain" content={"https://ijara.edu.uz"} />
    <meta property="twitter:url" content={"https://ijara.edu.uz"} />
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
