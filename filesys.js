const fs = require('fs-extra');
const Readline = require('./read');
const chalk = require('chalk');


//проверяем валидность пути
module.exports = class FileSystem {
	static async validParam (path) {
		if (!path || 
			console.log(fs.statSync(a_dir).isDirectory()))
		console.log(`Path "${path}" is not valid! `);
		else {
			console .log(`Path "${path}" is valid! `);
		}
		return;
	}
}
