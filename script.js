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

const renderError = function(msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
}

const getJson = function(url, errorMsg = 'Something went wrong!') {
    return fetch(url)
    .then(response => { // Handles either the fullfilled or rejected promise
        if(!response.ok) throw new Error(`${errorMsg} (${response.status})`);  // returns a rejected promise if country is not found
        
        return response.json();
    });
}
 /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// the old school way of using AJAX calls
// const getCountryAndNeighbour = function(country){
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v2/name/${country}`);
//     request.send();

//     request.addEventListener('load', function() {
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);
        
//         renderCountry(data);

//         // Get neighbour
//         const neighbour = data.borders?.[0];
//         //neighbour call
//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//         request2.send();

//         request2.addEventListener('load', function() {
//             const data2 = JSON.parse(this.responseText);
//             console.log(data2);

//             renderCountry(data2, 'neighbour')
//         })
//     });
// }

// getCountryAndNeighbour('austria');
*/

// Fetch API the modern way of Calling API's
const getCountry = function(country) {
    // Country 
    getJson(`https://restcountries.com/v2/name/${country}`, 'Country not found!')
    
    .then(data => {
        renderCountry(data[0]);
        const neighbour = data[0].borders[0];
        
        if(!neighbour) throw new Error ('No neighbouring countries found!')

        return getJson(`https://restcountries.com/v2/alpha/${neighbour}`, 'Country not found!')
     })  // ALWAYS RETURN THE PROMISE THEN HANDLE IT OUTSIDE THE CHAIN //////////////////////////////////////// 
        
    // Bordering Country
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => { // catches rejected promises so there are no uncaught errors withing the promise chain
        console.error(`${err} 💢💢💢`)
        renderError(`Something went wrong 💢💢💢  ${err.message}. Try again!`)
    })
    .finally(() => { // the finally method is always called regardless of fullfillment or rejection of the promise
        countriesContainer.style.opacity = 1;
    })
};

btn.addEventListener('click', function() {
    getCountry('Greenland');
});

// getCountry(`fort kickass`);

