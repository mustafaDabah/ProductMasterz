import React from 'react'
import { Title } from '..'

function FormEditor(props) {
    const { formData, handleInputChange } = props

    return (
        <div>
            <form action="" className='blog-form'>
                {/* <Title text='select language' /> */}
                <div className="d-flex align-items-center">
                    <input required value={formData.name} type="text" placeholder='page name' name="name" onChange={handleInputChange} />

                    <select name="lang" onChange={handleInputChange} defaultValue={formData.lang || ''}>
                        <option value="choose language">choose language</option>
                        <option value="ar">ar</option>
                        <option value="en">en</option>
                    </select>
                </div>
                <Title text='Navbar' />
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