'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2023-01-13T17:01:17.194Z',
    '2023-01-14T23:36:17.929Z',
    '2023-01-15T14:11:59.604Z',
    '2023-01-15T10:51:36.790Z',
    '2023-01-16T10:17:24.185Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Abdullah Ban',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementsDates = function (date, locale) {
  const calcDaysPassed = (dateOne, dateTwo) =>
    Math.round(Math.abs(dateTwo - dateOne) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  return new Intl.DateTimeFormat(locale).format(date);
  // const day = `${date.getDay()}`.padStart(2, '0');
  // const month = `${date.getMonth() + 1}`.padStart(2, '0');
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementsDates(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const row = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
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
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const sumIn = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(Math.abs(sumIn), acc.locale, acc.currency);

  const sumOut = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(
    Math.abs(sumOut),
    acc.locale,
    acc.currency
  );

  const sumInterest = acc.movements
    .filter(mov => mov > 1)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(mov => mov >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = formatCur(
    Math.abs(sumInterest),
    acc.locale,
    acc.currency
  );
};

const updateUI = function (acc) {
  // Display Movements
  displayMovements(acc);
  // Display Balance
  calcDispalyBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  let timeMin = 5;
  let timeSec = 0;

  const timerInterval = setInterval(() => {
    if (timeSec === 0) {
      timeSec = 59;
      timeMin--;
    } else timeSec--;

    if (timeMin === 0 && timeSec === 0) {
      containerApp.style.opacity = 0;
      clearInterval(timerInterval);
    }

    if (timeMin === 0 && timeSec === 0) {
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in to get started';
      clearInterval(timerInterval);
    }

    labelTimer.textContent = `${timeMin.toString().padStart(2, '0')}:${timeSec
      .toString()
      .padStart(2, '0')}`;
    // console.log(output);
  }, 1000);

  return timerInterval;
};
// LOGIN
let currentAccount, timerInterval;

// FAKE LOGIN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  // Check username
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  // Check PIN
  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and Welcome Message
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // Internationalization
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    // Here we define the format based on the locale
    // const locale = navigator.language;

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const now = new Date();
    // const year = now.getFullYear();
    // const month = `${now.getMonth() + 1}`.padStart(2, '0');
    // const day = `${now.getDay()}`.padStart(2, '0');
    // const hour = `${now.getHours()}`.padStart(2, '0');
    // const min = `${now.getMinutes()}`.padStart(2, '0');
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear the inputs fields
    inputLoginUsername.value = inputLoginPin.value = '';
    // Remove the focus from the Pin filed
    inputLoginPin.blur();

    // Check if already there's a timer or not
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = startLogOutTimer();
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputTransferAmount.value;
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
    // Add movements Dates
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Clear the inputs fields && Remove focus
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferTo.blur();
    inputTransferAmount.blur();

    // Update UI
    updateUI(currentAccount);

    // Reset the timer
    clearInterval(timerInterval);
    timerInterval = startLogOutTimer();
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  const confirmUser = inputCloseUsername.value;
  const confirmPin = +inputClosePin.value;

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

  const amount = +inputLoanAmount.value;

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(Math.round(amount));
    // Add movements Dates
    currentAccount.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
  inputLoanAmount.blur();

  // Reset the timer
  clearInterval(timerInterval);
  timerInterval = startLogOutTimer();
});

let sortState = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sortState);
  sortState = !sortState;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// // Converting and Checking Numbers

// // Numbers in JS is not PERFECT, we can't do financial or scintefic calculations
// console.log(0.1 + 0.2); // expected : 0.3 , output : 0.30000000000000004
// // Why ? because it's hard to represents these numbers in binary (01001)

// // toNumber()
// console.log(Number('23'));
// console.log(+'23'); // Easier way, because it will convert it to number to apply the summation.

// // Parsing
// console.log(Number.parseInt('30$')); // Must to start with number. output : 30
// console.log(Number.parseInt('e23')); // output : NaN
// console.log(Number.parseInt('100px', 10)); // the second argument for the base number, ethier 2 or 10

// console.log(Number.parseInt('   2.5r  em'));
// console.log(Number.parseFloat('2.5rem'));

