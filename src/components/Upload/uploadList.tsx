// 展示上传列表
import React from 'react';
import { UploadFile } from './upload';
import Icon from '../Icon';
import Progress from '../Progress';


export interface UploadListProps {

    /* 默认展示的文件列表*/
    fileList: UploadFile[];
    onRemove: (file: UploadFile) => void;
}

export const UploadList: React.FC<UploadListProps> = (props) => {
  const {
    fileList,
    onRemove
  } = props
  return (
    <ul className='viking-upload-list'>
      {
        fileList.map(
          (item) => (
            <li className='viking-upload-list-item' key={item.uid}>
              <span className={`file-name file-name-${item.status}`}>
                <Icon icon='file-alt' theme='secondary' />
                {item.name}
              </span>
              {/* 展示上传状态 */}
              <span className='file-status'>
                {item.status === 'uploading' && <Icon icon='spinner' spin theme="primary" />}
                {item.status === 'success' && <Icon icon='check-circle' theme="success" />}
                {item.status === 'error' && <Icon icon='times-circle' theme="danger" />}
              </span>
              <span className="file-actions">
                <Icon icon='times' onClick={() => {onRemove(item)}} />
              </span>
              {
                item.status === 'uploading' && <Progress percent={item.percent || 0} />
              }
            </li>
          )
        )
      }
    </ul>
  );
};


export default UploadList;


