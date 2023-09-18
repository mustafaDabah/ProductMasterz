'use client'
import React, { useEffect, useState } from 'react'
import { Title } from '..'
import useFetchData from '@/Hooks/useFetchData';

function FormEditor(props) {
    const { formData, handleInputChange } = props;
    const { data, refetch } = useFetchData(`tabs?lang=${formData.lang ? formData.lang : 'ar'}`);
    const [tabsCategories, setTabsCategories] = useState([])

    console.log(data);
    console.log(tabsCategories);

    return (
        <div>
            <form action="" className='blog-form'>
                <div className="d-flex align-items-center">
                    <input required value={formData.pageUrlName} type="text" placeholder='page URL name' name="pageUrlName" onChange={handleInputChange} />
                    <input required value={formData.name} type="text" placeholder='page name' name="name" onChange={handleInputChange} />

                    <select name="lang" onChange={handleInputChange} defaultValue={formData.lang || ''}>
                        <option value="choose language">choose language</option>
                        <option value="ar">ar</option>
                        <option value="en">en</option>
                    </select>

                    <select name="tabId" onChange={handleInputChange} defaultValue={formData.tabId || ''}>
                        <option value="choose language"> navbar tap</option>
                        {data && data.map(item => (
                            <option key={item.id} value={item._id}>{item.tabUrlName}</option>
                        ))}
                    </select>
                </div>

                <Title text='InnerNavbar' />
                <input required value={formData.navbar} type="text" placeholder='navbar' name="navbar" onChange={handleInputChange} />

                <Title text='header section' />
                <input required value={formData.headerTitle} type="text" placeholder='header title' name="headerTitle" onChange={handleInputChange} />
                <input required value={formData.headerDescription} type="text" placeholder='header description' name="headerDescription" onChange={handleInputChange} />
                <input required value={formData.headerImageUrl} type="text" placeholder='header image url' name="headerImageUrl" onChange={handleInputChange} />
            </form>
        </div>
    )
}

export default FormEditor