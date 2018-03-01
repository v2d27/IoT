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
		var message_command = $("message_command").value;
		var message_command_value = $("message_command_value").value;
		mqtt_push(message_command, message_command_value);
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
		if (ESP8266_ON_CONNECTED === false) {
			$("btn_connect_esp8266").innerHTML = "Đang kết nối...";
			$("btn_connect_esp8266").style.backgroundColor = '#555555';
			console.log("connecting to esp866...");
			mqtt_push("esp8266", "request_connect");
			setTimeout(esp8266_device_callback, 5000);
		}
		else
		{
			alert("Đã kết nối đến ESP8266 thành công!");
		}
	}
	else
	{
		alert("MQTT connection is losted. Please reconnect...");
	}
}

function esp8266_device_callback()
{
	if (MQTT_ON_CONNECTED === true) {
		if (ESP8266_ON_CONNECTED === false) {
			$("btn_connect_esp8266").innerHTML = "Kết nối không thành công";
			$("btn_connect_esp8266").style.backgroundColor = '#bd0000e6';
			console.log("Can not connect to ESP8266 device.");
			alert("Không thể kết nối đến thiết bị ESP8266. Vui lòng kiểm tra và kết nối lại.");
		}
	}
	else
	{
		alert("MQTT connection is losted. Please reconnect...");
	}
}

function esp8266_device_received(value)
{
	if (value === "success") {
		ESP8266_ON_CONNECTED = true;
		$("btn_connect_esp8266").style.backgroundColor = '#22ac3c';
		$("btn_connect_esp8266").innerHTML = "Đã kết nối";
	}
	else
	{
		ESP8266_ON_CONNECTED = false;
		$("btn_connect_esp8266").innerHTML = "Kết nối không thành công";
		$("btn_connect_esp8266").style.backgroundColor = '#bd0000e6';
		console.log("Can not connect to ESP8266 device.");
		alert("Không thể kết nối đến thiết bị ESP8266. Vui lòng kiểm tra và kết nối lại.");
	}
}

function esp8266_testing_device()
{
	if (MQTT_ON_CONNECTED === true) {
		if (ESP8266_ON_CONNECTED === true) {
			ESP8266_WORKING_STATUS = false;
			$("btn_device_test").innerHTML = "Đang kiểm tra...";
			$("btn_device_test").style.backgroundColor = '#555555';
			console.log("testing ESP8266 device...");
			mqtt_push("esp8266", "working_status");
			setTimeout(esp8266_testing_device_callback, 5000);
		}
		else
		{
			alert("Không thể kết nối đến thiết bị ESP8266. Vui lòng kiểm tra và kết nối lại trước khi kiểm tra thiết bị.");
		}
	}
	else
	{
		alert("MQTT connection is losted. Please reconnect...");
	}
}

function esp8266_testing_device_callback()
{
	if (ESP8266_WORKING_STATUS === false) {
		$("btn_device_test").innerHTML = "Không hoạt động";
		$("btn_device_test").style.backgroundColor = '#bd0000e6';
	}
}

function esp8266_testing_device_received(value)
{
	if (value == "ok") {
		ESP8266_WORKING_STATUS = true;
		$("btn_device_test").style.backgroundColor = '#22ac3c';
		$("btn_device_test").innerHTML = "Hoạt động trong tình trạng tốt";
	}
	else
	{
		$("btn_device_test").style.backgroundColor = '#b72fa6';
		$("btn_device_test").innerHTML = "Trạng thái: " + value;
	}
}

var user_id = "id_" + parseInt(Math.random() * 1000000, 10).toString();
var MQTT_ON_CONNECTED = false;
var ESP8266_ON_CONNECTED = false;
var ESP8266_WORKING_STATUS = false;
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

function onConnect() {
	// Once a connection has been made, make a subscription and send a message.
	console.log("onConnect");
	console.log("subscribe topic: " + $("topic_subscribe").value);
	client.subscribe($("topic_subscribe").value);
	console.log("subscribe topic: " + $("topic_publish").value);
	client.subscribe($("topic_publish").value);
	MQTT_ON_CONNECTED = true;

	mqtt_push("esp8266", user_id);

	$("btn_connect_server").style.backgroundColor = '#22ac3c';
	$("btn_connect_server").innerHTML = "Connected";
	window.onbeforeunload = function(event) {
    	event.returnValue = "You will be losing message from server if you leave this page.";
	};	
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

//called when sending a message
function mqtt_push(message_command, message_command_value)
{
	if (message_command === "") {
		alert("No command to send!");
		return ;
	}
	if (message_command_value === "") {
		message_command_value = '""';
	}
	var str = message_command + '=' + message_command_value;
	message = new Paho.MQTT.Message(str);
	message.destinationName = $("topic_publish").value;
	return client.send(message);
}

// called when a message arrives
function onMessageArrived(message) {
    var str = message.payloadString;
    var topic = message.destinationName;
    console.log("onMessageArrived: " + str);

    if(topic === $("topic_publish").value) {
    	message_add_send(str);
    }
    if(topic === $("topic_subscribe").value) {
    	message_add_recieve(str);
    	var pos = str.indexOf('=');
    	if (pos >= 0) {
    		var message_command = str.substr(0, pos);
    		var message_command_value = str.substr(pos+1, str.length - message_command.length -1);
    		console.log("message_command=" + message_command);
    		console.log("message_command_value=" + message_command_value);
    		message_received_processing(message_command, message_command_value);
    	}
    }
    
	
	if($("checkbox-message-scrolldown").checked) {
		setTimeout(message_body_scrollDown, 100);
	}
	
}


function message_received_processing(message_command, message_command_value)
{
	if (message_command === "working_status") {
		esp8266_testing_device_received(message_command_value);
	}
	if (message_command === "respond_connect") {
		esp8266_device_received(message_command_value);
	}
}
