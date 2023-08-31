"use client";
import React, { useEffect } from 'react';
import { NavbarHeaderMemo } from "./Components/Navbar/Navbar";
import Image from "next/image";
import { Button } from '@/Components/UI';
import { AiFillMessage } from 'react-icons/ai';

function HeaderTwo({ content, navLinks }) {
  const { title, subtitle, description, imageUrl } = content;

  return (
    <>
      <NavbarHeaderMemo navLinks={navLinks} />
      <section id="mainHeader" className="large-margin pt-0">
        <div id="hero-section" className="hero-section overflow-hidden ">
          <div className="container">
            <div className='d-flex justify-content-between align-items-center'>
              <div className='hero-text'>
                <h2 className='w-25'>{title}</h2>
                <p className="text-rotator">
                  <span>{subtitle}</span>
                </p>
                <p className="content">
                  {description}
                </p>
                <a href='#register' className="text-decoration-none mr-1">
                  <Button title="سحل الأن" >
                    <AiFillMessage color="#fff" size={22} className='mr-2' />
                  </Button>
                </a>
              </div>

              <div className='hero-text d-none d-md-block w-100'>
                <a href='#register' className="text-decoration-none">
                  <Image
                    src={imageUrl}
                    alt="logo"
                    width={400}
                    height={300}
                    className="img-fluid"
                    loader={({ src, width }) => `${src}?w=${width}`}
                  />
                </a>
              </div>
            </div>
          </div>
          {/* <div className='arrow-move justify-content-center d-flex align-items-center w-100'>
            <motion.a
              href="#about"
              // initial="hidden"
              animate={{
                y: ['100%', '-100%']
              }}
              // variants={fadeInRightVariants}
              transition={{
                y: {
                  duration: 3,
                  yoyo: Infinity,
                  ease: 'easeOut',
                  repeat: Infinity
                }
              }}
            >
              <IoIosArrowDown className='text-mode' fontSize={22} />
            </motion.a>
          </div> */}
        </div>
      </section>
    </>
  );
}

export default HeaderTwo