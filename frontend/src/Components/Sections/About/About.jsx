'use client'
import { useState } from "react";
import { AiFillSchedule } from "react-icons/ai";
import Popup from "./Components/Popup/Popup";
import { FaQuoteLeft, FaLinkedinIn } from 'react-icons/fa';
import { Button } from "@/Components/UI";
import { motion } from 'framer-motion';
import Link from "next/link";

function About({ content }) {
  const [showPopup, setShowPopup] = useState(false);
  const { ref, controls } = useAnimationInView();
  const { content:tagline, boldContent } = content ;

  return (
    <section className="about-section large-margin" id="about" >
      <div className="container" ref={ref}>
        <div className="d-flex about-container align-items-md-center justify-content-between">
          <div className="ml-3">
            <h2>من نحن</h2>
          </div>
          <div>
            <p className="content">
              <FaQuoteLeft color='#66dbd7;' className='mx-2' /> 
              {tagline}
            </p>
            <p className="content font-weight-bold">
              {boldContent}
            </p>
          </div>
        </div>
        {/* <div className="row justify-content-between mt-2 mt-md-5">
          <div className="col-md-4">
            <motion.div
              className="card-number d-flex align-items-center"
              variants={fadeInRightVariants}
              animate={controls}
              initial="hidden"
              transition={normalTransition}
            >
              <h3>{content.projectDone}</h3>
              <h4>growth Product Market Fits</h4>
            </motion.div>
          </div>
          <motion.div
            className="col-md-4"
            variants={fadeInRightVariants}
            animate={controls}
            initial="hidden"
            transition={normalTransition}
          >
            <div className="card-number d-flex align-items-center justify-content-md-center">
              <h3>{content.happyClient}</h3>
              <h4>MVPs</h4>
            </div>
          </motion.div>
          <motion.div
            className="col-md-4"
            variants={fadeInLeftVariants}
            animate={controls}
            initial="hidden"
            transition={normalTransition}
          >
            <div className="card-number d-flex align-items-center justify-content-md-end">
              <h3>{content.worldWideClient}</h3>
              <h4>Cross Teams 10 - 200 Members</h4>
            </div>
          </motion.div>
        </div> */}
      </div>
    </section>
  );
}

export default About;
