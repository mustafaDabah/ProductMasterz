'use client'
import { CarouselViewList } from '@/Components/UI'
import useAirTable from '@/Hooks/useAirTable'
import React from 'react'
import SingleCardTestimonial from './Components/SingleCardTestimonial/SingleCardTestimonial'

function Testimonial() {
  const data = useAirTable('Testimonial');

  return (
    <section className='large-margin testimonial' id='Testimonial'>
      <div className="container">
        <div className="row tiny-margin">
          <div className="col-md-11 main-title">
            <h2 className="short-hr-left text-uppercase">Recommendations</h2>
            <p className='text-mode'>what our clients say about us.</p>
          </div>
          <div id="full-row" className="text-center pb-4">
            <CarouselViewList>
              {data.sort((a, b) => a.fields.order - b.fields.order).map((item) => <SingleCardTestimonial key={item.id} user={item} />)}
            </CarouselViewList>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonial