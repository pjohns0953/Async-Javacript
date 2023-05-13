`use strict`;

const data1 = [43.861, -79.669];
const data2 = [19.037, 72.873];
const data3 = [-33.933, 18.474];


// Coding Challenge 1
const whereAmI = function (lat, lng) {
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
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


whereAmI(...data1);
whereAmI(...data2);
whereAmI(...data3);

// Coding Challenge 2

const createImage = function(imgPath) {
    return new Promise((resolve , reject) => {
        const img = document.createElement('img');
        img.src = 'imgPath'

        img.addEventListener('load', function(){

        })
    })
}