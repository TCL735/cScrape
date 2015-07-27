var express = require("express");
var app = express();


var parser = require("body-parser");



app.set("port", (process.env.PORT || 3030));

app.use(parser.json());

app.use(express.static(__dirname + "/client"));

app.listen(app.get("port"), function() {
  console.log("Server is running!");
});