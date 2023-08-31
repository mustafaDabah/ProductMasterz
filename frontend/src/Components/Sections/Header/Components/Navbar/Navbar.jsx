'use client'

import useScrollHandler from "@/Hooks/useScrollHandler";
import React, {  useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FaBars } from 'react-icons/fa';
import Image from "next/image";


function NavbarHeader({ navLinks }) {
    const [activeSection, setActiveSection] = useState('mainHeader');

    const getSectionId = (index) => {
        const sections = document.querySelectorAll('section');
        return sections[index].id;
    };

    useScrollHandler({ setActiveSection, getSectionId });


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
                    <Nav className="flex justify-content-end align-items-center w-100">  
                        {navLinks.map((item, index) => (
                            <Nav.Link
                                key={index} 
                                className={` nav-link  ${activeSection === item.link ? 'active-link' : ''}`}
                                href={`#${item.link}`}
                            >
                                {item.text}
                            </Nav.Link>

                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarHeader
export const NavbarHeaderMemo = React.memo(NavbarHeader)
