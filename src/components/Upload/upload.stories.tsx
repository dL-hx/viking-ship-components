import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload, UploadFile } from './upload'
import Button from '../Button/button'
import Icon from '../Icon'

const defaultFileList: UploadFile[] = [
    {
        uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30
    },
    {
        uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30
    },
    {
        uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30
    }
]

// 校验文件尺寸
const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
        alert('file too big')
        return false
    }
    return true
}

// 校验返回是Promise, 上传是一个文件, 在其中返回重命名的文件
const filePromise = (file: File) => {
    const newFile = new File([file], 'new_name.docx', { type: file.type })
    return Promise.resolve(newFile)
}

const SimpleUpload = () => {
    return <Upload
        // action='https://jsonplaceholder.typicode.com/posts'
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        onChange={action('changed')}
    // defaultFileList={defaultFileList}
    // beforeUpload={checkFileSize}
    // beforeUpload={filePromise}
    // onProgress={action('progress')}
    // onSuccess={action('success')}
    // onError={action('error')}
    >
          <Button size="lg" btnType="primary"><Icon icon="upload" /> 点击上传 </Button>
    </Upload>
}


const ActionUpload = () => {
    return <Upload
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        action='https://jsonplaceholder.typicode.com/posts'
        onChange={action('changed')}
        onRemove={action('remove')}
        name='fileName'
        data={{'key':'value'}}
        headers={{'X-Powered-By': 'vikingship'}}
        accept='.jpg'
        multiple
        beforeUpload={checkFileSize}
    >
         <Button size="lg" btnType="primary"><Icon icon="upload" /> 不能传大于50Kb！ </Button>
    </Upload>
}



const DragUpload = () => {
    return (
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        onChange={action('changed')}
        onRemove={action('removed')}
        name="fileName"
        multiple
        drag
      >
        <Icon icon="upload" size="5x" theme="secondary" />
        <br/>
        <p>Drag file over to upload</p>
      </Upload>
    )
  }
  

storiesOf('Upload Component', module)
    .add('SimpleUpload', SimpleUpload)
    .add('ActionUpload', ActionUpload)
    .add('DragUpload', DragUpload)
