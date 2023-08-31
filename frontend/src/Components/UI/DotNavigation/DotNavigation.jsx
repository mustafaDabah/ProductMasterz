'use client';
import { useState, useEffect } from 'react';
import SingleDot from './Component/SingleDot';


function DotNavigation() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const sections = document.querySelectorAll('section');
      sections.forEach((itemSection, i) => {
        const section = itemSection;
        const rect = section.getBoundingClientRect();
        const sectionTop = (rect.top + scrollTop) - 100;
        const sectionBottom = rect.bottom + scrollTop;

        if (scrollTop === 0) return setActiveSection(0);

        if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
          setActiveSection(i);
        }
      })
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll, { passive: true });
    };
  }, []);

  const handleDotClick = (index) => {
    const sections = document.querySelectorAll('section');
    const section = sections[index];
    section.scrollIntoView({ behavior: 'smooth' });
  };
  // inline: 'center', block: 'center'

  const routes = [
    'mainHeader',
    'About',
    'Skills',
    'Products',
    'TimeLine',
    'Certifications',
    'Testimonial',
    'Album',
    'Newsletter',
    'ContactUs',
  ]

  return (
    <div className='bullets position-fixed left-10'>
      <ul className='d-flex flex-column justify-content-center align-items-center'>
        {
          routes.map((route, index) => (
            <SingleDot route={route} index={index} key={index} handleDotClick={handleDotClick} activeSection={activeSection} />
          ))
        }
      </ul>
    </div>
  );
}

export default DotNavigation