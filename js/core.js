$(document).ready(function() {
  $.ajax({
    url: "https://api.github.com/users/darkrunedk/repos"
  }).done(function(data) {
    console.log(data);
  });
});
