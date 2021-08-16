const fs = require('fs-extra');
const readline = require('readline');
const path = require('path');
const chalk = require('chalk');
const Readline = require('../../task1/src/app/utils/Readline');
const NameGenerator = require('./app/project/NameGenerator');
const Handlebars = require('Handlebars');
const FileSystem = require('./app/utils/FileSystem');

const mp4Files = [];

class PageGenerator {

    async start() {

        console.log(chalk.bgMagenta('START'));
        //валидация
        const sourcePath = await Readline.validateParam(process.argv[2], "Enter Source Path");
        //console.log(chalk.bgBlue('sourcePath:', sourcePath));
        if (!sourcePath) return;

        const versionNumber = await Readline.readLineAsync("Enter version number");
        console.log(chalk.bgGreen('versionNumber:', versionNumber));

        //const items = [];


        // const example = {
        //     sell1: "name1",
        //     sell2: "name2",
        //     sell3: "name3",
        // }
        // const example2 = {
        //     sell1: "name11",
        //     sell2: "name22",
        //     sell3: "name33",
        // }
        // const example3 = {
        //     sell1: "name111",
        //     sell2: "name222",
        //     sell3: "name333",
        // }

        // const items = [];
        // items.push(example);
        // items.push(example2);
        // items.push(example3);  

        await this.getFilesNames(sourcePath);
        //console.log(items);

        const templatePath = __dirname + '\\app\\project\\Table.tpl';
        const templateConent = await FileSystem.loadTextFile(templatePath);

        const template = Handlebars.compile(templateConent);

        const htmlContent = template({ items: items });

        await FileSystem.saveTextFile(sourcePath + items, items);



        console.log(chalk.bgMagenta('FINISH'));
    }



    getFilesNames(path) {

        try {
            fs.readdir(path, (err, files) => {
                if (err) throw err;

                for (let file in files) {

                    if (fs.statSync(file).isFile() && path.extname(file) === '.mp4') {
                        mp4Files.push(file);

                    } else if (fs.statSync(file).isDirectory()) {
                        this.getFilesNames(path + '/' + file);
                    }
                }
            });
            
        } catch (err) {
            console.log(err);
        }
        return mp4Files;
    }

}


//передача аргументов командной строки
// process.argv.forEach(function(val, index, array) {
//     console.log(index + ': ' + val);
// });

(new PageGenerator).start();