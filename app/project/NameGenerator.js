const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const Utils = require('../utils/utils');

module.exports = class NameGenerator {


    //функция генерирующая имена для названия папок
    static getNameObject(nameParts) {
        //добавила некоторые элементы
        const isValidEpisodeName = nameParts.slice(1, 2) === 'ep';

        const episodeName = nameParts[1];
        let episodeNumber = isValidEpisodeName ? nameParts[2] : undefined;
        const sequenceName = isValidEpisodeName ? nameParts[3] : nameParts[2];
        const sequenceNumber = isValidEpisodeName ? nameParts[4] : nameParts[3];
        const sceneName = isValidEpisodeName ? nameParts[5] : nameParts[4];
        let sceneNumber = isValidEpisodeName ? nameParts[6] : nameParts[5];
        //const SceneSubName = isValidEpisodeName ? nameParts[7] : nameParts[6];
        
        
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

        if (sceneNumber.length != 4){
            sceneNumber = '00000' + sceneNumber
            sceneNumber = sceneNumber.substr(sceneNumber.length - 4);
            //console.log(chalk.bgMagenta(sceneNumber));
           //return Utils.addZerosToString(sceneNumber, 4);
        }

        //объект в котором хранятся данные об episodeName,sequenceName,sceneName и тд
        let nameObject = {
            episodeName,
            sequenceName,
            sceneName,
            episodeNumber,
            episodeNameIsUnique,
            sequenceNumber,
            sceneNumber,
            
        };
        // console.log(chalk.yellow('episodeName: ', nameObject.episodeName));
        nameObject.sequenceFullName = nameObject.episodeName + '_' + nameObject.sequenceName;
        // console.log(chalk.yellow('episodeName_sequenceName: ', episodeName_sequenceName));
        nameObject.sceneFullName = nameObject.episodeName + '_' + nameObject.sequenceName + '_' + nameObject.sceneName;
        // console.log(chalk.yellow('episodeName_sequenceName_sceneName: ', episodeName_sequenceName_sceneName));

        console.log(JSON.stringify(nameObject,true,'  '));

        return nameObject;

    }

}