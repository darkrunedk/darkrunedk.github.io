var blacklist = ["gray_owl", "darkrunedk.github.io", "Monosolutions", "darkrunedk"];
const validTopics = ["component", "php", "javascript"];
var githubBio = $("#githubBio");

var topics = new Array();
topics["random-stuff"] = new Array();

function selectTopic(e) {
	let topicName = e.target.innerText.toLowerCase();
	let topic = topics[topicName];
	
	$("#project-container").html("");

	topic.forEach(function(project) {
		var div = $("<div id='" + project.name.toLowerCase() + "'>");
		div.append("<h3><a href='" + project.html_url + "' target='_blank'>" + project.name.replace("-", " ") + "</a></h3>");
		if (project.description) {
			div.append("<p>" + project.description + "</p>");
		}
		
		if (project.homepage) {
			div.append("<p><a href='" + project.homepage + "' target='_blank'>Project webpage</a></p>");
		}
		$("#project-container").append(div);
	});
}

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

				let topic;

				let hasValidTopic = false;
				for(let topicIndex in project.topics) {
					if (hasValidTopic) {
						break;
					}

					topic = project.topics[topicIndex];
					console.log(topic);
					if (!hasValidTopic){
						hasValidTopic = ($.inArray(topic, validTopics) > -1) ? true : false;
					}
				}

				if (hasValidTopic) {
					if (topics[topic]) {
						topics[topic].push(project);
					} else {
						topics[topic] = new Array(project);
					}
				} else {
					topics["random-stuff"].push(project);
				}
			}
		});

		var nav = document.createElement("ul");

		Object.entries(topics).forEach(([key, value]) => {
			var navEl = document.createElement("li");
			var link = document.createElement("a");
			link.href = "javascript:void(0);";
			link.onclick = selectTopic;
			link.innerText = key;
			navEl.appendChild(link);
			nav.appendChild(navEl);
		});

		$("#topic-container").append(nav);
	});
	
	$(window).scroll(function() {
		if ($(window).scrollTop() > 100) {
			$("#info").addClass("visible");
		}
	});
});