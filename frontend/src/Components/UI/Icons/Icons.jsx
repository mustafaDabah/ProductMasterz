'use client'
import useAirTable from '@/Hooks/useAirTable';
import Link from 'next/link';
import React from 'react'
import * as icons  from 'react-icons/fa';

function Icons({classProperty}) {
  const data = useAirTable('OnlineExistence');
  return (
    <li className={`d-flex footer-icons ${classProperty}`}>
     {
      data.map((item) => (
        <Link 
         aria-label='social media links'
         key={item.id}
         href={item.fields.Link || ''} 
         passHref
         target="_blank"
         className='text-white mr-3'>
          {React.createElement(icons[item.fields.icon])}
        </Link>
      ))
     }
    </li>
  )
}

export default Icons;

// https://react-icons.github.io/react-icons/icons?name=fa