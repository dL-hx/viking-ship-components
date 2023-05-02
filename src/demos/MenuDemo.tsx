import MenuItem from '../components/Menu/MenuItem';
import Menu from './../components/Menu/menu';
function MenuDemo() {
  return (
    <Menu defaultIndex={0} onSelect={index=>console.log(index)}>
        <MenuItem index={0}>
            cool link
        </MenuItem>
        <MenuItem index={1} disabled>
            cool link2
        </MenuItem>
        <MenuItem index={2}>
            cool link3
        </MenuItem>
    </Menu>
  )
}

export default MenuDemo