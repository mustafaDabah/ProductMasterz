import NavbarConfig from '@/Components/NavbarConfig/NavbarConfig';
import { Title } from '@/Components/UI';
import React from 'react'

function page() {
  return (
    <section className='pt-3'>
        <div className='container'>
           <Title text='Navbar Config Page' />
           <NavbarConfig />
        </div>
    </section>
    
  )
}

export default page; 