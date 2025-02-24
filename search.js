
const API_KEYS = {
    GOOGLE_API_KEY: 'AIzaSyCLZrspHMm3yOwEjSI1jklKRFzL2Yu09Xw',
    GOOGLE_SEARCH_ENGINE_ID: 'b3706bc122c9a4194',
    GEMINI_API_KEY: 'AIzaSyC5tC2mLTvZ9xCgPorSCZR4HG9XQegnRG4',

};

const ENDPOINTS = {
    GOOGLE: 'https://www.googleapis.com/customsearch/v1',
    GEMINI: 'https://api.gemini.com/v1/search',
    WIKIPEDIA: 'https://en.wikipedia.org/w/api.php'
};

document.addEventListener('DOMContentLoaded', () => {

    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        body.classList.toggle('light-theme');
        const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });

    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    }

    const engineButtons = document.querySelectorAll('.engine-btn');
    let currentEngine = 'google';

    engineButtons.forEach(button => {
        button.addEventListener('click', () => {
            engineButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentEngine = button.dataset.engine;
        });
    });

    const tabButtons = document.querySelectorAll('.tab-btn');
    let currentTab = 'all';
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentTab = button.dataset.tab;
            performSearch();
        });
    });

    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const filterOptions = document.getElementById('filterOptions');

    searchButton.addEventListener('click', () => {
        performSearch();
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    filterOptions.addEventListener('change', () => {
        performSearch();
    });

    async function performSearch() {
        const query = searchInput.value.trim();
        if (!query) return;

        searchResults.innerHTML = '<div class="placeholder-result">Searching...</div>';

        try {
            const results = await fetchSearchResults(query, currentEngine, currentTab);
            displayResults(results);
        } catch (error) {
            searchResults.innerHTML = `<div class="placeholder-result error">Error: ${error.message}</div>`;
        }
    }

    async function fetchSearchResults(query, engine, tab) {
        const filterValue = filterOptions.value;
        
        switch (engine) {
            case 'google':
                return await fetchGoogleResults(query, tab, filterValue);
            case 'gemini':
                return await fetchGeminiResults(query, tab, filterValue);
            case 'wikipedia':
                return await fetchWikipediaResults(query, tab);
            default:
                throw new Error('Invalid search engine selected');
        }
    }

    async function fetchGoogleResults(query, tab, filterValue) {
        if (!API_KEYS.GOOGLE_API_KEY || !API_KEYS.GOOGLE_SEARCH_ENGINE_ID) {
            throw new Error('Google API keys not configured');
        }
        
        // const params = new URLSearchParams({
        //     key: API_KEYS.GOOGLE_API_KEY,
        //     cx: API_KEYS.GOOGLE_SEARCH_ENGINE_ID,
        //     q: query,
        //     searchType: tab === 'images' ? 'image' : undefined,
        //     dateRestrict: filterValue !== 'all' ? filterValue : undefined
        // });

        const params = new URLSearchParams({
            key: API_KEYS.GOOGLE_API_KEY,
            cx: API_KEYS.GOOGLE_SEARCH_ENGINE_ID,
            q: query,
            ...(tab === 'images' && { searchType: 'image' }),
            dateRestrict: filterValue !== 'all' ? filterValue : undefined
        });
        

        const response = await fetch(`${ENDPOINTS.GOOGLE}?${params}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || 'Failed to fetch Google results');
        }

        return data.items.map(item => ({
            title: item.title,
            snippet: item.snippet,
            url: item.link,
            image: item.pagemap?.cse_image?.[0]?.src
        }));
    }

    async function fetchGeminiResults(query, tab, filterValue) {
        if (!API_KEYS.GEMINI_API_KEY) {
            throw new Error('Gemini API key not configured');
        }

        const response = await fetch(ENDPOINTS.GEMINI, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEYS.GEMINI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query,
                type: tab,
                filter: filterValue
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch Gemini results');
        }

        return data.results.map(item => ({
            title: item.title,
            snippet: item.description,
            url: item.url,
            image: item.image_url
        }));
    }

    async function fetchWikipediaResults(query, tab) {
        const params = new URLSearchParams({
            action: 'query',
            format: 'json',
            list: 'search',
            srsearch: query,
            utf8: 1,
            origin: '*'
        });

        const response = await fetch(`${ENDPOINTS.WIKIPEDIA}?${params}`);
        const data = await response.json();

        if (!response.ok || data.error) {
            throw new Error(data.error?.info || 'Failed to fetch Wikipedia results');
        }

        return data.query.search.map(item => ({
            title: item.title,
            snippet: item.snippet.replace(/<\/?[^>]+(>|$)/g, ""), // Remove HTML tags
            url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`,
            timestamp: item.timestamp
        }));
    }

    function displayResults(results) {
        if (!results.length) {
            searchResults.innerHTML = '<div class="placeholder-result">No results found</div>';
            return;
        }

        searchResults.innerHTML = results.map(result => `
            <div class="result-card">
                ${result.image ? `<img src="${result.image}" alt="${result.title}" class="result-image"/>` : ''}
                <h3>${result.title}</h3>
                <p>${result.snippet}</p>
                <a href="${result.url}" target="_blank" rel="noopener noreferrer">${result.url}</a>
                ${result.timestamp ? `<span class="timestamp">Last updated: ${new Date(result.timestamp).toLocaleDateString()}</span>` : ''}
            </div>
        `).join('');
    }

    function handleError(error) {
        console.error('Search Error:', error);
        searchResults.innerHTML = `
            <div class="placeholder-result error">
                <p>An error occurred: ${error.message}</p>
                <p>Please check your API configuration and try again.</p>
            </div>
        `;
    }

    window.checkAPIConfiguration = () => {
        const configuration = {
            google: !!API_KEYS.GOOGLE_API_KEY && !!API_KEYS.GOOGLE_SEARCH_ENGINE_ID,
            gemini: !!API_KEYS.GEMINI_API_KEY,
            wikipedia: true
        };
        console.log('API Configuration Status:', configuration);
        return configuration;
    };
});