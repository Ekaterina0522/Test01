const fs = require('fs-extra');
const chalk = require('chalk');
const FileSystem = require('./filesys');
const path = require('path')

//
class Task1 {

	sourcePath;
	destPath;

    async start() {

        // console.log('@1');

        await this.getPath();

        // console.log('@2');

        await this.getDirEntries(this.sourcePath);

        await this.parseString(this.entries);

        // console.log('@3');
    }


    // ввод пользователем пути
    async getPath() {
        console.log(chalk.bgMagenta('START'));

        //получаем начальный путь
        this.sourcePath = await FileSystem.validateParam(process.argv[2], "Enter Source Path");
        console.log(chalk.bgBlue('sourcePath:', this.sourcePath));
        if (!this.sourcePath) return;

        //получаем конечный путь
        this.destPath = await FileSystem.validateParam(process.argv[3], "Enter Destination Path");
        if (!this.destPath) return;
        console.log(chalk.bgMagenta('FINSH'));

    }


    // Получаем имена источников в заданной директории
    async getDirEntries(path) {
        var entries = await fs.readdir(path);
        console.log('entries', entries);
    }



    //парсим имена источников
    parseString = (entries) => {
        let array = entries.split('_'),
            lastElement;
        lastElement = array.pop().split(';');
        lastElement.forEach(e => {
            array.push(e)
        })
        return array;
    }

}


//передача аргументов командной строки
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

(new Task1).start();

// let task1 = new Task1();
// task1.start();














