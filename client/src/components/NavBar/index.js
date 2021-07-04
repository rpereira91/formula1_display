import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { PATHS,  getRoute } from '../../utils/constants'

const NavBar = () => {
        
    const [activeItem, setActiveItem] = useState(() => {
        // get the path name
        return getRoute(window.location.pathname)   
    })
    const handleItemClick = (e, { name }) => setActiveItem(name)

    return (
        <div>
        <Menu attached='top' tabular color="grey">
          <Menu.Menu position='middle'>
            <Menu.Item
                name={PATHS.HOME.name}
                active={activeItem === PATHS.HOME.name}
                onClick={handleItemClick}
                as={Link}
                to={PATHS.HOME.route}
            />
            <Menu.Item
                name={PATHS.SCHEDULE.name}
                active={activeItem === PATHS.SCHEDULE.name}
                onClick={handleItemClick}
                as={Link}
                to={PATHS.SCHEDULE.route}
            />
            <Menu.Item
                name={PATHS.DRIVERS.name}
                active={activeItem === PATHS.DRIVERS.name}
                onClick={handleItemClick}
                as={Link}
                to={PATHS.DRIVERS.route}
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
}

export default NavBar
