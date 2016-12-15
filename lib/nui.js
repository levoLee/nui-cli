/**
 * Input prompt example
 */
//'use strict';
var inquirer = require('inquirer'),
    fs = require('fs'),
obj = require('./config/config.js'),
 download = require('download-git-repo');



//用户交互问题集
var questions = [
    {
        type: 'input',
        name: 'port',
        message: 'What\'s your port',
        default: function () {
            return 8080;
        }
    },
    {
        type: 'input',
        name: 'project_name',
        message: 'What\'s project do you want to download',
        default: function () {
            return "nui-cli";
        }
    },
    {
        type: 'confirm',
        name: 'isStrict',
        message: 'open strict mode',
        default: function () {
            return true;
        }
    },
    {
        type: 'confirm',
        name: 'isInstall',
        message: 'install the project now',
        default: function () {
            return true;
        }
    }
];

//主函数
function main() {
    inquirer.prompt(questions).then(function (answers) {
        //根据用户输入修改config.js文件
        function refresh() {
             obj.browsersync.development.port = answers.port;
             obj.project_name.name = answers.project_name;
			 obj.app = ["a", "b"];
            //是否开启校验模式
            if (answers.isStrict) {
                obj.eslint = {formater: {aa: true}};
            }
            else {
                delete obj.eslint;
            }
            //修改文件操作
            fs.writeFile('./config/config.js', "module.exports=" + JSON.stringify(obj, null, '  '), function (err) {
                if (err) throw err;
               
            })

        }

        //执行修改
		 refresh();
		//判断是否下载项目
        if (answers.isInstall) {
            console.log("running…");
			download('levoLee/nui-cli', 'nui-cli', function(err) {
                    if (err) return console.log(err);
					console.log("done!")
                })
            
			
        }
        else {
             console.log("you can download the project at **")
        }
    })
}
module.exports=main;








