$(function() {
  $("button").on("click", function() {
    $.ajax({
      url: "https://glacial-waters-2127.herokuapp.com/getData",
      type: "GET",
      dataType: "json",
      success: function(data) {
        $("p").text(data);
        console.log(data);
      }
    });
  });
});