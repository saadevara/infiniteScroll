const imageContainer = document.querySelector('#imageContainer');
const loader = document.querySelector('#loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

// unsplash API
const count = 30;
const apiKey = "jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// function for checking loading

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        loader.hidden = true;
        ready = true;
    }
}

// helper function to set attributes in dom.
function setAttributes(element,attribute) {
    for (const key in attribute) {
        element.setAttribute(key, attribute[key]);
    }
}


//create element for photos,links and add it to the DOM.

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // foreach photoArray
    photosArray.forEach((photo) => {
        // create a tag to link unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        // create img for photos
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title:photo.alt_description
        })

        // check loading

        img.addEventListener('load', imageLoaded);

        // put the image inside the anchor tag. Then put both to imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}


// get photos from unsplash API

async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch (error) {
        
    }
}

// check and load more photos 
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// on load
getPhotos();