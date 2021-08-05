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

	//создание папки в заданной директории
	//директория задается в файле TASK_1, функция start()
	static async createFolder( path ) {
    	console.log('createFolder: ', path );
        const result = await fs.mkdir(path, { recursive: true });
        return result;
    }

}
