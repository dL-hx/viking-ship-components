import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Button, {ButtonProps, ButtonSize, ButtonType} from './button'

// // 测试组件中的文本是否为Nice
// test('第一个测试case',()=>{
//     const wrapper = render(<Button>Nice</Button>)
//     const element = wrapper.queryByText('abc')
//     expect(element).toBeTruthy()
//     expect(element).toBeInTheDocument()
// })

const defaultProps = {
    onClick: jest.fn()
}

const testProps:ButtonProps={
    // btnType:ButtonType.Primary,
    btnType:'primary',
    // size:ButtonSize.Large,
    size:'lg',
    className:'klass'
}

const disabledProps:ButtonProps = {
    disabled:true,
    onClick: jest.fn()
}
describe('测试Button组件',()=>{
    it('渲染default Button', ()=>{
      const wrapper = render(<Button {...defaultProps}>Nice</Button>)
      const element = wrapper.queryByText('Nice') as HTMLButtonElement
      expect(element).toBeInTheDocument()
      expect(element?.tagName).toEqual('BUTTON')
      expect(element).toHaveClass('btn btn-default')
      expect(element.disabled).toBeFalsy()
      fireEvent.click(element)
      expect(defaultProps.onClick).toHaveBeenCalled()

    })

    it('渲染Button的不同Props', ()=>{
      const wrapper = render(<Button {...testProps}>Nice</Button>)
      const element = wrapper.queryByText('Nice') as HTMLButtonElement
      expect(element).toBeInTheDocument()
      expect(element).toHaveClass('btn-primary btn-lg klass')
    })


    it('渲染A link Button', ()=>{// 测试元素内容， 元素标签为a, 元素样式
        const wrapper = render(<Button btnType={'link'} href='http://www.baidu.com'>Link</Button>)
        const element = wrapper.queryByText('Link') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element?.tagName).toEqual('A')
        expect(element).toHaveClass('btn btn-link')
    })

    it('渲染 disabled Button', ()=>{// 测试元素内容， 属性为disabled, onClick未触发
        const wrapper = render(<Button {...disabledProps}>Nice</Button>)
        // as HTMLButtonElement         断言为htmlButtonElement
        const element = wrapper.queryByText('Nice') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.disabled).toBeTruthy()

        fireEvent.click(element)
        expect(defaultProps.onClick).not.toHaveBeenCalled()
    })
})