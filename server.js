const express = require('express');
const path = require('path');
const logfmt = require('logfmt');
const app = express();

app.use(logfmt.requestLogger());
app.use('/', express.static(path.resolve(__dirname + '/dist')));

app.listen(Number(process.env.PORT || 5000));
