
import React from 'react';
import SingleProject from './Components/SingleProject/SingleProject';

function Products({ content, products }) {
 
  return (
    <section id="Products">
        <div className='container'>
            <div className="row tiny-margin mb-5">
                <div className="col-md-11 main-title">
                    <h2 className="short-hr-left">{content.title}</h2>
                    <p className='font-weight-light text-mode'>{content.tagline}</p>
                </div>
            </div>

            <div className="n-projects-list">
                {
                    products.map((product, index) => (
                        <SingleProject key={index} product={product} index={index} />
                    ))
                }
            </div>
        </div>
    </section>
  )
}

export default Products