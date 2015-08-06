var express = require("express");
var fs = require("fs");
var http = require("http");
var CronJob = require("cron").CronJob;

var app = express();


var parser = require("body-parser");
var phantom = require("phantom");


app.set("port", (process.env.PORT || 3030));

app.use(parser.json());

app.use(express.static(__dirname + "/client"));



app.get("/funTest", function(req, res) {
  phantom.create(function(ph) {
    ph.createPage(function(page) {
      page.open("http://blog.arisetyo.com/", function(status) {
        console.log("opened Page?", status);
        page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js", function(){
          setTimeout(function() {
            return page.evaluate(function() {

              var actualResults = [];
              var text = $(".entry-title").children().first().text();
              actualResults.push(text);
              return text;

            }, function(result) {
              console.log(result);
              ph.exit()
              fs.writeFile('data.js', JSON.stringify(result), function(err) {
                if (err) throw err;
                console.log("Data saved!");
              })
              res.json(result);
            });
          }, 2000);
        });
      });
    });
  });
});



app.get("/grabData", function(req, res) {
  fs.readFile('data.js', 'utf8', function(err, data) {
    res.json(data);
  });
});



var job = new CronJob({
  cronTime: '00 02 02 * * 0-6',
  onTick: function() {

    phantom.create(function(ph) {
      ph.createPage(function(page) {
        page.open("XXXXXXXXXXXXXXXX", function(status) {
          console.log("opened Page?", status);
          page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js", function(){
            setTimeout(function() {
              return page.evaluate(function() {
                //logging into account
                $("#user_email").val("XXXXXXXXXXX");
                $("#user_password").val("XXXXXXXXXXXX");
                $("input").last().click();

              }, function(result1) {
                console.log("Logged In");
                setTimeout(function() {
                  return page.evaluate(function() {
                    $(".remove-filter.delete")[1].click();

                  }, function(result2) {
                    console.log("Removed Filter");
                    setTimeout(function() {
                      return page.evaluate(function() {
                        var stopMe = setInterval(function() {
                          document.body.scrollTop = document.body.scrollHeight;
                        }, 2300);
                        return stopMe;
                      }, function(result3) {
                        console.log("result3: ", result3);
                        console.log("Scrolling Initiated");
                        setTimeout(function() {
                          return page.evaluate(function(result3) {

                            clearInterval(result3);
                          }, function(result4) {
                            console.log("scrolling finished")

                            setTimeout(function() {
                              return page.evaluate(function() {

                                $(".fbw9").click();


                                var results = [];

                                var jobsPerCompany = $(".details-row.jobs");

                                for (var i = 0; i < jobsPerCompany.length; i++) {
                                  results.push({
                                    companyName: $(jobsPerCompany[i]).closest(".details").prev().prev().find("a").first().text(),
                                    jobsPerCompany: []
                                  });

                                  var arrayOfJobsForIndividualCompany = $(jobsPerCompany[i]).find(".listing-row"); 

                                  for (var j = 0; j < arrayOfJobsForIndividualCompany.length; j++) {
                                    var jobFinder = $(arrayOfJobsForIndividualCompany[j]);
                                    results[i].jobsPerCompany.push({
                                      jobTitle: jobFinder.find("a").first().text(),
                                      jobSalary: jobFinder.find(".compensation").text(),
                                      jobURL: jobFinder.find("a").first().attr("href"),
                                      jobInfo: jobFinder.find(".tags").text()
                                    });
                                  }
                                }
                                return JSON.stringify(results);                                        

                              }, function(result5) {
                                ph.exit();
                                fs.writeFile('data.js', JSON.stringify(result5), function(err) {
                                  if (err) throw err;
                                  console.log("Data saved!");
                                })
                              });  
                            }, 3000);
                          })
                        }, 751000);
                      });
                    }, 2000)
                  });
                }, 2000);
              });
            }, 3000);
          });
        });
      });
    });


  },
  start: false,
  timeZone: "America/Los_Angeles"
});


var theRequester = new CronJob({
  cronTime: '00 05 02 * * 0-6',
  onTick: function() {

    var stopRequests = setInterval(function() {
      http.get("XXXXXXXXXXX", function(res) {
        console.log("Pinged the server");
      }).on("error", function(e) {
        console.log("Error: " + e.message);
      });
    }, 300000);

    setTimeout(function() {
      clearInterval(stopRequests);
    }, 4600000);

  },
  start: false,
  timeZone: "America/Los_Angeles"
});




job.start();

theRequester.start();


app.listen(app.get("port"), function() {
  console.log("Server is running!");
}); 


