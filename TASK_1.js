const fs = require('fs-extra');
const chalk = require('chalk');
const FileSystem = require('./FileSystem');
const path = require('path')
const GeneratorOfStructure = require('./GeneratorOfStructure');
const Utils = require('./app/utils/utils');

//
class Task1 {

    sourcePath;
    destPath;

    async start() {

        // console.log('@1');
        console.log(chalk.bgMagenta('START'));

        await this.getPath();

        // console.log('@2');

        const entries = await this.getDirEntries(this.sourcePath);

        const arrWithoutLetter = this.getSimilarStructure(entries);

        let splitEntries = await this.parseString(arrWithoutLetter);
        //Заменить в парсинге параметр, после тогго как приведу
        //имена источников к одному виду, и переместить вызов ниже
        //функции getSimilarStructure.

        // this.getSimilarStructure (entries);

        await this.parseString(arrWithoutLetter);

        //await this.generationStructure(this.destPath);
        /*
        splitEntries = splitEntries.map(entry => {
            const nameObject = GeneratorOfStructure.getNameObject(entry);
            await GeneratorOfStructure.createFolders(this.destPath);
            return nameObject;
        });
        */
        const _splitEntries = [];

        await Utils.processArray( splitEntries, async (entry,i) => {

            const nameObject = GeneratorOfStructure.getNameObject(entry);

            await FileSystem.createFolder( this.destPath +`\\3_anim\\${nameObject.episodeName}\\${nameObject.episodeFullName}` );

            _splitEntries.push(nameObject);

        });
        
        // const nameObject = this.getNameObject(splitEntries);
        // await GeneratorOfStructure.getFileStructure(nameObject);
        //console.log(JSON.stringify(splitEntries, true, '  '));

        // console.log('@3');
        console.log(chalk.bgMagenta('FINSH'));
    }

    // ввод пользователем пути
    async getPath() {
        

        //получаем начальный путь
        this.sourcePath = await FileSystem.validateParam(process.argv[2], "Enter Source Path");
        console.log(chalk.bgBlue('sourcePath:', this.sourcePath));
        if (!this.sourcePath) return;

        //получаем конечный путь
        this.destPath = await FileSystem.validateParam(process.argv[3], "Enter Destination Path");
        if (!this.destPath) return;
        
    }

    // Получаем имена источников в заданной директории
    async getDirEntries(path) {
        const entries = await fs.readdir(path);
        //console.log('entries', entries);
        return entries;
    }

    //делаем у всех источников одинаковое название
    getSimilarStructure(entries) {
        let joined = [];
        const arrWithoutLetter = entries.map(e => {

            let cutName = e.slice(0, -4);
            //во всех источниках ищем sq0_A_0 и заменяем на sq000
            //replaced - источники с замененным sq

            let replaced = cutName.replace(/_sq0_[AB]_0_/g, '_sq000_');
            joined.push(replaced);
            //console.log(chalk.green(replaced));

            //замена А на 1 с помощью регулярного выражения

            let replacedWithoutLetter = replaced.replace(/A/g, '1').split('_');

            //console.log(chalk.green(replacedWithoutLetter));

            //массив с именами источников без букв в конце

            return replacedWithoutLetter;

        });

        //console.log(arrWithoutLetter);

        return arrWithoutLetter;

    }

    //парсим имена источников
    async parseString(arrWithoutLetter) {

        const splitEntries = [];
        arrWithoutLetter.forEach(e => {

            splitEntries.push(e);

        });

        console.log(splitEntries);
        return splitEntries;
    }
}

//передача аргументов командной строки
process.argv.forEach(function(val, index, array) {
    console.log(index + ': ' + val);
});

(new Task1).start();