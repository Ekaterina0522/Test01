const fs = require('fs-extra');
const chalk = require('chalk');
const FileSystem = require('./FileSystem');
const path = require('path')

//
class Task1 {

	sourcePath;
	destPath;
	
    async start() {

        // console.log('@1');

        await this.getPath();

        // console.log('@2');

        const entries = await this.getDirEntries(this.sourcePath);

        //Заменить в парсинге параметр, после тогго как приведу
        //имена источников к одному виду, и переместить вызов ниже
        //функции getSimilarStructure.
        await this.parseString(entries);

        await this.generationStructure(this.destPath);

        await this.getSimilarStructure (entries);

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

        entries.forEach(e => {
            
            let cutName = e.slice(0, -4);
            //во всех источниках ищем sq0_A_0 и заменяем на sq000
            //replaced - источники с замененным sq
            let replaced = cutName.replace(/_sq0_[AB]_0_/g, '_sq000_');
            joined.push(replaced);
            console.log(chalk.green(replaced));

            //берем последний символ theLastLetter
            let theLastLetter = replaced.slice(-1);

            //смотрим где последний символ - это буква
            if (/[A-Z]/.test(theLastLetter)) {
                let letterToChar = theLastLetter.charCodeAt(18) - 64;
                //console.log();
            };
            


// let regexpr = /[A-Z]/g;   let letterToChar = letter['input'].charCodeAt(letter['index']) - 64;

            // let letter = regexpr.exec(replaced);
            // if ( letter) { //смотрим на какой позиции была буква
            //     //console.log(chalk.yellow('Источник с буквой на позиции:', letter['input']));
            
            //делаем из буквы цифру
            

            //console.log(letterToChar);
            });

        

        //console.log(joined);
        return joined;

    }

    //парсим имена источников
    parseString = (entries) => {
    	
    	const splitEntries = [];
    	entries.forEach( e => {
    		let eNew = e.split('_')
    		splitEntries.push(eNew);
    		
    	}); //console.log(splitEntries);
    	return splitEntries;
    }

    
   //генерируем файловую структуру (не до конца реализовано)
	async generationStructure(path) {
		// console.log('generationStructure: ',path+'\\3_anim\\subfolder')
	    fs.mkdir(path + '\\3_anim\\subfolder', { recursive: true }, (err) => {
	        if (err) throw err;
	        console.log(`Created in "${path}"`);
	    });

	}

}


//передача аргументов командной строки
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

(new Task1).start();
















