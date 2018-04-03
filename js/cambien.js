var doC = true;
var trinhdien = false;
var nhietdo_now = 0;
var doam_now = 0;

//web:status=00001000000 30 62 0 1
function status(value) {
	var pos = value.indexOf(" ");

	var role = value.substr(0, pos);
	for(var i = 0; i < role.length; i++)
	{
		if(role[i] == 0) {
			$("slider_" + (i + 1)).checked = false;
		}
		else if(role[i] == 1) {
			$("slider_" + (i + 1)).checked = true;
		}
	}
	cambien_nhietdo_doam(value.substr(pos+1, 5));

	pos = value.lastIndexOf(" ");
	var mua = value.substr(pos - 1, 1);
	var chedo = value.substr(pos + 1, 1);

	if(mua === "1") {
		$("cambien_mua").innerHTML = "Trời đang mưa";
	}
	else {
		$("cambien_mua").innerHTML = "Không mưa";
	}

	if(chedo === "1") {
		$("cambien_hoatdong").innerHTML = "Trình Diễn";
		trinhdien = true;
	}
	else {
		$("cambien_hoatdong").innerHTML = "Điều Khiển";
		trinhdien = false;
	}
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

function all_role_on() {
	if (MQTT_ON_CONNECTED === false) {
		return alert("Please connect to MQTT server first.");
	}
	mqtt_push("uno:all_role", "on");
	for(var i = 1; i <= 11; i++) {
		$("slider_" + i).checked = true;
	}
}

function all_role_off() {
	if (MQTT_ON_CONNECTED === false) {
		return alert("Please connect to MQTT server first.");
	}
	mqtt_push("uno:all_role", "off");
	for(var i = 1; i <= 11; i++) {
		$("slider_" + i).checked = false;
	}
}

function all_role_auto() {
	if (MQTT_ON_CONNECTED === false) {
		return alert("Please connect to MQTT server first.");
	}
	setTimeout(nhamohinh_autosang, 20);
}

var nhamohinh_autosang_roleid = 4;
function nhamohinh_autosang() {
	mqtt_push("uno:role" + nhamohinh_autosang_roleid, "on");
	$("slider_" + (nhamohinh_autosang_roleid + 1)).checked = true;
	nhamohinh_autosang_roleid++;
	if(nhamohinh_autosang_roleid < 11) {
		setTimeout(nhamohinh_autosang, 1500);
	}
	else {
		nhamohinh_autosang_roleid = 4;
	}
}

function all_role_refresh() {
	if (MQTT_ON_CONNECTED === false) {
		return alert("Please connect to MQTT server first.");
	}
	mqtt_push("uno:system", "working_status");
	for(var i = 1; i <= 11; i++) {
		$("slider_" + i).checked = false;
	}
	$("cambien_nhietdo").innerHTML = "collecting...";
	$("cambien_doam").innerHTML = "collecting...";
	$("cambien_mua").innerHTML = "collecting...";
	$("cambien_hoatdong").innerHTML = "collecting...";
}