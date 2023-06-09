import React,{ useContext, useState,FC, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'

export interface SubMenuProps {
	index?: string;
	title: string;
	className?: string;
    children?: React.ReactNode;
}

export const SubMenu: FC<SubMenuProps> = ({ index, title, children, className}) => {
	const context = useContext(MenuContext)
    // 类型断言 as Array<string>,断言后没有undefined类型了
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>

    const isOpened = (index && context.mode === 'vertical')?openedSubMenus.includes(index):false

	const [ menuOpen, setOpen ] = useState(isOpened)
	const classes = classNames('menu-item submenu-item', className, {
		'is-active': context.index === index
	})
	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault()
		setOpen(!menuOpen)
	}
	let timer: any
	const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
		clearTimeout(timer)
		e.preventDefault()
		timer = setTimeout(() => {
			setOpen(toggle)
		}, 300)
	}
	const clickEvents = context.mode === 'vertical' ? {
		onClick: handleClick
	} : {}
	const hoverEvents = context.mode !== 'vertical' ? {
		onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true)},
		onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false)}
	} : {}
	const renderChildren = () => {
		const subMenuClasses = classNames('viking-submenu', {
			'menu-opened': menuOpen
		})
		const childrenComponent = React.Children.map(children, (child, i) => {
			const childElement = child as FunctionComponentElement<MenuItemProps>
            // 获取子组件实例 displayName
			if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {// 自动添加 index属性
                    index: `${index}-${i}`
                })
			} else {
				console.error("Warning: SubMenu has a child which is not a MenuItem component")
			}
		})
		return (
			<ul className={subMenuClasses}>
				{childrenComponent}
			</ul>
		)
	}
	return (
		<li key={index} className={classes} {...hoverEvents}>
			<div className="submenu-title" {...clickEvents}>
				{title}
			</div>
			{renderChildren()}
		</li>
	)
}

SubMenu.defaultProps = {

}

SubMenu.displayName = 'SubMenu'

export default SubMenu;
