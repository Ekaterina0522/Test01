const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const Utils = require('../utils/utils');
const FfmpegUtils = require('../utils/FfmpegUtils');
const FileSystem = require('../utils/FileSystem');


module.exports = class NameGenerator {

    
    //функция получающая на входе строку(полный путь до папки сцены), возвращает объект с распотрошенными частями строки
    static fromStringToObject( fullPath ){

        //берем полное название файла с расширением
        const sceneFullName = fullPath.split('\\').pop().split('_');
        
        const episodeName = sceneFullName.shift();
        const sequenceNumber = sceneFullName.shift();
        const sceneNumber = sceneFullName.pop();

        const pathToCut = fullPath + '\\cut' + '\\';
        
        const folder = pathToCut + `${sceneFullName}.mp4`;
        const duration = FfmpegUtils.getVideoLength(pathToCut + `${sceneFullName}.mp4`);
        const frames = FfmpegUtils.countFrames(pathToCut + `${sceneFullName}.mp4`);
        const fps = frames/duration;

        //получаем путь к последнему созданному кадру
        const latestImage = await FileSystem.getLatestFile(pathToCut + `${sceneFullName}`, 'jpg');
        
        //копируем кадры каждого видеофайла в папку network
        await fs.copyFile(latestImage, absolutePath + '\\' + `${sceneFullName}`);
        const image = `=image("http://peppers-studio.ru/task1/v${versionNumber}/${sceneFullName}")`

        const itemObject = {
            episodeName,
            sequenceNumber,
            sceneNumber,
            folder,
            duration,
            frames,
            image,
            fps,
        };
        return itemObject;
    }


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
        const sceneSubName = sceneNumber.slice(-1);


        let episodeNameIsUnique;

        //epPattern ищем имя источника с ep и тремя цифрами,
        //чтобы идентифицировать его как episodeName
        const epPattern = episodeName.match(/ep\d\d\d/);

        if (epPattern) {
            //если имя источника ep### значит имя не уникально
            //console.log('Episode Name is Template');
            episodeNumber = episodeName.substr(2, episodeName.length);
            episodeNameIsUnique = false;
        } else {
            //если имя просто текст, то имя уникально
            //console.log('Episode Name is Unique');
            episodeNameIsUnique = true;
        }

        //если в номере сцены не 4 символа, добавляем нули в начало
        if (sceneNumber.length != 4) {
            sceneNumber = '00000' + sceneNumber
            sceneNumber = sceneNumber.substr(sceneNumber.length - 4);
        }

        let _sequenceName = sequenceName + sequenceNumber;
        let _sceneName = sceneName + sceneNumber;

        //объект в котором хранятся данные об episodeName,sequenceName,sceneName и тд
        let nameObject = {
            originalName: nameParts[0],
            episodeName,
            sequenceName: _sequenceName,
            sceneName: _sceneName,
            episodeNumber,
            sceneSubName

        };

        nameObject.sequenceFullName = nameObject.episodeName + '_' + nameObject.sequenceName;
        nameObject.sceneFullName = nameObject.episodeName + '_' + nameObject.sequenceName + '_' + nameObject.sceneName;
        //console.log(JSON.stringify(nameObject, true, '  '));

        return nameObject;

    }

}