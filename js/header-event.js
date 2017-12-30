function $(eleme) {
	return document.getElementById(eleme);
}

set_main_tab_active("home");
$("header-home").onclick = function() {
	set_main_tab_active("home");
}
$("header-idea").onclick = function() {
	set_main_tab_active("idea");
}
$("header-product").onclick = function() {
	set_main_tab_active("product");
}
$("header-connect").onclick = function() {
	set_main_tab_active("connect");
}
$("header-control").onclick = function() {
	set_main_tab_active("control");
}
$("header-user").onclick = function() {
	set_active_button("header-user");
	iot_logout();
	window.location.href = "./login/index.html";
}
function set_main_tab_active(tabidname) {
   	var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("main-tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    document.getElementById(tabidname).style.display = "block";
    set_active_button("header-" + tabidname);
}
function set_active_button(tabidname) {
	$("header-home").classList.remove("header-btn-active");
    $("header-idea").classList.remove("header-btn-active");
    $("header-product").classList.remove("header-btn-active");
    $("header-connect").classList.remove("header-btn-active");
    $("header-control").classList.remove("header-btn-active");
    $("header-user").classList.remove("header-btn-active");
    $(tabidname).classList.add("header-btn-active");
}