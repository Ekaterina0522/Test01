const fs = require('fs-extra');
//const Readline = require('./Readline');
const chalk = require('chalk');
const ffmpeg = require('ffmpeg');

//const FfmpegCommand = require(' fluent-ffmpeg ');

//проверяем валидность пути
module.exports = class FileSystem {

    // Получаем имена источников в заданной директории
    static async getDirEntries(path) {
        const entries = await fs.readdir(path);
        console.log('entries', entries);
        return entries;
    }


    //создание папки в заданной директории
    //директория задается в файле TASK_1, функция start()
    static async createFolder(path) {
        console.log('createFolder: ', path);
        const result = await fs.mkdir(path, { recursive: true });
        return result;
    }
}