import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from './button'

const defaultButton = () => (
  <Button onClick={action('click')}>default Button</Button>
)


const buttonWithSize = () => (
  <>
    <Button size='lg'>large Button</Button>
    <Button size='sm'>small Button</Button>
  </>
)


const buttonWithType = () => (
  <>
    <Button btnType='primary'>primary Button</Button>
    <Button btnType='danger'>danger Button</Button>
    <Button btnType='link' href="https://www.baidu.com">BaiDu Link</Button>
  </>
)


storiesOf('Button Component', module)
  .add('Button', defaultButton)
  .add('不同尺寸的 Button', buttonWithSize, {
    info: {
      inline: false,
    }
  })
  .add('不同类型的 Button', buttonWithType)
