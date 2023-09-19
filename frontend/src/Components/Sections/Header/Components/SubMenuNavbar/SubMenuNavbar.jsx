'use client'

import useScrollHandler from "@/Hooks/useScrollHandler";
import React, { useState } from "react";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { FaBars } from 'react-icons/fa';
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import useFetchData from "@/Hooks/useFetchData";


function SubMenuNavbar() {
    const [activeSection, setActiveSection] = useState('mainHeader');
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const pageLang = searchParams.get('lang');
    const { data: navbarTabs } = useFetchData(`tabs?lang=${pageLang ? pageLang : 'ar'}`);

    console.log(navbarTabs)

    const router = useRouter();

    const getSectionId = (index) => {
        const sections = document.querySelectorAll('section');
        return sections[index].id;
    };

    useScrollHandler({ setActiveSection, getSectionId });

    const handleLanguageChange = (e) => {
        const lang = e.target.value;

        // Append or update the lang query parameter and redirect
        const newUrl = pathname === '/' ? `${pathname}page/home?lang=${lang}` : `${pathname}?lang=${lang}`;

        router.push(newUrl);
    }

    return (
        <Navbar fixed="top" expand="lg" variant="dark" className="scrolled navbar-zindex ">
            <Container>
                {/* Site Logo */}
                <Navbar.Brand href="#" className="d-flex align-items-center mr-0">
                    <Image src={'/Horizontal Version.png'} alt="logo" width={200} height={70} className="object-fit-cover " />
                    {/* <h3 className='mr-1 mt-2 logo-title'>Product MaterZ</h3> */}
                </Navbar.Brand>
                {/* Dropdown Button */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='border-0 text-mode'>
                    <FaBars />
                </Navbar.Toggle>
                {/* Navigation Links */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto mr-auto flex justify-content-center align-items-center">
                        {navbarTabs && navbarTabs.map(tab => (
                            <NavDropdown key={tab.id} title={tab.localizedName[0].name} id="basic-nav-dropdown">
                                {tab.pages.map((page, index) => (
                                    <NavDropdown.Item key={index} href={`/page/${page.pageUrlName}?lang=${pageLang}`}>{page.name}</NavDropdown.Item>
                                ))}
                            </NavDropdown>
                        ))}
                    </Nav>
                    <select className="select-lang" onChange={handleLanguageChange} value={pageLang}>
                        <option value="ar">ar</option>
                        <option value="en">en</option>
                    </select>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default SubMenuNavbar