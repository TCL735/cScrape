$(function() {
  $("button").on("click", function() {
    $.ajax({
      url: "/grabData",
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