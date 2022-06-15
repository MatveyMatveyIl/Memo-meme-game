document.querySelector('select').addEventListener('change', function () {
    localStorage.setItem('cardsCount', this.value);
});

document.querySelector('#defaultModeButton').addEventListener("click", () => {
    let cardsCount = localStorage.getItem('cardsCount');
    if (cardsCount === null){
        cardsCount = 12;
    }
    updateCardsCount(cardsCount);

    window.location.href = '/game';
});

document.querySelector('#customModeButton').addEventListener("click", () => {
    let cardsCount = localStorage.getItem('cardsCount');
    if (cardsCount === null){
        cardsCount = 12;
    }
    updateCardsCount(cardsCount);
    window.location.href = '/upload';
});

function updateCardsCount(cardsCount){
    localStorage.clear();
    localStorage.setItem('cardsCount', cardsCount);
}
