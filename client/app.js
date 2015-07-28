$(function() {
  $("button").on("click", function() {
    $.ajax({
      url: "https://glacial-waters-2127.herokuapp.com/grabData",
      type: "GET",
      dataType: "json",
      success: function(data) {
        $("p").text(data);
        console.log(data);
      },
      error: function(err, blah, ok) {
        console.log(err);
        console.log(blah);
        console.log(ok);
      }
    });
  });
});