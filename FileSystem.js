const fs = require('fs-extra');
const Readline = require('./Readline');
const chalk = require('chalk');

//проверяем валидность пути
module.exports = class FileSystem {

	static async validateParam (path, promptTitle) {
		
		if ( !path ){
			path = await Readline.readLineAsync( promptTitle );
		}

		try {
			if (fs.statSync(path).isDirectory() ) {
				console .log(`Path "${path}" is valid! `);
				return path; 
			}
			
		} catch (err) {
			console .log(`Path "${path}" is not valid! `);
			return;
		}
	}
}
