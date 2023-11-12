"use client";

import * as React from "react";
import Image from "next/image";

import productStyles from "pages/product/[manufacturerSkuCode]/product.module.css";

function ItemGallery({ project }) {
  const images = [
    {
      name: "Primary",
      url: project.primary_blob_url,
      alt: `Primary image of our ${project.name} project`,
    },
    {
      name: "Secondary",
      url: project.secondary_blob_url,
      alt: `Detail image of ${project.name} project showing awesome details`,
    },
  ];
  const [activeImage, setActiveImage] = React.useState(images[0]);

  return (
    <div className={productStyles.gallery}>
      <ul className={productStyles.gallery__sides}>
        {images.map((image) => (
          <li key={image.name} className={productStyles.gallery__sides__item}>
            <button onClick={() => setActiveImage(image)}>
              <Image
                src={image.url}
                width={80}
                height={120}
                alt={image.alt}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </button>
          </li>
        ))}
      </ul>

      <Image
        priority
        className={productStyles.gallery__main}
        src={activeImage.url}
        width={492}
        height={738}
        alt={activeImage.alt}
        style={{
          maxWidth: "100%",
          height: "auto",
          objectFit: "contain",
          objectPosition: "center",
        }}
      />
    </div>
  );
}

export default ItemGallery;
