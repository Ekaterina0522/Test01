const fs = require('fs-extra');
const chalk = require('chalk');
const FileSystem = require('./filesys');
const path = require('path')

//передача аргументов командной строки
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

// ввод пользователем пути
async function getPath() {
	console.log('START')

	//получаем начальный путь
	const sourcePath = await FileSystem.validateParam( process.argv[2], "Enter Source Path" );
    console.log('sourcePath:', sourcePath );
    if( !sourcePath ) process.exit();
    
    //получаем конечный путь
    const destPath = await FileSystem.validateParam( process.argv[3], "Enter Destination Path" );
    if( !destPath ) process.exit();
    console.log('FINISH');
    process.exit();
}

getPath();	









