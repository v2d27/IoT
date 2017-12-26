function gotoBottom(id){
	var element = document.getElementById(id);
	for(var i = 0; i <= element.clientHeight; i++)
	{
		element.scrollTop = element.scrollHeight - i;
	}
}

function message_body_scrollDown()
{
	var element = document.getElementById("message-body");
	element.scrollTop = element.scrollHeight - element.clientHeight;
	console.log("scrollHeight...");
}


document.getElementById("btn_message_send").onclick = function () {
	setTimeout(message_body_scrollDown, 100);
}