import React from "react";
import classNames from "classnames";
import { useState } from "react";

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: number) => void;

export interface MenuProps {
    defaultIndex?: number;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    // onSelect?:(selectedIndex: number)=>void;
    onSelect?: SelectCallback;
    children?: React.ReactNode;
}

interface IMenuContext {
    index: number;
    onSelect?: SelectCallback; // 触发选中后，组件中的回调
}

// 使用Context传递数据
export const MenuContext = React.createContext<IMenuContext>({ index: 0 })
const Menu: React.FC<MenuProps> = (props) => {
    const {
        defaultIndex,
        className,
        mode,
        style,
        onSelect,
        children,
    } = props

    const [currentActive, setActive] = useState(defaultIndex)

    const classes = classNames('viking-menu', className, {
        'menu-vertical': mode === 'vertical'
    })

    const handleClick = (index:number)=>{
        setActive(index)

        // 看到onSelect 可能存在也可能不存在，需要判断一下， onSelect?: SelectCallback;
        if (onSelect) {// 触发选中后，组件中的回调
            onSelect(index)
        }
    }

    // 传递给子组件的context(注入到子组件)
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : 0,// 默认值处理为0
        onSelect: handleClick
    }
    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider value={passedContext}>
                {children}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: 0,
    mode: 'horizontal',
}

export default Menu