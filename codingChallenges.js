'use strict';

const data1 = [52.508,  13.381];
const data2 = [19.037, 72.873];
const data3 = [-33.933, 18.474];

const getCity = function(url, err) {
    return fetch(url)
    .then(response => {
        if(!response.ok) throw new Error ('You must be in space');
        return response.json()});
}

const whereAmI = function(lat, lng) {
    getCity(`https://geocode.xyz/${lat},${lng}?geoit=json.`)
    .then(data => console.log(`You are in ${data.city}`))
    .catch(err => console.log(err.message));
}

whereAmI(...data1);
whereAmI(...data2);
whereAmI(...data3);