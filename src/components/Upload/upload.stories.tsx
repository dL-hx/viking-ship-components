import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload } from './upload'
// 校验文件尺寸
const checkFileSize = (file:File) =>{
    if(Math.round(file.size / 1024) > 50){
        alert('file too big')
        return false
    }
    return true
}

// 校验返回是Promise, 上传是一个文件, 在其中返回重命名的文件 
const filePromise = (file:File)=>{
    const newFile = new File([file], 'new_name.docx', {type: file.type})
    return Promise.resolve(newFile)
}

const SimpleUpload = () => {
    return <Upload 
        action='https://jsonplaceholder.typicode.com/posts'
        onChange={action('changed')}
        // beforeUpload={checkFileSize}
        beforeUpload={filePromise}
        // onProgress={action('progress')}
        // onSuccess={action('success')}
        // onError={action('error')}
    />
}

storiesOf('Upload Component', module)
    .add('SimpleUpload', SimpleUpload)
