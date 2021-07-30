const fs = require('fs-extra');
const Readline = require('./readline');
const chalk = require('chalk');



//проверяем валидность пути
module.exports = class FileSystem {

	 

	static async validateParam (path, promptTitle) {

		
		path = await Readline.readLineAsync( promptTitle );
		
		try {


			//Если путь не существует или это не папка то ошибка
			if  ( fs.statSync(path).isDirectory() )

				console .log(`Path "${path}" is valid! `);
				 
			return;

		} catch (err) {

			console .log(`Path "${path}" is not valid! `);
			return;

		}
	}
}


