// control function
function $(element_id) {
	return document.getElementById(element_id);
}

function message_send()
{
	if (MQTT_ON_CONNECTED === true) {
		var obj = new Object();
		obj.msg = $('message_text').value;
		var jsonstring = JSON.stringify(obj);
		mqtt_push(jsonstring);
	}
	else
	{
		alert("Network connction is lost. Please reconnect...");
	}
}

function btn_server()
{
	$("btn_connect_server").innerHTML = "Connecting...";
	$("btn_connect_server").style.backgroundColor = '#555555';
	client.connect(options);
}

function esp8266_device()
{
	if (MQTT_ON_CONNECTED === true) {
		$("btn_connect_esp8266").innerHTML = "Connecting...";
		$("btn_connect_esp8266").style.backgroundColor = '#555555';
		console.log("connecting to esp866...");
	}
	else
	{
		alert("MQTT connection is losted. Please reconnect...");
	}
}

var user_id = "id_" + parseInt(Math.random() * 1000000, 10).toString();
var MQTT_ON_CONNECTED = false;
client = new Paho.MQTT.Client("m14.cloudmqtt.com", 30982, user_id);
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
var options = {
	useSSL: true,
	userName: "lffknbep",
	password: "a1MJ1J3WSCbm",
	onSuccess:onConnect,
	onFailure:onFailed
}

function mqtt_push(mqtt_data)
{
	message = new Paho.MQTT.Message(mqtt_data);
	message.destinationName = "client_user";
	client.send(message);
}

function onConnect() {
	// Once a connection has been made, make a subscription and send a message.
	console.log("onConnect");
	client.subscribe("client_user");
	MQTT_ON_CONNECTED = true;

	var obj = new Object();
	obj.newconnect = user_id;
	var jsonstring = JSON.stringify(obj);
	mqtt_push(jsonstring);

	$("btn_connect_server").style.backgroundColor = '#22ac3c';
	$("btn_connect_server").innerHTML = "Connected";
}
//Make connection failed
function onFailed(e){
	MQTT_ON_CONNECTED = false;
	console.log(e);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
		console.log("onConnectionLost:" + responseObject.errorMessage);
		$("btn_connect_server").style.backgroundColor = '#bd0000e6';
		$("btn_connect_server").innerHTML = "Reconnect to MQTT";
		alert("onConnectionLost: " + responseObject.errorMessage);
	}
}
// called when a message arrives
function onMessageArrived(message) {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = m >= 10 ? m : "0" + m;
    s = s >= 10 ? s : "0" + s;
    var str = h + ":" + m + ":" + s + " > " + message.payloadString;
    $('id_message_arrive').innerHTML += str + "<br>";
	console.log("onMessageArrived " + str);
}
