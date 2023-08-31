'use client'
import Image from "next/image";
import React from "react";
import { motion } from 'framer-motion';
import { fadeInUpVariants, } from "@/utils/animation";
import Link from "next/link";


function SingleProject({ project, inScreen, timeAnimation }) {
  const { title,  thumbnail, description, slug } = project.fields;
  const optimizeTime = timeAnimation === 0 ? 0.5 : timeAnimation;

  console.log(project)

  return (
    <Link href={`/blog/${slug}`} target="_blank">
      <motion.div
        className="game-card-left img-fluid"
        initial="hidden"
        animate={inScreen ? 'visible' : 'hidden'}
        variants={fadeInUpVariants}
        transition={{ duration: optimizeTime , ease: 'easeIn' }}
      >
        <div className="position-relative">
          <div className="project-overlay" />
          <Image
            loader={({ src, width, quality }) => `${src}?w=${width}&q=${quality || 75}`}
            src={thumbnail}
            alt={`${title} image}`}
            width={200}
            height={200}
            className="img-fluid"
          />
          <div className="position-absolute box-title">
            <h2 className="short-hr-left mb-3 text-white">{title}</h2>
            <div className="text-half">
              <p>{description}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default SingleProject;
export const SingleProjectMemo = React.memo(SingleProject);
