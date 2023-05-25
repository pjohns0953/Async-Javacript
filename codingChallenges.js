`use strict`;

// const data1 = [43.861, -79.669];
// const data2 = [19.037, 72.873];
// const data3 = [-33.933, 18.474];


// // Coding Challenge 1
// const whereAmI = function (lat, lng) {
//     fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
//     .then(res => {
//         if(!res.ok) throw new Error(`You must be in space`)
//         return res.json()})
//     .then(data => {
//         console.log(data);
//         console.log(`You are in ${data.city}, ${data.countryName}`);

//         return fetch(`https://restcountries.com/v2/name/${data.countryName}`);
//     })
//     .then(res => {
//         console.log(res)
//         return res.json();
//     })
//     .then(data => {
//         console.log(data[0].name);
//         renderCountry(data[0]);
        
//         countriesContainer.style.opacity = 1;
//     })
//     .catch(err => console.log(`Error coordinates not found ${err.message}`));

// }


// whereAmI(...data1);
// whereAmI(...data2);
// whereAmI(...data3);


// Coding Challenge 2
const wait = function(seconds) {
    return new Promise(function(resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};

const imgContainer = document.querySelector('.images');

const createImage = function(imgPath) {
    return new Promise((resolve , reject) => {
        const img = document.createElement('img');
        img.src = imgPath;

        img.addEventListener('load', function(){
            imgContainer.append(img);
            resolve(img);
        });

        img.addEventListener('error', function() {
            reject(new Error('Image not found'));
        })
    });
};

// let currentImg;

// createImage('img/img-1.jpg').then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//     })
//     .then(() => {
//         currentImg.style.display = 'none';
//         return createImage('img/img-2.jpg');
//     })
//     .then(img => {
//         currentImg = img;
//         console.log('Img 2 Loaded');
//         return wait(2);
//     })
//     .then(() =>{
//         currentImg.style.display = 'none';
//     })
//     .catch(err => console.log(err));


// Coding Challenge 3

const loadNPause = async function() {
    try {
        // load image 1
        let img1 = await createImage('img/img-1.jpg');
        console.log('Image 1 loaded');
        await wait(2);
        img1.style.display = 'none';
        
        // load image 2
        let img2 = await createImage('img/img-2.jpg');
        console.log('Image 2 loaded');
        await wait(2);
        img2.style.display = 'none';
        
        // load image 3
        let img3 = await createImage('img/img-3.jpg');
        console.log('Image 3 loaded');
        await wait(2);
        img3.style.display = 'none';

    } catch(err) {
        console.log(err)
    }
}

loadNPause();

const loadAll = async function(imgArr) {
    try{
        const imgs = imgArr.map(async img => await createImage(img));
        const allImgs = await Promise.all(imgs);
        console.log(allImgs);
        allImgs.forEach(img => img.classList.add('parallel'));
    } catch(err) {
        console.log(err);
    }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);