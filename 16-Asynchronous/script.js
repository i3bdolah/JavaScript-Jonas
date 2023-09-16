'use strict';
/*
It's not a big deal, it's really just one small change. Instead of:

https://restcountries.eu/rest/v2/

It's now:

https://restcountries.com/v2/
*/
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${
        Object.entries(data.languages)[0][1]
      }</p>
      <p class="country__row"><span>💰</span>${
        Object.entries(Object.entries(data.currencies)[0][1])[0][1]
      }</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

// const getCountries = function (name) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${name}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);

//     renderCountry(data);

//     // Get border country 2
//     const neighbour = data.borders?.[0];

//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       console.log(this.responseText);

//       const [countryBorder] = JSON.parse(this.responseText);
//       console.log(countryBorder);
//       renderCountry(countryBorder, 'neighbour');
//     });
//   });
// };

// // getCountries('');

/////////////////////////////////

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/Kuwait`);
// request.send();

const req = fetch('https://restcountries.com/v3.1/name/${name}');
// const [data] = req;

/////////////////////////////////

// Consume Promises

// const getCountries = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(res => {
//       console.log(res);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data[0]);
//       renderCountry(data[0]);
//     });
// };

// Helper Function
const getJSON = function (url, errorMsg = 'Error') {
  return fetch(url).then(res => {
    if (!res.ok) throw new Error(`${errorMsg} (${res.status})`);
    return res.json();
  });
};

const getCountries = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];

      if (!neighbour) throw new Error('Country Has No Neighbour');
      // const neighbour = 'data[0].borders?.[0]';

      // Fetching (Neigbour country)
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Neighbour not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(error => {
      console.error(`${error} 🔥`);
      renderError(`${error.message}, Try Agian!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  // getCountries('Australia');
});

// getCountries('sjsks');

/////////////////////////////////////////////////////////////////

// CHALLENGE #1

/*

// In this challenge you will build a function 'whereAmI' which renders a country
// only based on GPS coordinates. For that, you will use a second API to geocode
// coordinates. So in this challenge, you’ll use an API on your own for the first time �
// Your tasks:
  
// PART 1
  
//   1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat')
//   and a longitude value ('lng') (these are GPS coordinates, examples are in test
//   data below).
  
//   2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means
//   to convert coordinates to a meaningful location, like a city and country name.
//   Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
//   will be done to a URL with this format:
//   https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
//   promises to get the data. Do not use the 'getJSON' function we created, that
//   is cheating �
  
//   3. Once you have the data, take a look at it in the console to see all the attributes
//   that you received about the provided location. Then, using this data, log a
//   message like this to the console: “You are in Berlin, Germany”
  
//   4. Chain a .catch method to the end of the promise chain and log errors to the
//   console
  
//   5. This API allows you to make only 3 requests per second. If you reload fast, you
//   will get this error with code 403. This is an error with the request. Remember,
//   fetch() does not reject the promise in this case. So create an error to reject
//   the promise yourself, with a meaningful error message

// PART 2
  
//   6. Now it's time to use the received data to render a country. So take the relevant
//   attribute from the geocoding API result, and plug it into the countries API that
//   we have been using.
  
//   7. Render the country and catch any errors, just like we have done in the last
//   lecture (you can even copy this code, no need to type the same code)
//   The Complete JavaScript Course 31
//   Test data:

// § Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
// § Coordinates 2: 19.037, 72.873
// § Coordinates 3: -33.933, 18.474
// GOOD LUCK �

// */
// // API KEY = 713764855239592936218x63356
// const whereAmI = function (lat, lng) {
//   fetch(
//     `https://geocode.xyz/${lat},${lng}?geoit=json&auth=713764855239592936218x63356`
//   )
//     .then(res => {
//       if (!res.ok) throw new Error(`Failed to fetch (${data.status})`);

//       return res.json();
//     })
//     .then(data => {
//       console.log(data.country);
//       // getCountries(data.country);
//       console.log(`Country : ${data.country}\nCity : ${data.city}`);
//     })
//     .catch(e => console.error(e.message + '🔥'));
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

/////////////////////////////////////////////////////////////////

// In Which Order these will printed !

// //------------------//

// // #1 : Because It came firstly & Have no callback attached.
// console.log('Test Start');

// // #4 : Because It's will be executed after the Micro-tasks is finished.
// setTimeout(() => console.log('Timer Ends'), 0);

