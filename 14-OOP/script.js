'use strict';

// // Contructor function

// const Player = function (titleName, age, club, position) {
//   // Instance properties
//   this.titleName = titleName;
//   this.age = age;
//   this.club = club;
//   this.position = position;

//   // Never use this, this will generate function copy for each instance, imagine 1000 instance!!
//   //   this.info = function (titleName, age, club, position) {
//   //     console.log(`${titleName}, ${age}, ${club}, ${position}`)
//   //   }
// };

// const messi = new Player('Messi', 35, 'PSG', 'CF'); // Instance
// console.log(messi);

// const neymar = new Player('Neymar', 29, 'PSG', 'LW');
// console.log(neymar);

///////////////////////////////////////////////////////////////////////////

// // Prototypes

// Player.prototype.info = function () {
//   console.log(`${this.titleName}, ${this.age}, ${this.club}, ${this.position}`);
// };

// messi.info();

// console.log(messi.__proto__);
// console.log(Player.prototype);

// console.log(Player.prototype.isPrototypeOf(messi));
// console.log(Player.prototype.isPrototypeOf(Player));

// Player.prototype.region = 'South America';
// // They inheret it from the father prototype of Player [NOT IN THE EXACT OBJECT]
// console.log(messi.region, neymar.region);

// // To check :
// console.log(messi.hasOwnProperty('age'));
// console.log(messi.hasOwnProperty('region'));

///////////////////////////////////////////////////////////////////////////

// // Prototypal Inheritance on Built-In Objects

// console.log(messi.__proto__.__proto__); // Prototype of object {The top}

// console.dir(Player.prototype.constructor); // Inspecting the constructor property

// const arr = [1, 1, 2, 3, 4];
// console.log(arr.__proto__); // All the array methods
// console.log(arr.__proto__.__proto__); // Again! Prototype of object {The top}

// console.log(arr.__proto__ === Array.prototype);

// console.log(messi.__proto__.__proto__ === arr.__proto__.__proto__); // Coming from the same father {Object}

// // I will add a new method to all the arrays:
// // which returns the sum of all the array
// Array.prototype.sumOfAll = function () {
//   let sum = 0;
//   this.forEach(a => {
//     sum = sum + a;
//   });
//   return console.log(sum);
// };
// arr.sumOfAll();

///////////////////////////////////////////////////////////////////////////
// /*
// Coding Challenge #1

// Your tasks:

//     1. Use a constructor function to implement a 'Car'. A car has a 'make' and a
//     'speed' property. The 'speed' property is the current speed of the car in
//     km/h

//     2. Implement an 'accelerate' method that will increase the car's speed by 10,
//     and log the new speed to the console

//     3. Implement a 'brake' method that will decrease the car's speed by 5, and log
//     the new speed to the console

//     4. Create 2 'Car' objects and experiment with calling 'accelerate' and
//     'brake' multiple times on each of them
//     Test data:

// § Data car 1: 'BMW' going at 120 km/h
// § Data car 2: 'Mercedes' going at 95 km/h
// */

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed = this.speed + 10;
//   return `${this.make} going at ${this.speed} km/h | accelerate()`;
// };

// Car.prototype.brake = function () {
//   this.speed = this.speed - 5;
//   return `${this.make} going at ${this.speed} km/h | brake()`;
// };

// Car.prototype.print = function () {
//   return `--${this.make} going at ${this.speed} km/h--`;
// };

// const BMW = new Car('BMW', 150);
// console.log(BMW.print());
// console.log(BMW.accelerate());
// console.log(BMW.accelerate());
// console.log(BMW.brake());
// console.log(BMW.brake());

// const Mercedes = new Car('Mercedes', 95);
// console.log(Mercedes.print());
// console.log(Mercedes.accelerate());
// console.log(Mercedes.accelerate());
// console.log(Mercedes.brake());
// console.log(Mercedes.brake());

///////////////////////////////////////////////////////////////////////////

// class Person {
//   constructor(name, birthYear, athnicity) {
//     this.name = name;
//     this.birthYear = birthYear;
//     this.athnicity = athnicity;
//   }

//   // Method will be added to .prototype property
//   calcAge() {
//     console.log(2023 - this.birthYear);
//   }
// }

// const me = new Person('Abdullah', 2000, 'Arabic');
// console.log(me);
// me.calcAge();

///////////////////////////////////////////////////////////////////////////

// // setters and getters

// // On Object (the same)
// const account = {
//   owner: 'Abdullah',
//   movements: [100, 200, 50, 750],

//   get latest() {
//     return this.movements.slice(-1).pop();
//   },

//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };
// console.log(account.latest);

// account.latest = 10;
// console.log(account.movements);

// console.log(account.latest);

// // On Classes (the same)

// class Person {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   // Method will be added to .prototype property
//   calcAge() {
//     console.log(2023 - this.birthYear);
//   }

