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
        default: 'component'
      }
    ],

    actions: data => {
      const { name } = data // 拿到终端输入的文件名
      const componentName = toComponentName(name)


      const actions = [
        {
          type: 'add', // 代表添加文件，此处 name 代表 prompts 中输入的 name 取值
          path: `src/components/${componentName}/{{name}}.tsx`,
          templateFile: 'plop-templates/component.hbs',
          data: {// 传入模板的参数
            componentName,
            name
          },
          skipIfExists: true
        },
        {
          type: 'add',
          path: `src/components/${componentName}/_style.scss`,
          templateFile: 'plop-templates/_style.scss.hbs',
          skipIfExists: true,
          data: {// 传入模板的参数
            componentName,
          },
        },
        {
          type: 'add', // 代表添加文件
          path: `src/components/${componentName}/{{name}}.test.tsx`,
          templateFile: 'plop-templates/component.test.hbs',
          data: {// 传入模板的参数
            componentName,
            name
          },
        },
        {
          type: 'add', // 代表添加文件
          path: `src/components/${componentName}/{{name}}.stories.tsx`,
          templateFile: 'plop-templates/component.stories.tsx.hbs',
          data: {// 传入模板的参数
            componentName,
            name
          },
        }
      ]
      return actions
    }
  })
}

function toComponentName(name) {// 组件名称首字母大写
  let nameArray = name.split('-')
  return nameArray.map(item => `${item.charAt(0).toUpperCase()}${item.substr(1)}`).join('')
}
