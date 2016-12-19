/**
 * Input prompt example
 */
//'use strict';
var inquirer = require('inquirer'),
    fs = require('fs'),
obj = require('./config'),
chalk = require('chalk'),
 download = require('download-git-repo');



//用户交互问题集

var questions = [
{
        type: 'list',
        name: 'project_name',
        message: 'What\'s project do you want to download',
		choices: [
      'nui-cli',
      'no-one'
    ]
    },
  {
        type: 'input',
        name: 'entry',
        message: 'set the entry file of your project:',
        default: function () {
            return 'src/index.js';
        }
    },
    {
        type: 'input',
        name: 'port',
        message: 'set your port:',
        default: function () {
            return 8080;
        }
    },
   
    {
        type: 'confirm',
        name: 'isStrict',
        message: 'do you want to open the strict mode?',
        default: function () {
            return true;
        }
    },	
	
	{
        type: 'confirm',
        name: 'isInstall',
        message: 'install the project now?',
        default: function () {
            return true;
        }
    }
   
];



//主函数
function main() {
	//程序提示语
	console.log(chalk.yellow('this will guide you to install an nui project'));
    inquirer.prompt(questions).then(function (answers) {
		
		 //判断是否下载项目
        if (answers.isInstall) {
            console.log("running…");
            download('levoLee/'+answers.project_name,answers.project_name, function(err) {
                if (err) return console.log("no project exist!you can chose the other project!");
                //执行修改
                refresh();
                console.log("done!")
            })


        }
        else {
            console.log("you can download the project at https://github.com/levoLee/nui-cli.git")
     

        }
        //根据用户输入修改config.js文件
        function refresh() {
             obj.browsersync.development.port =Number(answers.port);
			 obj.app = ["a", "b"];
			 obj.entry=answers.entry;
            //是否开启校验模式
                obj.eslint = {formater: {aa: answers.isStrict}};
                //修改文件操作
                fs.writeFile('./'+answers.project_name+'/lib/config.js',"module.exports=" + JSON.stringify(obj, null, '  '), function (err) {
                    if (err) throw err;
                })
        }

     
    })

	
	}
module.exports=main;








