import React, { FC, useState, KeyboardEvent, ChangeEvent, ReactElement, useEffect, useRef } from 'react'
import Input, { InputProps } from '../Input/input'

// loading处理
import Icon from './../Icon/icon'
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
import classNames from 'classnames';
import Transition from '../Transition';
// 处理复杂Object结构
interface DataSourceObject {
    value: string;
}

// 交叉类型
export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (keyword: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = props => {
    const { fetchSuggestions, onSelect, renderOption, value, ...restProps } = props;
    const [inputValue, setInputValue] = useState(value)
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])

    const triggerSearch = useRef(false) // 保存数据,不触发页面渲染
    const componentRef = useRef<HTMLDivElement>(null)

    // 点击区域外关闭
    useClickOutside(componentRef, () => setSuggestions([]))
    const [highlightIndex, setHighlightIndex] = useState(-1)// 当前高亮, -1:无任何高亮

    const [loading, setLoading] = useState(false)
    const [ showDropdown, setShowDropdown] = useState(false)


    const debouncedValue = useDebounce(inputValue, 500)// 500ms后更新 inputValue,起到防抖作用
    useEffect(() => {
        if (debouncedValue && triggerSearch.current) {// 用debouncedValue 替换 inputValue
            const results = fetchSuggestions(debouncedValue as string);
            if (results instanceof Promise) {
                console.log('triggered');
                setLoading(true)
                results.then(data => {
                    setSuggestions(data)
                    if (data.length > 0) {
                        setShowDropdown(true)
                    }
                }).finally(() => {
                    setLoading(false)
                })
            } else {
                setSuggestions(results)
                if (results.length > 0) {
                    setShowDropdown(true)
                } 
            }
        } else {
            setSuggestions([])
            setShowDropdown(false)
        }

        setHighlightIndex(-1)

    }, [debouncedValue, fetchSuggestions])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value)
        /* 放到useEffect  */

        triggerSearch.current = true
    }

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setShowDropdown(false)
        setSuggestions([])
        if (onSelect) {
            onSelect(item)
        }

        triggerSearch.current = false
    }

    const highlight = (index: number) => {
        if (index < 0) { // 第一项
            index = 0
        }

        if (index >= suggestions.length) {// 最后一项
            index = suggestions.length - 1
        }

        setHighlightIndex(index)
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            case 13: // enter
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex])
                }
                break
            case 38: // 向上
                highlight(highlightIndex - 1)
                break
            case 40:// 向下
                highlight(highlightIndex + 1)
                break
            case 27:// esc
                setSuggestions([])
                setShowDropdown(false)
                break
            default:
                break
        }
    }
    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }
    const renderDropdown = () => {
        return (
            <Transition
                in={showDropdown || loading}
                animation="zoom-in-top"
                timeout={300}
                onExited={() => { setSuggestions([]) }}
            >
                <ul className="viking-suggestion-list">
                    {loading &&
                        <div className="suggstions-loading-icon">
                            <Icon icon="spinner" spin />
                        </div>
                    }
                    {suggestions.map((item, index) => {
                        // add 高亮样式
                        const cnames = classNames('suggestion-item', {
                            'is-active': index === highlightIndex
                        })
                        return (
                            <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                                {renderTemplate(item)}
                            </li>
                        )
                    })}
                </ul>
            </Transition>
        )
    }
    return <div className="viking-auto-complete" ref={componentRef}>
        <Input
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            {...restProps}
        />
        {loading && <ul><Icon icon="spinner" spin /></ul>}
        {(suggestions.length > 0) && renderDropdown()}
    </div>
}


export default AutoComplete;
