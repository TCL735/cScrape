var express = require("express");
var app = express();


var parser = require("body-parser");
var phantom = require("phantom");


app.set("port", (process.env.PORT || 3030));

app.use(parser.json());

app.use(express.static(__dirname + "/client"));

app.get("/test", function(req, res) {

    phantom.create(function(ph) {
      ph.createPage(function(page) {
        page.open("http://blog.arisetyo.com/", function(status) {

          page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js", function(){
            setTimeout(function() {
              return page.evaluate(function() {

                var actualResults = [];
                var text = $(".entry-title").children().first().text();
                actualResults.push(text);
                return text;

              }, function(result) {
                ph.exit()
                res.json(result);
              });
            }, 2000);
          });
        });
      });
    });

});

app.listen(app.get("port"), function() {
  console.log("Server is running!");
}); 