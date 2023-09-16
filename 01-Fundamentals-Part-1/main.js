
// Test Case 1.
// const markHiegt = 1.69;
// const markMass = 78;
// const johnHieght = 1.95;
// const johnMass = 92;



// Test Case 2.
// const markHiegt = 1.88;
// const markMass = 95;
// const johnHieght = 1.76;
// const johnMass = 85;

// const markBMI = Math.floor(markMass / markHiegt ** 2);
// const johnBMI = Math.floor(johnMass / johnHieght ** 2);

// Boolean Variable.
// const markHigherBMI = markBMI > johnBMI;

// String simple Concatenating.
// console.log("Mark BMI is : "+markBMI+"\nand John is : "+johnBMI);

// Template Literal.
// console.log(`Mark BMI is (${markBMI}), and John is (${johnBMI}). 
// These guys are super fit!`);

// console.log(markHigherBMI);

// console.log(markBMI, johnBMI);

// if (markBMI > johnBMI) {
//     console.log(`Mark's BMI is (${markBMI})
// higher than John's (${johnBMI}).`);
// }
// else {
//     console.log(`John's BMI is (${johnBMI})
// higher than Mark's (${markBMI}).`);
// }

// _________________________________


// const Dolphins = (88 + 91 + 110) / 3;
// const Koalas = (96 + 108 + 89) / 3;

// if (Dolphins > Koalas) {
//     console.log(`The Dolphins is higher Average by 
// (${Dolphins})!`);
// }
// else if (Koalas > Dolphins) {
//     console.log(`The Koalas is higher Average by 
// (${Math.floor(Koalas)})!`);
// }
// else {
//     console.log(`Draw!
// Dolphins : (${Dolphins}).
// Koalas : (${Koalas}).`);
// }


const bill = 40;

const tip = bill >= 50 && bill <= 300 ?  bill * 0.15 : bill * 0.2;

console.log(`The bill was ${bill},the tip was ${tip},
and the total value ${tip + bill}.`);