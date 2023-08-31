import { Title } from '@/Components/UI'
import React from 'react'

function Service({content}) {
  const {items, title} = content
  return (
    <section id='services'>
        <div className="container">
            <Title text={title} />
            <div className='service-container pt-4'>
              {
                items.map((item, index) => (
                  <div className='service-content' key={index}>
                    {item}
                  </div>
                ))
              }
            </div>
        </div>
    </section>
  )
}

export default Service