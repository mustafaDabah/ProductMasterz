'use client'

import React, { useEffect } from 'react'
import parse from 'html-react-parser';
import axios from 'axios';
import { Alert } from '@/Components/UI';
import { toast } from 'react-toastify';
import useSendMessages from '@/Hooks/useSendMessages';

function ContactUsParse({ content }) {
    const sendMessagesReceivers = useSendMessages();


    useEffect(() => {
        const handleSubmit = async (event) => {
            event.preventDefault();

            const form = event.target;
            const formData = new FormData(form);
            const formDataObj = {};

            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });

            if (form.id.endsWith('register')) {
                try {
                    const { data } = await axios.post('https://product-masterz-backend.onrender.com/api/v0/registered-lead/', formDataObj);
                    toast.success(data.message)
                } catch (err) {
                    toast.error(err.message)
                }

            } else {
                sendMessagesReceivers(event)
            }
        };

        document.addEventListener('submit', handleSubmit);

        return () => {
            // Cleanup
            document.removeEventListener('submit', handleSubmit);
        };
    }, []);

    return (
        <div>
            <Alert />
            <div className='text-mode overflow-hidden sun-editor-editable sun-editor-editable-blockquote-blog bg-body sun-editor-editable-blog'>
                {parse(`${content}`)}
            </div>
        </div>
    )
}

export default ContactUsParse