$(document).ready(function() {
  $.ajax({
    url: "https://api.github.com/users/darkrunedk/repos"
  }).done(function(data) {
    for (var i = 0; i < data.length; i++) {
      console.log("Number " + i + ": " + data[i]);
    }
    //$("#projects").append()
  });
});
