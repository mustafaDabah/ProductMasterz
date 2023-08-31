import { useCallback, useEffect } from 'react';

function useScrollHandler(options) {
  const { setActiveSection, getSectionId } = options; 

  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const sections = document.querySelectorAll('section');
    sections.forEach((sectionItem, i) => {
      const section = sectionItem;
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + scrollTop - 80;
      const sectionBottom  = rect.bottom + scrollTop;

      if(scrollTop === 0) return setActiveSection(getSectionId(0));

      if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
        const value = getSectionId(i)
        setActiveSection(value);
      }
    })
  } , [setActiveSection, getSectionId]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {passive: true});

    return () => {
      window.removeEventListener('scroll', handleScroll, {passive: true});
    };
  }, [setActiveSection, getSectionId, handleScroll]);
}

export default useScrollHandler;