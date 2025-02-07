document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const cardsContainer = document.getElementById('cardsContainer');
    const themeToggle = document.getElementById('themeToggle');
    let users = JSON.parse(localStorage.getItem('users')) || [];

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });

    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.add(`${savedTheme}-theme`);

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newUser = {
            id: Date.now(),
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            village: document.getElementById('village').value,
            city: document.getElementById('city').value
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        createUserCard(newUser);
        userForm.reset();
    });

    function createUserCard(user) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <h3>${user.name}</h3>
                </div>
                <div class="card-back">
                    <p><strong>Phone:</strong> ${user.phone}</p>
                    <p><strong>Village:</strong> ${user.village}</p>
                    <p><strong>City:</strong> ${user.city}</p>
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });

        cardsContainer.appendChild(card);
    }

    function loadExistingUsers() {
        cardsContainer.innerHTML = '';
        users.forEach(user => createUserCard(user));
    }

    loadExistingUsers();
});