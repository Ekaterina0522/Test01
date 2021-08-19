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
let absolutePath;
const items = []; //массив с объектами где хранятся названия полей таблицы
let episodeName;
let versionNumber;
let projectName;
///
class HTMLpageGenerator {

    

    async start() {

        console.log(chalk.bgMagenta('START'));

        const sourcePath = ''+ await Readline.validateParam(process.argv[2], "Enter Source Path:");
        //console.log(chalk.bgBlue('sourcePath:', sourcePath));
        if (!sourcePath) return;

        const versionNumber = ''+ await Readline.readString(process.argv[3], "Enter Version Number:");
        console.log(chalk.bgGreen('versionNumber:', versionNumber));

        const projectName = ''+ await Readline.readString(process.argv[4], "Enter Project Name:");
        console.log(chalk.bgGreen('projectName:', projectName));

        await NameGenerator.makeNetworkFolder( projectName, versionNumber ); //работает

        // //console.log('__dirname', __dirname);

        await this.validateSourсes(sourcePath);

        console.log('items', items);

        // const templatePath = __dirname + '\\app\\project\\HTMLpageTemplate.tpl';
        // const templateConent = await FileSystem.loadTextFile(templatePath);

        // const template = Handlebars.compile(templateConent);

        // const htmlContent = template({ items: items });

        // //console.log('sourcePath', sourcePath);
        // await FileSystem.saveTextFile(sourcePath + `\\${episodeName}_v${versionNumber}.html`, htmlContent);


        console.log(chalk.bgMagenta('FINISH'));

        process.exit();

    }

    async validateSourсes(path) {
        //получаем имена источников
        const entries = await FileSystem.getDirEntries(path);
        //console.log('path', path);
        // Iterate Sequence
        await FileSystem.eachDirEntry(path, async (sqEntry, sqI, sqEntryPath) => {
            //console.log('Путь до папки секвенции', sqEntryPath);
            let sqFlag = sqEntry.match(/^.*_sq\d\d\d$/);
            //если папка названа не по шаблону не заходим в нее 
            if (sqFlag === null) return;

            // Iterate Scenes
            await FileSystem.eachDirEntry(sqEntryPath, async (scEntry, scI, scEntryPath) => {

                console.log('Путь до папки сцены', scEntryPath);
                let scFlag = scEntry.match(/^.*_sh\d\d\d\d$/);
                //если папка названа не по шаблону не заходим в нее 
                if (scFlag === null) return;
                console.log('Dir is valid!');

                //console.log('Scene Folder ==>',scI+')',scEntry, scEntryPath );
                const sceneNameObj = await NameGenerator.fromSceneFullName( scEntry, scEntryPath, versionNumber ); //валидация. достаем все что нужно(потрошим название на эпизод, сцену и секв)
                items.push(sceneNameObj);

                //записываем каждый scEntryPath в массив videoFilePaths
                //videoFilePaths.push(scEntryPath);

            // true так как перебираем только папки, а не файлы (функция eachDirEntry в файле FileSystem)
            }, true);

        }, true);
    }


    // async makeNetworkFolder(videoFilePaths) {

    //     //путь до папки где будут находиться копии кадров видеофайлов
    //     const networkPath = `D:\\WORK\\Katya\\${projectName}\\mats\\network`;

    //     //создаем папки с именем проекта и версии в папке network
    //     await FileSystem.createFolder(networkPath + `\\${projectName}\\` + `${versionNumber}`);

    //     //получаем абсолютный путь до папки с номером версии
    //     absolutePath = ''+ await path.resolve(networkPath + `\\${projectName}\\` + `${versionNumber}`);

    //     return absolutePath;
    // }


    
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

(new HTMLpageGenerator).start();

/*
D:\WORK\Katya\task1\mats\network\%projectName%\v%version%\%preview%.jpg
=image("http://peppers-studio.ru/%projectName%/v%version%/%preview%.jpg")
*/