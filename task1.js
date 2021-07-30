const readline = require("readline");
const fs = require('fs-extra'); 
const chalk = require('chalk');

//передача аргументов командной строки
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

// ввод пользователем пути
async function getPath() {


	const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
	rl.question("Enter path: ", function(path) {
    	
   
        rl.close();
    });
		
}
	

	const startPath = await validParam(path) 


function validParam (path) {
	if (!path || 
		console.log(fs.statSync(a_dir).isDirectory()))
	console.log(`Path "${path}" is not valid! `);
	else {
		console .log(`Path "${path}" is valid! `);
	}
	return;
}