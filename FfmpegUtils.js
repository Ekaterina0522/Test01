const pathToFfmpeg = 'c:\\ffmpeg\\bin\\ffmpeg';
const child_process = require("child_process");
const util = require('util');
const exec = util.promisify(child_process.exec);

const src_lst = [];
module.exports = class FfmpegUtils {

    // конвертируем в другой формат
    static async creatingMP4( src, dest ) {
        return { stdout, stderr } = await exec(`c:\\ffmpeg\\bin\\ffmpeg -i ${src} -r 60 -s hd720 ${dest}`);
    }

    // извлекаем аудио
    static async extractingMP3() {
            return { stdout, stderr } = await exec(`c:\\ffmpeg\\bin\\ffmpeg -i ${src} -vn -ar 44100 -ac 2 -ab 192k -f mp3 ${dest}.mp3`);
    }

    //извлекаем кадр
    static async extractingFrame() {
            return { stdout, stderr } = await exec(`c:\\ffmpeg\\bin\\ffmpeg -i ${src} -r 1 -s WxH -f image2 ${dest}.jpeg`);
      
    }
}