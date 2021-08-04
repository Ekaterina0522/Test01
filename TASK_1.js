const fs = require('fs-extra');
const chalk = require('chalk');
const FileSystem = require('./FileSystem');
const path = require('path')
const Generator = require('./Generator');

//
class Task1 {

	sourcePath;
	destPath;
	
    async start() {

        // console.log('@1');

        await this.getPath();

        // console.log('@2');

        const entries = await this.getDirEntries(this.sourcePath);
        const arrWithoutLetter = await this.getSimilarStructure(entries);
        const splitEntries = await this.parseString(arrWithoutLetter);
        //Заменить в парсинге параметр, после тогго как приведу
        //имена источников к одному виду, и переместить вызов ниже
        //функции getSimilarStructure.
        
        await this.getSimilarStructure (entries);

        await this.parseString(arrWithoutLetter);

        await this.generationStructure(this.destPath);

        await Generator.generator(splitEntries);
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
        const entries = await fs.readdir(path);
        //console.log('entries', entries);
        return entries;
    }


    //делаем у всех источников одинаковую структуру
    async getSimilarStructure(entries) {
        let joined = [];
        const arrWithoutLetter = [];
        entries.forEach(e => {
            
            let cutName = e.slice(0, -4);
            //во всех источниках ищем sq0_A_0 и заменяем на sq000
            //replaced - источники с замененным sq
            let replaced = cutName.replace(/_sq0_[AB]_0_/g, '_sq000_');
            joined.push(replaced);
            //console.log(chalk.green(replaced));

            //замена А на 1 с помощью регулярного выражения

            let replacedWithoutLetter = replaced.replace(/A/g, '1');
            //console.log(chalk.green(replacedWithoutLetter));

            //массив с именами источников без букв в конце
            arrWithoutLetter.push(replacedWithoutLetter);

            });

        //console.log(arrWithoutLetter);

        return arrWithoutLetter;

    }

    //парсим имена источников
    async parseString (arrWithoutLetter) {
    	
    	const splitEntries = [];
        arrWithoutLetter.forEach( e => {
    		let eNew = e.split('_')
    		splitEntries.push(eNew);
    		
    	}); console.log(splitEntries);
    	return splitEntries;
    }

    

}


//передача аргументов командной строки
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

(new Task1).start();
















