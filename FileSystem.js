const fs = require('fs-extra');
const Readline = require('./Readline');
const chalk = require('chalk');
const ffmpeg = require('ffmpeg');
//const FfmpegCommand = require(' fluent-ffmpeg ');

//проверяем валидность пути
module.exports = class FileSystem {

    static async validateParam(path, promptTitle) {

        if (!path) {
            path = await Readline.readLineAsync(promptTitle);
        }

        try {
            if (fs.statSync(path).isDirectory()) {
                console.log(`Path "${path}" is valid! `);
                return path;
            }

        } catch (err) {
            console.log(`Path "${path}" is not valid! `);
            return;
        }
    }

    //создание папки в заданной директории
    //директория задается в файле TASK_1, функция start()
    static async createFolder(path) {
        console.log('createFolder: ', path);
        const result = await fs.mkdir(path, { recursive: true });
        return result;
    }

    // static async addingFileToCutFolder() {

    // }

    // static async getVideoInfo(path) {
    //     try {
    //         let process = new ffmpeg(path);
    //         process.then(function(video) {
    //             // Video metadata
    //             console.log(video.metadata);
    //             // FFmpeg configuration
    //             console.log(video.info_configuration);
    //         }, function(err) {
    //             console.log('Error: ' + err);
    //         });
    //     } catch (e) {
    //         console.log(e.code);
    //         console.log(e.msg);
    //     }
    // }

    //конвертация видео (не работает)
    static async getConvertedVideo() {
        try {
            let proc = new ffmpeg({ source: 'D:\\Katya\\task1\\mats\\export\\ep001_sq0_A_0_sh006.mov', nolog: false })
                .toFormat('mp4')
                .saveToFile('D:\\WORK\\Katya\\task1\\mats\\import\\3_anim\\ep001\\sq000\\sh006\\cut\\ep001_sq000_sh006.mp4',
                    function(retcode, error) {
                        console.log('file has been converted succesfully');
                    });
        } catch (err) {
            console.log('Error: ' + err);
        }
    }
    //тоже конвертация видео (не работает)
    // static getConvertedVideo() {
    //     let inFilename = "D:\\Katya\\task1\\mats\\export\\ep001_sq0_A_0_sh006.mov";
    //     let outFilename = "D:\\WORK\\Katya\\task1\\mats\\import\\3_anim\\ep001\\sq000\\sh006\\cut\\ep001_sq000_sh006.mp4";

    //     ffmpeg(inFilename)
    //         .outputOptions("-c:v", "copy") // this will copy the data instead or reencode it
    //         .save(outFilename);
    // }

    // Извлечение звука из видео (не проверено)
    // static async getSound(){
    // 	ffmpeg({ source: 'video' })
    // 		.noVideo()
    // 		.output('audio.mp3')
    // 		run();
    // }
}