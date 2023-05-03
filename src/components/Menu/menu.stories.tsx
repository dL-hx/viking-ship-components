import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

export const defaultMenu = () => (
    <Menu defaultIndex='0' onSelect={(index) => {action(`clicked ${index} item`)}} >
      <MenuItem>
        cool link
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem> 
      <MenuItem>
        cool link 2
      </MenuItem> 
    </Menu>
  )


const SubMenus = () => (
    <Menu defaultIndex={'0'} onSelect={index => console.log(index)} mode='vertical' defaultOpenSubMenus={['2']}>
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


storiesOf('Menu Component', module)
    .add('Menu', defaultMenu)
    .add('Sub Menu', SubMenus)
