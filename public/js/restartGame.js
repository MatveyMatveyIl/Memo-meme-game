document.querySelector("#gameStartButton").addEventListener("click", () => {
    const cardsCount = localStorage.getItem('cardsCount');
    localStorage.clear();
    localStorage.setItem('cardsCount', cardsCount);
    localStorage.setItem('score', '0')
    window.location.href = '/game';
});
