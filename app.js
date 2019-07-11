const express = require('express');
const nunjucks = require('nunjucks');
const Posts = require('./models/posts');
const database = require('./utils/database');

const app = express()
const port = 3000

nunjucks.configure('views', {
    autoescape: false,
    express: app
});

app.use(express.static('node_modules/swiper/dist'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    Posts.random()
        .then(item => {
            Posts.attachments(item.id)
                .then(photos => {
                    res.render('index.njk', {item: item, photos: photos});
                });    
        });    
});

app.use('/', (req, res) => {
    res.status(404).render('404.njk');
});

database.connect(() => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});

