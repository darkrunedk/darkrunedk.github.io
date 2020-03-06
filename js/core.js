var blacklist = ["gray_owl", "darkrunedk.github.io", "Monosolutions"];
var githubBio = $("#githubBio");

$(document).ready(function() {
	
	$(".js-anchor").on("click", function() {
		let target = this.dataset.anchor;
		$("html,body").animate({
			scrollTop: $(target).offset().top
		}, 700);
	});
	
	$.ajax({
		url: "https://api.github.com/users/darkrunedk"
	}).done(function(data) {
		$("#devname").text(data.name);
		githubBio.append("<h1>" + data.name + "</h1>");
		githubBio.append("<p>" + data.bio + "</p>");
		githubBio.append("<p><a href='" + data.blog + "' target='_blank'>My website</a></p>");
	});
	
	$.ajax({
		url: "https://api.github.com/users/darkrunedk/repos"
	}).done(function(data) {
		data.forEach(function(project) {
			var blacklisted = ($.inArray(project.name, blacklist) > -1) ? true : false;
			if (!blacklisted) {
				var div = $("<div id='" + project.name.toLowerCase() + "'>");
				div.append("<h3><a href='" + project.html_url + "' target='_blank'>" + project.name.replace("-", " ") + "</a></h3>");
				div.append("<p>" + project.description + "</p>");
				
				if (project.homepage) {
					div.append("<p><a href='" + project.homepage + "' target='_blank'>Project webpage</a></p>");
				}
				$("#project-container").append(div);
			}
		});
	});
	
	$(window).scroll(function() {
		if ($(window).scrollTop() > 100) {
			$("#info").addClass("visible");
		}
	});
});