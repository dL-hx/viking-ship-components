import React, { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from 'react';
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon/icon'

type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {

    /** 是否禁用Input */
    disabled?: boolean;

    /** 设置input 大小,支持 lg / sm */
    size?: InputSize;

    /** 右侧图标*/
    icon?: IconProp;

    /** 前缀组合*/
    prepend?: string | ReactElement;

    /** 后缀组合*/
    append?: string | ReactElement;
    onChange?:(e:ChangeEvent<HTMLInputElement>)=> void
}

/**
 * Input输入框
 * ~~~js
 * //引入
 * import {Input} from 'vikingship'
 * ~~~
 */
export const Input: FC<InputProps> = (props) => {
  // 取出各种的属性
  const { disabled, size, icon, prepend, append, style, ...restProps } = props
  // 根据属性计算不同的className
  const classes = classNames('viking-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })

  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }

  if ('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }

  return (
  // 根据属性判断是否要添加特定节点
    <div className={classes} style={style}>
      {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`} /></div>}
      <input
        className="viking-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  )
};


export default Input;
