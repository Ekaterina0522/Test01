const fs = require('fs-extra');
const Readline = require('./readline');
const chalk = require('chalk');



//проверяем валидность пути
module.exports = class FileSystem {

	 

	static async validParam (path, promptTitle) {

		
		path = await Readline.readLineAsync( promptTitle );

		//Если путь не существует или это не папка то ошибка
		if (!path || 
			!fs.statSync(a_dir).isDirectory())
		console.log(`Path "${path}" is not valid! `);
		else {
			console .log(`Path "${path}" is valid! `);
		}
		return;
	}
}

