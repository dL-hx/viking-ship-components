import React from "react";
import classNames from "classnames";


export interface UploadProps {
    className?: string;
    style?: React.CSSProperties;
}

export const Upload: React.FC <UploadProps> = (props) => {
    const {
        className,
        style,
        children,
    } = props
    const classes = classNames('Upload', className, {

    })
    return (
        <div className={classes} style={style}>
            {children}
        </div>
    )
}

Upload.defaultProps = {

}

export default Upload;
