const fs = require('fs-extra');
const chalk = require('chalk');
const FileSystem = require('./FileSystem');
const path = require('path')
const NameGenerator = require('./NameGenerator');
const Utils = require('./app/utils/utils');
const child_process = require("child_process");
const util = require('util');
const exec = util.promisify(child_process.exec);

//
class Task1 {

    sourcePath;
    destPath;

    async start() {

        console.log(chalk.bgMagenta('START'));

        await this.getPath();

        const entries = await this.getDirEntries(this.sourcePath);

        const arrWithoutLetter = this.getSimilarStructure(entries);

        let splitEntries = await this.parseString(arrWithoutLetter);

        await this.parseString(arrWithoutLetter);

        //await this.NameGenerator(this.destPath);
        /*
        splitEntries = splitEntries.map(entry => {
            const nameObject = NameGenerator.getNameObject(entry);
            await NameGenerator.createFolders(this.destPath);
            return nameObject;
        });
        */
        
        const arrOfCutPathes = [];
        const _splitEntries = [];

        //с помощью функции processArray последовательно перебираем массив splitEntries
        //формируем путь где функция createFolder будет создавать папку(папки)
        await Utils.processArray(splitEntries, async (entry, i) => {

            const nameObject = NameGenerator.getNameObject(entry);

            const pathTo3anim = this.destPath + `\\3_anim`; //+
            const pathToEpisode = pathTo3anim + `\\${nameObject.episodeName}`;
            const pathToSequence = pathTo3anim + `\\${nameObject.episodeName}\\${nameObject.sequenceName}`;
            const pathToScene = pathTo3anim + `\\${nameObject.episodeName}\\${nameObject.sequenceName}\\${nameObject.sceneName}`;

            await FileSystem.createFolder(pathToEpisode);
            await FileSystem.createFolder(pathToEpisode);
            await FileSystem.createFolder(pathToSequence);
            await FileSystem.createFolder(pathToScene);
            await FileSystem.createFolder(pathToScene + '\\anim2d');
            await FileSystem.createFolder(pathToScene + '\\preview');
            await FileSystem.createFolder(pathToScene + '\\cut');
            await FileSystem.createFolder(pathToScene + '\\anim2d\\publish');
            await FileSystem.createFolder(pathToScene + '\\anim2d\\work');
            //путь ко всем папкам cut
            const pathToCutFolder = pathToScene + '\\cut';
            arrOfCutPathes.push(pathToCutFolder);
            //console.log(arrOfCutPathes);

            //массив с объектами, где хранятся "разобранные" имена источников
            _splitEntries.push(nameObject);

            //конвертация
            
            //'D:\\WORK\\Katya\\task1\\mats\\export\\ep001_sq0_A_0_sh006.mov';
            //'D:\\WORK\\Katya\\task1\\mats\\import\\3_anim\\ep001\\sq000\\sh006\\cut\\ep001_sq000_sh006.mp4'; 
            const src = 'D:\\WORK\\Katya\\task1\\mats\\export\\ep001_sq0_A_0_sh006.mov';            
            const dest = 'D:\\WORK\\Katya\\task1\\mats\\import\\3_anim\\ep001\\sq000\\sh006\\cut\\ep001_sq000_sh006_720р.mp4';            // try {
            const { stdout, stderr } = await exec(`c:\\ffmpeg\\bin\\ffmpeg -i "${src}" -r 60 -s hd720 "${dest}"`);                
                // console.log('stdout:', stdout);
                // console.log('stderr:', stderr);
              // } catch (e) {
                // console.error(e); // should contain code (exit code) and signal (that caused the termination).
              // }
        });
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        // await FileSystem.addingVideoToCutFolder(splitEntries, async (entry, i) => {

        //     const nameObject = NameGenerator.getNameObject(entry);
        //     nameObject.sequenceFullName 

        // });
        //////////////////////////////////////////////////////////////////////////////////////////////////////////
        //console.log(pathToFfmpeg);
        // const nameObject = this.getNameObject(splitEntries); скорее всего не понадобится
        // await NameGenerator.getFileStructure(nameObject); скорее всего не понадобится
        //console.log(JSON.stringify(splitEntries, true, '  ')); 

        //await FileSystem.getVideoInfo();

        console.log(chalk.bgMagenta('FINSH'));
    }

    // async exeCMD(){

    //     exec("ls -la", (error, stdout, stderr) => {
    //         if (error) {
    //             console.log(`error: ${error.message}`);
    //             return;
    //         }
    //         if (stderr) {
    //             console.log(`stderr: ${stderr}`);
    //             return;
    //         }
    //         console.log(`stdout: ${stdout}`);
    //     });
    // }

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