var express = require('express');
var app = express();

app.set('view engine', 'ejs');

const URL = process.env.BACKEND_URL || 'http://localhost:8000/api';

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

app.get('/', async function (req, res) {
  try {
    console.log("Fetching from:", URL);

    const response = await fetch(URL);
    console.log("Status:", response.status);

    const text = await response.text();   // 👈 raw response
    console.log("Raw response:", text);

    const json = JSON.parse(text);
    console.log("Parsed JSON:", json);

    res.render('index', { names: json.data });

  } catch (err) {
    console.error("ERROR OCCURRED 👇");
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, function () {
  console.log('Ares listening on port 3000!');
});

