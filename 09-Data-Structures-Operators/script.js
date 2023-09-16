'use strict';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.starterMenu[mainIndex]];
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Your ingredients are ${ing1}, ${ing2} and ${ing3}.`);
  },
  orderPizza: function (mainIng, ...others) {
    console.log(mainIng, others);
  },
};

const rest1 = {
  name: 'Lozano',
  //numGuests: '0'
  numGuests: '10',
};

const rest2 = {
  name: 'Guessippe',
  owner: 'Mario Guessippe',
};

// Destructring Array
// const [a,b,c] = restaurant.categories;
// console.log(a,b,c)

// Destructring Array with function
// const [x,y] = restaurant.order(2,0)
// console.log(x,y)

// Destructring Nested Array
// const Nested = [2, 4, [5, 6]]
// const [a, , [b,c]] = Nested
// console.log(a,b,c)

// Default Values (when we want to avoid undefined message)
// const [a='Unknown', b='Unknown', c='Unknown'] = ['Abdullah', 'Nyarr']
// console.log(a,b,c)

//-------------------------------//

// // Destructring Object
// const {name, openingHours} = restaurant
// console.log(name, openingHours)

// // Assigning variables names
// const { name: Name, openingHours: Hours } = restaurant
// console.log(Name,Hours)

// // Default Values (if case it dosen't exist)
// const { OpHours=[], location: locations=[] } = restaurant
// console.log(OpHours, locations)

// Mutating Variables
// let a = 11;
// let b = 22;

// const obj = {
//   a: 100 ,
//   b:200 ,
//   c: 300
// };

// ({ a , b } = obj);

// console.log(a,b);

//Nested Objects
// const { openingHours: {fri: {open,close}} } = restaurant
// console.log(open,close)

//-------------------------------//

// const arr = [4,5,6]
// const badWay = [1 , 2 , 3 , arr[0] , arr[1] , arr[2]]
// console.log(badWay)

// const newWay = [1 , 2 , 3 , ...arr]
// console.log(newWay)

// const newName = [...restaurant.mainMenu , 'Pozzi']
// console.log(newName)

// // Copy Array
// const copyArr = [...arr]

// // Merge Arrays
// const mergeArrs = [...arr,...copyArr]
// console.log(mergeArrs)

// // orderPasta function
// const Ings = [
//   'Hallopino',
//   'Salt',
//   'Egg'
// ]

// console.log(...Ings)

// restaurant.orderPasta(...Ings)

// // Obj Copy
// const copyRes = {
//   founder: 'Abdullah Al-Shehri',
//   ...restaurant,
//   foundedIn: 1972
// }

// console.log(copyRes)

//-------------------------------//

// // 1) Destructuring
// // SPREAD, Beacause it's on right side of =
// const arr = [1, 2, 3, 4, 5];
// console.log(...arr);

// // REST, Beacause it's on left side of =
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// // Objects
// const { sat , ...weekdays } = restaurant.openingHours
// console.log(sat,weekdays)

// // 2) Functions
// const add = function (...nums) {
//   let sum = 0;
//   for (let i = 0; i < nums.length; i++) {
//     sum = sum + nums[i];
//   }
//   console.log(sum);
// };

// add(1, 2, 2, 1, 1, 1, 1, 1, 1);
// add(1, 2, 7);
// add(1, 2, 5);

// // orderPizza functions using Rest
// restaurant.orderPizza('Lemon' , 'tomato' , 'orange' , 'spices')

//-------------------------------//

// Short Circuit Evaluation

// // 1) OR (||)
// console.log(3 || 'Abdullah'); // 3 Because the first truthy value
// console.log('Abdullah' || 3); // Abdullah Because the first truthy value
// console.log('' || 'Abdullah' || 3); // Abdullah Because the first truthy value
// console.log('' || 3); // 3 Because the first truthy value
// console.log(undefined || '') // prints the last one because it's already falsy
// console.log('' || undefined ) // prints the last one because it's already falsy
// // Challenge :
// console.log(undefined || '' || 0 || 'Hello' || 23 || null ) // Should Prints (Hello)

// console.log('______AND______')

// // 1) AND (&&)
// console.log(3 && 'Abdullah'); // Abdullah the last one Because there's not falsy value
// console.log('Abdullah' && 3); // 3 the last one Because there's not falsy value
// console.log('' && 'Abdullah' && 3); // '' Because it's first falsy value
// console.log('' && 3); // '' Because it's first falsy value
// console.log(undefined && '') // undefined Because it's first falsy value
// console.log('' && undefined ) // '' Because it's first falsy value
// // Challenge :
// console.log(undefined && '' && 0 && 'Hello' && 23 && null ) // Should Prints (undefined)

//-------------------------------//

// restaurant.numGuests = 0;
// const guests = restaurant.numGuests ?? 10;
// console.log(guests)

//-------------------------------//

// OR Assignment Operator

// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// rest1.numGuests ||= 10 // Shourcut of the upper line
// rest2.numGuests ||= 10 // Shourcut of the upper line

// console.log(rest1)
// console.log(rest2)

//-------------------------------//

// Coding Challenge
/*
 Your tasks:

1. Create one player array for each team 
(variables 'players1' and 'players2')

2. The first player in any player array is the
goalkeeper and the others are field players. 
For Bayern Munich (team 1) create one variable ('gk')
with the goalkeeper's name, 
and one array ('fieldPlayers') with all the remaining
10 field players

3. Create an array 'allPlayers' 
containing all players of both teams (22 players)

4. During the game, Bayern Munich (team 1) used 3
substitute players. So create a new array 
('players1Final') containing all the original 
team1 players plus 'Thiago', 'Coutinho' and 'Perisic'

5. Based on the game.odds object, 
create one variable for each odd
(called 'team1', 'draw' and 'team2')

6. Write a function ('printGoals') that receives an 
arbitrary number of player names 
(not an array) and prints each of them to the console,
along with the number of goals that were
scored in total (number of player names passed in)

7. The team with the lower odd is more likely to win.
Print to the console which team is more likely to win,
without using an if/else statement or the 
ternary operator. 

Test data for 6.: First, use players 'Davies',
'Muller', 'Lewandowski' and 'Kimmich'.
Then, call the function again with players
from game.scored
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  // My Addition
  positions: [
    'GK',
    'LB',
    'CB',
    'CB',
    'RB',
    'CDM',
    'CDM',
    'LM',
    'CAM',
    'RM',
    'ST',
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// // 1.
// const [[...players1], [...players2]] = game.players;
// console.log(players1, players2);

// // 2.
// const [gk1, ...fieldPlayers1] = players1;
// const [gk2, ...fieldPlayers2] = players2;

// console.log(gk1);
// console.log(gk2);
// console.log(fieldPlayers1);
// console.log(fieldPlayers2);

// // 3.
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// // 4.
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// // 5.
// const { team1, x: draw, team2 } = game.odds;

// console.log(team1);
// console.log(draw);
// console.log(team2);

// // 6.
// function printGoals(...playersNames) {
//   console.log(`The Players you entered are : ${playersNames}.`);
//   console.log(`Goals scored : ${playersNames.length}`);
//   console.log(`Players who Scored : ${game.scored}`);
// }
// printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');

// // 7.
// team1 < team2 && console.log('Team 1 is more likley to win!');
// team2 < team1 && console.log('Team 2 is more likley to win!');

//-------------------------------//

// for-of loop (ES6)

// const [[...BayernPlayers], []] = game.players;

// for (const [i, b] of BayernPlayers.entries()) {
//   console.log(`${i + 1} : ${b}`);
// }

//-------------------------------//

// // Enhanced Object Literals (ES6)

// const hours = {
//   thu: {
//     open: 12,
//     close: 22,
//   },
//   fri: {
//     open: 11,
//     close: 23,
//   },
//   sat: {
//     open: 0, // Open 24 hours
//     close: 24,
//   },
// };

// const caffe = {
//   name: 'Abdi Caffe',
//   address: 'Mohammed Al-Kittani',
//   hours, // Old way [ hours: hours, ]
// };

// // console.log(caffe);

//-------------------------------//

// // Optioal Chaining : checking if specific property
// // if it's exist or not by throwing (?) sign

// console.log(caffe?.name); // if name exist return it
// console.log(caffe?.open); // if name exist return it

// // Methods (functions inside objects )

// console.log(restaurant.order?.(0, 1)) ?? 'not exist';

// // Arrays

// const caffeArr = [
//   {
//     name: 'Abdi Caffe',
//     address: 'Mohammed Al-Kittani',
//     hours,
//   },
// ];

// console.log(caffeArr[0]?.name ?? 'user array empty');

//-------------------------------//

// // Looping Objects

// // Looping over property name
// const hoursProperty = Object.keys(hours);
// console.log(hoursProperty);

// let str = `The Caffe opens on : `;
// for (let x of hoursProperty) {
//   str += `${x}, `;
// }

// console.log(str);

// // Looping over property values
// const [{ ...a }] = Object.values(hours);
// console.log(a);

// // Looping over Entire object
// const entries = Object.entries(hours);
// console.log(entries);

// for (const [key, { open, close }] of entries) {
//   console.log(`On ${key} we open at ${open}, and close at ${close}.`);
// }

//-------------------------------//

// // Coding Challenge
// /*
// Let's continue with our football betting app! Keep using the 'game' variable from
// before.
// Your tasks:
// 1. Loop over the game.scored array and print each player name to the console,
// along with the goal number (Example: "Goal 1: Lewandowski")

// 2. Use a loop to calculate the average odd and log it to the console (We already
// studied how to calculate averages, you can go check if you don't remember)

// 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them
// (except for "draw"). Hint: Note how the odds and the game objects have the
// same property names

// 4. Bonus: Create an object called 'scorers' which contains the names of the
// players who scored as properties, and the number of goals as the value. In this
// game, it will look like this:

// {
//  Gnarby: 1,
//  Hummels: 1,
//  Lewandowski: 2
// }

// GOOD LUCK
// */

// // 1.

// console.log('Q1');

// const playerGoals = Object.entries(game.scored);
// for (const [goalNum, player] of playerGoals) {
//   console.log(`Goal ${parseInt(goalNum) + 1} : ${player}.`);
// }

// // 2.

// console.log('Q2');

// let sum = 0;
// const gameOdd = Object.values(game.odds);

// for (const singleOdd of gameOdd) sum = sum + singleOdd;
// console.log(`The average odd : ${sum / gameOdd.length}`);

// // 3.

// console.log('Q3');

// const totalOdd = Object.entries(game.odds);
// const names = Object.entries(game);
// console.log(totalOdd);
// console.log(names);

// for (const [name, odd] of totalOdd) {
//   let strName;

//   name === 'x' ? (strName = 'Draw') : (strName = game[name]);
//   // name === 'team1' ? (strName = game.team1) : '';
//   // name === 'team2' ? (strName = game.team2) : '';

//   console.log(`Odd of victory ${strName} : ${odd}`);
// }

// // 4.

// console.log('Q4');

// // So the solution is to loop over the array, and add the array elements as object properties, and then increase the count as we encounter a new occurence of a certain element
// const scorers = {};

// for (const playerGoals of game.scored) {
//   scorers[playerGoals] ? scorers[playerGoals]++ : (scorers[playerGoals] = 1);
// }

// console.log(scorers);

//-------------------------------//

// // Sets

// const orderSet = new Set(['Pasta', 'Pizza', 'Pizza', 'Risotto', 'Pasta']);
// console.log(orderSet);
// console.log(orderSet.size);

// console.log(new Set('Abdullah')); // 7 unique characters

// console.log(orderSet.has('Pasta'));
// console.log(orderSet.has('Macron'));
// orderSet.add('Bread');
// orderSet.add('Bread');
// console.log(orderSet);

// orderSet.delete('Bread');
// console.log(orderSet);

// for (const order of orderSet) console.log(order);

// const staff = ['waiter', 'cheff', 'manager', 'cheff', 'manager'];
// const staffSet = new Set(staff);
// console.log(staffSet);

//-------------------------------//

// // Maps
// const barca = new Map();
// barca
//   .set('name', 'Barcelona FC')
//   .set('stadium', ['Camp Nou', 'Spotify'])
//   .set('stadiumCapacity', 80000)
//   .set('womanTeam', true)
//   .set('open', 9)
//   .set('close', 15)
//   .set(true, 'We are open :D')
//   .set(false, 'We are closed :(');

// console.log(barca);

// console.log(barca.get('stadium'));

// const hour = 11;
// console.log(barca.get(hour >= barca.get('open') && hour <= barca.get('close')));

// console.log(barca.has('close'));

// barca.delete();
// // barca.delete('stadium');
// console.log(barca);

//-------------------------------//

// // Maps Iteration

// // Convert Objects to Maps
// const gameMap = new Map(Object.entries(game));
// console.log(gameMap);

// // Quiz app
// const q = new Map([
//   ['question', 'What is the best programming language?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'JavaScript'],
//   ['correct', 3],
//   [true, 'Correct!'],
//   [false, 'Try Again...'],
// ]);

// console.log(q.get('question'));
// for (const [key, value] of q) {
//   if (typeof key === 'number') {
//     console.log(`Answer ${key} : ${value}`);
//   }
// }

// const answer = Number(prompt('What is your answer ?'));
// console.log(`Your answer is : ${answer}`);

// console.log(q.get(answer === q.get('correct')));

//-------------------------------//

// /*
// 1. Create an array 'events' of the different game events that happened (no
// duplicates)

// 2. After the game has finished, is was found that the yellow card from minute 64
// was unfair. So remove this event from the game events log.

// 3. Compute and log the following string to the console: "An event happened, on
// average, every 9 minutes" (keep in mind that a game has 90 minutes)

// 4. Loop over 'gameEvents' and log each element to the console, marking
// whether it's in the first half or second half (after 45 min) of the game, like this:
// [FIRST HALF] 17: ⚽ GOAL
// */

// const gameEvents = new Map([
//   [17, '⚽ GOAL'],
//   [36, '� Substitution'],
//   [47, '⚽ GOAL'],
//   [61, '� Substitution'],
//   [64, '� Yellow card'],
//   [69, '� Red card'],
//   [70, '� Substitution'],
//   [72, '� Substitution'],
//   [76, '⚽ GOAL'],
//   [80, '⚽ GOAL'],
//   [92, '� Yellow card'],
// ]);

// // 1)

// console.log('Q1');

// // const mapIterator = gameEvents.values();
// // const events = new Set();

// // for (const event of mapIterator) {
// //   events.add(event);
// // }

// // Jonas way {BETTER}
// const mapIterator = gameEvents.values();
// const events = [...new Set(mapIterator)];

// console.log(events);

// // 2)

// console.log('Q2');

// for (const [num] of gameEvents) {
//   if (num != 64) {
//     console.log(gameEvents.get(num));
//   }
// }

// // 3)

// console.log('Q3');

// console.log(
//   `An event happened, on average, every ${90 / gameEvents.size} minutes`
// );

// // 4)

// console.log('Q4');

// for (const [key, value] of gameEvents) {
//   if (key <= 45) {
//     console.log(`[FIRST HALF] ${key} : ${value}`);
//   } else {
//     console.log(`[SECOND HALF] ${key} : ${value}`);
//   }
// }

//-------------------------------//

// const airline = 'Saudia Airline Company';
// const plane = 'A320A';

// console.log(plane[0]);
// console.log(plane[1]);
// console.log(plane[2]);
// console.log(plane[3]);

// console.log(plane.indexOf('A'));
// console.log(plane.lastIndexOf('A'));
// console.log(plane.length);

// console.log(airline.slice(7, 14));

// console.log(airline.slice(0, airline.indexOf(' ')));
// console.log(airline.slice(7, airline.lastIndexOf(' ')));
// console.log(airline.slice(15, airline.lastIndexOf('y') + 1));

// console.log(airline.slice(7, 14));
// console.log(airline.slice(-2));
// console.log(airline.slice(0, -2));

// const checkMiddleSeat = function (seat) {
//   // B and E means middle seats
//   const s = seat.slice(-1);
//   const str =
//     s === 'B' || s === 'E' ? 'Your Lucky 😊👋' : 'Your in the middle 😶';
//   console.log(str);
// };

// checkMiddleSeat('429B');
// checkMiddleSeat('429L');
// checkMiddleSeat('429C');
// checkMiddleSeat('429E');

//-------------------------------//

// const airline = 'Saudia Airline Company';
// const plane = 'A320A';

// console.log(airline.toLowerCase());
// console.log(airline.toUpperCase());

// // fix capitalization in name
// const passenger = 'aBDULLah';

// console.log(passenger);

// const passengerLower = passenger.toLowerCase();
// const passengerCorrect =
//   passengerLower[0].toUpperCase() + passengerLower.slice(1);
// console.log(passengerCorrect);

// const passengerNameCorrection = function (str) {
//   const before = str;
//   const LowerAll = str.toLowerCase();
//   const correct = LowerAll[0].toUpperCase() + LowerAll.slice(1);
//   console.log(`Before : ${before}, After : ${correct}`);
// };

// passengerNameCorrection('saMi');
// passengerNameCorrection('NYAAR');
// passengerNameCorrection('TALAl');

// // Comparing mails
// const correctEmail = 'hello@abdullah.io';
// const email = '     HElLO@ABdUllah.IO  \n';

// const emailCorrection = function (correctEmail, email) {
//   const normalizedEmail = email.toLowerCase().trim();

//   const trueString = `The comparing is [TRUE] and your data is below :\nEnterd email : ${email}\nEnterd Email (After Correction) = ${normalizedEmail}\nEnterd Correct Email = ${correctEmail}`;
//   const flaseString = `The comparing is [FALSE] and your data is below :\nEnterd email : ${email}\nEnterd Email (After Correction) = ${normalizedEmail}\nEnterd Correct Email = ${correctEmail}`;

//   console.log(normalizedEmail === correctEmail ? trueString : flaseString);
// };

// emailCorrection(email, correctEmail);
// emailCorrection(correctEmail, email);

// // replacing

// const announcement = 'Please Leave the Plane, Leave the Plane NOW!!';

// console.log(announcement.replace('Plane', 'Seats'));

// console.log(announcement.replace(/Plane/g, 'Seats'));

// // Booleans

// const newPlane = 'A320neo';
// console.log(newPlane.includes('A320'));
// console.log(newPlane.includes('Boeing'));

// console.log(newPlane.startsWith('A3'));
// console.log(newPlane.startsWith('Boeing'));

// console.log(newPlane.endsWith('neo'));
// console.log(newPlane.endsWith('Boeing'));

// // Practice

// const checkBaggage = function (items) {
//   const baggage = items.toLowerCase();

//   const Allowed = 'Your Allowed to enter the board✅.';
//   const unAllowed = 'Your NOT Allowed to enter the board❌.';
//   console.log(
//     baggage.includes('knife') || baggage.includes('gun') ? unAllowed : Allowed
//   );
// };

// checkBaggage('laptop and food and gun');
// checkBaggage('clothes and perfume');
// checkBaggage('knife');

//-------------------------------//

// // split and join
// console.log('allah-akbar-allah-akbar'.split('-'));
// console.log('Abdullah Al-Shehri'.split(' '));

// const newName = ['Mr.', 'Abdullah', 'Bander', 'Al-Shehri'].join(' ');
// console.log(newName);

// const capitalizedName = function (string) {
//   const lowerAll = string.toLowerCase().split(' ');
//   const newArray = [];
//   for (const name of lowerAll) {
//     // newArray.push(name[0].toUpperCase() + name.slice('1'));  // There is 2 Ways ...
//     newArray.push(name.replace(name[0], name[0].toUpperCase()));
//   }
//   console.log(newArray.join(' '));
// };

// capitalizedName('my name is ahmad and im man');

// // Padding String

// const message = 'Go to gate 23!';

// console.log(message.padStart(25, '-').padEnd(30, '-'));
// console.log(message.padStart(30, '-').padEnd(25, '-'));

// const maskCreditCard = function (number) {
//   const strArray = number.toString();
//   const masked = strArray.slice(-4);

//   console.log(`Your Credit Card Number is : ${masked.padStart(16, 'X')}`);
// };

// maskCreditCard(1234567890123456);

// // Repeat

// const announce = 'Gate NJ4 is Closed! \n';
// console.log(announce.repeat(5));

// const playerGoals = function (playerName, num) {
//   console.log(`${playerName} has scored ${num} Goal/s ${'⚽'.repeat(num)}.`);
// };

// playerGoals('Lewandowski', 4);

//-------------------------------//

// /*
// Write a program that receives a list of variable names written in underscore_case
// and convert them to camelCase.
// The input will come from a textarea inserted into the DOM (see code below to
// insert the elements), and conversion will happen when the button is pressed.

// Test data (pasted to textarea, including spaces):
// underscore_case
// first_name
// Some_Variable
//  calculate_AGE
// delayed_departure

// Should produce this output (5 separate console.log outputs):
// underscoreCase ✅
// firstName ✅✅
// someVariable ✅✅✅
// calculateAge ✅✅✅✅
// delayedDeparture ✅✅✅✅✅

// Hints:
// § Remember which character defines a new line in the textarea �
// § The solution only needs to work for a variable made out of 2 words, like a_b
// § Start without worrying about the ✅. Tackle that only after you have the variable
// name conversion working �
// § This challenge is difficult on purpose, so start watching the solution in case
// you're stuck. Then pause and continue!
// Afterwards, test with your own test data!
// */

// document.body.append(document.createElement('textarea'));
// document.body.append(document.createElement('button'));

// document.querySelector('button').addEventListener('click', function () {
//   const text = document.querySelector('textarea').value;
//   console.log(`Before :\n ${text}`);
//   console.log(`After :\n`);
//   capitalization(text);
// });

// const testdata =
//   'underscore_case\nfirst_name\nSome_Variable\ncalculate_AGE\ndelayed_departure';

// function capitalization(str) {
//   const LowerAll = str.toLowerCase().split('\n');
//   const array = [];

//   for (const name of LowerAll) {
//     const splitted = name.replaceAll(' ', '').split('_');
//     const [a, b] = splitted;
//     const upper = b.replace(b[0], b[0].toUpperCase());

//     splitted.upper;

//     array.push(`${a}${upper}`);

//     console.log(`${a}${upper} ${'✅'.repeat(array.length)} `);
//   }
// }

//-------------------------------//

// // String Methods Practice

// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// // 🔴 Delayed Departure from FAO to TXL (11h25)
// //              Arrival from BRU to FAO (11h45)
// //   🔴 Delayed Arrival from HEL to FAO (12h05)
// //            Departure from FAO to LIS (12h30)

// for (const flight of flights.split('+')) {
//   const [type, from, to, time] = flight.split(';');
//   const output = `${type.slice(1).startsWith('Delayed') ? '🔴 ' : ''}${type
//     .replaceAll('_', ' ')
//     .slice(1)} from ${from.replace(
//     from,
//     from.slice(0, 3).toUpperCase()
//   )} to ${to.replace(to, to.slice(0, 3).toUpperCase())}(${time.replace(
//     ':',
//     'h'
//   )}).`.padStart(50);
//   console.log(output);
// }

//-------------------------------//