// // Checking isNaN() , isFinite() , isInteger()
// console.log(Number.isNaN(20));
// console.log(Number.isNaN('20'));
// console.log(Number.isNaN(+'20X'));

// console.log(Number.isFinite(20));
// console.log(Number.isFinite(20 / 0));

// console.log(Number.isInteger(20));
// console.log(Number.isInteger(20.0));

/////////////////////////////////////////////////

// // Math and Rounding

// console.log(Math.sqrt(25)); // الجذر التربيعي
// console.log(5 ** 2); // تربيع

// console.log(Math.max(11, 10, -1, 5, 8, 9));
// console.log(Math.max('11', 10, -1, 5, 8, 9));

// console.log(Math.min(11, 10, -1, 5, 8, 9));

// console.log(Math.PI); // الباي اللي في الرياضيات

// console.log(Math.trunc(Math.random() * 6 + 1));

// const randomInt = (min, max) =>
//   Math.trunc(Math.random() * (max - min) + 1) + min;

// console.log(randomInt(10, 20));

// // Rounding Integers

// console.log(Math.trunc(23.88));

// console.log(Math.round(23.01)); // Rounded NEAREST

// console.log(Math.ceil(23.01)); // Rounded UP
// console.log(Math.ceil(23.99)); // Rounded UP

// console.log(Math.floor(23.01)); // Rounded DOWN
// console.log(Math.floor(23.99)); // Rounded DOWN

// // Rounding Decimals
// console.log(+(10.2).toFixed(0)); // We puts [+] because it's returns a STRING
// console.log(+(10.21).toFixed(0));
// console.log(+(10.213).toFixed(0));

// console.log(+(10.2).toFixed(1));
// console.log(+(10.21).toFixed(1));
// console.log(+(10.213).toFixed(1));

// console.log(+(10.2).toFixed(2));
// console.log(+(10.21).toFixed(2));
// console.log(+(10.213).toFixed(2));

// console.log(+(10.2).toFixed(3));
// console.log(+(10.21).toFixed(3));
// console.log(+(10.213).toFixed(3));

// console.log(+(10.2).toFixed(4));
// console.log(+(10.21).toFixed(4));
// console.log(+(10.213).toFixed(4));

/////////////////////////////////////////////////

// // Remainder Operator

// console.log(5 % 2); // = 1
// console.log(5 / 2); // 5 = 2 * 2 + 1

// console.log(10 % 2); // 0
// console.log(10 / 2); // 5 + 5

// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (
//     value,
//     i
//   ) {
//     if (i % 2 === 0) value.style.backgroundColor = 'red';
//     else value.style.backgroundColor = 'yellow';
//   });
// });

/////////////////////////////////////////////////

// // Numeric separators

// // 100,000,000,000 ! how we can represent it in JS?
// const largeNum = 100_000_000_000;
// console.log(largeNum); // 100000000000

// // We cannot but [_] on end or start, and before or after [.]

// // in conversion ?
// console.log(Number('100_000_000_000')); // Nan
// console.log(Number.parseInt('100_000_000_000')); // 100, will ignore the [_] and what after it

/////////////////////////////////////////////////

// // Working with BigInt

// // any INTEGER have represented with 53bit of 64bit.
// console.log(2 ** 53 - 1);
// console.log(Number.MAX_SAFE_INTEGER);

// // If we did calculation above this number we will lose accuracy.

// console.log(Number.MAX_SAFE_INTEGER + 1);
// console.log(Number.MAX_SAFE_INTEGER + 2);
// console.log(Number.MAX_SAFE_INTEGER + 3);
// console.log(Number.MAX_SAFE_INTEGER + 4);

// console.log(367948628934619836197632790610296190n); // BigInt
// console.log(BigInt(367948628934619836197632790610296190));

// // Operation
// console.log(10000n + 10000n);
// // console.log(10000n + 10000); // Error : [THEY HAVE TO BE BIGINT]

// console.log(100n > 10);
// console.log(10n === 10);
// console.log(typeof 1000000n);

// console.log(20n === '20'); // Type coercion

// // All [Math()] function dosen't work.

/////////////////////////////////////////////////

