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

const videoFileNames = [];
const videoFilesDurations = [];
const videoInSecondsOnly = [];
const sequenceNumbers = [];
const sceneNumbers = [];
const videoFrames = [];
const videoFramesOnly = [];
const videoFPS = [];
///
class PageGenerator {

    async start() {

        console.log(chalk.bgMagenta('START'));
        //валидация

        const sourcePath = await Readline.validateParam(process.argv[2], "Enter Source Path");
        //console.log(chalk.bgBlue('sourcePath:', sourcePath));
        if (!sourcePath) return;

        const versionNumber = await Readline.readLineAsync("Enter version number");
        console.log(chalk.bgGreen('versionNumber:', versionNumber));

        await this.getFilesNames(sourcePath);
        //пробегаемся по всем именам файлов и для каждого ищем длительность в секундах
        await Utils.processArray(videoFileNames, async (videoFileName, i) => {
            //в массив записываем длительность в секундах
            const videoDuration = await FfmpegUtils.getVideoLength(videoFileName);
            //console.log('videoDuration', videoDuration)
            
            //videoFilesDurations.push(Object.values(videoDuration));
            videoFilesDurations.push(videoDuration.stdout);

            //в массив записываем длительность в кадрах 
            const _videoFrames = await FfmpegUtils.countFrames(videoFileName);
            //videoFrames.push(Object.values(_videoFrames));
            videoFrames.push(_videoFrames.stdout);

            // const fileInSeconds = videoFrames;
            // videoInSecondsOnly.push(fileInSeconds);

            // const _vidoeFps = _videoFrames/videoDuration;
            // videoFPS.push(_vidoeFps);

        });
        console.log('videoFilesDurations', videoFilesDurations);
        console.log('videoFrames', videoFrames);
        
        //console.log('videoInSecondsOnly', videoInSecondsOnly);


        //console.log(items);

        // const templatePath = __dirname + '\\app\\project\\Table.tpl';
        // const templateConent = await FileSystem.loadTextFile(templatePath);

        // const template = Handlebars.compile(templateConent);

        // const htmlContent = template({ items: items });

        // await FileSystem.saveTextFile(sourcePath + items, items);



        console.log(chalk.bgMagenta('FINISH'));

        process.exit();

    }



    async getFilesNames(path) {
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
                //console.log(scEntry);

                //первые три цифры это номер секвенции
                let sequenceNumber = scEntry.substr(0, 3)
                sequenceNumbers.push(sequenceNumber);

                let sceneNumber = scEntry.substr(scEntry.length - 3);
                sceneNumbers.push(sceneNumber);

                //получаем самый новый файл в каждой папке cut с расширением mp4
                const videoFile = await FileSystem.getLatestFile(scEntryPath + '\\cut', 'mp4');
                //console.log('file: ', videoFile );

                //записываем каждый videoFile в массив videoFileNames
                videoFileNames.push(videoFile);

                // true так как перебираем только папки, а не файлы (функция eachDirEntry в файле FileSystem)
            }, true);

        }, true);
    //     console.log('<<<sequenceNumbers>>>', sequenceNumbers);
    //     console.log('<<<sceneNumbers>>>', sceneNumbers);
     }


}

//передача аргументов командной строки
// process.argv.forEach(function(val, index, array) {
//     console.log(index + ': ' + val);
// });

(new PageGenerator).start();