'use strict';

// const bookings = [];

// const createBooking = function (
//   flightNum = 'Undefined',
//   numPassengers = 1,
//   price = numPassengers * 100
// ) {
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LLA');
// createBooking('LLA', 3);
// createBooking('LLA', 3, 3);
// createBooking('LLA', undefined, 3);

////////////////////////////////////////////////

// const flight = 'LH332';
// const abdullah = {
//   name: 'Abdullah Ban',
//   passport: 1117880565,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999';
//   passenger.name = 'Mr. ' + passenger.name;

//   if (passenger.passport === 1117880565) {
//     console.log('Checked In...');
//   } else {
//     console.log('Sorry!');
//   }
// };

// checkIn(flight, abdullah);
// console.log(flight);
// console.log(abdullah);

// // It's same as doing...
// const flightNum = flight; // which is primitive value
// const passenger = abdullah; // which is reference

////////////////////////////////////////////////

// // Functions Accepting Callback Functions

// const oneWord = function (str) {
//   return str.replaceAll(' ', '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...rest] = str.split(' ');
//   return [first.toUpperCase(), ...rest].join(' ');
// };

// // High-order function, [because it receives 'function' as a parameter.]
// const transformer = function (str, fn) {
//   console.log(`Original string : ${str}`);
//   console.log(`Transformed string : ${fn(str)}`);
//   console.log(`Transformed by : ${fn.name}`);
// };

// transformer('the moon is very shiny today!', oneWord);
// console.log('__________________');
// transformer('the moon is very shiny today!', upperFirstWord);

////////////////////////////////////////////////

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// // This called closure (We didn't study it yet)
// // Way No.1
// const greetingMessage = greet('Salam');
// greetingMessage('Sami');

// // Way No.2
// greet('Hi')('Abdullah');

// // Jonas Challenge ! [same as above but with 'Arrow Function']...

// const salam = salaming => name => console.log(`${salaming} ${name}`);
// const salamMessage = salam('Salam Alaykum');
// salamMessage('Moha');

////////////////////////////////////////////////

// // The call and apply Methods

