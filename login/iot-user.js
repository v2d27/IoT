

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function login_check(data) {
	if (data === "b1fa197f7702f5befbb23bbe622ca8e04247ec4e342ded00155fbc6a7f8670d1") {
		return true;
	}
	return false;
}

function iot_is_login()
{
	var get_data = getCookie("21564795232708");
	return login_check(get_data);
}

function iot_login(data)
{
	if(login_check(data))
	{
		setCookie("21564795232708", data, 10);
		return true;
	}
	return false;
}

function iot_logout()
{
    document.cookie = "21564795232708=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}