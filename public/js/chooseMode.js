document.querySelector('input').addEventListener('change', function () {
    localStorage.setItem('cardsCount', this.value);
});

document.querySelector('#defaultModeButton').addEventListener("click", () => {
    const cardsCount = localStorage.getItem('cardsCount');
    localStorage.clear();
    localStorage.setItem('cardsCount', cardsCount);
    window.location.href = '/game';
});
document.querySelector('#customModeButton').addEventListener("click", () => {
    window.location.href = '/upload'
});
