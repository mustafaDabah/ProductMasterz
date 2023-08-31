import React from 'react'
import { getSingleRecord } from '@/utils/basicURL';
import {  Header } from '@/Components/Sections';
import { ContactUsParse } from '@/Components/UI';


export async function generateMetadata({ params, searchParams }) {
  const id = params.id;
  const lang = searchParams.lang;
  const blog = await getSingleRecord(`${id}/${lang}`);

  return {
    title: blog.name,
    // description: blog.description,
    // keywords: blog.keywords
  };
}

async function blog({searchParams, params }) {
  const { id } = params;
  const { lang } = searchParams;
  const websiteContent = await getSingleRecord(`${id}/${lang}`);

  // WEBSITE SECTIONS CONTENT
  const navbarItems = websiteContent.navbar;
  const headerContent = websiteContent.header;

  return (
    <div className={`home-page ${lang === 'ar' ? 'direction-rtl' : 'direction-ltr' }`}>
      <Header
        navLinks={navbarItems}
        content={headerContent}
        imgPath="/logo.png"

      />
      <div className='container'> 
       <ContactUsParse content={websiteContent.content} />
      </div>
    </div>
  )
}

export default blog
