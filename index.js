const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

app.set('views', './views');
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('gameStart');
});

app.get('/mode', (req, res) => {
    res.render('modeChoice');
});

app.get('/upload', (req, res) => {
    res.render('uploadingCards');
});

app.get('/game', (req, res) => {
    res.render('indexGame');
});

app.get('/gameover', (req, res) => {
    res.render('loseGame');
});

app.get('/win', (req, res) => {
    res.render('finishGame');
});


app.listen(PORT);