'use client'

import React, { useEffect, useState } from 'react'
import SingleGalleryImg from '../SingleGalleryImg/SingleGalleryImg';

function ListOfImages({ data }) {
    const [allImages, setAllImages] = useState([]);

    useEffect(() => {
        const images = data.flatMap(item => item?.fields?.Images).filter(item => item !== undefined);

        const bigImage = data.flatMap(item => item.fields.bigImage);

        const allImages2 = [...bigImage, ...images];

        setAllImages(allImages2);

    }, [data]);


    return (
        <>
            {
                data.map((row) => {
                    const imageBig = row.fields.bigImage[0];
                    const images = row?.fields?.Images;
                    const type = row.fields.Size;
                    return (
                        <div key={row.id}>
                            {
                                type === '1x' ? (
                                    <div className="grid-gallery gap-0">
                                        <SingleGalleryImg image={imageBig} key={imageBig.id} allImages={allImages} className='big-image' />
                                    </div>
                                ) : null
                            }

                            {
                                type === '3x' ? (
                                    <div className={`grid-gallery ${row.fields.direction === 'rtl' ? 'rtl' : ''} `}>
                                        <SingleGalleryImg image={imageBig} key={imageBig.id} allImages={allImages} className='big-image' />
                                        <SingleGalleryImg image={images[0]} key={images[0].id} allImages={allImages} className='big-image' />
                                    </div>
                                ) : null
                            }

                            {
                                type === '2x' ? (
                                    <div className="grid-gallery ">
                                        <SingleGalleryImg image={imageBig} key={imageBig.id} allImages={allImages} className='big-image' />
                                        <div className="grid-gallery-2">
                                            {images?.map((image) => (
                                                <SingleGalleryImg image={image} key={image.id} allImages={allImages} />
                                            ))}
                                        </div>
                                    </div>
                                ) : null
                            }

                        </div>
                    )
                })
            }
        </>
    )
}

export default ListOfImages