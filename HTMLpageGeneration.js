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
const imagesToCopy = [];
const image = [];
let episodeName = '';
let versionNumber = '';
///
class PageGenerator {

    async start() {


        console.log(chalk.bgMagenta('START'));

        const sourcePath = await Readline.validateParam(process.argv[2], "Enter Source Path");
        //console.log(chalk.bgBlue('sourcePath:', sourcePath));
        if (!sourcePath) return;

        versionNumber += await Readline.readString(process.argv[3]);
        console.log(chalk.bgGreen('versionNumber:', versionNumber));

        //console.log('__dirname', __dirname);



        await this.getSourses(sourcePath);
        await this.makeColumnNames(videoFilePaths);

        console.log('items', items);

        const templatePath = __dirname + '\\app\\project\\HTMLpageTemplate.tpl';
        const templateConent = await FileSystem.loadTextFile(templatePath);

        const template = Handlebars.compile(templateConent);

        const htmlContent = template({ items: items });

        //console.log('sourcePath', sourcePath);
        await FileSystem.saveTextFile(sourcePath + `\\${episodeName}_v${versionNumber}.html`, htmlContent);


        console.log(chalk.bgMagenta('FINISH'));

        process.exit();

    }

    async getSourses(path) {
        //получаем имена источников
        const entries = await FileSystem.getDirEntries(path);
        //console.log('entries[0]:', entries[0] );
        episodeName = entries[0].slice(0, -6);
        // console.log('episodeName:', episodeName );
        //console.log('entries',  entries );

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
                videoFile.push(await FileSystem.getLatestFile(scEntryPath + '\\cut', 'mp4'));

                //массив с полным путем до каждого кадра видеофайлов
                imagesToCopy.push(await FileSystem.getLatestFile(scEntryPath + '\\cut', 'jpg'));

                //записываем каждый scEntryPath в массив videoFilePaths
                videoFilePaths.push(scEntryPath);

                // true так как перебираем только папки, а не файлы (функция eachDirEntry в файле FileSystem)
            }, true);

        }, true);
        //console.log('<<<imagesToCopy>>>', imagesToCopy);
        //console.log('<<<sceneNumbers>>>', sceneNumbers);
    }


    async makeColumnNames(videoFilePaths) {

        let networkPath = 'D:\\WORK\\Katya\\task1\\mats\\network';

        await FileSystem.createFolder(networkPath + '\\' + `task1` + '\\' + `${versionNumber}`);
        let absolutePath = await path.resolve(networkPath + '\\' + `task1` + '\\' + `${versionNumber}`);

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
            console.log('absolutePath', absolutePath);
            const inFrames = _videoFrames.stdout;
            const _inFrames = inFrames.slice(0, inFrames.length - 2);
            videoFrames.push(+_inFrames);

            //считаем FPS
            const oneFileFPS = (+_inFrames) / (+_inSec);
            videoFPS.push(oneFileFPS);


            let frameName = imagesToCopy[i].split('\\').pop();
            //копируем кадры каждого видеофайла в папку network
            await fs.copyFile(imagesToCopy[i], absolutePath + '\\' + frameName);
            image.push(`=image("http://peppers-studio.ru/task1/v${versionNumber}/${frameName}")`)

            //заполняем items
            await this.makeItems(sequenceNumbers[i], sceneNumbers[i], videoFilesDurations[i],
                videoFrames[i], videoFilePaths[i], image[i]);

        });
        //console.log('image', image);
        //console.log('videoFrames', videoFrames);
    }


    
    //создаем массив с объектами где хранятся все названия полей
    async makeItems(sqValue, shValue, durationInSec, durationInFrames, videoFilePaths, _image) {
        items.push({
            'sequence': `${sqValue}`,
            'scene': `${shValue}`,
            'duration': `${durationInSec}`,
            'frames': `${durationInFrames}`,
            'folder': `${videoFilePaths}`,
            'image': `${_image}`,

        });
        return items;
    }


}

//передача аргументов командной строки
// process.argv.forEach(function(val, index, array) {
//     console.log(index + ': ' + val);
// });

(new PageGenerator).start();

/*
D:\WORK\Katya\task1\mats\network\%projectName%\v%version%\%preview%.jpg
=image("http://peppers-studio.ru/%projectName%/v%version%/%preview%.jpg")
*/