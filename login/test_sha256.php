<!DOCTYPE html>
<html>
<head>
	<title>test SHA256</title>
	<script type="text/javascript" src="jssha256.js"></script>
</head>

<script type="text/javascript">

function $(id) {
	return document.getElementById(id);
}

function  onpageload() {
	var username = "user.admin";
	var password = "123456";
	$("result").innerHTML = HMAC_SHA256_MAC("p9xpk7ok6iw6e4pka2o1x2gm4ug7q", username + " " + password);
}

</script>

<body onload="onpageload()">
<p>result is: <a id="result"></a></p>
</body>
</html>
