const fs = require('fs-extra');
const chalk = require('chalk');
const FileSystem = require('./app/utils/FileSystem');
const Readline = require('./app/utils/Readline');
const path = require('path')
const NameGenerator = require('./app/project/NameGenerator');
const Utils = require('./app/utils/utils');
const FfmpegUtils = require('./app/utils/FfmpegUtils');

//
class Task1 {

    async start() {

        console.log(chalk.bgMagenta('START'));



        // await getPath() {

        //получаем начальный путь
        const sourcePath = await Readline.validateParam(process.argv[2], "Enter Source Path");
        console.log(chalk.bgBlue('sourcePath:', sourcePath));
        if (!sourcePath) return;

        //получаем конечный путь
        const destPath = await Readline.validateParam(process.argv[3], "Enter Destination Path");
        if (!destPath) return;
        // }



        const entries = await FileSystem.getDirEntries(sourcePath);
        const splitEntries = this.getSimilarStructure(entries);
        const arrOfCutPathes = [];
        const _splitEntries = [];

        //с помощью функции processArray последовательно перебираем массив splitEntries
        //формируем путь где функция createFolder будет создавать папку(папки)
        await Utils.processArray(splitEntries, async (entry, i) => {


            const nameObject = NameGenerator.getNameObject(entry);

            //массив с объектами, где хранятся "разобранные" имена источников
            _splitEntries.push(nameObject);
            const pathTo3anim = destPath + `\\3_anim`;
            const pathToScene = pathTo3anim + `\\${nameObject.episodeName}\\${nameObject.sequenceFullName}\\${nameObject.sceneFullName}`;

            await fs.copy(__dirname + '\\app\\templates\\task1', pathToScene);

            //путь ко всем папкам cut
            const pathToCutFolder = pathToScene + '\\cut';

            let pathToSourseFiles = sourcePath + '\\' + entry[0];
            await FfmpegUtils.convertingToMP4(pathToSourseFiles, pathToCutFolder + `\\${nameObject.sceneFullName}`);
            //192 - битрейт
            await FfmpegUtils.extractingWAV(pathToSourseFiles, pathToCutFolder + `\\${nameObject.sceneFullName}`, 192, 44100);
            await FfmpegUtils.extractingFrame(pathToSourseFiles, pathToCutFolder + `\\${nameObject.sceneFullName}`);
            console.log('Успешно!');

        });

        //console.log(JSON.stringify(splitEntries, true, '  ')); 
        console.log(chalk.bgMagenta('FINSH'));
    }

    // ввод пользователем пути
    // async getPath() {

    //     //получаем начальный путь
    //     this.sourcePath = await Readline.validateParam(process.argv[2], "Enter Source Path");
    //     console.log(chalk.bgBlue('sourcePath:', this.sourcePath));
    //     if (!this.sourcePath) return;

    //     //получаем конечный путь
    //     this.destPath = await Readline.validateParam(process.argv[3], "Enter Destination Path");
    //     if (!this.destPath) return;
    // }

    // Получаем имена источников в заданной директории
    // async getDirEntries(path) {
    //     const entries = await fs.readdir(path);
    //     console.log('entries', entries);
    //     return entries;
    // }

    //делаем у всех источников одинаковое название
    getSimilarStructure(entries) {

        const arrWithoutLetter = entries.map(e => {
            //cutName - имена источников без расширения
            let cutName = e.slice(0, -4);

            //разделяем имя и номер секвенции
            let _replaced = cutName.replace(/_sq000/g, '_sq_001');

            //во всех источниках ищем sq0_A_0 и заменяем на sq_000

            let _AlmostReplaced = _replaced.replace(/_sq0_[AB]_0_/g, '_sq_001_');
            const lastCharIndex = Utils.getLetterIndex(_AlmostReplaced.substr(-1));

            if (lastCharIndex) {
                _AlmostReplaced = _AlmostReplaced.substr(0, _AlmostReplaced.length - 1) + lastCharIndex;
            } else {
                _AlmostReplaced += '0';
            }

            //разделяем имя и номер сцены
            let replaced = _AlmostReplaced.replace(/_sh/g, '_sh_');

            //разбиваем имена источников по _ 
            let replacedWithoutLetter = replaced.split('_');

            //в начало массива ставим исходное имя источника
            replacedWithoutLetter.unshift(e);

            //имена источников без букв в конце
            return replacedWithoutLetter;
        });
        return arrWithoutLetter;
    }
}

//передача аргументов командной строки
// process.argv.forEach(function(val, index, array) {
//     console.log(index + ': ' + val);
// });

(new Task1).start();