// // #3 : Because It's will Enter Micro-tasks Queue and Micro-tasks queue have priority upon callback queue.
// Promise.resolve('Resolved Promise 1').then(res => console.log(res));

// // #2 : Because It came secondly & Have no callback attached.
// console.log('Test End');

// //------------------//

/////////////////////////////////////////////////////////////////

// // Building Promises

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lotter is Cooking 🔥');
//   setTimeout(() => {
//     if (Math.random() >= 0.5) resolve('You WIN!');
//     else reject(new Error('You LOST!'));
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(3)
//   .then(() => {
//     console.log('I waited 3 seconds');
//     return wait(2);
//   })
//   .then(() => console.log('I waited 2 seconds'));

///////////////////////////////////////////

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function () {
//   try {
//     // Geolocation
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     // Reverse Geocoding
//     const geo = await fetch(
//       `https://geocode.xyz/${lat},${lng}?geoit=json&auth=713764855239592936218x63356`
//     );

//     if (!geo.ok) throw new Error('403');

//     const geoData = await geo.json();
//     // console.log(geoData);

//     // Country Fetching
//     const res = await fetch(
//       `https://restcountries.com/v3.1/name/${geoData.country}`
//     );

//     if (!geo.ok) throw new Error(`We can't find this COUNTRY`);

//     const data = await res.json();
//     renderCountry(data[0]);

//     return `You are in ${geoData.city}, ${geoData.country}`;
//   } catch (err) {
//     console.log(err);
//     // Reject Promise
//     throw err;
//   }
// };

// console.log('1: Will get location.');

// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.error(err.message);
//   } finally {
//     console.log('3: finish getting location.');
//   }
// })();

//////////////////////////////////////////////////////////////////

// // Run in parallel

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c3}`),
//     ]);

//     console.log(data.map(country => country[0].capital));
//   } catch (err) {
//     console.error(`${err.message} 🔥`);
//   }
// };

// get3Countries('saudi', 'yemen', 'uae');

//////////////////////////////////////////////////////////////////

// // Promise.race : it returned the first settled value.

// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/italy`),
//     getJSON(`https://restcountries.com/v3.1/name/mexico`),
//     getJSON(`https://restcountries.com/v3.1/name/egypt`),
//   ]);

//   console.log(res[0].name.common);
// })();

// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('Request took too long!'));
//     }, sec * 1000);
//   });
// };

// Promise.race([getJSON(`https://restcountries.com/v3.1/name/egypt`), timeout(1)])
//   .then(data => console.log(data[0].name.common))
//   .catch(e => console.error(`${e.message} 🔥`));

// // Promise.allSettled : same as Promise.all but dosen't care about the fulfillment, just the settlement.

// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Success'),
// ])
//   .then(res => console.log(res))
//   .catch(e => console.error('Error from Promise.allSettled'));

// Promise.all([
//   Promise.resolve('Success'),
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Success'),
// ])
//   .then(res => console.log(res))
//   .catch(e => console.error('Error from Promise.all'));

// // Promise.any [ES2021] : will return the first fulfilled Promise

// Promise.any([
//   Promise.reject('3: Error'),
//   Promise.resolve('4: Success'),
//   Promise.resolve('1 :Success'),
//   Promise.resolve('2 :Success'),
// ])
//   .then(res => console.log(res))
//   .catch(e => console.error('Error from Promise.any'));

/////////////////////////////////////////////////////////////

// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Image not found'));
//     });
//   });
// };

// let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

/////////////////////////////////////////////////////////////

// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

// let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

// Part 1
// const loadNPause = async function () {
//   try {
//     // Load img 1
//     let img = await createImage('img/img-1.jpg');
//     console.log(img);
//     console.log('Image 1 loaded');
//     await wait(2);
//     img.style.display = 'none';

//     // Load img 2
//     img = await createImage('img/img-2.jpg');
//     console.log(img);
//     console.log('Image 2 loaded');
//     await wait(2);
//     img.style.display = 'none';
//   } catch (error) {}
// };
// loadNPause();

// Part 2

// const loadAll = async function (imgArr) {
//   try {
//     const imgs = imgArr.map(async img => await createImage(img));
//     console.log(imgs);
//   } catch (error) {
//     console.error(error + ' 🔥');
//   }
// };

// loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

console.log('UC-e1e359c5-786b-4198-b578-f3999a6ec6f5'.toUpperCase());
