document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const showAllBtn = document.getElementById('showAllBtn');
    const phoneResults = document.getElementById('phoneResults');
    const phoneModal = document.getElementById('phoneModal');
    const phoneDetails = document.getElementById('phoneDetails');
    const closeBtn = document.querySelector('.close-btn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const themeToggle = document.getElementById('themeToggle');

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    async function searchPhones(query) {
        try {
            showLoading();
            const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${query}`);
            const data = await response.json();
            hideLoading();
            return data.data;
        } catch (error) {
            console.error('Error fetching phones:', error);
            hideLoading();
            return [];
        }
    }

    async function getPhoneDetails(id) {
        try {
            showLoading();
            const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
            const data = await response.json();
            hideLoading();
            return data.data;
        } catch (error) {
            console.error('Error fetching phone details:', error);
            hideLoading();
            return null;
        }
    }

    function displayPhones(phones) {
        phoneResults.innerHTML = '';
        phones.forEach(phone => {
            const phoneCard = document.createElement('div');
            phoneCard.className = 'phone-card';
            phoneCard.innerHTML = `
                <img src="${phone.image}" alt="${phone.phone_name}">
                <h3>${phone.phone_name}</h3>
                <p>${phone.brand}</p>
            `;
            phoneCard.addEventListener('click', () => showPhoneDetails(phone.slug));
            phoneResults.appendChild(phoneCard);
        });
    }

    async function showPhoneDetails(phoneId) {
        const details = await getPhoneDetails(phoneId);
        if (details) {
            phoneDetails.innerHTML = `
                <div style="text-align: center; margin-bottom: 2rem;">
                    <img src="${details.image}" alt="${details.name}" style="max-width: 200px;">
                    <h2 style="margin: 1rem 0;">${details.name}</h2>
                </div>
                <div style="display: grid; gap: 1rem;">
                    <p><strong>Brand:</strong> ${details.brand}</p>
                    <p><strong>Release Date:</strong> ${details.releaseDate || 'Not available'}</p>
                    <p><strong>Storage:</strong> ${details.mainFeatures?.storage || 'Not available'}</p>
                    <p><strong>Display Size:</strong> ${details.mainFeatures?.displaySize || 'Not available'}</p>
                    <p><strong>Chipset:</strong> ${details.mainFeatures?.chipSet || 'Not available'}</p>
                    <p><strong>Memory:</strong> ${details.mainFeatures?.memory || 'Not available'}</p>
                    <p><strong>Sensors:</strong> ${details.mainFeatures?.sensors?.join(', ') || 'Not available'}</p>
                </div>
            `;
            phoneModal.style.display = 'block';
        }
    }

    function showLoading() {
        loadingSpinner.style.display = 'flex';
    }

    function hideLoading() {
        loadingSpinner.style.display = 'none';
    }

    searchBtn.addEventListener('click', async () => {
        const query = searchInput.value.trim();
        if (query) {
            const phones = await searchPhones(query);
            displayPhones(phones);
        }
    });

    searchInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                const phones = await searchPhones(query);
                displayPhones(phones);
            }
        }
    });

    showAllBtn.addEventListener('click', async () => {
        const phones = await searchPhones('a');
        displayPhones(phones);
    });

    closeBtn.addEventListener('click', () => {
        phoneModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === phoneModal) {
            phoneModal.style.display = 'none';
        }
    });

    showAllBtn.click();
});