const readline = require("readline");

//console.log('hey')
/*
const number = +console.log('Введите число между 0 и 3', '');

switch(number) {
	case 0:
		console.log("It is 0");
		break;

	case 1:
		console.log("It is 1");
		break;

	case 2:
	case 3:
		console.log("It is 2 or mb 3");
		break;

}
*/

// console.log( __dirname );

// Пример взаимодействия с пользователем( вместо prompt):
/*const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("What is your name ? ", function(name) {
    rl.question("Where do you live ? ", function(country) {
        console.log(`${name}, is a citizen of ${country}`);
        rl.close();
    });
});

rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});
*/

/* Задачи на объекты:
let user = {};
//добавляем сваойства
  user.name = 'John';
  user.surname = 'Smith';
// изменяем свойство name
  user.name = 'Pete';
  delete user.name;
  console.log(user)
  


let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
}
if (salaries === undefined) {

	console.log('0');
}

let sum = salaries.John + salaries.Ann + salaries.Pete;
console.log(sum);


let object = {age: 20, name: 'John'};


function multiplyNumeric(obj) {
	for (let i in obj) {
		if (typeof obj[i] == 'number') {
			obj[i] *= 2;
		}
	}
	//return obj;
}

//console.log(multiplyNumeric(object))
*/



/*
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let calculator = {
	
	read() {
rl.question("What is the first number ?", function(a) {
    rl.question("What is the second number ? ", function(b) {
        
        rl.close();
    }); 
});	
	},

	sum() {
		return this.a + this.b
	},

	mul() {
		return this.a * this.b
	}
};

calculator.read();
console.log(calculator.sum());
console.log(calculator.mul());






let ladder = {
  step: 0,
  up() {
    this.step++;
    return this
  },

  down() {
    this.step--;
    return this
  },

  showStep: function() { // показывает текущую ступеньку
    console.log( this.step );
    return this
  }
};

ladder.up().up().down().up().down().showStep();






//создаем массив
let styles = ["Джаз", "Блюз"];

styles.push("Рок-н-ролл");
console.log(styles);

styles[Math.floor((styles.length - 1) / 2)] = "Классика";
console.log(styles);

console.log(styles.shift());

styles.unshift("Рэп", "Регги");
console.log(styles);


let sum = 0;
function sumTo(n) {
  let i = 0;
  
  for (i; i <= n; i++) {
    sum += i;
  }
  return sum;
}
 console.log(sumTo(5));


let sum = 0;

function sumTo(n) {
  if (n == 1) return 1;
  
  return n + sumTo(n - 1);
}

console.log(sumTo(5));



function factorial(n) {
  if (n == 1) return 1;
  
  return n * factorial(n - 1);
}

console.log(factorial(5));



function fib(n) {
  if (n == 1 || n == 0) return n;
  return fib(n - 1) + fib(n - 2);
}
console.log(fib(7));


let arr = ['home', 'home', 'go', 'home', 'go'];

function unique(arr) {
  return Array.from(new Set(arr));
}


//рабочий код вместо prompt:
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What do you think of John? ', function(answer) {
  console.log(
    `Thank you for your valueble feedback: ${answer}`
    );

  rl.close();
});
//конец


let st = 'петя'

function ucFirst(str) {

  let firstSymbol = str.slice(0, 1);
  console.log(firstSymbol.toUpperCase() + str.slice(1));

}

ucFirst(st);




function checkSpam(str) {

  let new_str = str.toLowerCase()
  return new_str.includes('viagra') || new_str.includes('xxx');
}

console.log(checkSpam('xXXjfhn'));




function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}

console.log(truncate('gdhfujruieufdn', 1));
*/



function extractCurrencyValue(str) {
  return str.slice(1);
}

extractCurrencyValue('$120')