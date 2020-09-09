const imgContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
const count = 30;
const apiKey = `jvH3lB1m3rfNLXy5BHTDk6UoilGmPZ9_KllltlyjVyA`;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images are loaded
function imageLoaded() {    
    imagesLoaded++;
    if(imageLoaded === totalImages) {
        ready = true;
        loader.hidden = true;  
    }
}

//Helper function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//create Elements for links and Photos, & add to the DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    
    //run function for each object in photosArray
    photosArray.forEach((photo) => {
        //Create <a> to link to unsplash
        const item = document.createElement('a');
        //Using helper function
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        //Create <img> for photo
        const img = document.createElement('img');
        //Using Helper function
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)
        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imgContainer.appendChild(item)
    })
}

//Get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        photosArray = data;
        displayPhotos();

    } catch (error) {
        //Catch error here
    }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

//onload
getPhotos();