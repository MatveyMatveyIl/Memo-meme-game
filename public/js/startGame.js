const users = [];

const loginForm = document.querySelector('#loginForm');
const errorMessage = document.querySelector('#errorMessage');

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login(loginForm.username.value);
});

window.onload = function () {
    localStorage.setItem('cardsCount', 12)
}

function login(username) {
    if (username === ''){
        errorMessage.style.opacity = '1';
    }
    else{
        let user = {
            username: username,
            score: 0
        }
        users.push(user);
        document.cookie= "username=" + username;
        window.location.href = '/mode';
    }
}
