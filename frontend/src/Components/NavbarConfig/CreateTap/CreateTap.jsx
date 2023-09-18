'use client'

import { Alert } from '@/Components/UI';
import { BASIC_URL } from '@/utils/basicURL';
import axios from 'axios';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify';

function CreateTap({refetch}) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({});

    const createTap = async (e) => {
        e.preventDefault();
        try {
            const bodyData = {
                tabUrlName: formData.tabUrlName,
                localizedName: [
                    { name: formData.ARlang, lang: 'ar' },
                    { name: formData.ENlang, lang: 'en' },
                ]

            };

            await axios.post(`${BASIC_URL}/tabs`, bodyData);

            toast.success("Tap added Successfully");

            // REMOVE DRAFT DATA 
            setIsLoading(false);
            refetch();

        } catch (error) {
            setIsLoading(false);
            toast.error(error.response.data.message);
            console.log(error);
        }
    }

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };
    return (
        <div className='mt-2'>
            <h5>Create New Tap</h5>
            <Alert />
            <form action="" onSubmit={createTap}>
                <input required type="text" placeholder='Tap Url Name' name="tabUrlName" onChange={handleInputChange} />
                <input required type="text" placeholder='Arabic Name' name="ARlang" onChange={handleInputChange} />
                <input required type="text" placeholder='English Name' name="ENlang" onChange={handleInputChange} />
                <Button
                    onClick={createTap}
                    disabled={isLoading}
                    className="ml-2"
                    type='submit'
                >
                    {isLoading ? "loading..." : "Publish"}
                </Button>
            </form>
        </div>
    )
}

export default CreateTap