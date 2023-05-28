import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome', module)
  .add('welcome', () => (
    <>
      <h3>欢迎来到 vikingship 组件库</h3>
      <h3>安装试试</h3>
      <code>
          npm install vikingship --save
      </code>

      <div>
        <div>课程亮点</div>
        <div>🔥typescript with React Hooks</div>
        <div>💧渐进式的教学过程，很多章后面都有扩展作业，引导同学们深入学习和掌握知识</div>
        <div>⛑️使用 react-testing-library 完成单元测试</div>
        <div>📚使用 storybook 本地调试和生成文档页面</div>
        <div>📚使用 react-doc-gen 自动生成文档</div>
        <div>📦使用第三方库扩充组件-(react-fontawesome, react-transition-group)</div>
        <div>🌹样式（Sass）文件从零开始，掌握大型应用的 CSS 组织方法</div>
        <div>🎉涉及全部流程，包括最后的 npm publish，husky提交发布前验证，travis CI/CD 集成，发布文档站点等</div>
      </div>
    </>
  ), { info: { disable: true }})
