const readline = require('readline');
const chalk = require('chalk');
const fs = require('fs-extra');

//
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
            // stat - путь
            const stat = await fs.lstat(path);
            //если путь есть и это папка то путь валидный
            if ( stat && stat.isDirectory()) {
                console.log(`Path "${path}" is valid! `);
                return path;
            }

        } catch (err) {
            console.log(`Path "${path}" is not valid! `+err);
            return;
        }
    }

}