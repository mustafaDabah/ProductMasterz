'use client'

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion';
import useAnimationInView from '@/Hooks/useAnimationInView';
import { fadeInLeftVariants, fadeInRightVariants, normalTransition } from '@/utils/animation';
import Link from 'next/link';
import { MdOutlineLaunch } from 'react-icons/md';
import { Button } from '@/Components/UI';
import mixpanel from 'mixpanel-browser';
import { useRouter } from 'next/navigation';

function SingleProject({ product, index }) {
    const { projectName, tagline, description, thumbnail, docLink } = product.fields;
    const { ref, controls } = useAnimationInView();
    const router = useRouter();

    const blogLink = `${process.env.SITE_URL}/blog/${docLink}`

    const isReverse = index % 2 !== 0;

    const goToPost = () => {
        // mixpanel.track(`Button ${projectName} Clicked`);
        // router.push(docLink)
    }

    return (
        <>
            <div className={`n-card ${isReverse ? 'reverse' : ''} `} ref={ref}>
                <motion.div
                    variants={isReverse ? fadeInLeftVariants : fadeInRightVariants}
                    animate={controls}
                    initial="hidden"
                    transition={normalTransition}
                    className='w-100'
                >
                    <Image
                        loader={({ src, width, quality }) => `${src}?w=${width}&q=${quality || 75}`}
                        src={thumbnail[0].url}
                        alt={`${projectName} image}`}
                        width={thumbnail[0].width}
                        height={thumbnail[0].height}
                        className='img-fluid'
                    />
                </motion.div>
                <motion.div
                    className='n-card-details w-100'
                    variants={isReverse ? fadeInRightVariants : fadeInLeftVariants}
                    animate={controls}
                    initial="hidden"
                    transition={normalTransition}
                >
                    <h2>{projectName}</h2>
                    <p className='font-weight-bold font-italic my-0'>{tagline}</p>
                    <p className='font-weight-light'>
                        {description}
                    </p>
                    <Link onClick={goToPost} href={blogLink} target='_blank' className='text-decoration-none mt-2 d-block'>
                        <Button title='Explore'>
                            <MdOutlineLaunch color="#fff" size={22} className='mr-2'  />
                        </Button>
                    </Link>
                </motion.div>
                
            </div>
        </>
    )
}

export default SingleProject