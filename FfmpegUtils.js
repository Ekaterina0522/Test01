const pathToFfmpeg = 'c:\\ffmpeg\\bin\\ffmpeg';


const src_lst = [];
module.exports = class FfmpegUtils {



	// получаем имена источников которые переведем в другой формат, извлечем аудио и тд
    async getSrc() {

        let dest1 = NameGeneratornameObject.episodeName;
        let dest2 = NameGeneratornameObject.sequenceName;
        let dest3 = NameGeneratornameObject.sceneName;
        for (let e in TASK_1.entries) {
            let src = `D:\\WORK\\Katya\\task1\\mats\\export\\${entries}`;
            src_lst.push(e);
            return src_lst;
        }
    }

    // конвертируем в другой формат
    async creatingMP4() {
        const dest = `D:\\WORK\\Katya\\task1\\mats\\import\\3_anim\\${dest1}\\${dest2}\\${dest3}\\cut\\${nameObject.sequenceFullName}.mp4`;
        for (let file in src_lst) {
            const { stdout, stderr } = await exec(`c:\\ffmpeg\\bin\\ffmpeg -i ${src} -r 60 -s hd720 ${dest}`);
        }
        return;
    }
    
    // извлекаем аудио
    async extractingMP3() {
        const dest = `D:\\WORK\\Katya\\task1\\mats\\import\\3_anim\\${dest1}\\${dest2}\\${dest3}\\cut\\${nameObject.sequenceFullName}.mp3`;
        for (let file in src_lst) {
            const { stdout, stderr } = await exec(`c:\\ffmpeg\\bin\\ffmpeg -i ${src} -r 60 -s hd720 ${dest}`);
        }
        return;
    }

    //извлекаем кадр
    async extractingFrame() {
        const dest = `D:\\WORK\\Katya\\task1\\mats\\import\\3_anim\\${dest1}\\${dest2}\\${dest3}\\cut\\${nameObject.sequenceFullName}.jpeg`;
        for (let file in src_lst) {
            const { stdout, stderr } = await exec(`c:\\ffmpeg\\bin\\ffmpeg -i ${src} -r 60 -s hd720 ${dest}`);
        }
        return;
    }
}