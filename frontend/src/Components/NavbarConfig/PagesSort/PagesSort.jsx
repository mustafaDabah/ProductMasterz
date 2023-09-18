'use client'

import DeletePopup from '@/Components/EditPages/Component/DeletePopup/DeletePopup';
import useFetchData from '@/Hooks/useFetchData'
import { BASIC_URL } from '@/utils/basicURL';
import axios from 'axios';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { FaArrowDown, FaArrowUp, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

function SingleTap({ item, refetchData }) {
    const [openDeletePopup, setOpenDeletePopup] = useState(false);
    const [openEditMenu, setOpenEditMenu] = useState(false);

    const closePopup = () => {
        setOpenDeletePopup(false);
        refetchData();
    }

    const updateOrder = async (direction) => {
        await axios.put(`${BASIC_URL}/pages/${item.pageUrlName}/en`, { direction: direction });
        refetchData();
    }

    console.log(item)
    return (
        <div>
            <div
                key={item.id}
                className='d-block single-page-list d-flex justify-content-between align-items-center'
            >
                <h3>{item.pageUrlName}</h3>

                <div className="icons d-flex">
                    <Button onClick={() => updateOrder('down')}>
                        <FaArrowDown />
                    </Button>
                    <Button onClick={() => updateOrder('up')}>
                        <FaArrowUp />
                    </Button>
                </div>
            </div>
        </div>
    )
}

function PagesSort() {
    const { data: tabsData, loading, error, refetch } = useFetchData('tabs?lang=en');

    return (
        <div className='mt-5'>
            <h5 className='mt-5'>Sort The Pages</h5>
            {tabsData && tabsData.map(tab => (
                <div key={tab._id}>
                    <h5>{tab.tabUrlName}</h5> 
                    <ul>
                        {tab.pages.map(page => (
                            <SingleTap key={page._id} item={page} refetchData={refetch} />
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default PagesSort