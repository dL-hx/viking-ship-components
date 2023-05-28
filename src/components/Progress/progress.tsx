import React from "react";
import classNames from "classnames";
import { ThemeProps } from "../Icon/icon";


export interface ProgressProps {
    className?: string;
    /** 当前百分比 */
    percent: number;
    /** 高度 */
    strokeHeight?: number;
    /** 是否显示百分比数字 */
    showText?: boolean;
    /** 额外的样式 */
    style?: React.CSSProperties;
    /** 主题 */
    theme?: ThemeProps;
}

export const Progress: React.FC<ProgressProps> = (props) => {
    const {
        percent,
        strokeHeight,
        showText,
        style,
        className,
        theme,
    } = props
    const classes = classNames('viking-progress-bar', className, {

    })
    return (
        <div className={classes} style={style}>
            <div className="viking-progress-bar-outer" style={{ height: `${strokeHeight}px` }}>
                <div
                    className={`viking-progress-bar-inner color-${theme}`}
                    style={{ width: `${percent}%` }}
                >
                    {showText && <span className="inner-text">{`${percent}%`}</span>}
                </div>
            </div>
        </div>
    )
}

Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: "primary"
}

export default Progress;
