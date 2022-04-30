let countFlippedCards = 0;
const cards = document.querySelectorAll('.memory-card');
cards.forEach(card => {
    card.addEventListener('click', flipCard)
});

function flipCard() {
    if(this.classList.contains('flipped')) return;
    ++countFlippedCards;
    if (countFlippedCards <= 2) {
        this.classList.add('flipped');
    }

    if (countFlippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.checked)');
        if (flippedCards[0].children[0].src === flippedCards[1].children[0].src) {
            console.log(1)
            flippedCards[0].classList.add('checked');
            flippedCards[1].classList.add('checked');
        }

        setTimeout(() => flipCardsBack(), 1000);
    }

}

function flipCardsBack() {
    countFlippedCards = 0;
    const flippedCards = document.querySelectorAll('.memory-card:not(.checked)');
    for (let card of flippedCards) {
        card.classList.remove('flipped');
    }
}