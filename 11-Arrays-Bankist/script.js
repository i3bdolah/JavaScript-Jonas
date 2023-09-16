'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

// const account5 = {
//   owner: 'Abdullah Ban',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 5555,
// };

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const row = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', row);
  });
};

const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsername(accounts);
// console.log(accounts);

const calcDispalyBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const sumIn = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${sumIn}€`;

  const sumOut = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(sumOut)}€`;

  const sumInterest = acc.movements
    .filter(mov => mov > 1)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(mov => mov >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${sumInterest}€`;
};

const updateUI = function (acc) {
  // Display Movements
  displayMovements(acc.movements);
  // Display Balance
  calcDispalyBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// LOGIN
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  // Check username
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  // Check PIN
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and Welcome Message
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // Clear the inputs fields
    inputLoginUsername.value = inputLoginPin.value = '';
    // Remove the focus from the Pin filed
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Clear the inputs fields && Remove focus
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferTo.blur();
    inputTransferAmount.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  const confirmUser = inputCloseUsername.value;
  const confirmPin = Number(inputClosePin.value);

  if (
    confirmUser === currentAccount.username &&
    confirmPin === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }

  // Clear the inputs fields && Remove focus
  inputCloseUsername.value = inputClosePin.value = '';
  inputCloseUsername.blur();
  inputClosePin.blur();
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);

    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

let sortState = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sortState);
  sortState = !sortState;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['أ', 'ب', 'ت', 'ث', 'ج'];

// // Slice (Dosen't mutates original array)
// console.log(arr);
// console.log(arr.slice(2));
// console.log(arr.slice(2, 3));
// console.log(arr.slice(-2));
// console.log(arr.slice(1, -2));
// console.log(arr.slice()); // Shallow Copy
// console.log('__');

// // Splice (Mutates original array)
// // arr.splice(0, 3);
// // console.log(arr);

// // Reverse (Mutates original array)
// let arr2 = ['ر', 'ذ', 'د', 'خ', 'ح'];
// console.log(arr2.reverse());

// // Concat (Dosen't mutates original array)
// const letters = arr.concat(arr2);
// console.log(letters);

// // Join (Dosen't mutates original array)
// console.log(letters.join(' - '));

/////////////////////////////////////////////////

// // at Method

// const arr = [1, 2, 3];
// console.log(arr[0]);
// console.log(arr.at(0));

// // Problem of getting the last element of an array...
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1)); // The easiest!

// // Also work with strings 👍
// console.log('Abdullah'.at(0));

/////////////////////////////////////////////////

// Looping Array :ForEach

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// movements.forEach(function (move, i) {
//   if (move > 0) {
//     console.log(`${i + 1}: + You deposited ${move}.`);
//   } else {
//     console.log(`${i + 1}: - You withdrew ${Math.abs(move)}.`);
//   }
// });
// // How it's work? it's called the callback function each time with deferent element
// // 0: function(200)
// // 1: function(450)
// // 2: function(-400)
// // ......

/////////////////////////////////////////////////

// // Looping Maps and Sets :ForEach

// // Maps
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key) {
//   console.log(`${key} : ${value}.`);
// });

// // Sets
// const currenciesUnique = new Set([
//   'USD',
//   'EUR',
//   'USD',
//   'GBP',
//   'SAR',
//   'SAR',
//   'SAR',
// ]);
// console.log(currenciesUnique);

// currenciesUnique.forEach(function (value) {
//   // If we add 'key' parameter will be same as value. because sets haven't keys of indexes.
//   console.log(value);
// });

/////////////////////////////////////////////////

// // Challenge 1

// /*

// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
// about their dog's age, and stored the data into an array (one array for each).
// For now, they are just interested in knowing whether a dog is an adult or a puppy.
// A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

// Your tasks:
// Create a function 'checkDogs', which accepts 2 arrays of dog's ages
// ('dogsJulia' and 'dogsKate'), and does the following things:

// 1. Julia found out that the owners of the first and the last two dogs actually have
// cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
// ages from that copied array (because it's a bad practice to mutate function
// parameters)

// 2. Create an array with both Julia's (corrected) and Kate's data

// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
// is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy")

// 4. Run the function for both test datasets

// Test data:
// § Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
// Hints: Use tools from all lectures in this section so far �

// */
// const juliaData1 = [3, 5, 2, 12, 7];
// const juliaData2 = [9, 16, 6, 8, 3];
// const kateData1 = [4, 1, 15, 8, 3];
// const kateData2 = [10, 5, 6, 1, 4];

// const checkDogs = function (dogsJulia, dogsKate) {
//   const correctedJulia = dogsJulia.splice(1, 2);
//   const compinedArray = [...correctedJulia, ...dogsKate];

//   compinedArray.forEach(function (dogAge, i) {
//     if (dogAge > 2) {
//       console.log(
//         `Dog number ${i + 1} : is an adult, and is ${dogAge} years old`
//       );
//     } else {
//       console.log(`Dog number ${i + 1} : is still a puppy`);
//     }
//   });
// };

// checkDogs(juliaData1, kateData1);

/////////////////////////////////////////////////

// // MAP METHOD

// const eurToUsd = 1.1;

// // Callback Function
// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

// // Arrow Function
// const movementsUSDArrow = movements.map(mov => mov * eurToUsd);

// console.log(movementsUSDArrow);

/////////////////////////////////////////////////

// // FILTER METHOD

// const deposits = movements.filter(mov => mov > 0);

// console.log(deposits);

// // Using ForOfLoop

// const depositFor = [];
// for (const mov of movements) mov > 0 ? depositFor.push(mov) : ''; // We have to push unfortunately
// console.log(depositFor);

// // Challenge to apply filter to withdraw movements

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

/////////////////////////////////////////////////

// // REDUCE METHOD

// console.log(movements);

// const balance = movements.reduce(function (acc, value, i, arr) {
//   console.log(`Iteration No. ${i + 1} : ${acc}`);
//   return acc + value;
// }, 0);

// console.log(`Last Iteration : ${balance}`);

// // Get the Maximum value using REDUCE
// const max = movements.reduce(function (acc, mov) {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);

// console.log(max);

/////////////////////////////////////////////////

// /*
// Coding Challenge #2

// Let's go back to Julia and Kate's study about dogs. This time, they want to convert
// dog ages to human ages and calculate the average age of the dogs in their study.
// Your tasks:

// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
// ages ('ages'), and does the following things in order:

// 1. Calculate the dog age in human years using the following formula:
//   if the dog is <= 2 years old, humanAge = 2 * dogAge.
//   If the dog is > 2 years old, humanAge = 16 + dogAge * 4

// 2. Exclude all dogs that are less than 18 human years old (which is the same as
// keeping dogs that are at least 18 years old)

// 3. Calculate the average human age of all adult dogs (you should already know
// from other challenges how we calculate averages)

// 4. Run the function for both test datasets

// Test data:
// § Data 1: [5, 2, 4, 1, 15, 8, 3]
// § Data 2: [16, 6, 10, 5, 6, 1, 4]
// GOOD LUCK
// */

// const testData1 = [5, 2, 4, 1, 15, 8, 3];
// const testData2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(function (age) {
//     if (age <= 2) return 2 * age;
//     else return 16 + age * 4;
//   });
//   console.log(`To Human Ages : ${humanAges}`);

//   const excludedAges = humanAges.filter(age => age > 17);
//   console.log(`excluded Ages : ${excludedAges}`);

//   const averageAges = excludedAges.reduce(function (acc, curr) {
//     return acc + curr;
//   }, 0);
//   console.log(`Averages Ages : ${averageAges / excludedAges.length}`);
// };

// calcAverageHumanAge(testData1);
// console.log('__________');
// calcAverageHumanAge(testData2);

/////////////////////////////////////////////////

// // Chaining Methods

// const eurToSar = 4.01;

// const totalDepositeSAR = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToSar)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositeSAR);

/////////////////////////////////////////////////

// // Coding Challenge #2

// /*
// rewrite challenge 1 using arrow functions and method chaining
// Test data:
// § Data 1: [5, 2, 4, 1, 15, 8, 3]
// § Data 2: [16, 6, 10, 5, 6, 1, 4]
// GOOD LUCK
// */

// const calcAverageHumanAge = ages =>
//   ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age > 17)
//     .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// console.log(avg1, avg2);

/////////////////////////////////////////////////

// // FIND METHOD
// const account = accounts.find(acc => acc.username === 'js'); // Returens the ONLY first occurance
// console.log(account);

// const accountArr = [];
// for (const acc of accounts) {
//   acc.username === 'js' || acc.username === 'jd' ? accountArr.push(acc) : '';
// }
// console.log(accountArr);

/////////////////////////////////////////////////

// // SOME and EVERY

// console.log(movements);
// console.log(movements.includes(-130));

// // How get all deposits ? 'Positive Number'
// // SOME : if [ONE] satisfy the condition will return TRUE
// const anyDeposits = movements.some(mov => mov > 0);
// console.log(anyDeposits);

// // EVERY : if [ALL] satisfies the condition will return TRUE
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

/////////////////////////////////////////////////

// // flat and flatMap Methods

// // flat()
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8, [9]];
// console.log(arr);
// console.log(arr.flat());

// const arrDeep = [[1, [2, 3, 4]], [5, [6]], 7, 8, [9]];
// console.log(arrDeep);
// console.log(arrDeep.flat(2));

// // Calculating the balance of all accounts
// const allBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log('flat : ' + allBalance);

// // FlatMap()
// const allBalance2 = accounts
//   .flatMap(acc => acc.movements) // Compines flat & map , and the default level for flat is 1, we cannot change it.
//   .reduce((acc, mov) => acc + mov, 0);
// console.log('flatMap : ' + allBalance2);

/////////////////////////////////////////////////

// // Sorting
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort()); // Just Sort as an string, Try numbers to make sure.

// console.log(movements);
// console.log('____SORTING METHOD____');
// // Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1; // 1 means : shift it
//   if (a < b) return -1; // -1 means : keep it
// });
// console.log(movements);

// // Descending
// movements.sort((a, b) => {
//   // [mutates the array]
//   if (a > b) return -1; // -1 means : keep it
//   if (a < b) return 1; // 1 means : shift it
// });
// console.log(movements);

// // Ascending : shorter arow function.
// movements.sort((a, b) => a - b);
// console.log(movements);

// // Descending : shorter arow function.
// movements.sort((a, b) => b - a);
// console.log(movements);

/////////////////////////////////////////////////

// /*
// MY VAT APP 'حاسبة الاقرار الضريبي'
// */

// const incomeFatorah = [
//   12000, 12000, 29064, 25008, 6000, 12000, 12000, 15052, 7512, 5500, 11000,
//   38000, 58376,
// ];
// const outcomeFatorah = [
//   1043.48, 173.91, 366, 113.05, 565.25, 8.7, 565.22, 373.91,
// ];

// const sumIncomeFatorah = incomeFatorah.reduce(
//   (acc, fatorah) => acc + fatorah,
//   0
// );
// console.log(`The sum of INCOME Fatorahs is : ${sumIncomeFatorah}`);
// console.log(
//   `The sum of INCOME Fatorahs is includes VAT : ${sumIncomeFatorah * 0.15}`
// );

// const sumOutcomeFatorah = outcomeFatorah.reduce(
//   (acc, fatorah) => acc + fatorah,
//   0
// );
// console.log(`The sum of OUTCOME Fatorahs is : ${sumOutcomeFatorah}`);
// console.log(
//   `The sum of OUTCOME Fatorahs is includes VAT : ${sumOutcomeFatorah * 0.15}`
// );

/////////////////////////////////////////////////

// // Generating and filling Arrays.

// const arr = new Array(7);
// // console.log(arr);

// // arr.fill(1);

// // We can fill even the filled one (Will mutate it)
// // arr.fill(1, 3, 4);
// // console.log(arr);

// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// const z = Array.from({ length: 7 }, (cur, i) => i + 1);
// console.log(z);

// // JONAS => Throw away Challenge...
// const randomDice = Array.from({ length: 100 }, () =>
//   Math.trunc(Math.random() * 6 + 1)
// );
// console.log(randomDice);

// // Real-life Example

// labelBalance.addEventListener('click', function (e) {
//   e.preventDefault();

//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value')
//   );

//   console.log(movementsUI.map(el => Number(el.textContent.replace('€', ''))));
// });

/////////////////////////////////////////////////

// Summary: Which Array Method to Use?

// Picture is already saved in [-] folder

/////////////////////////////////////////////////

// // Array Method Practice ✅

// // 1. Calculate all deposits
// const allDeposits = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .filter(acc => acc > 0)
//   .reduce((acc, num) => acc + num, 0);
// console.log(allDeposits);

// const allWithrawal = accounts
//   .flatMap(acc => acc.movements) // flatMap is compination of flat() and map()
//   .filter(num => num < 0)
//   .reduce((acc, num) => acc + num, 0);
// console.log(allWithrawal);

// // 2. Calculate deposits if greater than or equals 1000
// // const atLeast1000Dollars = accounts
// //   .flatMap(acc => acc.movements)
// //   .filter(num => num >= 1000);
// // console.log(atLeast1000Dollars.length);

// // using reduce ...
// const atLeast1000Dollars = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
// console.log(atLeast1000Dollars);

// // 3. Calculate sum of deposits and withdrawals in an object
// const sums = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, cur) => {
//       cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
//       return sums;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );
// console.log(sums);

// // 4. Convert string to tilte case

// const convertTilteCase = function (str) {
//   const exceptions = ['a', 'in', 'but', 'and'];

//   const extract = str
//     .toLowerCase()
//     .split(' ')
//     .map(el =>
//       exceptions.includes(el) ? el : el.replace(el[0], el[0].toUpperCase())
//     )
//     .join(' ');
//   console.log(extract);
// };
// convertTilteCase('Hi im a daVid, but I have another name');

/////////////////////////////////////////////////

// Coding Challenge #4

/*
Julia and Kate are still studying dogs, and this time they are studying if dogs are
eating too much or too little.
Eating too much means the dog's current food portion is larger than the
recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10%
above and 10% below the recommended portion (see hint).

Your tasks:
1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
the recommended food portion and add it to the object as a new property. Do
not create a new array, simply loop over the array. Forumla:
recommendedFood = weight ** 0.75 * 28. (The result is in grams of
food, and the weight needs to be in kg)

2. Find Sarah's dog and log to the console whether it's eating too much or too
little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
the owners array, and so this one is a bit tricky (on purpose) �

3. Create an array containing all owners of dogs who eat too much
('ownersEatTooMuch') and an array with all owners of dogs who eat too little
('ownersEatTooLittle').

4. Log a string to the console for each array created in 3., like this: "Matilda and
Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
too little!"

5. Log to the console whether there is any dog eating exactly the amount of food
that is recommended (just true or false)

6. Log to the console whether there is any dog eating an okay amount of food
(just true or false)

7. Create an array containing the dogs that are eating an okay amount of food (try
to reuse the condition used in 6.)

8. Create a shallow copy of the 'dogs' array and sort it by recommended food
portion in an ascending order (keep in mind that the portions are inside the
array's objects �)

§ Use many different tools to solve these challenges, you can use the summary
lecture to choose between them �
§ Being within a range 10% above and below the recommended portion means:
current > (recommended * 0.90) && current < (recommended *
1.10). Basically, the current portion should be between 90% and 110% of the
recommended portion.
*/

// Test data:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.map(obj => (obj.recommendedFood = Math.trunc(obj.weight ** 0.75 * 28)));
console.log(dogs);

// 2.
dogs.map(obj =>
  obj.owners.includes('Sarah')
    ? console.log(
        obj.curFood > obj.recommendedFood * 0.9
          ? 'Sarah Dog, Eating Too Much'
          : 'Sarah Dog, Eating Too Little'
      )
    : obj
);

// 3.
const ownersEatTooMuch = dogs
  .filter(obj => obj.curFood > obj.recommendedFood)
  .flatMap(obj => obj.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(obj => obj.curFood < obj.recommendedFood)
  .flatMap(obj => obj.owners);
console.log(ownersEatTooLittle);

// 4.
console.log(`${ownersEatTooMuch.join(' and ')}'s eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s eat too little!`);

// 5.
const exactlyAmountOfFood = dogs.some(
  obj => obj.curFood === obj.recommendedFood
);
console.log(exactlyAmountOfFood);

// 6.
const okayAmountOfFood = dogs.some(
  obj =>
    obj.curFood > obj.recommendedFood * 0.9 &&
    obj.curFood < obj.recommendedFood * 1.1
);
console.log(okayAmountOfFood);

// 7.
const arrOkayAmountOfFood = [];
dogs.map(obj =>
  obj.curFood > obj.recommendedFood * 0.9 &&
  obj.curFood < obj.recommendedFood * 1.1
    ? arrOkayAmountOfFood.push(obj)
    : obj
);

console.log(arrOkayAmountOfFood);

// 8.
const copyDogs = dogs.slice();

copyDogs.sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(copyDogs);
