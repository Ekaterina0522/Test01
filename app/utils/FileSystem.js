const fs = require('fs-extra');
const chalk = require('chalk');
const ffmpeg = require('ffmpeg');
const path = require('path');


//проверяем валидность пути
module.exports = class FileSystem {

    // Получаем имена источников в заданной директории
    static async getDirEntries(path) {
        const entries = await fs.readdir(path);
        //console.log('entries', entries);
        return entries;
    }

    //создание папки в заданной директории
    //директория задается в файле Task1, функция start()
    static async createFolder(path) {
        console.log('createFolder: ', path);
        const result = await fs.mkdir(path, { recursive: true });
        return result;
    }


    static async loadTextFile( filePath ){
        //var fs = require('fs');
        const content = await fs.readFile( filePath, 'utf8' );
        return content;
    }

    static async saveTextFile(destPath, file ){
        fs.writeFile(destPath, file, (err) => {
            if(err) throw err;
            console.log('File saved!');
        });
    }
    //бежит по папкам
    static async folderScaner(path){
        // let dir1 = fs.readdir(path);
        // for(let dir2 of dir1){
        //     fs.readdir(path+dir2);
        //}

        //ссылки на возможно работающие функции
        //https://coderoad.ru/17699599/Node-js-%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D1%8C%D1%82%D0%B5-%D1%81%D1%83%D1%89%D0%B5%D1%81%D1%82%D0%B2%D1%83%D0%B5%D1%82-%D0%BB%D0%B8-%D1%84%D0%B0%D0%B9%D0%BB
        //https://coderoad.ru/41462606/%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C-%D0%B2%D1%81%D0%B5-%D1%84%D0%B0%D0%B9%D0%BB%D1%8B-%D1%80%D0%B5%D0%BA%D1%83%D1%80%D1%81%D0%B8%D0%B2%D0%BD%D0%BE-%D0%B2-%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0%D1%85-NodejS
    }
}