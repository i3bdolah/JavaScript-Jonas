"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2023-01-13T17:01:17.194Z",
    "2023-01-14T23:36:17.929Z",
    "2023-01-15T14:11:59.604Z",
    "2023-01-15T10:51:36.790Z",
    "2023-01-16T10:17:24.185Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Abdullah Ban",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
// Functions

const formatMovementsDates = function (date, locale) {
  const calcDaysPassed = (dateOne, dateTwo) =>
    Math.round(Math.abs(dateTwo - dateOne) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  return new Intl.DateTimeFormat(locale).format(date);
  // const day = `${date.getDay()}`.padStart(2, '0');
  // const month = `${date.getMonth() + 1}`.padStart(2, '0');
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

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

    containerMovements.insertAdjacentHTML("afterbegin", row);
  });
};

const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
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
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(Math.abs(sumIn), acc.locale, acc.currency);

  const sumOut = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(
    Math.abs(sumOut),
    acc.locale,
    acc.currency
  );

  const sumInterest = acc.movements
    .filter((mov) => mov > 1)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((mov) => mov >= 1)
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
      labelWelcome.textContent = "Log in to get started";
      clearInterval(timerInterval);
    }

    labelTimer.textContent = `${timeMin.toString().padStart(2, "0")}:${timeSec
      .toString()
      .padStart(2, "0")}`;
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

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  // Check username
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  // Check PIN
  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and Welcome Message
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = 100;

    // Internationalization
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      month: "long",
      day: "numeric",
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
    inputLoginUsername.value = inputLoginPin.value = "";
    // Remove the focus from the Pin filed
    inputLoginPin.blur();

    // Check if already there's a timer or not
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = startLogOutTimer();
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
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
    inputTransferAmount.value = inputTransferTo.value = "";
    inputTransferTo.blur();
    inputTransferAmount.blur();

    // Update UI
    updateUI(currentAccount);

    // Reset the timer
    clearInterval(timerInterval);
    timerInterval = startLogOutTimer();
  }
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  const confirmUser = inputCloseUsername.value;
  const confirmPin = +inputClosePin.value;

  if (
    confirmUser === currentAccount.username &&
    confirmPin === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }

  // Clear the inputs fields && Remove focus
  inputCloseUsername.value = inputClosePin.value = "";
  inputCloseUsername.blur();
  inputClosePin.blur();
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = +inputLoanAmount.value;

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentAccount.movements.push(Math.round(amount));
    // Add movements Dates
    currentAccount.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
  }

  inputLoanAmount.value = "";
  inputLoanAmount.blur();

  // Reset the timer
  clearInterval(timerInterval);
  timerInterval = startLogOutTimer();
});

let sortState = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sortState);
  sortState = !sortState;
});
