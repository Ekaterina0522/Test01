const readline = require('readline');
const chalk = require('chalk');


module.exports = class Readline {

	static async readLineAsync(message) {

		const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
	
	    return new Promise((resolve, reject) => {
            rl.question( message+': ', (answer) => {
                resolve(answer);
            });
        });
    }

}