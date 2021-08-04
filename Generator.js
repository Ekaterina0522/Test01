const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const TASK_1 = require('./TASK_1');

module.exports = class Generator { //extends TASK_1 {


	async start() {
		await this.generator(splitEntries);
	}

	//функция генерирующая имена для названия папок
	static getNameObject(nameParts) {
		

		//объект в котором хранятся данные об episodeName,sequenceName,sceneName
		let nameObject = {
			episodeName: nameParts[0],
			sequenceName: nameParts[1],
			sceneName: nameParts[2],
			episodeNumber: undefined,
			sequenceNumber: undefined,
			sceneNumber: undefined,
			sceneSubName: undefined,
		};
		// console.log(chalk.yellow('episodeName: ', nameObject.episodeName));
		nameObject.episodeFullName = nameObject.episodeName+'_'+nameObject.sequenceName;
		// console.log(chalk.yellow('episodeName_sequenceName: ', episodeName_sequenceName));
		nameObject.sequenceFullName =  nameObject.episodeName+'_'+nameObject.sequenceName+'_'+nameObject.sceneName;
		// console.log(chalk.yellow('episodeName_sequenceName_sceneName: ', episodeName_sequenceName_sceneName));
		// console.log(JSON.stringify(nameObject,true,'  '));
		return nameObject;

	}





	//генерируем файловую структуру (до конца не реализовано)
	// static async structureGenerator(path) {
	// 	// console.log('generationStructure: ',path+'\\3_anim\\subfolder')
	//     fs.mkdir(path + '\\3_anim\\subfolder', { recursive: true }, (err) => {
	//         if (err) throw err;
	//         console.log(`Created in "${path}"`);
	//     });

	// }





}