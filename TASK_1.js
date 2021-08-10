const fs = require('fs-extra');
const chalk = require('chalk');
const FileSystem = require('./app/utils/FileSystem');
const path = require('path')
const NameGenerator = require('./app/project/NameGenerator');
const Utils = require('./app/utils/utils');
const FfmpegUtils = require('./app/utils/FfmpegUtils');

//
class Task1 {

    sourcePath;
    destPath;

    async start() {

        console.log(chalk.bgMagenta('START'));

        await this.getPath();

        const entries = await this.getDirEntries(this.sourcePath);

        const splitEntries = this.getSimilarStructure(entries);

        // let splitEntries = await this.parseString(arrWithoutLetter);

        // await this.parseString(arrWithoutLetter);

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

            //console.log('>>>>entry', entry);
            const nameObject = NameGenerator.getNameObject(entry);
            //массив с объектами, где хранятся "разобранные" имена источников
            _splitEntries.push(nameObject);
            //console.log('>>>', entry, nameObject );

            const pathTo3anim = this.destPath + `\\3_anim`;

            const pathToScene = pathTo3anim + `\\${nameObject.episodeName}\\${nameObject.sequenceFullName}\\${nameObject.sceneFullName}`;

            await fs.copy(__dirname + '\\app\\templates\\task1', pathToScene);

            //путь ко всем папкам cut
            // const pathToCutFolder = pathToScene + '\\cut';
            // arrOfCutPathes.push(pathToCutFolder);
            //console.log(arrOfCutPathes);

            // console.log('>>>>>>_splitEntries', pathToCutFolder);
            //конвертаци, извлечение аудио, изменение размера видео
            //'D:\\WORK\\Katya\\task1\\mats\\export\\ep001_sq0_A_0_sh006.mov';
            //'D:\\WORK\\Katya\\task1\\mats\\import\\3_anim\\ep001\\sq000\\sh006\\cut\\ep001_sq000_sh006.mp4'; 
            // ffmpeg -i "${src}" -r 1 -s WxH -f image2 "${dest}".jpeg    из официальной документации: извлечение кадра
            //ffmpeg -i "${src}" -vn -ar 44100 -ac 2 -ab 192k -f mp3 "${dest}".mp3    извлечение аудио
            // let dest1 = nameObject.episodeName;
            // let dest2 = nameObject.sequenceName;
            // let dest3 = nameObject.sceneName 

            //console.log(chalk.bgMagenta('entry[i]', entry[0]));
            // const src = `${this.sourcePath} + ${entry[0]}`;
            // const dest = `${this.destPath}\\3_anim\\${nameObject.episodeName}\\${nameObject.sequenceFullName}\\${nameObject.sceneFullName}\\cut\\${nameObject.sceneFullName}`;

            // await FfmpegUtils.creatingMP4(src, dest);
            // await FfmpegUtils.extractingMP3(src, dest);
            // await FfmpegUtils.extractingFrame(src, dest);


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
        //let joined = [];

        const arrWithoutLetter = entries.map(e => {
            //cutName - имена источников без расширения
            //console.log(e);
            let cutName = e.slice(0, -4);

            //разделяем имя и номер секвенции
            let _replaced = cutName.replace(/_sq000/g, '_sq_000');

            //во всех источниках ищем sq0_A_0 и заменяем на sq_000
            let _AlmostReplaced = _replaced.replace(/_sq0_[AB]_0_/g, '_sq_000_');

            





            //замена буквы в конце имени на цифру ( не работает )
            //_AlmostReplaced.replace(/[A-Z]$/, m => m.charCodeAt() - 64);

            const lastCharIndex = Utils.getLetterIndex( _AlmostReplaced.substr(-1) );
            // const theLastCharIsLetter = FfmpegUtils.isLetter(lastChar); //возвращает true, если буква или false, если цифра

            if( lastCharIndex ){
                _AlmostReplaced = _AlmostReplaced.substr(0,_AlmostReplaced.length-1) + lastCharIndex;
            }else{
                _AlmostReplaced += '0';

            }
            // if (!theLastCharIsLetter) {
            //     _AlmostReplaced += '0';

            // } else {
            //     _AlmostReplaced.slice(-1);
            //     _AlmostReplaced += '1';
            // }



            console.log(chalk.green('>>>>>>>>_AlmostReplaced ', _AlmostReplaced));


            //разделяем имя и номер сцены
            let replaced = _AlmostReplaced.replace(/_sh/g, '_sh_');
            //console.log(chalk.green('>>>>>>>>_AlmostReplaced ', _AlmostReplaced));

            // let replacedWithoutLetter = replaced.replace(/A/g, '1').split('_');

            //разбиваем имена источников по _ 
            let replacedWithoutLetter = replaced.split('_');

            //в начало массива ставим исходное имя источника
            replacedWithoutLetter.unshift(e);
            //console.log('>>>>>>>>>>>>>>replacedWithoutLetter', replacedWithoutLetter);
            //console.log(chalk.green('replacedWithoutLetter', replacedWithoutLetter));
            //console.log('>>>>>>>>replacedWithoutLetter', replacedWithoutLetter);
            //имена источников без букв в конце
            return replacedWithoutLetter;
        });
        //console.log('arrWithoutLetter', arrWithoutLetter);
        return arrWithoutLetter;
    }

    /*
        //парсим имена источников
        async parseString(arrWithoutLetter) {

            const splitEntries = [];
            arrWithoutLetter.forEach(e => {
                // разделенные на имена сцены, секвенции, кадра имена источников
                splitEntries.push(e);

            });
            console.log('splitEntries', splitEntries);
            return splitEntries;
        }
        */

}

//передача аргументов командной строки
process.argv.forEach(function(val, index, array) {
    console.log(index + ': ' + val);
});

(new Task1).start();