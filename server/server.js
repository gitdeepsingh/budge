const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

//SETTING CORS
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
}
app.use(allowCrossDomain);

app.use(bodyParser.json());

app.post('/registration', (req, res) => {
    res.json(req.body);
});

app.listen(port, () => {
    console.log(`Server is up at port ${port}`);
});

module.exports = { app }