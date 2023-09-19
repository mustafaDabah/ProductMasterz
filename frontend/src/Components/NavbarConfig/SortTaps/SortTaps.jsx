'use client'

import DeletePopup from '@/Components/EditPages/Component/DeletePopup/DeletePopup';
import useFetchData from '@/Hooks/useFetchData'
import { BASIC_URL } from '@/utils/basicURL';
import axios from 'axios';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { FaArrowDown, FaArrowUp, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

function UpdateTap({ tabData }) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        ARlang: tabData.localizedName[0].name,
        ENlang: tabData.localizedName[1].name,
    });

    const createTap = async (e) => {
        e.preventDefault();
        try {
            const bodyData = {
                newLocalizedName: [
                    {name:formData.ARlang, lang: 'ar' },
                    {name:formData.ENlang, lang: 'en' },
                ]
            };

            await axios.put(`${BASIC_URL}/tabs/${tabData.tabUrlName}`, bodyData);

            toast.success("Tap updated Successfully");

            // REMOVE DRAFT DATA 
            setIsLoading(false);
            refetch();

        } catch (error) {
            setIsLoading(false);
            toast.error(error);
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
        <form action="" onSubmit={createTap} className='mb-3'>
            <input value={formData.ARlang} required type="text" placeholder='Arabic Name' name="ARlang" onChange={handleInputChange} />
            <input value={formData.ENlang} required type="text" placeholder='English Name' name="ENlang" onChange={handleInputChange} />
            <Button
                onClick={createTap}
                disabled={isLoading}
                className="ml-2"
                type='submit'
            >
                {isLoading ? "loading..." : "update"}
            </Button>
        </form>
    )
}

function SingleTap({ item, refetchData }) {
    const [openDeletePopup, setOpenDeletePopup] = useState(false);
    const [openEditMenu, setOpenEditMenu] = useState(false);

    const closePopup = () => {
        setOpenDeletePopup(false);
        refetchData();
    }

    const updateOrder = async (direction) => {
        await axios.put(`${BASIC_URL}/tabs/${item.tabUrlName}`, { direction: direction });
        refetchData();
    }

    console.log(item)
    return (
        <div>
            {openDeletePopup && <DeletePopup
                show={openDeletePopup}
                closePopup={closePopup}
                pageName={item.tabUrlName}
                lang={null}
            />}

            <div
                key={item.id}
                className='d-block single-page-list d-flex justify-content-between align-items-center'
            >
                <h3>{item.tabUrlName}</h3>

                <div className="icons d-flex">
                    <Button onClick={() => updateOrder('down')}>
                        <FaArrowDown />
                    </Button>
                    <Button onClick={() => updateOrder('up')}>
                        <FaArrowUp />
                    </Button>
                    <Button
                        onClick={() => setOpenDeletePopup(true)}
                        variant='danger'
                        className='ml-auto my-3'
                    >
                        <FaTrash fontSize={15} />
                    </Button>
                    <Button
                        onClick={() => setOpenEditMenu(!openEditMenu)}
                        variant='danger'
                        className='ml-auto my-3'
                    >
                        <FaEdit fontSize={15} />
                    </Button>
                </div>
            </div>
            {openEditMenu && <UpdateTap tabData={item} />}

        </div>
    )
}

function SortTaps({ data, fetchData }) {
    return (
        <div className='mt-5'>
            <h5>Sort The Taps</h5>
            {data && data.map((tap) => (
                <SingleTap key={tap.id} item={tap} refetchData={fetchData} />
            ))}
        </div>
    )
}

export default SortTaps