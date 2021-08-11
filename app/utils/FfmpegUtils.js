const pathToFfmpeg = 'c:\\ffmpeg\\bin\\ffmpeg';
const child_process = require("child_process");
const util = require('util');
const exec = util.promisify(child_process.exec);

const src_lst = [];
module.exports = class FfmpegUtils {

    // изменение размера
    static async resizingVideo( src, dest ) {
        return { stdout, stderr } = await exec(`c:\\ffmpeg\\bin\\ffmpeg -i ${src} -r 60 -s hd720 ${dest}`);
    }


    //конвертация в mp4
    static async convertingToMP4( src, dest ){
        return { stdout, stderr } = await exec(`c:\\ffmpeg\\bin\\ffmpeg -i ${src} ${dest}.mp4`);
    }


    // извлекаем аудио
    static async extractingMP3( src, dest ) {
            return { stdout, stderr } = await exec(`c:\\ffmpeg\\bin\\ffmpeg -i ${src} -vn -ar 44100 -ac 2 -ab 192k -f mp3 ${dest}.mp3`);
    }

    //извлекаем кадр
    static async extractingFrame( src, dest ) {
            return { stdout, stderr } = await exec(`c:\\ffmpeg\\bin\\ffmpeg -i ${src} -r 1 -s WxH -f image2 ${dest}.jpeg`);
      
    }

}