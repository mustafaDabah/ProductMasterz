'use client'
import React, { useRef } from 'react';
import useNewsletter from '@/Hooks/useNewsletter';
import { Alert } from '@/Components/UI';
import { motion } from 'framer-motion';
import useAnimationInView from '@/Hooks/useAnimationInView';
import { fadeInUpVariants } from '@/utils/animation';


function Newsletter({ content }) {
  const formRef = useRef(null);
  const addNewSubscription = useNewsletter(formRef);
  const { ref, controls } = useAnimationInView();

  return (
    <section id='Newsletter' ref={ref}>
      <div className='container bg-secondary-md pt-2'>
        <Alert />
        <div className="row">
          <div className="col-md-12 text-center">
            <motion.h2
              className="short-hr-center"
              initial="hidden"
              animate={controls}
              variants={fadeInUpVariants}
              transition={{ duration: 0.5, ease: 'easeIn' }}
            >{content.title}</motion.h2>
            <motion.p
              className='font-weight-light text-mode'
              initial="hidden"
              animate={controls}
              variants={fadeInUpVariants}
              transition={{ duration: 1, ease: 'easeIn' }}
            >{content.tagline}</motion.p>
            <motion.form
              id="newsletter"
              data-toggle="validator"
              onSubmit={addNewSubscription}
              ref={formRef}
              initial="hidden"
              animate={controls}
              variants={fadeInUpVariants}
              transition={{ duration: 1.5, ease: 'easeIn' }}
            >
              <input
                type="text"
                placeholder="Your Name "
                name="userName"
                required
              />
              <input
                type="email"
                placeholder="Your email address"
                name="userEmail"
                required
              />
              <button type="submit" id="form-signup" className="button" >SUBSCRIBE</button>
              <div id="msgSignup" className="h3 text-center hidden" />
            </motion.form>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Newsletter
