const readline = require("readline");
const fs = require('fs-extra'); 
const FileSystem = require('./FileSystem');
const chalk = require('chalk');
const path = require('path')


//передача аргументов командной строки
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

// ввод пользователем пути
async function getPath() {
	const sourcePath = await FileSystem.validateParam( process.argv[2], "Enter Source Path" );
    console.log('sourcePath:', sourcePath );
    if( !sourcePath ) process.exit();
    
    const destPath = await FileSystem.validateParam( process.argv[3], "Enter Destination Path" );
    if( !destPath ) process.exit();
}
// 	const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
// 	rl.question("Enter path: ", function(path) {
    	
   
//         rl.close();
//     });
	
// }
	

	//const startPath =  validParam(path) 


function validParam (path) {
	if (!path || 
		console.log(fs.statSync(a_dir).isDirectory()))
	console.log(`Path "${path}" is not valid! `);
	else {
		console .log(`Path "${path}" is valid! `);
	}
	return;
}





//const readline = require('readline');
//const chalk = require('chalk');


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
