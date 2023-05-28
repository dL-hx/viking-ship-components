import React from 'react'
import MenuItem from '../components/Menu/menuItem';
import SubMenu from '../components/Menu/subMenu';
import Menu from './../components/Menu/menu';
function MenuDemo () {
  return (
    <Menu defaultIndex={'0'} onSelect={(index) => console.log(index)} mode='vertical' defaultOpenSubMenus={['2']}>
      <MenuItem>
            cool link
      </MenuItem>
      <MenuItem disabled>
            cool link2
      </MenuItem>
      <SubMenu title='dropdown'>
        <MenuItem>
          dropdown 1
        </MenuItem>
        <MenuItem>
          dropdown 2
        </MenuItem>
      </SubMenu>
      <MenuItem>
            cool link3
      </MenuItem>
    </Menu>
  )
}

export default MenuDemo
