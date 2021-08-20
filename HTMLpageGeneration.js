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

        //console.log('__dirname', __dirname);

        const items = await this.validateSourсes(sourcePath, versionNumber, projectName);
        const templatePath = __dirname + '\\app\\project\\HTMLpageTemplate.tpl';
        const templateConent = await FileSystem.loadTextFile(templatePath);

        const template = Handlebars.compile(templateConent);

        const htmlContent = template({
            items,
            title: items[0].episodeName
        });

        await FileSystem.saveTextFile(sourcePath + `\\${items[0].episodeName}_v${versionNumber}.html`, htmlContent);

        console.log(chalk.bgMagenta('FINISH'));

        process.exit();

    }

    async validateSourсes(path, versionNumber, projectName ) {
        
        const items = [];

        console.log('projectName', projectName);
        //получаем имена источников
        const entries = await FileSystem.getDirEntries(path);
        // Iterate Sequence
        await FileSystem.eachDirEntry(path, async (sqEntry, sqI, sqEntryPath) => {
            //console.log('Путь до папки секвенции', sqEntryPath);
            let sqFlag = sqEntry.match(/^.*_sq\d\d\d$/);
            //если папка названа не по шаблону не заходим в нее 
            if (sqFlag === null) return;

            // Iterate Scenes
            await FileSystem.eachDirEntry(sqEntryPath, async (scEntry, scI, scEntryPath) => {

                //console.log('Проверена папка сцены>>>>>', scEntryPath);
                let scFlag = scEntry.match(/^.*_sh\d\d\d\d$/);
                //если папка названа не по шаблону не заходим в нее 
                if (scFlag === null) return;

                //console.log('Scene Folder ==>',scI+')',scEntry, scEntryPath );
                const sceneNameObj = await NameGenerator.makeObject( scEntry, scEntryPath, versionNumber, projectName );
                items.push(sceneNameObj);
                
            // true так как перебираем только папки, а не файлы (функция eachDirEntry в файле FileSystem)
            }, true);

        }, true);

        return items;

    }
        
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