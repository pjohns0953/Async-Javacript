'use strict';

// current API URL https://restcountries.com/v2/

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// Render Country and data


const renderCountry = function(data, className = '') {
    const html = `
        <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} million</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
        </article>`;

        countriesContainer.insertAdjacentHTML('beforeend', html);
    }

// const renderError = function(msg) {
//     countriesContainer.insertAdjacentText('beforeend', msg);
// }

// const getJson = function(url, errorMsg = 'Something went wrong!') {
//     return fetch(url)
//     .then(response => { // Handles either the fullfilled or rejected promise
//         if(!response.ok) throw new Error(`${errorMsg} (${response.status})`);  // returns a rejected promise if country is not found
        
//         return response.json();
//     });
// }
//  /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // the old school way of using AJAX calls
// // const getCountryAndNeighbour = function(country){
// //     const request = new XMLHttpRequest();
// //     request.open('GET', `https://restcountries.com/v2/name/${country}`);
// //     request.send();

// //     request.addEventListener('load', function() {
// //         const [data] = JSON.parse(this.responseText);
// //         console.log(data);
        
// //         renderCountry(data);

// //         // Get neighbour
// //         const neighbour = data.borders?.[0];
// //         //neighbour call
// //         const request2 = new XMLHttpRequest();
// //         request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
// //         request2.send();

// //         request2.addEventListener('load', function() {
// //             const data2 = JSON.parse(this.responseText);
// //             console.log(data2);

// //             renderCountry(data2, 'neighbour')
// //         })
// //     });
// // }

// // getCountryAndNeighbour('austria');
// */

// // Fetch API the modern way of Calling API's
// const getCountry = function(country) {
//     // Country 
//     getJson(`https://restcountries.com/v2/name/${country}`, 'Country not found!')
    
//     .then(data => {
//         renderCountry(data[0]);
//         const neighbour = data[0].borders[0];
        
//         if(!neighbour) throw new Error ('No neighbouring countries found!')

//         return getJson(`https://restcountries.com/v2/alpha/${neighbour}`, 'Country not found!')
//      })  // ALWAYS RETURN THE PROMISE THEN HANDLE IT OUTSIDE THE CHAIN //////////////////////////////////////// 
        
//     // Bordering Country
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => { // catches rejected promises so there are no uncaught errors withing the promise chain
//         console.error(`${err} 💢💢💢`)
//         renderError(`Something went wrong 💢💢💢  ${err.message}. Try again!`)
//     })
//     .finally(() => { // the finally method is always called regardless of fullfillment or rejection of the promise
//         countriesContainer.style.opacity = 1;
//     })
// };

// btn.addEventListener('click', function() {
//     getCountry('canada');
// });

// getCountry(`fort kickass`);

// Event Loop in Practice ////////////////////////////////////////////////////////////////////////////////////////

// console.log('Test Start'); // 1st log due to top level code and syncronous behaviour
// setTimeout(() => console.log('0 sec timer'), 0); // 4th to log because the callback function goes to the callback queue and has least priority
// Promise.resolve('Resolved Promise 1') // 3rd to log due to micro-tasks queue that promises are sent to.
//     .then(res => console.log(res));

// Promise.resolve('resolved promise 2')
//     .then(res => {
//         for (let i = 0; i < 1000000000; i++){};
//         console.log(res)
//     });
// console.log('test end'); // 2nd log due to top level code and syncrounous behaviour 

// const lottery = new Promise(function(resolve, reject) {
//     console.log('Lottery Draw is taking place')
//     setTimeout(function() {
//         if(Math.random() >= 0.5){
//             resolve('You WIN 🤑💰');
//         } else {
//             reject(new Error('You lose 💔'));
//         }
//     }, 2000);
// });

// lottery.then(res => console.log(res))
//     .catch(err => console.log(err));

// const wait = seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000));

// wait(2).then(() => {
//     console.log('I waited for two seconds')
//     return wait(1);
// }).then(() => console.log('I waited for 1 second'));



const getPosition = function() {
    return new Promise((resolve, reject) => 
        navigator.geolocation.getCurrentPosition(resolve, reject)
)};


const whereAmI = function () {

    getPosition().then(pos => {
       const {latitude: lat, longitude: lng} = pos.coords;

       return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)

    })

    // fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
    .then(res => {
        if(!res.ok) throw new Error(`You must be in space`)
        return res.json()})
    .then(data => {
        console.log(data);
        console.log(`You are in ${data.city}, ${data.countryName}`);

        return fetch(`https://restcountries.com/v2/name/${data.countryName}`);
    })
    .then(res => {
        console.log(res)
        return res.json();
    })
    .then(data => {
        console.log(data[0].name);
        renderCountry(data[0]);
        
        countriesContainer.style.opacity = 1;
    })
    .catch(err => console.log(`Error coordinates not found ${err.message}`));

}

btn.addEventListener('click', whereAmI)