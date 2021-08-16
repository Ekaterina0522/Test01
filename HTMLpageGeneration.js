const fs = require('fs-extra');
const readline = require('readline');
const path = require('path');
const chalk = require('chalk');
const Readline = require('../../task1/src/app/utils/Readline');
const NameGenerator = require('./app/project/NameGenerator');
const Handlebars = require('Handlebars');
const FileSystem = require('./app/utils/FileSystem');
const Utils = require('./app/utils/utils');

///
const mp4Files = [];

///
class PageGenerator {

    async start() {

        console.log(chalk.bgMagenta('START'));
        //валидация
        // D:\WORK\Katya\task1\mats\import\3_anim\opening
        const sourcePath = await Readline.validateParam(process.argv[2], "Enter Source Path");
        //console.log(chalk.bgBlue('sourcePath:', sourcePath));
        if (!sourcePath) return;

        const versionNumber = await Readline.readLineAsync("Enter version number");
        console.log(chalk.bgGreen('versionNumber:', versionNumber));

        //const items = [];


        // const example = {
        //     sell1: "name1",
        //     sell2: "name2",
        //     sell3: "name3",
        // }
        // const example2 = {
        //     sell1: "name11",
        //     sell2: "name22",
        //     sell3: "name33",
        // }
        // const example3 = {
        //     sell1: "name111",
        //     sell2: "name222",
        //     sell3: "name333",
        // }

        // const items = [];
        // items.push(example);
        // items.push(example2);
        // items.push(example3);  

        await this.getFilesNames(sourcePath);

        // sourcePath
            // each Sequence
                // each Scene
                    // cut/*.mp4

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

        const entries = await FileSystem.getDirEntries(path);
        // console.log('getFilesNames:', path, entries );
        // console.log('>>>', typeof entries, entries, entries[0] );

        // Iterate Sequence
        await FileSystem.eachDirEntry( path, async ( sqEntry, sqI, sqEntryPath )=>{
            // console.log('==>',sqI+')',sqEntry, sqEntryPath );

            // Iterate Scenes
            await FileSystem.eachDirEntry( sqEntryPath, async ( scEntry, scI, scEntryPath )=>{
                
                console.log('Scene Folder ==>',scI+')',scEntry, scEntryPath );
                
                const videoFile = await FileSystem.getLatestFile( scEntryPath+'\\cut', 'mp4' );
                console.log('file: ', videoFile );

            }, true );

        }, true );

        // const sequences = await FileSystem.getDirEntries(path);
        
        // return sequences; 

        /*
        await fs.readdir(path, (err, files) => {
                    files.forEach(file => {
                        console.log(file);

                        fs.readdir(path+'/'+file, (err, _files) => {
                            files.forEach(_file => {
                                console.log(_file);
                            })
                        });
                    });
                        
        });
        */

    }


}

//передача аргументов командной строки
// process.argv.forEach(function(val, index, array) {
//     console.log(index + ': ' + val);
// });

(new PageGenerator).start();