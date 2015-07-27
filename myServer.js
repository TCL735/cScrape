var express = require("express");
var app = express();


var parser = require("body-parser");



app.set("port", (process.env.PORT || 3030));

app.use(parser.json());

app.use(express.static(__dirname + "/client"));

app.get("/test", function(req, res) {
  res.json("THIS WAS ON THE SERVER!!");
});

app.listen(app.get("port"), function() {
  console.log("Server is running!");
}); 