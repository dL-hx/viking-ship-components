import React, { useRef } from "react";
import axios from "axios";
import classNames from "classnames";
import Button from "../Button/button";

export interface UploadProps {
    className?: string;
    style?: React.CSSProperties;
    action: string;
    /** 上传之前的验证, 返回boolean 或者Promise */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onProgress?: (precentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onChange?: ( file: File) => void;
}

export const Upload: React.FC<UploadProps> = (props) => {
    const { className, style, children, action, onChange, onProgress, onSuccess, onError, beforeUpload } = props;

    // 创建Ref获取DOM节点
    const fileInput = useRef<HTMLInputElement>(null);

    const classes = classNames("viking-upload-component", className, {});

    const handleClick = () => {
        if (fileInput.current) {
            // 如果有DOM节点
            // 触发click
            fileInput.current.click();
        }
    };



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) {
            return
        }

        uploadFiles(files);

        if (fileInput.current) { // 上传完成时候 fileInput 清空
            fileInput.current.value = ''
        }
    };

    const post=(file:File)=>{
        const formData = new FormData();
        formData.append(file.name, file);

        // 上传到server端
        axios.post(action, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (e) => {// 显示上传的百分比
                let precentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (precentage < 100) {
                    if (onProgress) {
                        onProgress(precentage, file)
                    }
                }
            }
        }).then(res => {// 拿到服务端返回
            // console.log(res);
            if (onSuccess) {
                // 服务器返回的数据,    file对象
                onSuccess(res.data, file)
            }

            if (onChange) {
                onChange(file)
            }
        }).catch(err => { // 捕获错误
            console.error(err);
            if (onError) {
                onError(err, file)
            }
            if (onChange) {
                onChange(file)
            }
        })
    }

    const uploadFiles = (files: FileList) => {
        const postFiles = Array.from(files); // 将FileList 转为数组
        postFiles.forEach(file => {
            if (!beforeUpload) {
                post(file)
            }else{
                const result = beforeUpload(file)
                if (result && result instanceof Promise) {
                    result.then(processedFile=>{
                        post(processedFile)
                    })                    
                }else if(result ! == false){
                    post(file)
                }
            }
        })

    }


    return (
        <div className={classes} style={style}>
            <Button btnType="primary" onClick={handleClick}>
                Upload File
            </Button>
            <input
                className={"viking-file-input"}
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
                ref={fileInput}
            />
        </div>
    );
};

Upload.defaultProps = {};

export default Upload;


