// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/api/:date', (req, res) => {
  let dateString = req.params.date || new Date();
  if (dateString === "") {
    dateString = new Date();
  }
  const dateNum = parseInt(dateString);
  const dateObj = new Date(dateString);
  if (isNaN(dateObj.getTime())) {
    const Dated = new Date(dateNum);
    const dates = Dated.toUTCString();
    console.log(dates);
    res.json({ unix:dateNum, utc: dates });
    
  }
  const unixTimestamp = dateObj.getTime();
  const utcString = dateObj.toUTCString();
  res.json({ unix: unixTimestamp, utc: utcString });
});


// your first API endpoint... 
app.get('/api', (req, res) => {
  let dateString = new Date();
  if (dateString === "") {
    dateString = new Date();
  }
  const dateObj = new Date(dateString);
  if (isNaN(dateObj.getTime())) {
    return res.status(400).json({ error: 'Invalid Date' });
  }
  const unixTimestamp = dateObj.getTime();
  const utcString = dateObj.toUTCString();
  res.json({ unix: unixTimestamp, utc: utcString });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
