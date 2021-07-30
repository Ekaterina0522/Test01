const readline = require("readline");
const fs = require('fs-extra'); 

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
	

	const startPath = await 