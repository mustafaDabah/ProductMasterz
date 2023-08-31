import React from 'react'
import { BiRadioCircleMarked, BiRadioCircle } from 'react-icons/bi';

function SingleDot({ index, handleDotClick, route, activeSection }) {

    return (
        <li className={`mt-2 ${activeSection === index && 'active-dot'}`}>
            <a aria-label={`section ${route}`}  href={`#${route}`} className='text-white' onClick={() => handleDotClick(index)}>
                {
                    activeSection === index  ? (<BiRadioCircleMarked fontSize={24} />) : (
                        <BiRadioCircle fontSize={24} />
                    )
                }
            </a>
        </li>
    )
}

export default SingleDot