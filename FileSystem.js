const chalk = require('chalk');
const Readline = require('./Readline');
const fs = require('fs-extra');

///
module.exports = class FileSystem {

	static async validateParam( path, promptTitle ){

	    if( !path ){ // Ask user

	        // path = await prompt.get( promptTitle );
	        path = await Readline.readLineAsync( promptTitle );
	    }

	    let hasErrors = false;
	    let isDir = false;

	    try{
	        isDir = fs.lstatSync(path).isDirectory() ;
	    }catch(err){
	        hasErrors = true;
	    }

	    if( hasErrors || !isDir ){
	        // console.log(chalk.red(`Path "${path}" is not valid.`));
	        return;
	    }

	    // console.log(chalk.green(`Path "${path}" is valid.`));

	    return path;
	}


}