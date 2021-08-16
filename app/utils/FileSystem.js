const fs = require('fs-extra');
const chalk = require('chalk');
const ffmpeg = require('ffmpeg');
const path = require('path');
const Utils = require('./utils');

module.exports = class FileSystem {


    static async getLatestFile( path, fileType ){
        // const result = [];
        let fileDate;
        let filePath;
        let fileName;
        // console.log('getLatestFile: ', path, fileType );
        await FileSystem.eachDirEntry( path, async ( entry, i, fullPath )=>{
            // console.log('FILTERED: ', entry );
            const stats = await fs.stat(fullPath);

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
        
        let entries = await FileSystem.getDirEntries(path);

        if( typeof fileType === 'string' ){
            entries = entries.filter( entry =>{
                return entry.split('.').pop().match(fileType);
            });
            fileType = undefined;
        }

        await Utils.processArray( entries, async (entry, i) => {
            const entryPath = path+'\\'+entry;
            if( fileType ){
                const _fileType = await fs.lstat(entryPath);
                if( fileType === true && !_fileType.isDirectory() ) return;
            }
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