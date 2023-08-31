'use client'

import React, { useState } from "react";
import Image from "next/image";
import GalleryPopup from "../GalleryPopup/GalleryPopup";
import { FaEye } from "react-icons/fa";

function SingleGalleryImg({ image, className, allImages }) {
  const [show, setShow] = useState(0);

  const closePopup = () => {
    setShow(0)
  }
  const openPopup = () => {
    setShow(1)
  }


  return (
    <>
      <div onClick={openPopup} className={`position-relative cursor single-image-gallery`}>
        <div className="overlay gallery d-flex justify-content-center align-items-center">
          <FaEye fontSize={22} />
        </div>
        <Image
          loader={({ src, width }) => `${src}?w=${width}`}
          src={image.url}
          width={image.width}
          height={image.height}
          alt="image gallery"
          className={className}
          loading="lazy"
          placeholder="blur"
          blurDataURL={image.url}
        />
      </div>
      {show === 1 && <GalleryPopup imagesGallery={allImages} closePopup={closePopup} show={show} startingImageId={image.id} />}
    </>
  );
}

export default SingleGalleryImg;
