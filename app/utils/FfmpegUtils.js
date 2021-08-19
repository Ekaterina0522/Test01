const pathToFfmpeg = 'c:\\ffmpeg\\bin\\ffmpeg';
const child_process = require("child_process");
const util = require('util');
const exec = util.promisify(child_process.exec);

module.exports = class FfmpegUtils {

    //конвертация в wav
    static async convertingToMP4(src, dest) {
        try {
            await exec(`c:\\ffmpeg\\bin\\ffmpeg -i "${src}" -r 60 -s hd720 -y "${dest}.mp4"`);
            //console.log('convertingVideo Complete. ');
        } catch (e) { console.log('convertingToMP4.Error:', e); }
    }

    // извлекаем аудио
    static async extractingWAV(src, dest, bitrate = 192, sample_rate = 44100) {
        try {
            await exec(`c:\\ffmpeg\\bin\\ffmpeg -i "${src}" -vn -ar "${sample_rate}" -ac 2 -ab "${bitrate}k" -f wav -y "${dest}.wav"`);
        } catch (e) { console.log('extractingWAV.Error:', e); }
    }

    //извлекаем кадр
    static async extractingFrame(src, dest) {
        try {
            const { stdout, stderr } = await exec(`c:\\ffmpeg\\bin\\ffmpeg -ss 0 -i "${src}" -vframes 1 -vf "scale=-1:320" -y "${dest}.jpg"`);
            return { stdout, stderr };
        } catch (e) { console.log('extractingFrame.Error:', e); }

    }



    //хронометраж видео в секундах
    static async getVideoLength(src) {

        try {
            const { stdout, stderr } = await exec(`c:\\ffmpeg\\bin\\ffprobe -v error -select_streams v:0 -show_entries stream=duration \
  -of default=noprint_wrappers=1:nokey=1 "${src}"`);

            const inSec = { stdout, stderr }.stdout;
            const _inSec = +inSec.slice(0, inSec.length - 2);
            return _inSec;
            

        } catch (e) { console.log('getVideoLength.Error:', e); }

    }


    //количество кадров во всем видеофайле
    static async countFrames(src) {

        try {
            
            const { stdout, stderr } = await exec(`c:\\ffmpeg\\bin\\ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of csv=p=0 "${src}" `);
            const inFrames = { stdout, stderr }.stdout;
            const _inFrames = +inFrames.slice(0, inFrames.length - 2);
            return _inFrames;
            
        } catch (e) { console.log('countFrames.Error:', e); }

    }


}