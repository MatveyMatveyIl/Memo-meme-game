document.querySelector('input').addEventListener('change', function () {
    localStorage.setItem('cardsCount', this.value);
});

const errorMessage = document.querySelector('#errorMessage');

document.querySelector('#defaultModeButton').addEventListener("click", () => {
    let cardsCount = localStorage.getItem('cardsCount');
    if (cardsCount === null){
        cardsCount = 12;
    }
    if (cardsCount % 2 === 0){
        updateCardsCount(cardsCount);
        window.location.href = '/game';
    } else{
        errorMessage.style.opacity = '1';
    }
});
document.querySelector('#customModeButton').addEventListener("click", () => {
    let cardsCount = localStorage.getItem('cardsCount');
    if (cardsCount === null){
        cardsCount = 12;
    }
    if (cardsCount % 2 === 0){
        updateCardsCount(cardsCount);
        window.location.href = '/upload'
    }else{
        errorMessage.style.opacity = '1';
    }
});

function updateCardsCount(cardsCount){
    localStorage.clear();
    localStorage.setItem('cardsCount', cardsCount);
}
