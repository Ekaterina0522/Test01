const readline = require('readline');
const chalk = require('chalk');


class Readline {
	static async readline(massage) {

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

        
    