const express = require('express');
const app = express();
const PORT = process.env.PORT || 80

app.use(function (request, response) {
    response.sendFile(__dirname + '/game/public/html/gameStart.html');
});

app.listen(PORT);