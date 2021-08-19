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
let versionNumber;
let projectName;


///
class PageGenerator {

    async start() {

        console.log(chalk.bgMagenta('START'));

        const sourcePath = await Readline.validateParam(process.argv[2], "Enter Source Path:");
        //console.log(chalk.bgBlue('sourcePath:', sourcePath));
        if (!sourcePath) return;

        versionNumber = ''+ await Readline.readString(process.argv[3], "Enter Version Number:");
        console.log(chalk.bgGreen('versionNumber:', versionNumber));

        projectName = ''+ await Readline.readString(process.argv[4], "Enter Project Name:");
        console.log(chalk.bgGreen('projectName:', projectName));

        //console.log('__dirname', __dirname);

        await this.getSources(sourcePath);
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

    async getSourсes(path) {
        //получаем имена источников
        const entries = await FileSystem.getDirEntries(path);
        //console.log('entries[0]:', entries[0] );
        episodeName = entries[0].slice(0, -6);
        // console.log('episodeName:', episodeName );
        //console.log('entries',  entries );

        // Iterate Sequence
        await FileSystem.eachDirEntry(path, async (sqEntry, sqI, sqEntryPath) => {
            // console.log('==>',sqI+')',sqEntry, sqEntryPath );
            // sqEntry = <SMTH>_sq### ^.*_sq\d\d\d$
            // if (!episodeName) episodeName = 
            // Iterate Scenes
            await FileSystem.eachDirEntry(sqEntryPath, async (scEntry, scI, scEntryPath) => {

                //console.log('Scene Folder ==>',scI+')',scEntry, scEntryPath );
                // const sceneNameObj = NameGenerator.fromSceneFullName( scEntry ); валидация. достаем все что нужно(потрошим название на эпизод, сцену и секв)
                
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

        //путь до папки где будут находиться копии кадров видеофайлов
        let networkPath = 'D:\\WORK\\Katya\\task1\\mats\\network';

        //создаем папки с именем проекта и версии в папке network
        await FileSystem.createFolder(networkPath + '\\' + `task1` + '\\' + `${versionNumber}`);

        //получаем абсолютный путь до папки с номером версии
        let absolutePath = await path.resolve(networkPath + '\\' + `task1` + '\\' + `${versionNumber}`);

        //пробегаемся по всем именам файлов и для каждого считаем FPS и копируем кадры
        await Utils.processArray(videoFilePaths, async (videoFileName, i) => {

            const _videoFile = videoFile[i];
            

            //считаем FPS
            const oneFileFPS = (_videoFrames) / (videoDuration);
            videoFPS.push(oneFileFPS);

            //достаем имя кадра
            let frameName = imagesToCopy[i].split('\\').pop();

            //копируем кадры каждого видеофайла в папку network
            await fs.copyFile(imagesToCopy[i], absolutePath + '\\' + frameName);
            
            image.push(`=image("http://peppers-studio.ru/task1/v${versionNumber}/${frameName}")`)

            //заполняем items
            this.makeItems(sequenceNumbers[i], sceneNumbers[i], videoFilesDurations[i],
                videoFrames[i], videoFilePaths[i], image[i]);

        });
    }


    
    //создаем массив с объектами где хранятся все названия полей
    // async makeItems(sqValue, shValue, durationInSec, durationInFrames, videoFilePaths, _image) {
    //     items.push({
    //         sequence: sqValue,
    //         'scene': `${shValue}`,
    //         'duration': `${durationInSec}`,
    //         'frames': `${durationInFrames}`,
    //         'folder': `${videoFilePaths}`,
    //         'image': `${_image}`,
    //     });
    //     return items;
    // }

        
        
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