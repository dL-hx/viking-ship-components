import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Upload from './upload';


test('第一个测试case',()=>{
   const wrapper = render(<Upload>Nice</Upload>)
   const element = wrapper.queryByText('Nice')
   expect(element).toBeTruthy()
   expect(element).toBeInTheDocument()
})
