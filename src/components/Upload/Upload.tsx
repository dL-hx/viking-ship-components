import React, { useRef, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import Dragger from './dragger'
import UploadList from './uploadList';
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}

export interface UploadProps {
    className?: string;
    style?: React.CSSProperties;
    action: string;

    /* 默认展示的文件列表*/
    defaultFileList?: UploadFile[];

    /** 上传之前的验证, 返回boolean 或者Promise */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onProgress?: (precentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onChange?: (file: File) => void; //  后面会将File对象改为UploadFile, 对用户更有利有用
    onRemove?: (file: UploadFile) => void;
    headers?: { [key: string]: any };
    // 添加name 属性 - 代表发到后台的文件参数名称
    /** 文件名 */
    name?: string;
    // 添加data属性 - 上传所需的额外参数
    /** 添加data属性 - 上传所需的额外参数 */
    data?: { [key: string]: any };

    /** 是否携带请求参数 */
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    drag?: boolean;

}

export const Upload: React.FC<UploadProps> = (props) => {
  const { className,
    style,
    children,
    action,
    onChange,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    defaultFileList,
    onRemove,
    name,
    data,
    headers,
    withCredentials,
    accept,
    multiple,
    drag
  } = props;

  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

  const updateFileList = (uploadFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList((prevList) => prevList.map((file) => {// 用之前的值,返回新的列表
      if (file.uid === uploadFile.uid) {
        return { ...file, ...updateObj }
      } else {
        return file
      }
    }))
  }

  // 创建Ref获取DOM节点
  const fileInput = useRef<HTMLInputElement>(null);

  const classes = classNames('viking-upload-component', className, {});

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

  const post = (file: File) => {
    const _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      size: file.size,
      name: file.name,
      status: 'ready',
      percent: 0,
      raw: file,
    }
    // 更新fileList
    // setFileList([_file, ...fileList]);
    setFileList((prevList) => [_file, ...prevList])
    const formData = new FormData();
    formData.append(name || 'file', file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })
    }
    // 上传到server端
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress: (e) => {// 显示上传的百分比
        let precentage = Math.round((e.loaded * 100) / e.total) || 0;
        if (precentage < 100) {
          updateFileList(_file, { percent: precentage, status: 'uploading' })
          if (onProgress) {
            onProgress(precentage, file)
          }
        }
      }
    }).then((res) => {// 拿到服务端返回
      // console.log(res);
      updateFileList(_file, { status: 'success', response: res.data })

      if (onSuccess) {
        // 服务器返回的数据,    file对象
        onSuccess(res.data, file)
      }

      if (onChange) {
        onChange(file)
      }
    })
      .catch((err) => { // 捕获错误
        console.error(err);
        updateFileList(_file, { status: 'error', response: err })

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
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
    })

  }

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => // 移除fileItem
      prevList.filter((item) => item.uid !== file.uid)
    )

    if (onRemove) { // 传递给外界用户调用的方法
      onRemove(file)
    }
  }
  // console.log(fileList);
  return (
    <div className={classes} style={style} onClick={handleClick}>
      {drag
        ? <Dragger onFile={(files) => {uploadFiles(files)}}>
          {children}
        </Dragger>
        : children
      }
      {/*            <Button btnType="primary" onClick={handleClick}>
                Upload File
            </Button> */}
      <input
        className={'viking-file-input'}
        type="file"
        accept={accept}
        multiple={multiple}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        ref={fileInput}
      />
      <UploadList
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  );
};

Upload.defaultProps = {
  name: 'file'
};

export default Upload;


