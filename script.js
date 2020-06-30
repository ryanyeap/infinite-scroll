const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
// Initial count is set to 5 for lower loading times.
let initialCount = 5;
let isInitialLoad = true;

// Unsplash Api
const apiKey = 'wJuVr2iKCEYTJawpSoNqRRf1a0S2lfctfDwiz9qPOtc';
let unsplashApiUrl =  `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function setNewCountApiUrl (picCount) {
    unsplashApiUrl =  `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
}

// Check if all images were loaded
function imageLoaded () {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    totalImages = photosArray.length;
    console.log("Total Images = ", totalImages);
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        // Check when each image is finished loading
        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get Photos for Unsplash Api
async function getPhotos() {
    try {
        const response = await fetch(unsplashApiUrl);
        photosArray = await response.json();
        displayPhotos();
        if(isInitialLoad) {
            setNewCountApiUrl(30);
            isInitialLoad = false;
        }
    } catch (error) {
        // Catch Error
    }
}

// Check if Scroll is near bottom then load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        imagesLoaded = 0;
        getPhotos();
    }
});

// On Load
getPhotos();