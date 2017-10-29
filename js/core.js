$(document).ready(function() {
  $.ajax({
    url: "https://api.github.com/users/darkrunedk/repos"
  }).done(function(data) {
    data.each(function(k,v) {
      console.log(k, v);
    });
    //$("#projects").append()
  });
});
