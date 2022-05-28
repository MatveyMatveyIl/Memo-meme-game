const users = [
    {
        username: 'admin',
        password: 'admin',
        isAdmin: true,
        score: 0
    }
];

function setCookie(key, value)
{
    document.cookie= key + "=" + value;
}

function setCookies(username, isAdmin){
    setCookie("username", username);
    setCookie("isAdmin", isAdmin);
}

const loginForm = document.querySelector('#loginForm');
const loginMessage = document.querySelector('#loginMessage');

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = loginForm.username.value;

    if (username !== 'admin'){
        loginWithUser(username);
    } else {
        loginWithAdmin();
    }
});

function startGame(username){
    setCookies(username, false);
    window.location.href = '/game';
}

function loginWithUser(username) {
    if (username === ''){
        loginMessage.style.opacity = '1';
        loginMessage.innerHTML = 'Введите имя длиннее чем 0 символов';
    }
    else{
        let user = {
            username: username,
            isAdmin: false,
            score: 0
        }
        users.push(user);
        startGame(username);
    }
}

function loginWithAdmin() {
    const password = loginForm.password.value;

    if (password === ''){
        loginMessage.style.opacity = '1';
        document.querySelector('#password').style.opacity = '1';
    }

    else {
        if (password === 'admin'){
            startGame('admin');
        } else{
            loginMessage.innerHTML = 'Неверный пароль';
        }
    }
}