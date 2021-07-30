const readline = require("readline");
const fs = require('fs-extra'); 
const chalk = require('chalk');

//передача аргументов командной строки
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

// ввод пользователем пути
async function getPath() {
	const sourcePath = await validateParam( process.argv[2], "Enter Source Path" );
    console.log('sourcePath:', sourcePath );
    if( !sourcePath ) process.exit();
    
    const destPath = await validateParam( process.argv[3], "Enter Destination Path" );
    if( !destPath ) process.exit();

// 	const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
// 	rl.question("Enter path: ", function(path) {
    	
   
//         rl.close();
//     });
	
// }
	

	const startPath =  validParam(path) 


function validParam (path) {
	if (!path || 
		console.log(fs.statSync(a_dir).isDirectory()))
	console.log(`Path "${path}" is not valid! `);
	else {
		console .log(`Path "${path}" is valid! `);
	}
	return;
}