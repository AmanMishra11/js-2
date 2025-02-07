
const API_KEY = '93aa4570';
const BASE_URL = 'https://www.omdbapi.com/';

let currentPage = 1;
let currentSearch = '';
let totalResults = 0;

const searchInput = document.getElementById('searchInput');
const moviesGrid = document.getElementById('moviesGrid');
const loadingIndicator = document.getElementById('loadingIndicator');
const modal = document.getElementById('movieModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const currentPageSpan = document.getElementById('currentPage');

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

async function searchMovies(query, page = 1) {
    if (!query) {
        moviesGrid.innerHTML = '<p class="neon-text">Enter a movie title to search...</p>';
        return;
    }

    loadingIndicator.style.display = 'block';

    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}`);
        const data = await response.json();

        if (data.Response === 'True') {
            totalResults = parseInt(data.totalResults);
            displayMovies(data.Search);
            updatePagination();
        } else {
            moviesGrid.innerHTML = `<p class="neon-text">${data.Error}</p>`;
        }
    } catch (error) {
        moviesGrid.innerHTML = '<p class="neon-text">Error fetching movies. Please try again.</p>';
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

function displayMovies(movies) {
    moviesGrid.innerHTML = movies.map(movie => `
        <div class="movie-card glass-card" onclick="showMovieDetails('${movie.imdbID}')">
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}" 
                 alt="${movie.Title}">
            <div class="movie-info">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
            </div>
        </div>
    `).join('');
}

async function showMovieDetails(imdbID) {
    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`);
        const movie = await response.json();

        modalContent.innerHTML = `
            <div class="modal-grid">
                <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}" 
                     alt="${movie.Title}">
                <div class="modal-info">
                    <h2 class="neon-text">${movie.Title}</h2>
                    <p><strong>Year:</strong> ${movie.Year}</p>
                    <p><strong>Rating:</strong> ${movie.imdbRating}</p>
                    <p><strong>Director:</strong> ${movie.Director}</p>
                    <p><strong>Cast:</strong> ${movie.Actors}</p>
                    <p><strong>Plot:</strong> ${movie.Plot}</p>
                    ${movie.Ratings ? `
                        <div class="ratings">
                            <h3>Ratings:</h3>
                            ${movie.Ratings.map(rating => `
                                <p>${rating.Source}: ${rating.Value}</p>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        modal.style.display = 'block';
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

function updatePagination() {
    const totalPages = Math.ceil(totalResults / 10);
    currentPageSpan.textContent = `Page ${currentPage}`;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
}

searchInput.addEventListener('input', debounce((e) => {
    currentSearch = e.target.value;
    currentPage = 1;
    searchMovies(currentSearch, currentPage);
}, 500));

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        searchMovies(currentSearch, currentPage);
    }
});

nextPageBtn.addEventListener('click', () => {
    currentPage++;
    searchMovies(currentSearch, currentPage);
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

moviesGrid.innerHTML = '<p class="neon-text">Enter a movie title to search...</p>';