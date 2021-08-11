const readline = require('readline');
const chalk = require('chalk');


module.exports = class Readline {

    static async readLineAsync(message) {

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise((resolve, reject) => {
            rl.question(message + ': ', (answer) => {
                resolve(answer);
            });
        });
    }


    //проверка валидности пути
    static async validateParam(path, promptTitle) {

        if (!path) {
            path = await Readline.readLineAsync(promptTitle);
        }

        try {
            if (fs.statSync(path).isDirectory()) {
                console.log(`Path "${path}" is valid! `);
                return path;
            }

        } catch (err) {
            console.log(`Path "${path}" is not valid! `);
            return;
        }
    }

}