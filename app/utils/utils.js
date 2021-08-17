// const fs = require('fs-extra');
// const https = require('https');
// const fetch = require('node-fetch');
// const mimedb = require('mime-db');
// const xml2js = require('xml2js');
// const chalk = require('chalk');
// const NumberUtils = require('./NumberUtils');

const letters = ['A','B','C','D','E','F','G','H','I','J'];

//
const utils = {

	//
	getCurrentDate: function(){
		return (new Date()).toLocaleString("ru");
	},


	// Синхронная параллельная обработка массива
	processArrayParallel: async function( array, action ) {
	  // делаем "map" массива в промисы
	  const promises = array.map( action );
	  // ждем когда всё промисы будут выполнены
	  await Promise.all(promises);
	  // console.log('Done!');
	},

	// Синхронная последовательная обработка массива
	processArray: async function( array, action ) {
		let i=0;
		for (const item of array) {
			await action(item,i);
			i++;
		}
		// console.log('Done!');
	},


	//
	kebabToCamel: function(s,firstIsBig){
	  s = s.replace(/-./g, x=>x.toUpperCase()[1]);
	  return !firstIsBig ? s : s.charAt(0).toUpperCase()+s.substr(1,s.length);
	},

	//
	camelToKebab: function(s){
    	return s.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
	},

	//
	getSafeName(s){
		return s.replace(/[^a-z0-9\-_.']/gi, '_');
	},

	//
	unescapeUnicode(x){
		x = x.replace(//gi,' ');
		return x;
		/*
		x = x.replace(/\\u([\d\w]{4})/gi, function (match, grp) {
			return String.fromCharCode(parseInt(grp, 16));
		});
		return unescape(x);
		*/
	},

	// getNumberValue(str, checkStringExpression ) {
	// 	if (typeof str != "string") return str;
	// 	let val;
	// 	if( checkStringExpression ) val = NumberUtils.parseStringExpression(str);
	// 	else val = parseFloat(str);
	// 	// console.log('getNumberValue:', str, val ); // !!!
	// 	return isNaN(val) ? str : val;
	// },

	getBooleanValue(str){
		if (typeof str != "string") return !!str;
		str = str.trim().toLowerCase();
		console.log('getBooleanValue', str );
		return str==='true' || str==='0';
	},

	parseLazyJSON(string){
		const correctJson = string.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
		return JSON.parse(correctJson);
	},


	getLetterIndex( letter ){
		const index = letters.indexOf(letter.toUpperCase());
		return index !== -1 ? index+1 : undefined;
	},

};

module.exports = utils;