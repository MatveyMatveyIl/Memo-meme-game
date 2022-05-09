const express = require('express');
const app = express();
const PORT = process.env.PORT || 80

app.use("/", function(request, response){

    response.send("<h1>memo meme kekw <3</h1>");
});

app.listen(PORT);