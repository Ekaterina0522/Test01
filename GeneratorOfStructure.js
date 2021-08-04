const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const TASK_1 = require('./TASK_1');


module.exports = class GeneratorOfStructure {


    async start() {

        await this.getNameObject(splitEntries);

        await this.getFileStructure(destPath);
    }

    //функция генерирующая имена для названия папок
    static getNameObject(nameParts) {

        const episodeName = nameParts[0];
        const sequenceName = nameParts[1];
        const sceneName = nameParts[2];
        let episodeNumber = undefined;
        let episodeNameIsUnique;

        const epPattern = episodeName.match(/ep\d\d\d/);
        if (epPattern) {
            console.log('Episode Name is Template');
            episodeNumber = episodeName.substr(2, episodeName.length);
            episodeNameIsUnique = false;
        } else {
            console.log('Episode Name is Unique');
            episodeNameIsUnique = true;
        }



        //объект в котором хранятся данные об episodeName,sequenceName,sceneName
        let nameObject = {
            episodeName,
            sequenceName,
            sceneName,
            episodeNumber,
            episodeNameIsUnique,
            sequenceNumber: undefined,
            sceneNumber: undefined,
            sceneSubName: undefined,
        };
        // console.log(chalk.yellow('episodeName: ', nameObject.episodeName));
        nameObject.episodeFullName = nameObject.episodeName + '_' + nameObject.sequenceName;
        // console.log(chalk.yellow('episodeName_sequenceName: ', episodeName_sequenceName));
        nameObject.sequenceFullName = nameObject.episodeName + '_' + nameObject.sequenceName + '_' + nameObject.sceneName;
        // console.log(chalk.yellow('episodeName_sequenceName_sceneName: ', episodeName_sequenceName_sceneName));
        //console.log(JSON.stringify(nameObject,true,'  '));
        return nameObject;

    }

    //генерируем файловую структуру (до конца не реализовано)
    async getFileStructure(path) {

        await fs.promises.mkdir('\\3_anim\\subfolder', { recursive: true });
        //ну или так:
        // const path = './path/to/my/directory';

        // path.split('/').reduce(
        //     (directories, directory) => {
        //         directories += `${directory}/`;

        //         if (!fs.existsSync(directories)) {
        //             fs.mkdirSync(directories);
        //         }

        //         return directories;
        //     },
        //     '',
        // );
        ////////////////////////////////////////////////////////////////////////
        // splitEntries.forEach(e => {
        //     fs.mkdir(path + `/3_anim/"${nameObject.episodeName}"/"${nameObject.episodeFullName}"/
        //     	"${nameObject.sequenceFullName}"`, { recursive: true }, (err) => {
        //         if (err) throw err;
        //         console.log(`Created in "${path}"`);
        //     });

        // });
        return;
    }
}