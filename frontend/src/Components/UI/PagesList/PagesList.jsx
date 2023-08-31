'use client'

import Link from 'next/link'
import React from 'react'

function SinglePage({item}) {

    return (
        <div>
            <div
                key={item.id}
                className='d-block single-page-list d-flex justify-content-between align-items-center'
            >

                <h3>{item.name}</h3>

                <div className="icons d-flex">
                    {item.langs.includes('ar') && <Link href={`/edit/${item.name}?lang=ar`} target='_blank'> Ar</Link>}
                    {item.langs.includes('en') && <Link className='ml-3' href={`/edit/${item.name}?lang=en`} target='_blank'> En</Link>}
                </div>
            </div>
        </div>
    )
}

function PagesList({ pagesName }) {

    return (
        <div className='mt-5'>
            {
                pagesName.map(item => (
                   <SinglePage item={item} key={item.id} />
                ))
            }
        </div>

    )
}

export default PagesList