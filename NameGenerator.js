const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const TASK_1 = require('./TASK_1');

module.exports = class NameGenerator {


    //функция генерирующая имена для названия папок
    static getNameObject(nameParts) {

    	const episodeName = nameParts[0];
        const sequenceName = nameParts[1];
        const sceneName = nameParts[2];
        let episodeNumber = undefined;
        let episodeNameIsUnique;

        // const episodeName = nameParts[0];
        // const sequenceName = nameParts[1];
        // const sceneName = nameParts[2];
        // let episodeNumber = undefined;
        // let episodeNameIsUnique;

        //epPattern ищем имя источника с ep и тремя цифрами,
        //чтобы идентифицировать его как episodeName
        const epPattern = episodeName.match(/ep\d\d\d/);
        if (epPattern) {
            //если имя источника ep### значит имя не уникально
            console.log('Episode Name is Template');
            episodeNumber = episodeName.substr(2, episodeName.length);
            episodeNameIsUnique = false;
        } else {
            //если имя просто текст, то имя уникально
            console.log('Episode Name is Unique');
            episodeNameIsUnique = true;
        }

        //объект в котором хранятся данные об episodeName,sequenceName,sceneName и тд
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
        nameObject.sequenceFullName = nameObject.episodeName + '_' + nameObject.sequenceName;
        // console.log(chalk.yellow('episodeName_sequenceName: ', episodeName_sequenceName));
        nameObject.sceneFullName = nameObject.episodeName + '_' + nameObject.sequenceName + '_' + nameObject.sceneName;
        // console.log(chalk.yellow('episodeName_sequenceName_sceneName: ', episodeName_sequenceName_sceneName));

        //console.log(JSON.stringify(nameObject,true,'  '));
        return nameObject;

    }

}