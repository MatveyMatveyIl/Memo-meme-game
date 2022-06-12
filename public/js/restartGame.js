document.querySelector("#gameStartButton").addEventListener("click", () => {
    const cardsCount = localStorage.getItem('cardsCount');
    localStorage.clear();
    localStorage.setItem('cardsCount', cardsCount);
    window.location.href = '/game';
});
