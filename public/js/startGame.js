const users = [];

const loginForm = document.querySelector('#loginForm');
const loginMessage = document.querySelector('#loginMessage');

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login(loginForm.username.value);
});

function login(username) {
    if (username === ''){
        loginMessage.style.opacity = '1';
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
