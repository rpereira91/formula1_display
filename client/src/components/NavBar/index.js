import React, { useState } from 'react'
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Collapse,
    Container
  } from "shards-react";
  
import { Link } from 'react-router-dom'
import { PATHS,  getRoute } from '../../utils/constants'
import './style.css'
const NavBar = () => {
        
    const [activeItem, setActiveItem] = useState(() => {
        // get the path name
        return getRoute(window.location.pathname)   
    })
    const [collapseOpen, setCollapseOpen] = useState(false)
    const handleItemClick = ({target:{pathname}}) => setActiveItem(getRoute(pathname))
    return (
        <Container fluid className="navBar">
            <Navbar type="dark" theme="secondary" expand="md" >
            <NavbarBrand tag={Link} to={PATHS.HOME.route}>
                <img src="images/formula-1-logo.png" className="headerImage" alt="logo"/><span className="header">Formula 1</span>
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
                <NavLink href="#" disabled>
                    Constructors
                </NavLink>
                </NavItem>
            </Nav>
            </Collapse>
            </Navbar>
        </Container>
    )
    // return (
    //     <Segment inverted>
    //         <Header icon textAlign='left' inverted >
    //             <Image src="images/formula-1-logo.png"/> <span className="header">Formula 1</span>
    //         </Header>
    //         <Menu inverted attached='top' tabular color="grey">
    //         <Menu.Menu position='middle'>
    //             <Menu.Item
    //                 name={PATHS.HOME.name}
    //                 active={activeItem === PATHS.HOME.name}
    //                 onClick={handleItemClick}
    //                 as={Link}
    //                 to={PATHS.HOME.route}
    //             />
    //             <Menu.Item
    //                 name={PATHS.SCHEDULE.name}
    //                 active={activeItem === PATHS.SCHEDULE.name}
    //                 onClick={handleItemClick}
    //                 as={Link}
    //                 to={PATHS.SCHEDULE.route}
    //             />
    //             <Menu.Item
    //                 name={PATHS.DRIVERS.name}
    //                 active={activeItem === PATHS.DRIVERS.name}
    //                 onClick={handleItemClick}
    //                 as={Link}
    //                 to={PATHS.DRIVERS.route}
    //             />
    //         </Menu.Menu>
    //         </Menu>
    //   </Segment>
    // )
}

export default NavBar