// const saudia = {
//   airline: 'Saudia Airline',
//   iataCode: 'SA',
//   bookings: [],
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}.`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
//     console.log(this.bookings);
//   },
// };

// saudia.book(111, 'Abdullah');
// saudia.book(377, 'Nyarr');

// const qatar = {
//   airline: 'Qatar Airways',
//   iataCode: 'QA',
//   bookings: [],
// };

// const bookFun = saudia.book;

// // Call method to deal with 'this' keyword
// bookFun.call(qatar, 100, 'Talal');

// // Apply method, same as call but takes the args as an array [not used in modren JS]
// const args = [101, 'Mohammed'];
// bookFun.apply(qatar, args);

////////////////////////////////////////////////

// console.log('____________');
// // The bind method
// const bookFunQA = bookFun.bind(qatar);
// bookFunQA(450, 'Samiah');
// bookFunQA(451, 'Zainah');
// bookFunQA(452, 'Sharifah');

// // The Bind method with predefined arg
// const bookQA40 = bookFun.bind(qatar, 40); // we defined 40 for flightNum for ever.
// bookQA40('Ahmed'); // the number already defined 👍..

// // With Event Listeners
// saudia.planes = 300;
// saudia.buyPlanes = function () {
//   console.log(this);

//   this.planes++;
//   console.log(this.planes);
// };

// document
//   .querySelector('.buy')
//   .addEventListener('click', saudia.buyPlanes.bind(saudia)); // we manually set 'saudia' as this keyword

// // Partial Application
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.3, 100));

// const addVAT = addTax.bind(null, 0.15);

// console.log(addVAT(100));

// Jonas Challenge !

// const addTax = function (rate) {
//   return function (value) {
//     console.log(value + value * rate);
//   };
// };

// const addVAT = addTax(0.15);
// addVAT(100);

////////////////////////////////////////////////

/*

1. Create a method called 'registerNewAnswer' on the 'poll' object. The
method does 2 things:

    1.1. Display a prompt window for the user to input the number of the
    selected option. The prompt should look like this:
    What is your favourite programming language?
    0: JavaScript
    1: Python
    2: Rust
    3: C++
    (Write option number)

    1.2. Based on the input number, update the 'answers' array property. For
    example, if the option is 3, increase the value at position 3 of the array by 1.
    Make sure to check if the input is a number and if the number makes
    sense (e.g. answer 52 wouldn't make sense, right?)

2. Call this method whenever the user clicks the "Answer poll" button.

3. Create a method 'displayResults' which displays the poll results. The
method takes a string as an input (called 'type'), which can be either 'string'
or 'array'. If type is 'array', simply display the results array as it is, using
console.log(). This should be the default option. If type is 'string', display a
string like "Poll results are 13, 2, 4, 1".

4. Run the 'displayResults' method at the end of each
'registerNewAnswer' method call.

5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test
data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll
object! So what should the this keyword look like in this situation?
The Complete JavaScript Course 21
Test data for bonus:
§ Data 1: [5, 2, 3]
§ Data 2: [1, 5, 3, 9, 6, 1]

Hints: Use many of the tools you learned about in this and the last section �

GOOD LUCK �

*/

// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3:C++'],
//   // This generates [0, 0, 0, 0]. More in the next section!
//   answers: new Array(4).fill(0),

//   registerNewAnswer(prom) {
//     if (isNaN(prom)) console.log('Its not number...');
//     else if (prom < 0 || prom > 3) console.log('Enter number between 0-3...');
//     // else if (prom.includes(' ')) console.log('Contain spaces...');
//     else if (prom.length === 0) console.log('Empty...');
//     else {
//       poll.answers[prom] = poll.answers[prom] + 1;
//       // console.log(this.answers);
//       this.displayResult(this.answers);
//     }
//   },

//   displayResult(type) {
//     console.log(type);

//     // const bool = Array.isArray(type);
//     // if (bool) {
//     //   console.log('Array');
//     // } else if (typeof type === 'string') {
//     //   console.log('String');
//     // } else {
//     //   console.log('Nither');
//     // }
//   },
// };

// function Calling() {
//   const prom = prompt(
//     'What is your favourite programming language?\n0: JavaScript\n1: Python\n2: Rust\n3: C++'
//   );
//   return poll.registerNewAnswer(prom), poll.registerBonus1(prom);
// }

// document.querySelector('.poll').addEventListener('click', Calling);

// const pollBonus1 = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3:C++'],
//   answers: [5, 2, 3],
// };

// const registerBonus1 = poll.registerNewAnswer;
// registerBonus1.call(pollBonus1, 0);
// const displayBonus1 = poll.displayResult;
// displayBonus1.call(pollBonus1, this.answers);

// const pollBonus2 = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3:C++'],
//   answers: [1, 5, 3, 9, 6, 1],
// };

//////////// I Didn't finish, I get frustrated !

// // Jonas answer
// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3:C++'],
//   // This generates [0, 0, 0, 0]. More in the next section!
//   answers: new Array(4).fill(0),
//   registerNewAnswer() {
//     const answer = Number(
//       prompt(
//         `${this.question}\n${this.options.join('\n')}\n(Write option number)`
//       )
//     );
//     console.log(answer);

//     //Register answer
//     typeof answer === 'number' &&
//       answer < this.answers.length &&
//       this.answers[answer]++;
//     // console.log(this.answers);
//     this.displayResult();
//     this.displayResult('string');
//   },
//   displayResult(type = 'array') {
//     if (type === 'array') {
//       console.log(this.answers);
//     } else if (type === 'string') {
//       // Poll results are 13, 2, 4, 1
//       console.log(`Poll results are ${this.answers.join(', ')}`);
//     }
//   },
// };

// // poll.registerNewAnswer();

// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll)); // we used 'bind' to make this keyword points to the object and not the element that we selected

// poll.displayResult.call({ answers: [5, 2, 3] });
// poll.displayResult.call({ answers: [5, 2, 3] }, 'string');
// poll.displayResult.call({ answers: [1, 5, 3, 9, 6, 1] });
// poll.displayResult.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');

////////////////////////////////////////////////

// // Immediately Invoked Function Expressions (IIFE)

// // This way was discoverd by the developers.
// (function () {
//   console.log('Run Once');
// })();

////////////////////////////////////////////////

// // Closures : gives a function access to all the variables of it's parent function, even if that parent function has returned. The function keeps a reference to it's outer scope, which preserves the scope chain throughout time.

// // The closures make sure that a function never lose connection to the variables that existed at the function's birth place.

// const secureBooking = function () {
//   let passengersCount = 0;

//   return function () {
//     passengersCount++;
//     console.log(`${passengersCount} passengers.`);
//   };
// };

// const booker = secureBooking();

// booker();
// booker();
// booker();
// booker();

// console.dir(booker);

////////////////////////////////////////////////

// /*
// Coding Challenge #2

// 1. Take the IIFE below and at the end of the function, attach an event listener that
// changes the color of the selected h1 element ('header') to blue, each time
// the body element is clicked. Do not select the h1 element again!

// 2. And now explain to yourself (or someone around you) why this worked! Take all
// the time you need. Think about when exactly the callback function is executed,
// and what that means for the variables involved in this example.
// */

// // My Solution
// (function () {
//   const header = document.querySelector('h1');
//   header.style.color = 'red';

//   return function () {
//     document.querySelector('body').addEventListener('click', function () {
//       header.style.color = 'blue';
//     });
//   };
// })()();

////////////////////////////////////////////////
