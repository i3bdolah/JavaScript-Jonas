"use strict";

// const Calculation = SAR => {
//   let calc = `The Price in SAR is [ ${SAR} ]
// The Price in USD is [ ${SAR * 3.75} ]`;

// return calc;
// }

// console.log(Calculation(1));

///////////////////////////////////////////////////////////

// function CurrencyCalc(currency , value) {
//   if (currency === euro) {
//     euro(value);
//   }
//   else if (currency === usd) {
//     usd(value);
//   }
//   else {
//     console.log("The Currency is not defined.")
//   }
// }

// function euro(value) {
//   const beforeConvert = value;
//   const afterConvert = value * 3.95;
//   console.log(`Before Convert : [ ${beforeConvert} ]
// After Convert : [ ${afterConvert} ]`)

// }

// function usd(value) {
//   const beforeConvert = value;
//   const afterConvert = value * 3.75;
//   console.log(`Before Convert : [ ${beforeConvert} ]
// After Convert : [ ${afterConvert} ]`)
// }

// CurrencyCalc(euro , 1000);
// CurrencyCalc(usd , 1000);

//////////////////////////////////////////////////////////

// const calcAvgerage = (Avg1 , Avg2 , Avg3) => {
//   const formula = (Avg1 + Avg2 + Avg3) / 3;
//   return formula;
// }

// const avgDolphins = calcAvgerage(85 , 54 , 41);
// const avgKoalas = calcAvgerage(23 , 34 , 27);

// checkWinner(avgDolphins , avgKoalas);

// function checkWinner(Dolphins , Koalas) {
//   if (Dolphins >= Koalas * 2 ) {
//     console.log(`Dolphins wins (${Dolphins} vs. ${Koalas})`);
//   }
//   else if (Koalas >= Dolphins * 2) {
//     console.log(`Koalas wins (${Dolphins} vs. ${Koalas})`);
//   }
//   else {
//     console.log(`No one wins (${Dolphins} vs. ${Koalas})`);
//   }
// }

///////////////////////////////////////////////////////////

// const Friends = ["Abdullah" , "Ali" , "Saleh"];
// console.log(Friends);

// Friends.push("Salem");
// console.log(Friends);

// Friends.unshift("Bander");
// console.log(Friends);

// const poped = Friends.pop();
// console.log(Friends);
// console.log(poped);

// Friends.shift();
// console.log(Friends);

// console.log(Friends.indexOf("Ali"));
// console.log(Friends.indexOf("MO"));

// console.log(Friends.includes("Ali"));
// console.log(Friends.includes("MO"));

////////////////////////////////////////////////////////////


// let tip = [];
// const bills = [125 , 555 , 44];
// const tips = [calcTip(bills[0]) , calcTip(bills[1]) , calcTip(bills[2])];
// const total = [bills[0] + tips[0] ,bills[1] + tips[1], bills[2] + tips[2]];

// function calcTip(bill) {
//   if (bill >= 50 && bill <= 300) {
//     tip = bill * 0.15;
//   }
//   else {
//     tip = bill * 0.2;
//   }
//   return tip;
// }

// console.log(bills);
// console.log(tips);
// console.log(`The Total bill is : 
// ${total[0]}
// ${total[1]}
// ${total[2]}`);

///////////////////////////////////////////////////////////
/*
const myInfo = {
  fName : "Abdullah",  
  lName : "Al-Shehri",
  DOB : 2001,
  job : "Student",
  friends : ["Ahmed" , "Mohannad" , "Nyaar" , "Talal"],
  married : false,
  calcAge : function () {
    this.age = 2022 - this.DOB;
    return this.age;
  },
  summary : function () {
    return `${this.fName} ${this.lName} is a ${this.age}-year old ${this.job}, and he ${this.married ? `is married.` : `is not married.`}`
  }
}

myInfo.calcAge();
console.log(myInfo.summary());
*/
///////////////////////////////////////////////////////////
/*
const m = {
  fullName : "Mark Miller",
  mass : 78,
  hieght : 1.69,
  calcBMI : function () {
    this.bmi = Math.floor(this.mass / this.hieght ** 2); 
    return this.bmi;
  }
}

const j = {
  fullName : "John Smith",
  mass : 92,
  hieght : 1.95,
  calcBMI : function () {
    this.bmi = Math.floor(this.mass / this.hieght ** 2); 
    return this.bmi;
  }
}

m.calcBMI();
j.calcBMI();

console.log(`${m.bmi > j.bmi ? 

`${m.fullName}'s BMI (${m.bmi}) 
is higher than 
${j.fullName}'s (${j.bmi})` 

:

`${j.fullName}'s BMI (${j.bmi}) 
is higher than 
${m.fullName}'s (${m.bmi})`}`);
*/
///////////////////////////////////////////////////////////

// for (let i = 1; i <= 10; i++) {
//   console.log(`Lifting wieghts repetition ${i}`);
// }

///////////////////////////////////////////////////////////
/*
const Friends = ["Abdullah" , "Ali" , "Saleh" , "Salem" , "Aziz",
                 2000 , 1975 , 1980 , 1980 , 1990 , false];

console.log("___________ONLY BY DATATYPE____________")
for (let i = 0; i < Friends.length; i++) {
  if (typeof Friends[i] !== "number") continue;

  console.log(Friends[i], typeof Friends[i]);
}
*/
///////////////////////////////////////////////////////////
/*
const Friends = ["Abdullah" , "Ali" , "Saleh" , "Salem" , "Aziz"];

for (let i = Friends.length - 1; i >= 0; i--) {
  console.log(Friends[i]);

  for (let i = 1; i <= 3; i++) {
  console.log(i);
  }
}
*/
//////////////////////////////////////////////////////////
/*
const Friends = ["Abdullah" , "Ali" , "Saleh" , "Salem" , "Aziz"];

let i = 0;

while (i !== Friends.length) {
  console.log(Friends[i]);
  i++;  
}
*/
//////////////////////////////////////////////////////////

// const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
// const tips = [];
// const totals = [];

// function calcTips(Array) {
//     for (let i = 0; i < Array.length; i++) {

//       if (Array[i] >= 50 && Array[i] <= 300) {

//         const fCalc = Array[i] * 0.15;

//         tips.push(fCalc);
//         totals.push(fCalc + Array[i]);
//       }


//       else {

//         const lCalc = Array[i] * 0.15;

//         tips.push(lCalc);
//         totals.push(lCalc + Array[i]);
//       }
//   }
// }


// calcTips(bills);

// console.log(bills);
// console.log(tips);
// console.log(totals);


//////////////////////////////////////////////////////////

const tempratures = [3 , -2 , -6 , -1 , 'error' , 9 , 13 , 17 , 15 , 14 , 9 , 5]

// Find man and min valuse (Amplitude)
// How to igmore string
// Find (Amplitude) substract max from min

function CalcTempAmp(Array) {

  let max = Array[0]
  let min = Array[0]

  for (let i = 1; i < Array.length; i++) {

    if (Array[i] !== 'number')

    if (Array[i] > max) max = Array[i]

    if (Array[i] < min) min = Array[i]
  }
  console.log(`The Max is = ${max} , and the Min is = ${min}`)
}

CalcTempAmp(tempratures)