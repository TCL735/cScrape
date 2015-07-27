$(function() {
  $("button").on("click", function() {
    $.ajax({
      url: "https://shrouded-springs-6501.herokuapp.com/test",
      type: "GET",
      dataType: "json",
      success: function(data) {
        $("p").text(data);
        console.log(data);
      }
    });
  });
});