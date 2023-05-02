import MenuItem from '../components/Menu/MenuItem';
import Menu from './../components/Menu/menu';
function MenuDemo() {
  return (
    <Menu defaultIndex={0} onSelect={index=>console.log(index)}>
        <MenuItem>
            cool link
        </MenuItem>
        <MenuItem disabled>
            cool link2
        </MenuItem>
        <MenuItem>
            cool link3
        </MenuItem>
    </Menu>
  )
}

export default MenuDemo