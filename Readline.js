const chalk = require('chalk');
const readline = require('readline');

///
module.exports = class Readline {

	static async readLineAsync(message) {
	    
	    const rl = readline.createInterface({
	      input: process.stdin,
	      output: process.stdout
	    });

	    return new Promise((resolve, reject) => {
	        rl.question( chalk.yellow(message+': '), (answer) => {
	            resolve(answer);
	        });
	    });

	} 
}

/*
module.exports = {
	Readline,
	prefix: 200
}
*/

/*
const rl = new Readline.readLineAsync
rl.readLineAsync



const sceneData1 = new SceneData( fileName1 );
sceneData1.episodeName;

const sceneData2 = new SceneData( fileName2 );
sceneData2.episodeName;
*/