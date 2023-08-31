'use client'

import { Button, Title } from '@/Components/UI'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaInternetExplorer, FaLinkedinIn } from 'react-icons/fa'

function AboutOmar({ content }) {
    const { title, subtitle, description, imageUrl } = content
    return (
        <section id='omar'>
            <div className="container">
                <Title text={title} />
                <div className='row'>
                    <div className="col-md-6">
                        <div className="about-omar main-title">
                            <h2 className=' font-weight-bold'>{subtitle}</h2>
                            {/* <h2 className='mb-3 font-weight-bold'>خبير إدارة وتأسيس المنتجات الرقمية </h2> */}
                            <p>{description}</p>
                            <div className='d-flex'>
                                <Link href='https://www.linkedin.com/in/omarhamdys/' className="text-decoration-none" target="_blank">
                                    <Button title="Connect on LinkedIn" >
                                        <FaLinkedinIn color="#fff" size={22} className='mr-2' />
                                    </Button>
                                </Link>
                                <Link href='https://omar-hamdy.com/' className="text-decoration-none" target="_blank">
                                    <Button title="Website" >
                                        <FaInternetExplorer color="#fff" size={22} className='mr-2' />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mt-3 mt-md-0">
                        <Image
                            loader={({ src, width }) => `${src}?w=${width}`}
                            src={imageUrl}
                            width={300}
                            height={400}
                            alt='omar-image'
                            className='img-fluid'
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutOmar