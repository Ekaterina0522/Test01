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

    static async folderScaner(path){
        let dir1 = fs.readdir(path);
        for(let dir2 of dir1){
            fs.readdir(path+dir2);
        }
    }
}