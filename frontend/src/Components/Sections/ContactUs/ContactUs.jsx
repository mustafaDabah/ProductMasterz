'use client'
import useSendMessages from "@/Hooks/useSendMessages";
import React, { useRef } from "react";
import { Alert, Button, Title } from "@/Components/UI";
import { fadeInRightVariants, normalTransition } from "@/utils/animation";
import { AiOutlineSend } from "react-icons/ai";

function ContactUs() {
    const formRef = useRef(null);
    const sendMessagesReceivers = useSendMessages(formRef);
    const { ref, controls } = useAnimationInView();

    return (
        <section id="contact" className="container large-margin" ref={ref}>
            <Alert />
            <a href="contact" />
            {/* Nav Anchor */}
            <Title text="تواصل معنا"/>
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
                        <h2 className="short-hr-left pt-4">أترك لنا رسالة</h2>
                        <form id="contactForm" data-toggle="validator" onSubmit={sendMessagesReceivers} ref={formRef}>
                            <div className="form-group title-main">
                                <input
                                    type="text"
                                    id="name"
                                    name="userName"
                                    placeholder="الاسم*"
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
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    placeholder="الموضوع*"
                                    required
                                    size={35}
                                />
                                <div className="help-block with-errors" />
                            </div>
                            <div className="form-group">
                                {/* Message Field */}
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="الرسالة*"
                                    required
                                    defaultValue={""}
                                />
                                <div className="help-block with-errors" />
                                {/* Submit Button */}
                                {/* <Button title="ارسل " type='submit' >
                                    <AiOutlineSend color="#fff" size={22} className='mr-2' />
                                </Button> */}
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

export default ContactUs;
