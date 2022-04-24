function openCard(cardId) {
    let closedCard = document.querySelector(`#closedCard${cardId}`)
    closedCard.style.visibility = "hidden";
    let openedCard = document.querySelector(`#openedCard${cardId}`)
    openedCard.style.visibility = "visible";
}