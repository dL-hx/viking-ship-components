import React, { FC, useState, createContext, CSSProperties } from 'react'
import classNames from "classnames"
import {MenuItemProps} from "./menuItem"

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void

export interface MenuProps {
    /**默认 active 的菜单项的索引值 */
    defaultIndex?: string;
    className?: string;
    /**菜单类型 横向或者纵向 */
    mode?: MenuMode;
    style?: CSSProperties;
    // onSelect?:(selectedIndex: number)=>void;
    /**点击菜单项触发的回掉函数 */
    onSelect?: SelectCallback;
    /**设置子菜单的默认打开 只在纵向模式下生效 */
    defaultOpenSubMenus?: string[];
}

interface IMenuContext {
    index: string;
    onSelect?: SelectCallback; // 触发选中后，组件中的回调
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}

// 使用Context传递数据
export const MenuContext = createContext<IMenuContext>({index: '0'})
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * ~~~js
 * import { Menu } from 'vikingship'
 * ~~~
 */
export const Menu: FC<MenuProps> = (props) => {
    const {
        defaultIndex,
        className,
        mode,
        style,
        onSelect,
        children,
        defaultOpenSubMenus
    } = props

    const [currentActive, setActive] = useState(defaultIndex)

    const classes = classNames('viking-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    })

    const handleClick = (index: string) => {
        setActive(index)

        // 看到onSelect 可能存在也可能不存在，需要判断一下， onSelect?: SelectCallback;
        if (onSelect) {// 触发选中后，组件中的回调
            onSelect(index)
        }
    }

    // 传递给子组件的context(注入到子组件)
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',// 默认值处理为0
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus
    }

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            // 获取子组件实例 displayName
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const {displayName} = childElement.type
            if (displayName === "MenuItem" || displayName === 'SubMenu') {
                // return child
                return React.cloneElement(childElement, {// 自动添加 index属性
                    index: index.toString()
                })
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem component.");
            }
        })
    }

    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: [],
}

export default Menu;
