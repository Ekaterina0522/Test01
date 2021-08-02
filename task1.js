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
	console.log(chalk.bgMagenta('START'));

	//получаем начальный путь
	const sourcePath = await FileSystem.validateParam( process.argv[2], "Enter Source Path" );
    console.log(chalk.bgBlue('sourcePath:', sourcePath ));
    if( !sourcePath ) process.exit();
    
    //получаем конечный путь
    const destPath = await FileSystem.validateParam( process.argv[3], "Enter Destination Path" );
    if( !destPath ) process.exit();
    console.log(chalk.bgMagenta('FINSH') );
    
    process.exit();

}

getPath();
// let strPath = String(path);
// let strPath = '' + path;	
// console.log( strPath );
//




// Получаем имена источников в заданной директории

fs.readdir(path, (err, files) => {

    if (err)
        console.log(err);

    else {
        console.log("\nНазвания источников:");
        files.forEach(file => {
            console.log(file);
        })
    }
})



// получает имена файлов с заданным расширением !!!
function getFileName() {

    //делаем из path строку для readdir
    //let strPath = String( path );

    fs.readdir(path, (err, files) => {

        if (err)
            console.log(err);

        else {
            console.log("\nFilenames with the .mov extension:");
            files.forEach(fileName => {
                //смотрим чтобы расширение было mov
                if (path.extname(fileName) == ".mov") {
                    console.log(fileName)
                    return fileName;
                }
            })
        }
    })
}

getFileName();

// let EpisodeName = '';
// let SequenceName = '';
// let SceneName = '';
// let SceneSubName = '';
///

// function parsing( fileName ) {

// 	counter = 0;
// 	let helperString = '';

// 	for ( let chars of fileName ) {

// 		if ( chars === '_' ) {

// 			EpisodeName += chars;
// 			counter += 1;
// 		}
// 	}

// }




///
parseString = (path) => {
    let array = path.split('_'),
        lastElement;
    lastElement = array.pop().split(';');
    lastElement.forEach(e => {
        array.push(e)
    })
    return array;
}

textToArray = (path, format) => {
    let err = false; //флаг проверяет количество переменных в формате и тексте
    let textJSON = '{';
    let arrayFormat = parseString(format),
        arrayText = parseString(path);
    if (arrayFormat.length === arrayText.length) {
        for (let i = 0; i < arrayFormat.length; i++) {
            if (i) { textJSON += ',' }
            textJSON += "\"" + arrayFormat[i].substr(1) + "\":" + "\"" +
                arrayText[i] + "\""
        }
    } else(err = true)
    textJSON += "}"
    return err ? 'Ошибка формата' : JSON.parse(textJSON);
}

parseString(path);