//   set fullName(name) {
//     console.log(name);
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not fullName`);
//   }

//   get fullName() {
//     this.fullName = this._fullName;
//   }
// }

// const Abdullah = new Person('Abdullah Ban', 2000);
// Abdullah.fullName;
// Abdullah.fullName;

// console.log(Abdullah);

// const moha = new Person('Moahmmed Ban', 2008);

// console.log(moha);

///////////////////////////////////////////////////////////////////////////

// // Static Methods

// class Person {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   // Method will be added to .prototype property
//   calcAge() {
//     console.log(2023 - this.birthYear);
//   }

//   set fullName(name) {
//     console.log(name);
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not fullName`);
//   }

//   get fullName() {
//     this.fullName = this._fullName;
//   }

//   static hey() {
//     console.log('Hi there');
//     console.log(this);
//   }
// }

// const Abdullah = new Person('Abdullah Ban', 2000);
// Person.hey();

///////////////////////////////////////////////////////////////////////////

// // Object.create()
// const PersonProto = {
//   calcAge() {
//     console.log(2023 - this.birthYear);
//   },
// };

// const mazen = Object.create(PersonProto);
// console.log(mazen);

// mazen.name = 'Mazen';
// mazen.birthYear = 2008;
// console.log(mazen);
// mazen.calcAge();

///////////////////////////////////////////////////////////////////////////

/*

Coding Challenge #2

Your tasks:

  1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
  
  2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide
  by 1.6)
  
  3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
  converts it to km/h before storing the value, by multiplying the input by 1.6)
  
  4. Create a new car and experiment with the 'accelerate' and 'brake'
  methods, and with the getter and setter.

Test data:
§ Data car 1: 'Ford' going at 120 km/h

*/

/*
class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(inMile) {
    this.speed = inMile * 1.6;
  }
}

const Ford = new Car('Ford', 120);
console.log(Ford);
console.log(Ford.speedUS);
Ford.speedUS = 200;
console.log(Ford);
*/

///////////////////////////////////////////////////////////////////////////

// // Inheritance Between "Classes": Constructor Functions

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2023 - this.birthYear);
// };

// const Student = function (firstName, birthYear, course) {
//   Person.call(this, firstName, birthYear);
//   this.course = course;
// };

// // Linking prototypes
// Student.prototype = Object.create(Person.prototype);

// Student.prototype.interduce = function () {
//   console.log(`My name is ${this.firstName}, and studiyng ${this.course}`);
// };

// const Sami = new Student('Sami', 1999, 'Software Engineer');
// Sami.interduce();
// Sami.calcAge();

///////////////////////////////////////////////////////////////////////////

// /*

// Coding Challenge #3

// Your tasks:

//   1. Use a constructor function to implement an Electric Car (called 'EV') as a child
//   "class" of 'Car'. Besides a make and current speed, the 'EV' also has the
//   current battery charge in % ('charge' property)

//   2. Implement a 'chargeBattery' method which takes an argument
//   'chargeTo' and sets the battery charge to 'chargeTo'

//   3. Implement an 'accelerate' method that will increase the car's speed by 20,
//   and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140
//   km/h, with a charge of 22%'

//   4. Create an electric car object and experiment with calling 'accelerate',
//   'brake' and 'chargeBattery' (charge to 90%). Notice what happens when
//   you 'accelerate'! Hint: Review the definiton of polymorphism �

// Test data:
// § Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%
// */

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   return `${this.make} going at ${this.speed} km/h | accelerate() Car`;
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   return `${this.make} going at ${this.speed} km/h | brake() Car`;
// };

// Car.prototype.print = function () {
//   return `--${this.make} going at ${this.speed} km/h-- Car`;
// };

// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// // Linking prototypes
// EV.prototype = Object.create(Car.prototype);

// EV.prototype.charge = function (chargeTo) {
//   return (this.charge = chargeTo);
// };

// Car.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge -= 1;
//   return `${this.make} going at ${this.speed} km/h , with a charge of ${this.charge}% | accelerate() EV`;
// };

// const Tesla = new EV('Tesla', 50, 90);

// console.log(Tesla);
// Tesla.charge = 20;
// console.log(Tesla);
// console.log(Tesla.accelerate());
// console.log(Tesla.accelerate());
// console.log(Tesla.brake());
// console.log(Tesla.accelerate());
// console.log(Tesla.brake());
// console.log(Tesla.accelerate());
// console.log(Tesla.brake());

///////////////////////////////////////////////////////////////////////////

// // Inheritance Between "Classes": ES6 Classes

// class Person {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   // Method will be added to .prototype property
//   calcAge() {
//     console.log(2023 - this.birthYear);
//   }

//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not fullName`);
//   }

//   get fullName() {
//     this.fullName = this._fullName;
//   }

//   static hey() {
//     console.log('Hi there');
//   }
// }

// class Student extends Person {
//   constructor(fullName, birthYear, course) {
//     // Allways needs to happen first
//     super(fullName, birthYear);
//     this.course = course;
//   }
//   interduce() {
//     console.log(`My name is ${this._fullName}, and studiyng ${this.course}`);
//   }
// }

// const osama = new Student('Osama Jabr', 1998, 'AI');
// console.log(osama);
// osama.interduce();
// osama.calcAge();

///////////////////////////////////////////////////////////////////////////

// // Inheritance Between "Classes": Object.create

