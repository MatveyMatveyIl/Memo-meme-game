document.querySelector("#gameStartButton").addEventListener("click", () => {
    const cardsCount = localStorage.getItem('cardsCount');
    updateCardsCount(cardsCount);
    window.location.href = '/game';
});

document.querySelector("#toChooseModeButton").addEventListener("click", () => {
    updateCardsCount(12);
    window.location.href = '/mode';
})

function updateCardsCount(cardsCount){
    localStorage.clear();
    localStorage.setItem('cardsCount', cardsCount);
}
