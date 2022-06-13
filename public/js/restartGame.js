document.querySelector("#gameStartButton").addEventListener("click", () => {
    window.location.href = '/game';
});

document.querySelector("#toChooseModeButton").addEventListener("click", () => {
    localStorage.clear();
    localStorage.setItem('cardsCount', 12);
    window.location.href = '/mode';
})