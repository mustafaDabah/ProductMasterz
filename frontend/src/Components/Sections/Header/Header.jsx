"use client";
import React, { useState, useEffect } from 'react';
import { NavbarHeaderMemo } from "./Components/Navbar/Navbar";
import Image from "next/image";
import { motion } from 'framer-motion';
import { fadeInLeftVariants, fadeInRightVariants, normalTransition } from '@/utils/animation';
import {  IoIosArrowDown } from 'react-icons/io';
import Link from 'next/link';
import { Button } from '@/Components/UI';
import {AiFillMessage } from 'react-icons/ai';
import SubMenuNavbar from './Components/SubMenuNavbar/SubMenuNavbar';

function Header({ content, navLinks, navbarItems  }) {
  const { title, description, imageUrl } = content;

  return (
    <>
     {navbarItems?.length > 0 ? (<NavbarHeaderMemo navLinks={navLinks} />) : (<SubMenuNavbar />)}
      <section id="mainHeader" className="large-margin pt-0">
        <div id="hero-section" className="hero-section overflow-hidden ">
          <div className="container">
            <div className='d-flex justify-content-between align-items-center'>
              <div className='hero-text'>
                <h2>{title}</h2>
                  <p className="text-rotator">
                    <span>{description}</span>
                  </p>

                  {/* <Link href='#contact' className="text-decoration-none mr-1">
                    <Button title="تواصل  معنا" >
                      <AiFillMessage color="#fff" size={22} className='mr-2' />
                    </Button>
                  </Link> */}
              </div>

              <div className='hero-text d-none d-md-block'>
                <Image 
                 src={imageUrl}
                 alt="logo"
                 width={300}
                 height={300}
                 className="img-fluid"
                 loader={({ src, width }) => `${src}?w=${width}`}
                 />
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

export default Header;