var doC = true;
var trinhdien = false;
var nhietdo_now = 0;
var doam_now = 0;

//web:status=00000000000 30 62 0 0
function status(value) {
	var pos = value.indexOf(" ");
	var role = value.substr(0, pos);
	/*
	for(var i = 0; i < role.length; i++)
	{
		if(role[i] == 0) {
			$("slider_" + (i + 1)
		}
	}
	*/
	cambien_nhietdo_doam(value.substr(pos+1, 5));
}

function cambien_nhietdo_doam(value) {
	var pos = value.indexOf(" ");
	nhietdo_now = value.substr(0, pos);
	doam_now = value.substring(pos + 1);
	console.log("nhietdo: " + nhietdo_now);
	console.log("doam: " + doam_now);
	if(doC) {
		$("cambien_nhietdo").innerHTML = nhietdo_now + "°C";
	}
	else {
		$("cambien_nhietdo").innerHTML = (nhietdo_now*1.8 + 32) + "°F";
	}
	$("cambien_doam").innerHTML = doam_now + "%";
}


function btn_nhietdo () {
	if (MQTT_ON_CONNECTED === false) {
		return alert("Please connect to MQTT server first.");
	}

	if(doC) {
		$("cambien_nhietdo").innerHTML = (nhietdo_now*1.8 + 32) + "°F";
		$("nhietdo_image").src = "./image/doF_64.png";
		doC = false;
	}
	else {
		$("cambien_nhietdo").innerHTML = nhietdo_now + "°C";
		$("nhietdo_image").src = "./image/doC_64.png";
		doC = true;
	}
}

function btn_doam() {
	if (MQTT_ON_CONNECTED === false) {
		return alert("Please connect to MQTT server first.");
	}
	$("cambien_doam").innerHTML = doam_now + "%";
}

function btn_mua() {
	if (MQTT_ON_CONNECTED === false) {
		return alert("Please connect to MQTT server first.");
	}
}

function btn_chedo() {
	if (MQTT_ON_CONNECTED === false) {
		return alert("Please connect to MQTT server first.");
	}
	if (trinhdien === false) {
		$("cambien_hoatdong").innerHTML = "Trình Diễn";
		mqtt_push("uno:homeshow", "on");
		trinhdien = true;
	}
	else {
		$("cambien_hoatdong").innerHTML = "Điều Khiển";
		mqtt_push("uno:homeshow", "off");
		trinhdien = false;
	}
}