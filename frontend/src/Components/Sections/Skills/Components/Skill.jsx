'use client'
import React from 'react'
import { motion } from 'framer-motion';
import { normalTransition } from '@/utils/animation';

function Skill({skill, controls}) {
    const {type , level} = skill.fields;

    const skillVariants = {
        hidden: { width: '0%' },
        visible: { width: `${level}%` },
    };
    
    return (
        <div className="skill">
            <span className="skillName">{type}</span>
            <div className="skillBar">
                <motion.div 
                    initial="hidden"
                    animate={controls ? 'visible' : 'hidden'}
                    variants={skillVariants}
                    transition={normalTransition}
                    className="skillProgress"
                ></motion.div>
            </div>
            <span className='skill-percentage'> {level}% </span>
        </div>
    )
}

export default Skill