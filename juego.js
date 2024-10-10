const gameContainer = document.getElementById('game-container');
const resetButton = document.getElementById('reset');

// Cambia las rutas de las imágenes según donde las tengas
const cardImages = [
    'tiburoncin.jpg',
    'tiburoncin.jpg',
    'dragon.jpg',
    'dragon.jpg',
    'mono.jpg',
    'mono.jpg',
    'speed.jpg',
    'speed.jpg'
];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;

function initGame() {
    // Mezclar las cartas
    cards = cardImages.sort(() => Math.random() - 0.5);
    gameContainer.innerHTML = '';
    matchedPairs = 0;

    cards.forEach((imageSrc) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = imageSrc;

        // Crea la imagen
        const img = document.createElement('img');
        img.src = imageSrc;
        card.appendChild(img);
        
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    });
}

function flipCard(event) {
    const card = event.currentTarget;

    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        const img = card.querySelector('img');
        img.style.display = 'block';
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.image === card2.dataset.image) {
        matchedPairs++;
        if (matchedPairs === cardImages.length / 2) {
            alert('¡Has encontrado todas las parejas!');
        }
    } else {
        card1.classList.remove('flipped');
        card1.querySelector('img').style.display = 'none';
        card2.classList.remove('flipped');
        card2.querySelector('img').style.display = 'none';
    }
    flippedCards = [];
}

resetButton.addEventListener('click', initGame);
initGame();
