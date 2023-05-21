// https://www.cnblogs.com/dwyWeb/p/16466706.html
// https://www.jianshu.com/p/37e6b411ee98
// Plop 入口文件，需要导出一个函数
// 此函数接收一个 plop 对象，用于创建生成器任务

module.exports = plop => {
    plop.setGenerator('component', { // component 就是接下来的 yarn plop 命令后面带来指令名称
      description: 'create a component',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: 'component name',
          default: 'MyComponent'
        }
      ],
      actions: [
        {
          type: 'add', // 代表添加文件，此处 name 代表 prompts 中输入的 name 取值
          path: 'src/components/{{name}}/{{name}}.tsx',
          templateFile: 'plop-templates/component.hbs'
        },
        {
          type: 'add', 
          path: `src/components/{{name}}/_style.scss`,
          templateFile: 'plop-templates/_style.scss.hbs',
          skipIfExists: true
        },
        {
          type: 'add', // 代表添加文件
          path: 'src/components/{{name}}/{{name}}.test.tsx',
          templateFile: 'plop-templates/component.test.hbs'
        }
      ]
    })
  }
  