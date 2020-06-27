module.exports = function(plop) {
    plop.setGenerator('generator',{
        description: 'generator',
        prompts: [{
            type: 'input', // select
            message: '请输入层级名称：',
            name: 'fileName',
            default: 'system'
        },{
            type: 'input', // select
            message: '请输入文件夹名称：',
            name: 'name'
        }],
        actions: [{
            type: 'add',
            path: 'src/views/{{name}}/index.vue', //文件存放路径
            templateFile: 'plop-templates/index.hbs' //模板文件
        },{
            type: 'add',
            path: 'src/views/{{name}}/Grid.vue', //文件存放路径
            templateFile: 'plop-templates/Grid.hbs' //模板文件
        },{
            type: 'add',
            path: 'src/views/{{name}}/Search.vue', //文件存放路径
            templateFile: 'plop-templates/Search.hbs' //模板文件
        }]
    })
}