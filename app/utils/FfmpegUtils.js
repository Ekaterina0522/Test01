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
    static async extractingWAV(src, dest, bitrate=192, sample_rate=44100) {
        try {
            await exec(`c:\\ffmpeg\\bin\\ffmpeg -i "${src}" -vn -ar "${sample_rate}" -ac 2 -ab "${bitrate}k" -f wav -y "${dest}.wav"`);
            //console.log('extractingAudio Complete. ');
        } catch (e) { console.log('extractingWAV.Error:', e); }
    }

    //извлекаем кадр
    static async extractingFrame(src, dest) {
        try {
            const { stdout, stderr } = await exec(`c:\\ffmpeg\\bin\\ffmpeg -ss 0 -i "${src}" -vframes 1 -vf "scale=-1:320" -y "${dest}.jpg"`);
            //console.log('extractingFrame Complete. ');
            return { stdout, stderr };
        } catch (e) { console.log('extractingFrame.Error:', e); }

    }
}