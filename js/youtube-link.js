function youtube_load() {
	console.log("Loading link: " + $("youtube-link").value);
	$("youtube-frame").src = $("youtube-link").value;
}

function youtube_hide() {
	$("youtube-control").style.display = "none";
}