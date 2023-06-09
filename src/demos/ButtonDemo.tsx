import React from 'react'
import Button, { ButtonSize, ButtonType } from '../components/Button/button'

function ButtonDemo () {
  return (
    <>
      <Button>hello world</Button>
      <Button autoFocus>autoFocus</Button>
      <Button onClick={(e) => {e.preventDefault(); alert(123)}}>onClick</Button>
      <Button className="custom">ClassName Button</Button>
      <Button disabled>Disabled Button</Button>
      <Button btnType={'primary'} size={'lg'}>Large Primary</Button>
      <Button btnType={'danger'} size={'sm'}>Small Danger</Button>
      <Button btnType={'link'} href="https://www.baidu.com" target="_blank">BaiDu Link</Button>
      <Button btnType={'link'} href="https://www.baidu.com">BaiDu Link</Button>
      <Button disabled btnType={'link'} href="https://www.baidu.com">Disabled Link</Button>
    </>
  )
}

export default ButtonDemo
