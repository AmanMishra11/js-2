const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 10;
const apiKey = '9mRegmV97aJOqnvFgObnr7DAyT-G2MVeqepDmuXpJyg';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
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
    imagesLoaded = 0;
    totalImages = photosArray.length;
    
    photosArray.forEach((photo) => {
        const item = document.createElement('div');
        item.className = 'image-item';
        
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description || 'Unsplash Image',
            title: photo.description || 'Unsplash Image'
        });
        
        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log('Error fetching images:', error);
    }
}

function handleScroll() {
    const images = document.querySelectorAll('.image-item');
    
    images.forEach(image => {
        const rect = image.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top <= windowHeight/2 && rect.bottom >= windowHeight/2) {
            image.classList.add('center-image');
        } else {
            image.classList.remove('center-image');
        }
    });
    
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
}

window.addEventListener('scroll', handleScroll);
getPhotos();


function loadFallbackImages() {
    const fallbackPhotos = Array.from({ length: 15 }, (_, i) => ({
        urls: { regular: `https://source.unsplash.com/random/800x${600 + i}` },
        alt_description: 'Random Unsplash Image',
        description: 'Random Unsplash Image'
    }));
    photosArray = fallbackPhotos;
    displayPhotos();
}

if (apiKey === 'YOUR_UNSPLASH_API_KEY') {
    loadFallbackImages();
}