const fs = require('fs-extra');
const chalk = require('chalk');
const FileSystem = require('./FileSystem');
// const path = require('path')

//лучше синхронный


// print process.argv
// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });

async function start(){

    console.log(chalk.bgMagenta('>>>> START') );

    const sourcePath = await FileSystem.validateParam( process.argv[2], "Enter Source Path" );
    console.log('sourcePath:', sourcePath );
    if( !sourcePath ) process.exit();
    
    const destPath = await FileSystem.validateParam( process.argv[3], "Enter Destination Path" );
    if( !destPath ) process.exit();

    console.log(chalk.bgMagenta('<<<< FINSH') );
    
    process.exit();

}



///

// fs.mkdir(__dirname + dir, { recursive: true }, (err) => {
//     if (err) {
//         console.error(err)
//         return
//     }
// })

// if (!fs.existsSync(dir)) {
//     try {
//       fs.mkdirSync(__dirname + dir, { recursive: true })
//     } catch (error) {
//         console.error(error)
//     }
// } else {
//     console.log('Папка существует')
// }


// const glob = require('glob');

// glob( + '/**/*.html', {}, (err, files)=>{
//   console.log(files)
// })


///
start();