import React from 'react'
import { getSingleRecord } from '@/utils/basicURL';
import { ContactUs, Header } from '@/Components/Sections';
import parse from 'html-react-parser';


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
        <div className='text-mode overflow-hidden sun-editor-editable sun-editor-editable-blockquote-blog bg-body sun-editor-editable-blog'>
          {parse(`${websiteContent.content}`)}
        </div>
      </div>
    </div>
  )
}

export default blog