// // Creating Dates

// // Year , month , day , hour , min , sec
// const trying = new Date(2000, 11, 27, 9, 30, 22);
// console.log(trying);

// console.log(new Date('Dec 27 2000 18:05:04'));

// console.log(new Date(0));

// // Working with dates
// const future = new Date(2030, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.getMilliseconds());
// console.log(future.getTimezoneOffset());
// console.log(future.toISOString());
// console.log(future.getTime()); // Timestamp

// console.log(future.setFullYear(2050));
// console.log(future);

// const now = new Date();
// console.log(now.getMonth() + 1);

/////////////////////////////////////////////////

// const future = new Date(2030, 10, 19, 15, 23);
// console.log(+future);

// const calcDaysPassed = (dateOne, dateTwo) =>
//   Math.abs(dateTwo - dateOne) / (1000 * 60 * 60 * 24);

// console.log(calcDaysPassed(new Date(2000, 9, 17), new Date(2000, 9, 27))); // 10 days

/////////////////////////////////////////////////

// const num = 2990332.1;
// const options = {
//   style: 'currency',
//   currency: 'SAR',
//   // useGrouping: false,
// };

// console.log(new Intl.NumberFormat('en-US', options).format(num));
// console.log(new Intl.NumberFormat('de-DE', options).format(num));
// console.log(new Intl.NumberFormat('ar-SA', options).format(num));
// console.log(new Intl.NumberFormat(navigator.language, options).format(num));

/////////////////////////////////////////////////

// const pivotIndex = function (nums) {
// Sol 1 :
// for (let i = 1; i < nums.length; i++) {
//   sumL = sumL + nums[i];
//   for (let j = i + 1; j < nums.length; j++) {
//     sumR = sumR + nums[j];
//   }
//   if (sumL === sumR) return i, console.log(i);
// }
// return console.log(-1);

//  Sol 2:
//   let sumL = 0;
//   let sumR = 0;

//   for (let i = 0; i < nums.length; i++) {
//     sumL = sumL + nums[i];
//     for (let j = nums.length - 1; j > 0; j--) {
//       sumR = sumR + nums[i];
//     }
//     if (sumL === sumR) return console.log(i);
//   }
//   if (sumL === !sumR) return console.log(-1);

//   for (let i = nums.length - 1; i >= 0; i--) {
//     const element = nums[i];
//     console.log(element);
//   }
// };

// pivotIndex([1, 2, 3, 0, 3]);

// const calcDatetoSeconds = function (birthdate) {
//   return console.log(
//     `You body have elapsed ${(2023 - birthdate) * 365 * 24 * 60 * 60} sec.`
//   );
// };
// calcDatetoSeconds(2000);

/////////////////////////////////////////////////

// // setTimeout()
// setTimeout(() => console.log('This will print secondly'), 3000);
// console.log('This will print firstly');

// // setTimeout() parameters
// const names = ['Bander', 'Abdullah', 'Mazen', 'Mohammed'];

// const namesTimer = setTimeout(
//   names => console.log(`The names included are : ${names.join(', ')}.`),
//   5000,
//   names
// );

// // clearTimeout() === STOP TIMEOUT
// if (names.includes('Malak') === true) clearTimeout(namesTimer);

// // setInterval() === Recall timer

// setInterval(() => {
//   const now = new Date();
//   console.log(now);
// }, 1000);

/////////////////////////////////////////////////

// // Create a clock Challenge
// const timeNow = new Date();
// let sec = timeNow.getSeconds();
// let min = timeNow.getMinutes();
// let hour = timeNow.getHours();

// const clock = setInterval(() => {
//   calcSeconds();
//   console.log(`${hour}:${min}:${sec}`);
// }, 1000);

// function calcSeconds() {
//   sec = sec + 1;
//   if (sec === 60) {
//     min = min + 1;
//     sec = 0;
//   }
//   if (min === 60) {
//     hour = hour + 1;
//     min = 0;
//   }
//   if (hour === 13) {
//     hour = 1;
//   }

//   // if (hour === 1) clearInterval(clock);

//   return sec, min, hour;
// }

/////////////////////////////////////////////////
