import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiOutlineLink } from 'react-icons/ai'
import { FaStar } from 'react-icons/fa'
import { fadeInLeftWithScale, fadeInRightWithScale, fadeUpWithLittleY, hightVariants, roadMapTransition, fadeInUpVariants } from "@/utils/animation";
import useAnimationInView from "@/Hooks/useAnimationInView";
import { motion } from 'framer-motion';

function SingleContainer({ item }) {
    const { EndDate, Header, StartDate, Tagline, direction, icon, url, present, ordinary } = item.fields;
    const { ref, controls } = useAnimationInView();
 
    return (
        <div className='position-relative'>
            <div
            // motion.
                className="timeline"
                initial="hidden"
                animate={controls}
                ref={ref}
                variants={hightVariants}
                transition={roadMapTransition}
            />
            <div
                className={`container-roadmap container-${direction}`}>
                <div
                // motion.
                    className="text-box"
                    initial="hidden"
                    animate={controls}
                    variants={fadeInUpVariants}
                    transition={roadMapTransition}
                >
                    <div className='d-flex justify-content-between align-items-center'>
                        <Image
                            loader={({ src, width }) => `${src}?w=${width}`}
                            src={icon[0].url}
                            width={50}
                            height={50}
                            alt="icon"
                        />
                        <Link aria-label="project link" href={url} target="_blank">
                            <AiOutlineLink color='#fff' fontSize={30} />
                        </Link>
                    </div>
                    <h2 className="mt-2 ">{Header}</h2>
                    <small>( {StartDate} - {present ? 'present' : EndDate} )</small>
                    <p className='font-weight-light text-mode'>
                        {Tagline}
                    </p>
                    {/* <span className="right-container-arrow"></span> */}
                </div>
                <div
                // motion.
                    className="icon"
                    initial="hidden"
                    animate={controls}
                    variants={fadeUpWithLittleY}
                    transition={roadMapTransition}
                >
                    <FaStar fontSize={12} color="#fff" />
                </div>
            </div>
        </div>
    )
}

export default SingleContainer