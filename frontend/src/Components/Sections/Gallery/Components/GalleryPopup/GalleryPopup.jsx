import useClickOutsideAndEscape from '@/Hooks/useClickOutsideAndEscape';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

function GalleryPopup({ imagesGallery, show, closePopup, startingImageId }) {
    const [images, setImages] = useState([]);
    const popupRef = useClickOutsideAndEscape(closePopup);

    const mapImagesGallery = useCallback((imagesGallery) => {
        return imagesGallery.map((image) => ({
            original: image ? image.url : null,
            thumbnail: image ? image.url : null,
            id: image ? image.id : null,
        }))
    }
        , []);

    useEffect(() => {
        setImages((prevImages) => {
            const mappedImages = mapImagesGallery(imagesGallery);

            if (prevImages.length !== mappedImages.length) {
                return mappedImages;
            }

            const imagesAreEqual = prevImages.every((image, index) =>
                image.original === mappedImages[index].original &&
                image.thumbnail === mappedImages[index].thumbnail &&
                image.id === mappedImages[index].id
            );

            return imagesAreEqual ? prevImages : mappedImages;
        });
    }, [imagesGallery, mapImagesGallery]);

    const startingImageIndex = images.findIndex((image) => image.id === startingImageId);

    return (
        <div className="position-absolute">
            <div className={`overlay-module ${show === 1 ? 'show' : ''}`}>
                <button
                    type="button"
                    className="close mr-md-5 mr-2 mt-4 position-relative z-3"
                    onClick={closePopup}
                >
                    <span aria-hidden="true">×</span>
                </button>
                <div className={`mt-5 ${show === 1 ? 'show fadeIn' : ''}`}>
                    <div className='gallery-container-2'>
                        <div ref={popupRef} className="gallery-container w-100 ">
                            <ImageGallery
                                items={images}
                                startIndex={startingImageIndex}
                                showThumbnails={false}
                                originalClass="big-index"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GalleryPopup;

