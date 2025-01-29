

const ACCESS_KEY = '9mRegmV97aJOqnvFgObnr7DAyT-G2MVeqepDmuXpJyg';
let currentPage = 1;
let currentQuery = '';
let loading = false;

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const showMoreBtn = document.getElementById('showMoreBtn');
const imageGallery = document.getElementById('imageGallery');
const loader = document.getElementById('loader');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const photographer = document.getElementById('photographer');
const downloadBtn = document.getElementById('downloadBtn');
const favoritesGallery = document.getElementById('favoritesGallery');

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
updateFavoritesGallery();

searchBtn.addEventListener('click', () => {
    currentPage = 1;
    searchImages();
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        currentPage = 1;
        searchImages();
    }
});

showMoreBtn.addEventListener('click', () => {
    currentPage++;
    searchImages(true);
});

async function searchImages(append = false) {
    const query = searchInput.value.trim();
    if (!query) return;

    currentQuery = query;
    loading = true;
    loader.style.display = 'flex';
    showMoreBtn.style.display = 'none';

    try {
        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${query}&page=${currentPage}&per_page=10`,
            {
                headers: {
                    'Authorization': `Client-ID ${ACCESS_KEY}`
                }
            }
        );

        const data = await response.json();

        if (!append) {
            imageGallery.innerHTML = '';
        }

        data.results.forEach(image => {
            const card = createImageCard(image);
            imageGallery.appendChild(card);
        });

        showMoreBtn.style.display = 'block';
    } catch (error) {
        console.error('Error fetching images:', error);
    } finally {
        loading = false;
        loader.style.display = 'none';
    }
}

function createImageCard(image) {
    const card = document.createElement('div');
    card.className = 'image-card';

    const img = document.createElement('img');
    img.src = image.urls.small;
    img.alt = image.alt_description || 'Unsplash Image';

    const overlay = document.createElement('div');
    overlay.className = 'image-overlay';

    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = 'favorite-btn';
    favoriteBtn.innerHTML = '❤';
    favoriteBtn.classList.toggle('active', favorites.includes(image.id));

    favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(image);
        favoriteBtn.classList.toggle('active');
    });

    card.addEventListener('click', () => {
        openLightbox(image);
    });

    card.appendChild(img);
    card.appendChild(overlay);
    card.appendChild(favoriteBtn);

    return card;
}

function openLightbox(image) {
    lightboxImg.src = image.urls.regular;
    photographer.textContent = `Photo by ${image.user.name}`;
    downloadBtn.onclick = () => window.open(image.links.download, '_blank');
    lightbox.style.display = 'block';
}

document.querySelector('.close-lightbox').addEventListener('click', () => {
    lightbox.style.display = 'none';
});

function toggleFavorite(image) {
    const index = favorites.indexOf(image.id);
    if (index === -1) {
        favorites.push(image.id);
    } else {
        favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesGallery();
}

async function updateFavoritesGallery() {
    favoritesGallery.innerHTML = '';
    
    for (const id of favorites) {
        try {
            const response = await fetch(
                `https://api.unsplash.com/photos/${id}`,
                {
                    headers: {
                        'Authorization': `Client-ID ${ACCESS_KEY}`
                    }
                }
            );
            const image = await response.json();
            const card = createImageCard(image);
            favoritesGallery.appendChild(card);
        } catch (error) {
            console.error('Error fetching favorite image:', error);
        }
    }
}

// Initialize show more button as hidden
showMoreBtn.style.display = 'none';