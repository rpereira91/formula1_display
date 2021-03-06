import React, { useState } from 'react';
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Collapse,
  } from "shards-react";
  
import { Link } from 'react-router-dom'
import { PATHS,  getRoute } from '../../utils/constants'
import './style.css'
const NavBar = () => {
        
    const [activeItem, setActiveItem] = useState(getRoute(window.location.pathname))
    const [collapseOpen, setCollapseOpen] = useState(false)
    const handleItemClick = ({target:{pathname}}) => setActiveItem(getRoute(pathname))
    return (
        <div fluid className="navBar">
            <Navbar type="dark" theme="secondary" expand="md" >
            <NavbarBrand tag={Link} exact to={PATHS.HOME.route}>
                <img src="images/formula-1-logo.png" className="headerImage" alt="f1"/><span className="header">Formula 1</span>
            </NavbarBrand>
            <NavbarToggler onClick={() => setCollapseOpen(!collapseOpen)} />
            <Collapse open={collapseOpen} navbar>
            <Nav navbar>
                <NavItem>
                    <NavLink 
                        active={activeItem === PATHS.SCHEDULE.name} 
                        tag={Link} 
                        to={PATHS.SCHEDULE.route}
                        onClick={handleItemClick}
                    >
                        Schedule
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink 
                        active={activeItem === PATHS.DRIVERS.name} 
                        tag={Link} 
                        to={PATHS.DRIVERS.route}
                        onClick={handleItemClick}
                    >
                        Drivers
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink 
                        active={activeItem === PATHS.RACE_NO_PARAMS.name} 
                        tag={Link} 
                        to={PATHS.RACE_NO_PARAMS.route}
                        onClick={handleItemClick}
                    >
                        Last Race
                    </NavLink>
                </NavItem>
                <NavItem>
                <NavLink href="#" disabled>
                    Constructors
                </NavLink>
                </NavItem>
            </Nav>
            </Collapse>
            </Navbar>
        </div>
    )
}

export default NavBar
