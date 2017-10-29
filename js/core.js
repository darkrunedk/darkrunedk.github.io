var blacklist = ["gray_owl"];

$(document).ready(function() {
  $.ajax({
    url: "https://api.github.com/users/darkrunedk/repos"
  }).done(function(data) {
    for (var i = 0; i < data.length; i++) {
      var obj = data[i];

      var blacklisted = ($.inArray(obj.name, blacklist) > -1) ? true : false;
      if (!blacklisted) {
        var div = $("<div id='" + obj.name.toLowerCase() + "'>");
        div.append("<h3><a href='" + obj.html_url + "' target='_blank'>" + obj.name + "</a></h3>");
        div.append("<p>" + obj.description + "</p>");

        if (obj.homepage) {
          div.append("<p><a href='" + obj.homepage + "' target='_blank'>Homepage</a></p>");
        }

        $("#project-container").append(div);
      } else {
        continue;
      }
      //console.log(div);
    }
    //$("#projects").append()
  });
});
