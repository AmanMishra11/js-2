
const API_URL = 'https://icanhazdadjoke.com/';


const jokeText = document.getElementById('jokeText');
const getJokeBtn = document.getElementById('getJokeBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const themeToggle = document.getElementById('themeToggle');
const shareBtn = document.getElementById('shareBtn');
const heartBtn = document.getElementById('heartBtn'); 
const textSizeIncrease = document.getElementById('textSizeIncrease');
const textSizeDecrease = document.getElementById('textSizeDecrease');
const favoritesList = document.getElementById('favoritesList'); 
const favoritesSection = document.getElementById('favoritesSection'); 


let currentFontSize = 1.25;
const fontSizeStep = 0.125; 
const maxFontSize = 2; 
const minFontSize = 1; 
let currentJoke = ''; 
let favorites = JSON.parse(localStorage.getItem('favoriteJokes') || '[]'); 


function initializeFavorites() {
    updateFavoritesSection();
}


themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
});

async function fetchJoke() {
    try {
        jokeText.style.display = 'none';
        loadingSpinner.style.display = 'flex';
        heartBtn.querySelector('.heart-icon').classList.remove('active'); 

        const response = await fetch(API_URL, {
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }
        
        const data = await response.json();
        currentJoke = data.joke;
        

        jokeText.classList.add('fade-in');
        jokeText.textContent = currentJoke; 
        
   
        setTimeout(() => {
            jokeText.classList.remove('fade-in');
        }, 500);
        
   
        updateHeartButton();
        
    } catch (error) {
        jokeText.textContent = 'Oops! Even dad jokes need a break sometimes. Try again! 😅';
        jokeText.classList.add('error');
        currentJoke = ''; 
    } finally {
        loadingSpinner.style.display = 'none';
        jokeText.style.display = 'block';
    }
}


function updateHeartButton() {
    const heartIcon = heartBtn.querySelector('.heart-icon');
    if (favorites.includes(currentJoke)) {
        heartIcon.classList.add('active');
    } else {
        heartIcon.classList.remove('active');
    }
}


function toggleFavorite() {
    if (!currentJoke) return;

    const index = favorites.indexOf(currentJoke);
    if (index === -1) {
        favorites.push(currentJoke);
    } else {
        favorites.splice(index, 1);
    }
    
    localStorage.setItem('favoriteJokes', JSON.stringify(favorites));
    updateHeartButton();
    updateFavoritesSection();
}


function updateFavoritesSection() {
    favoritesList.innerHTML = '';
    
    if (favorites.length > 0) {
        favoritesSection.classList.add('visible');
        favorites.forEach((joke, index) => {
            const jokeElement = document.createElement('div');
            jokeElement.className = 'favorite-joke';
            jokeElement.innerHTML = `
                ${joke}
                <button class="remove-btn" onclick="removeFavorite(${index})" aria-label="Remove from favorites">
                    ×
                </button>
            `;
            favoritesList.appendChild(jokeElement);
        });
    } else {
        favoritesSection.classList.remove('visible');
    }
}


function removeFavorite(index) {
    favorites.splice(index, 1);
    localStorage.setItem('favoriteJokes', JSON.stringify(favorites));
    updateFavoritesSection();
    updateHeartButton();
}


getJokeBtn.addEventListener('click', fetchJoke);
heartBtn.addEventListener('click', toggleFavorite);


shareBtn.addEventListener('click', async () => {
    if (!currentJoke) return; 
    
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Dad Joke',
                text: currentJoke 
            });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    } else {
        navigator.clipboard.writeText(currentJoke) 
            .then(() => {
                shareBtn.textContent = 'Copied!';
                setTimeout(() => {
                    shareBtn.textContent = 'Share Joke';
                }, 2000);
            })
            .catch(console.error);
    }
});


textSizeIncrease.addEventListener('click', () => {
    if (currentFontSize < maxFontSize) {
        currentFontSize += fontSizeStep;
        jokeText.style.fontSize = `${currentFontSize}rem`;
    }
});

textSizeDecrease.addEventListener('click', () => {
    if (currentFontSize > minFontSize) {
        currentFontSize -= fontSizeStep;
        jokeText.style.fontSize = `${currentFontSize}rem`;
    }
});


const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .fade-in {
        animation: fadeIn 0.5s ease-out;
    }
`;
document.head.appendChild(style);


initializeFavorites();
window.addEventListener('load', fetchJoke);
