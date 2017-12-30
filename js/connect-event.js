// control function
function $(element_id) {
	return document.getElementById(element_id);
}


function _getdatetime() {
    var today = new Date();
    var str = "";
    var temp;

    temp =  parseInt(today.getDate());
    str +=  temp < 10 ? "0" + temp : temp;
    str += "/";
    temp = parseInt(today.getMonth()) + 1; /*Default month is 0*/
    str +=  temp < 10 ? "0" + temp : temp;
    str += "/";
    temp = parseInt(today.getFullYear());
    str +=  temp < 10 ? "0" + temp : temp;
    str += " ";


    temp =  parseInt(today.getHours());
    str +=  temp < 10 ? "0" + temp : temp;
    str += ":";
    temp = parseInt(today.getMinutes());
    str +=  temp < 10 ? "0" + temp : temp;
    str += ":";
    temp = parseInt(today.getSeconds());
    str +=  temp < 10 ? "0" + temp : temp;

    return str;
}

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

function message_add_recieve(str) {
	$("message-body").innerHTML += '<div class="msg-content msg-recieve">' + str + '<time>' + _getdatetime() + '</time></div>';
}

function message_add_send(str) {
	$("message-body").innerHTML += '<div class="msg-content msg-send">' + str + '<time>' + _getdatetime() + '</time></div>';
}

function message_send()
{
	if (MQTT_ON_CONNECTED === true) {
		var obj = new Object();
		obj.msg = $('message_text').value;
		var jsonstring = JSON.stringify(obj);
		MQTT_DATA_SEND = jsonstring;
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
var MQTT_DATA_SEND = "";
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
	obj.newuser = user_id;
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
    var str = message.payloadString;
    if (str === MQTT_DATA_SEND) {
    	message_add_send(str);
    }
    else
    {
    	message_add_recieve(str);
    }
    
	console.log("onMessageArrived: " + str);
	setTimeout(message_body_scrollDown, 100);
}
