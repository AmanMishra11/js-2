document.addEventListener('DOMContentLoaded', () => {
    const playerForm = document.getElementById('playerForm');
    const leaderboardBody = document.getElementById('leaderboardBody');
    let players = [];

    playerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const country = document.getElementById('country').value;
        const score = parseInt(document.getElementById('score').value);

        const newPlayer = {
            firstName,
            lastName,
            country,
            score,
            timestamp: new Date().toLocaleString(),
            id: Date.now()
        };
        
        players.push(newPlayer);

        updateLeaderboard();

        playerForm.reset();
    });

    function updateLeaderboard() {

        players.sort((a, b) => b.score - a.score);

        leaderboardBody.innerHTML = '';

        players.forEach((player, index) => {
            const row = document.createElement('tr');
            row.classList.add('new-row');
            
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${player.firstName}</td>
                <td>${player.lastName}</td>
                <td>${player.country}</td>
                <td class="score-cell">${player.score}</td>
                <td>${player.timestamp}</td>
                <td>
                    <button class="btn-score btn-plus" onclick="updateScore(${player.id}, 5)">+5</button>
                    <button class="btn-score btn-minus" onclick="updateScore(${player.id}, -5)">-5</button>
                    <button class="btn-score btn-delete" onclick="deletePlayer(${player.id})">Delete</button>
                </td>
            `;
            
            leaderboardBody.appendChild(row);
        });
    }

    window.updateScore = (playerId, change) => {
        const playerIndex = players.findIndex(p => p.id === playerId);
        if (playerIndex !== -1) {
            players[playerIndex].score += change;

            const row = leaderboardBody.children[playerIndex];
            const scoreCell = row.querySelector('.score-cell');
            scoreCell.classList.add('score-changed');

            setTimeout(() => {
                scoreCell.classList.remove('score-changed');
            }, 300);
            
            updateLeaderboard();
        }
    };

    window.deletePlayer = (playerId) => {
        const playerIndex = players.findIndex(p => p.id === playerId);
        if (playerIndex !== -1) {
            const row = leaderboardBody.children[playerIndex];
            row.style.animation = 'fadeIn 0.5s ease-out reverse';

            setTimeout(() => {
                players = players.filter(p => p.id !== playerId);
                updateLeaderboard();
            }, 500);
        }
    };
});