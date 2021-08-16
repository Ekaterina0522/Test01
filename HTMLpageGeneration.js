const fs = require('fs-extra');
const readline = require('readline');
const path = require('path');
const chalk = require('chalk');
const Readline = require('../../task1/src/app/utils/Readline');
const NameGenerator = require('./app/project/NameGenerator');
const Handlebars = require('Handlebars');
const FileSystem = require('./app/utils/FileSystem');
const async = require('async');

class PageGenerator {

    async start() {

        console.log(chalk.bgMagenta('START'));
        //валидация
        const sourcePath = await Readline.validateParam(process.argv[2], "Enter Source Path");
        //console.log(chalk.bgBlue('sourcePath:', sourcePath));
        if (!sourcePath) return;

        const versionNumber = await Readline.readLineAsync("Enter version number");
        console.log(chalk.bgGreen('versionNumber:', versionNumber));

        const items = [];


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

        await FileSystem.saveTextFile(sourcePath + items, );



        console.log(chalk.bgMagenta('FINISH'));
    }

    // getFiles(dirPath) {

    //     fs.readdir(dirPath, function(err, files) {
    //         if (err) throw err;

    //         let _files = [];
    //         async.eachSeries(files, function(fileName) {
    //             let filePath = path.join(dirPath, fileName);

    //             fs.stat(filePath, function(err, stat) {
    //                 if (err) throw err;

    //                 if (stat.isDirectory()) {
    //                     getFiles(filePath, function(err, subDirFiles) {
    //                         if (err) throw err;

    //                         filePaths = filePaths.concat(subDirFiles);
    //                     });

    //                 } else {
    //                     if (stat.isFile() && path.extname(file)==='.mp4') {
    //                         _files.push(file);
    //                     }
    //                 }
    //             });
    //         });

    //     });
    // }

    getFilesNames(path) {
        let names;

        try {
            names = fs.readdir(path);
        } catch (err) {
            console.log(err);
        }
    }
}


//передача аргументов командной строки
// process.argv.forEach(function(val, index, array) {
//     console.log(index + ': ' + val);
// });

(new PageGenerator).start();