// const PersonProto = {
//   calcAge() {
//     return 2023 - this.birthYear;
//   },
//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const StudentProto = Object.create(PersonProto);

// StudentProto.init = function (firstName, birthYear, course) {
//   PersonProto.init.call(this, firstName, birthYear);
//   this.course = course;
// };

// StudentProto.print = function () {
//   console.log(
//     `My name is ${this.firstName}, born in ${
//       this.birthYear
//     }, I'm ${this.calcAge()} years old. Studiyng ${this.course}`
//   );
// };

// const sami = Object.create(StudentProto);

// console.log(sami);

// sami.init('Sami', 1999, 'SW');

// console.log(sami);
// sami.print();

///////////////////////////////////////////////////////////////////////////

// // Another Class Example

// class Account {
//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     this.pin = pin;
//     this.movements = [[], []];
//     this.locale = navigator.language;
//   }
//   // These called : API's, methods, behaviours
//   deposit(val) {
//     this.movements[0].push(val);
//   }
//   withdrawal(val) {
//     const num = Math.abs(val) * -1;
//     this.movements[1].push(num);
//   }
// }

// const acc1 = new Account('Abdullah', 'SAR', 1395);
// console.log(acc1);
// acc1.deposit(100);
// acc1.withdrawal(-250);
// console.log(acc1.movements);

///////////////////////////////////////////////////////////////////////////

// // Protected properties
// class Account {
//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     this.pin = pin;
//     // Hides the key name and access it via method.
//     this._movements = [[], []];
//     this.locale = navigator.language;
//   }
//   // These called : API's, methods, behaviours
//   deposit(val) {
//     this._movements[0].push(val);
//   }
//   withdrawal(val) {
//     this._movements[1].push(Math.abs(val) * -1);
//   }
//   // accessing movements
//   getMovements() {
//     return this._movements;
//   }
// }

// const acc1 = new Account('Abdullah', 'SAR', 1395);
// console.log(acc1);
// acc1.deposit(100);
// acc1.withdrawal(-250);
// console.log(acc1.getMovements());

///////////////////////////////////////////////////////////////////////////

// // Encapsulation: Private Class Fields and Methods

// class Account {
//   // Public fields (property)
//   locale = navigator.language;
//   #movements = [[], []];

//   // We need pin from the constructor, so we will intialize it here and assign it after all
//   #pin;

//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     this.#pin = pin;
//   }
//   // These called : API's, methods, behaviours
//   withdrawal(val) {
//     this.#movements[1].push(Math.abs(val) * -1);
//   }
//   // accessing movements
//   getMovements() {
//     return this.#movements;
//   }

//   // Private methods
//   #deposit(val) {
//     this.#movements[0].push(val);
//   }
// }

// const acc1 = new Account('Abdullah', 'SAR', 1395);
// // acc1.#deposit(100);
// acc1.withdrawal(-250);
// // console.log(acc1.#movements);
// console.log(acc1);

///////////////////////////////////////////////////////////////////////////

// // Chaining methods

// class Account {
//   // Public fields (property)
//   locale = navigator.language;
//   #movements = [[], []];

//   // We need pin from the constructor, so we will intialize it here and assign it after all
//   #pin;

//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     this.#pin = pin;
//   }
//   // These called : API's, methods, behaviours
//   withdrawal(val) {
//     this.#movements[1].push(Math.abs(val) * -1);
//     return this;
//   }
//   // accessing movements
//   getMovements() {
//     return this.#movements;
//   }

//   // Private methods
//   deposit(val) {
//     this.#movements[0].push(val);
//     return this;
//   }
// }

// const acc1 = new Account('Abdullah', 'SAR', 1395);
// // acc1.#deposit(100);

// // By returning the (this object), we can chain the methods
// acc1
//   .withdrawal(-250)
//   .withdrawal(-1000)
//   .withdrawal(-5500)
//   .deposit(100)
//   .deposit(1000);
// console.log(acc1.getMovements());
// // console.log(acc1.#movements);
// console.log(acc1);

///////////////////////////////////////////////////////////////////////////

/*
Coding Challenge #4

Your tasks:

  1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl'
  child class of the 'CarCl' class
  
  2. Make the 'charge' property private
  
  3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
  methods of this class, and also update the 'brake' method in the 'CarCl'
  class. Then experiment with chaining!

Test data:
§ Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%
*/

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(inMile) {
    this.speed = inMile * 1.6;
  }
}

class EV extends Car {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  set chargeTo(val) {
    this.#charge = val;
  }
  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} going at ${this.speed} km/h , with a charge of ${
        this.#charge
      }% | accelerate() EV`
    );
    return this;
  }
}

// § Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%
const rivian = new EV('Rivian', 120, 23);
console.log(rivian);
console.log(
  rivian.accelerate().accelerate().accelerate().accelerate().accelerate()
);

// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// // Linking prototypes
// EV.prototype = Object.create(Car.prototype);

// EV.prototype.charge = function (chargeTo) {
//   return (this.charge = chargeTo);
// };

// Car.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge -= 1;
//   return `${this.make} going at ${this.speed} km/h , with a charge of ${this.charge}% | accelerate() EV`;
// };
