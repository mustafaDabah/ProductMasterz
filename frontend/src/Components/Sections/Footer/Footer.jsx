'use client'
import useFooterColumn from '@/Hooks/useFooterColumn';
import React from 'react'
import Icons from '../../UI/Icons/Icons';
import SingleColumn from './Components/SingleColumn/SingleColumn';

function Footer({ footerData, titles }) {
  const columnData = useFooterColumn(footerData, titles);

  return (
    <footer id="main-footer" className='footer-colum'>
      <div id="footer" className='pt-5'>
        <div className="container">
          <div className="row">
            {columnData.map((data, index) => (
              <div key={index} className="col-6 col-md-3">
                <h2 className='font-weight-normal text-mode'>{titles[index]}</h2>
                <ul>
                  {data.map(item => (
                    <SingleColumn item={item} key={item.id} />
                  ))}
                </ul>
              </div>
            ))}

          </div>
          <div className="row pt-5">
            <div className="w-100">
              <p className='font-weight-light text-center text-mode'>© Copyright Omar Hamdy  <span id="year"> </span></p>{/* Copyright Text */}
            </div>
            <div className="col d-flex justify-content-center align-items-center flex-column">
              {/* <h2 className='text-center text-capitalize'>follow our social media.</h2> */}
              <ul className="social-links">
                <Icons />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;

