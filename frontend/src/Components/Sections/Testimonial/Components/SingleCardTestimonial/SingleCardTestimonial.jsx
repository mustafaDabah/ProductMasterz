'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsStarHalf } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { fadeInUpVariants, normalTransition } from '@/utils/animation';
import { InView } from 'react-intersection-observer';

function SingleCardTestimonial({ user }) {
    const { name, position, opinion, image, rating } = user.fields;
    const [inScreen, setInScreen] = useState(false);

    const filledStars = new Array(Math.floor(rating)).fill();
    const halfStar = rating % 1 !== 0;
    const emptyStars = new Array(Math.floor(5 - rating)).fill();

    const changeTheView = (inView, _) => {
        if (inScreen) return;
        setInScreen(inView)
    }

    return (
        <InView as="div" onChange={(inView, entry) => changeTheView(inView, entry)}>
            <motion.div
                className='testimonial-card'
                initial="hidden"
                animate={inScreen ? 'visible' : 'hidden'}
                variants={fadeInUpVariants}
                transition={normalTransition}
            >
                <div className="testimonial-body">
                    <p>
                        <FaQuoteLeft color='#66dbd7' className='mr-2' />
                        <p className='text-mode'>{opinion}</p>
                    </p>
                </div>
                <div className="testimonial-header">
                    <div className='d-flex mb-5'>
                        {
                            filledStars.map((_, index) => (
                                <AiFillStar color='#d9b908' key={index} />
                            ))
                        }
                        {halfStar && <BsStarHalf color='#d9b908' />}
                        {emptyStars.map((_, index) => (
                            <AiOutlineStar key={index} color='#d9b908' />
                        ))}
                    </div>
                    <Image
                        loader={({ src, width, quality }) => `${src}?w=${width}}`}
                        src={image[0].url}
                        alt={`${name} image}`}
                        width={58}
                        height={55}
                        style={{ borderRadius: '50%', objectFit: 'cover', border: "2px solid #fff" }}
                    />
                    <h3 className='font-weight-bold mt-2'>{name}</h3>
                    <p className='font-italic company-name'>{position}</p>
                </div>
            </motion.div>
        </InView>
    )
}

export default SingleCardTestimonial