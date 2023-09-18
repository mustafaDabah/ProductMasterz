'use client'
import useSendMessages from "@/Hooks/useSendMessages";
import React, { useRef } from "react";
import { Alert, Button, Title } from "@/Components/UI";
import {  fadeInRightVariants, normalTransition } from "@/utils/animation";
import { AiOutlineSend } from "react-icons/ai";

function Register() {
    const formRef = useRef(null);
    const sendMessagesReceivers = useSendMessages(formRef);
    const { ref, controls } = useAnimationInView();

    return (
        <section id="register" className="container large-margin min-vh-100" ref={ref}>
            <Alert />
            <a href="contact" />
            {/* Nav Anchor */}
            <Title text='سجل الأن ' />
            <div>
                <div className="row small-margin ">
                    <div className="col-md-11 main-title">
                        {/* <p className='font-weight-light text-mode'>
                            {content.tagline}
                        </p> */}
                    </div>
                </div>
                <div className="row title-main">
                    <div
                        className="col-md-6 bg-secondary-md "
                        initial="hidden"
                        animate={controls}
                        variants={fadeInRightVariants}
                        transition={normalTransition}
                    >
                        <form id="contactForm" data-toggle="validator" onSubmit={sendMessagesReceivers} ref={formRef}>
                            <div className="form-group title-main">
                                {/* Name Field */}
                                <input
                                    type="text"
                                    id="name"
                                    name="userName"
                                    placeholder="الاسم*"
                                    required
                                    size={35}
                                />
                                <div className="help-block with-errors" />
                                <input
                                    type="number"
                                    id="name"
                                    name="phoneNumber"
                                    placeholder="رقم الهاتف*"
                                    required
                                    size={35}
                                />
                                <div className="help-block with-errors" />
                            </div>
                            <div className="form-group">
                                {/* Email Field */}
                                <input
                                    type="email"
                                    id="email"
                                    name="userEmail"
                                    placeholder="البريد الالكتروني *"
                                    required
                                    size={35}
                                />                               
                                <div className="help-block with-errors" />
                            </div>
                            <div className="form-group">
                                {/* Submit Button */}
                                <Button title="ارسل " type='submit' >
                                    <AiOutlineSend color="#fff" size={22} className='mr-2' />
                                </Button>
                                {/* Success Message */}
                                <div id="msgSubmit" className="text-center hidden" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register