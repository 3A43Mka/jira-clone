const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname+'/dist/jira-clone'));

app.get('/', function (req, res) {
    res.sendfile(path.join(__dirname+ '/dist/jira-clone/index.html'));
});

app.listen(process.env.PORT || 8080);