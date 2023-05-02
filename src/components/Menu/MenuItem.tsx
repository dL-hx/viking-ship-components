import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";

export interface MenuItemProps {
    index?: number;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}
const MenuItem: React.FC<MenuItemProps> = (props) => {
    const {
        index,
        disabled,
        className,
        style,
        children,
    } = props

    const context = useContext(MenuContext)

    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    })

    // 处理高亮
    const handleClick = () => {
        if (context.onSelect && !disabled && (typeof index === 'number')) {
            context.onSelect(index) // 必须要求组件传递index属性
        }
    }


 
    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}

MenuItem.defaultProps = {

}

MenuItem.displayName = 'MenuItem'
export default MenuItem