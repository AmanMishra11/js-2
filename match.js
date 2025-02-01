document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.game-board');
    const attemptsDisplay = document.getElementById('attempts');
    const restartButton = document.getElementById('restart');
    
    const cardImages = [
        'https://api.iconify.design/logos:python.svg',
        'https://api.iconify.design/logos:javascript.svg',
        'https://api.iconify.design/logos:react.svg',
        'https://api.iconify.design/logos:nodejs.svg',
        'https://api.iconify.design/logos:vue.svg',
        'https://api.iconify.design/logos:angular.svg',
    ];
    
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let attempts = 0;
    
    function createCards() {
        const cardPairs = [...cardImages, ...cardImages];
        gameBoard.innerHTML = '';
        
        cardPairs.sort(() => Math.random() - 0.5);
        
        cardPairs.forEach((image, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.value = image;
            
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front"></div>
                    <div class="card-back">
                        <img src="${image}" alt="Card Image">
                    </div>
                </div>
            `;
            
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }
    
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        
        this.classList.add('flipped');
        
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
        
        secondCard = this;
        checkForMatch();
    }
    
    function checkForMatch() {
        attempts++;
        attemptsDisplay.textContent = attempts;
        
        let isMatch = firstCard.dataset.value === secondCard.dataset.value;
        
        if (isMatch) {
            disableCards();
            addMatchedEffect();
            checkWin();
        } else {
            unflipCards();
        }
    }
    
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
    }
    
    function unflipCards() {
        lockBoard = true;
        
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1500);
    }
    
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }
    
    function addMatchedEffect() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
    }
    
    function checkWin() {
        const matchedCards = document.querySelectorAll('.matched');
        if (matchedCards.length === cardImages.length * 2) {
            setTimeout(() => {
                alert(`Congratulations! You won in ${attempts} attempts!`);
            }, 500);
        }
    }
    
    function restartGame() {
        attempts = 0;
        attemptsDisplay.textContent = attempts;
        resetBoard();
        createCards();
    }

    restartButton.addEventListener('click', restartGame);

    createCards();
});