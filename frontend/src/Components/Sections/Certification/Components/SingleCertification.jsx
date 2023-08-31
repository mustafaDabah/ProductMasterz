'use client'

import { fadeInUpVariants, normalTransition } from '@/utils/animation';
import Image from 'next/image'
import React, { useState } from 'react'
import { InView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const SingleCertification = ({ certifications, timeDuration }) => {
    const { image, name } = certifications.fields;
    const [inScreen, setInScreen] = useState(false);

    const changeTheView = (inView, _) => {
        if (inScreen) return;
        setInScreen(inView)
    }
    
    return (
        <InView
            as="div"
            onChange={(inView, entry) => changeTheView(inView, entry)}
            className=" position-relative" >
            <motion.div
                className="game-card-left"
                initial="hidden"
                animate={inScreen ? 'visible' : 'hidden'}
                variants={fadeInUpVariants}
                transition={normalTransition}
            >
                <div className="project-overlay" />
                <Image
                    loader={({ src, width, quality }) => `${src}?w=${width}&q=${quality || 75}`}
                    src={image[0].url}
                    alt={`${name} image}`}
                    width={image[0].width}
                    height={image[0].height}
                />
                <div className="position-absolute box-title">
                    <h2 className="short-hr-left mb-3">{name}</h2>
                    <div className="text-half">
                        {/* <p>{Description}</p> */}
                    </div>
                </div>
            </motion.div>
        </InView>
    )
}

export default SingleCertification