const express = require('express');

const app = express();
const port = process.env.PORT || 3001;

//SETTING CORS
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
}
app.use(allowCrossDomain);

app.get('/server', (req, res) => {
    res.send('from server')
});

app.listen(port, () => {
    console.log(`Server is up at port ${port}`);
});

module.exports = { app }