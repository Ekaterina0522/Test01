const pathToFfmpeg = 'c:\\ffmpeg\\bin\\ffmpeg';
const child_process = require("child_process");
const util = require('util');
const exec = util.promisify(child_process.exec);

const src_lst = [];
module.exports = class FfmpegUtils {



	// получаем имена источников которые переведем в другой формат, извлечем аудио и тд

    // конвертируем в другой формат
    static async creatingMP4( src, dest ) {
        return { stdout, stderr } = await exec(`c:\\ffmpeg\\bin\\ffmpeg -i ${src} -r 60 -s hd720 ${dest}`);
    }

    // извлекаем аудио
    async extractingMP3() {
        const dest = `D:\\WORK\\Katya\\task1\\mats\\import\\3_anim\\${dest1}\\${dest2}\\${dest3}\\cut\\${nameObject.sequenceFullName}.mp3`;
        
        for (let file in src_lst) {
            const { stdout, stderr } = await exec(`c:\\ffmpeg\\bin\\ffmpeg -i ${src} -vn -ar 44100 -ac 2 -ab 192k -f mp3 ${dest}.mp3`);
        }

        return;
    }

    //извлекаем кадр
    async extractingFrame() {
        const dest = `D:\\WORK\\Katya\\task1\\mats\\import\\3_anim\\${dest1}\\${dest2}\\${dest3}\\cut\\${nameObject.sequenceFullName}.jpeg`;
        
        for (let file in src_lst) {
            const { stdout, stderr } = await exec(`c:\\ffmpeg\\bin\\ffmpeg -i ${src} -r 1 -s WxH -f image2 ${dest}.jpeg`);
        }

        return;
    }
}