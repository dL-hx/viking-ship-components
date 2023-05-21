import React, { FC, useState, ChangeEvent, ReactElement } from 'react'
import Input, { InputProps } from '../Input/input'

// loading处理
import Icon from './../Icon/icon'
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

    const [loading, setLoading] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value)
        if (value) {
            const results = fetchSuggestions(value);
            if (results instanceof Promise) {
                console.log('triggered');
                setLoading(true)
                results.then(data => {
                    setSuggestions(data)
                }).finally(()=>{
                    setLoading(false)
                })
            } else {
                setSuggestions(results)
            }
        } else {
            setSuggestions([])
        }
    }

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setSuggestions([])
        if (onSelect) {
            onSelect(item)
        }
    }

    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }
    const renderDropdown = () => {
        return (
            <ul>
                {suggestions.map((item, index) => {
                    return (
                        <li key={index} onClick={() => handleSelect(item)}>
                            {renderTemplate(item)}
                        </li>
                    )
                })}
            </ul>
        )
    }
    return <div className="viking-auto-complete">
        <Input
            value={inputValue}
            onChange={handleChange}
            {...restProps}
        />
        {loading && <ul><Icon icon="spinner" spin/></ul>}
        {(suggestions.length> 0) && renderDropdown()}
    </div>
}


export default AutoComplete;
