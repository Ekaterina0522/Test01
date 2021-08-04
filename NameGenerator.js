const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const TASK_1 = require('./TASK_1');

module.exports = class NameGenerator { //extends TASK_1 {


	async start() {
		await this.generator(splitEntries);
	}

	//функция генерирующая имена для названия папок
	static async generator(splitEntries) {
		//объект в котором хранятся данные об episodeName,sequenceName,sceneName
		let name1 = {
			episodeName: splitEntries[0][0],
			sequenceName: splitEntries[0][1],
			sceneName: splitEntries[0][2],
		};
		console.log(chalk.yellow('episodeName: ', name1.episodeName));

		let episodeName_sequenceName = name1.episodeName+'_'+name1.sequenceName;
		console.log(chalk.yellow('episodeName_sequenceName: ', episodeName_sequenceName));

		let episodeName_sequenceName_sceneName = name1.episodeName+'_'+name1.sequenceName+'_'+name1.sceneName;
		console.log(chalk.yellow('episodeName_sequenceName_sceneName: ', episodeName_sequenceName_sceneName));

		
		

	}











}