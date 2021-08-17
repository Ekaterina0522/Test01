const fs = require('fs-extra');
const chalk = require('chalk');
const ffmpeg = require('ffmpeg');
const path = require('path');
const Utils = require('./utils');

module.exports = class FileSystem {

    //получаем последнюю версию файла
    static async getLatestFile( path, fileType ){
        // const result = [];
        let fileDate;
        let filePath;
        let fileName;
        // console.log('getLatestFile: ', path, fileType );
        await FileSystem.eachDirEntry( path, async ( entry, i, fullPath )=>{
            // console.log('FILTERED: ', entry );
            const stats = await fs.stat(fullPath);
            //если fileDate не undefined или время последнего изменения файла больше чем fileDate
            if( !fileDate || stats.mtime > fileDate ){
                fileDate = stats.mtime;
                filePath = fullPath;
                fileName = entry;
            }

        }, fileType );

        return filePath;
    }

    // fileType = true > iterate directories only
    static async eachDirEntry( path, entryAction, fileType ){
        //получаем имена каждого файла mp4
        let entries = await FileSystem.getDirEntries(path);

        if( typeof fileType === 'string' ){
            //разбиваем названия файлов по . берем то что осталось после точки
            //и смотрим совпадает ли с fileType
            entries = entries.filter( entry =>{
                return entry.split('.').pop().match(fileType);
            });
            //если совпадений нет, сбрасываем fileType чтобы не путаться дальше
            fileType = undefined;
        }
        //бежим по всем именам с нужным нам расширением и соединяем имена с их путями
        await Utils.processArray( entries, async (entry, i) => {
            const entryPath = path+'\\'+entry;
            if( fileType ){
                //если указан fileType то получаем полную ссылку на файл 
                const _fileType = await fs.lstat(entryPath);
                // если ищем только папки и данная ссылка не папка то выходим
                if( fileType === true && !_fileType.isDirectory() ) return;
            }//строка, индекс. путь
            await entryAction( entry, i, entryPath );
        });
    }

    // Получаем имена источников в заданной директории
    static async getDirEntries(path) {
        const entries = await fs.readdir(path);
        // console.log('entries', entries);
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
        fs.writeFile(destPath, file);
        console.log('File saved!');
        
    }
    
}