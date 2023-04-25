
node
v12.22.8
npm
6.14.15

```
// 系统色板 = 基础色板 + 中性色板
// 产品色板 = 品牌色 + 功能色板
```

## 组件库的样式变量分类
```
- 基础色彩系统
- 字体系统
- 表单
- 按钮
- 边框和阴影
- 可配置开关

add => normalize.css -- (_reboot.scss)

normalize 显示元素原本样式(推荐)
resetcss 重置所有样式
```

### sass
### 安装scss依赖
```shell
$    yarn add node-sass --save-dev 
```

### 编译scss文件
```shell
$    npx node-sass src/styles/_variables.scss var.css
$    cat var.css
$    rm -rf var.css  
```



### 完成样式主文件开发

![image-20221201080554473](README/image-20221201080554473.png)


## Button 组件

不同的Button Type

不同的Button Size

Disabled状态


### 规划使用方法
```js
<Button
    size="lg"
    type="primary"
    disabled
    href=""?
    className=""?
    autoFocus=""?
    ...
> 
    Viking Button
</Button>
```

```shell
$ yarn add classnames --save
$ yarn add @types/classnames --save
```

https://github.com/EricWong1994/vikingShipComp/blob/master/src/components/Button/button.tsx



