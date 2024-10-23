const animals = [
    'cat', 'dog', 'elephant', 'fox', 'giraffe', 'lion', 'monkey', 'panda',
    'cat', 'dog', 'elephant', 'fox', 'giraffe', 'lion', 'monkey', 'panda'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createGameBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';  // Clear the board

    shuffle(animals);

    animals.forEach(animal => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.animal = animal;

        const img = document.createElement('img');
        img.src = `images/${animal}.jpg`;
        img.alt = animal;

        card.appendChild(img);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return; // Prevent clicking if the board is locked
    if (this === firstCard) return; // Prevent double click on the same card

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch();
    }
}

function checkForMatch() {
    const isMatch = firstCard.dataset.animal === secondCard.dataset.animal;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

document.getElementById('restartButton').addEventListener('click', createGameBoard);

// Initialize the game
createGameBoard();
