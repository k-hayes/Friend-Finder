// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extendednp: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// PEOPLE DATA
// =============================================================

var waitlist = [];
var tables = [];
var pageViews = 0;

function Person(reserve_name,reserve_phone,reserve_email,reserve_uniqueID){
  this.customerName = reserve_name;
  this.customerPhone = reserve_phone;
  this.customerEmail = reserve_email;
  this.customerID = reserve_uniqueID;
}

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "survey.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "results.html"));
});

/*
// Get all characters
app.get("/all", function(req, res) {
  res.json(characters);
});
*/

//return confirmed
app.get("/api/survey", function(req, res) {
  return res.json(tables);
});
//return waiting
app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

//return pageViews
app.get("/api/pageViews", function(req, res) {
  pageViews++;
  return res.json(pageViews);
});


// Create New "Reservation" - takes in JSON input
app.post("/api/tables", function(req, res) {
  var personData = req.body;
  var newPerson = new Person(personData.customerName,personData.customerEmail,personData.phoneNumber,personData.customerID);

  var reserveSuccessful;

  if(tables.length < 5){
    tables.push(newPerson);
    reserveSuccessful = true;
  }else{
    waitlist.push(newPerson);
    reserveSuccessful = false;
  }
  res.json(reserveSuccessful);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
