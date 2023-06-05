
const express = require('express')
const {join} = require("path");
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('pages/index');
})
cd
app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/views/pages/404.ejs');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
