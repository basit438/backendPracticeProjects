const express = require('express');

const app = express();
const Path = require('path');
app.use(express.json());
app.use (express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(Path.join(__dirname, 'public')));

app.get('/', (req, res) =>{
    res.render('index');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})