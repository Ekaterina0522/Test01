const fs = require('fs-extra');
const readline = require('readline');
const path = require('path');
const chalk = require('chalk');
const Readline = require('../../task1/src/app/utils/Readline');
const NameGenerator = require('./app/project/NameGenerator');
const Handlebars = require('Handlebars');
const FileSystem = require('./app/utils/FileSystem');
const Utils = require('./app/utils/utils');
const FfmpegUtils = require('./app/utils/FfmpegUtils');
///
const videoFilePaths = []; //массив с путями для каждого файла
const videoFilesDurations = [];
const videoInSecondsOnly = []; //массив из длительности каждого файла в секундах (строки)
const sequenceNumbers = [];
const sceneNumbers = [];
const videoFrames = [];
const videoFramesOnly = []; //массив из длительности каждого файла в кадрах (строки)
const videoFPS = [];
const items = []; //массив с объектами где хранятся названия полей таблицы
const videoFile = [];
///
class PageGenerator {

    async start() {

        console.log(chalk.bgMagenta('START'));

        const sourcePath = await Readline.validateParam(process.argv[2], "Enter Source Path");
        //console.log(chalk.bgBlue('sourcePath:', sourcePath));
        if (!sourcePath) return;

        const versionNumber = await Readline.readLineAsync("Enter version number");
        console.log(chalk.bgGreen('versionNumber:', versionNumber));

        await this.getSqShNumbers(sourcePath);
        await this.makeColumnNames(videoFilePaths);

        console.log('items', items);

        const templatePath = __dirname + '\\app\\project\\HTMLpageTemplate.tpl';
        const templateConent = await FileSystem.loadTextFile(templatePath);

        const template = Handlebars.compile(templateConent);

        const htmlContent = template({ items: items });

        await FileSystem.saveTextFile(sourcePath, htmlContent);


        console.log(chalk.bgMagenta('FINISH'));

        process.exit();

    }

    async makeColumnNames(videoFilePaths) {

        //пробегаемся по всем именам файлов и для каждого ищем длительность в секундах,
        //кадрах, а также считаем FPS
        await Utils.processArray(videoFilePaths, async (videoFileName, i) => {

            //в массив записываем длительность в секундах
            const videoDuration = await FfmpegUtils.getVideoLength(videoFile[i]);
            
            const inSec = videoDuration.stdout;
            const _inSec = inSec.slice(0, inSec.length - 2);
            videoFilesDurations.push(+_inSec);

            //в массив записываем длительность в кадрах 
            const _videoFrames = await FfmpegUtils.countFrames(videoFile[i]);
            //console.log('videoFile', videoFile[i]);
            const inFrames = _videoFrames.stdout;
            const _inFrames = inFrames.slice(0, inFrames.length - 2);
            videoFrames.push(+_inFrames);

            //считаем FPS
            const oneFileFPS = (+_inFrames) / (+_inSec);
            videoFPS.push(oneFileFPS);

            //заполняем items
            await this.makeItems(sequenceNumbers[i], sceneNumbers[i], videoFilesDurations[i],
                videoFrames[i], videoFilePaths[i]);

        });
        console.log('videoFilesDurations', videoFilesDurations);
        console.log('videoFrames', videoFrames);
    }


    async getSqShNumbers(path) {
        //получаем имена источников
        const entries = await FileSystem.getDirEntries(path);
        // console.log('getFilesNames:', path, entries );
        // console.log('>>>', typeof entries, entries, entries[0] );

        // Iterate Sequence
        await FileSystem.eachDirEntry(path, async (sqEntry, sqI, sqEntryPath) => {
            // console.log('==>',sqI+')',sqEntry, sqEntryPath );

            // Iterate Scenes
            await FileSystem.eachDirEntry(sqEntryPath, async (scEntry, scI, scEntryPath) => {

                //console.log('Scene Folder ==>',scI+')',scEntry, scEntryPath );

                //обрезаем начало названия видеофайла до номера секвенции
                scEntry = scEntry.substr(scEntry.lastIndexOf("sq") + 2);

                //первые три цифры это номер секвенции
                let sequenceNumber = scEntry.substr(0, 3)
                sequenceNumbers.push(sequenceNumber);

                let sceneNumber = scEntry.substr(scEntry.length - 3);
                sceneNumbers.push(sceneNumber);

                //получаем самый новый файл в каждой папке cut с расширением mp4
                videoFile.push( await FileSystem.getLatestFile(scEntryPath + '\\cut', 'mp4'));

                //записываем каждый scEntryPath в массив videoFilePaths
                videoFilePaths.push(scEntryPath);

            // true так как перебираем только папки, а не файлы (функция eachDirEntry в файле FileSystem)
            }, true);

        }, true);
        console.log('<<<sequenceNumbers>>>', sequenceNumbers);
        console.log('<<<sceneNumbers>>>', sceneNumbers);
    }

    //создаем массив с объектами где хранятся все названия полей
    async makeItems(sqValue, shValue, durationInSec, durationInFrames, videoFilePaths) {
        items.push({
            'sequence': `${sqValue}`,
            'scene': `${shValue}`,
            'duration': `${durationInSec}`,
            'frames': `${durationInFrames}`,
            'folder': `${videoFilePaths}`,

        });
        return items;
    }


}

//передача аргументов командной строки
// process.argv.forEach(function(val, index, array) {
//     console.log(index + ': ' + val);
// });

(new PageGenerator).start();