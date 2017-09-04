function display_index() {
	$(".nav_btn_no").css({
		"outline": "none"
	});
	$("#content-index").show();
	$("#content-discover").hide();
	$("#content-ad_book").hide();
	$("#content-me").hide();
	$("#friends").hide();
	$("#headline").text("微信(1)");
	$("#tool").show();
	$("#tool_camera").hide();
	$("#tool_discover").hide();
	$("#pic1").attr('src', "img/icon/menu/聊天-press.svg");
	$("#pic2").attr('src', "img/icon/menu/通讯录.svg");
	$("#pic3").attr('src', "img/icon/menu/发现.svg");
	$("#pic4").attr('src', "img/icon/menu/me.svg");
	document.getElementById("weixin").style.color="rgb(102,187,106)";
	document.getElementById("txl").style.color="rgb(158,158,158)";
	document.getElementById("fx").style.color="rgb(158,158,158)";
	document.getElementById("wo").style.color="rgb(158,158,158)";
}

function display_ad_book() {
	$("#friend_btn").css({
		"outline": "none"
	});
	$("#content-index").hide();
	$("#content-ad_book").show();
	$("#content-discover").hide();
	$("#content-me").hide();
	$("#headline").text("通讯录");
	$("#tool").hide();
	$("#pic1").attr('src', "img/icon/menu/聊天.svg");
	$("#pic2").attr('src', "img/icon/menu/通讯录-press.svg");
	$("#pic3").attr('src', "img/icon/menu/发现.svg");
	$("#pic4").attr('src', "img/icon/menu/me.svg");
	document.getElementById("weixin").style.color="rgb(158,158,158)";
	document.getElementById("txl").style.color="rgb(102,187,106)";
	document.getElementById("fx").style.color="rgb(158,158,158)";
	document.getElementById("wo").style.color="rgb(158,158,158)";
}

function display_discover() {
	$(".nav_btn_no").css({
		"outline": "none"
	});
	
	$("#content-index").hide();
	$("#content-ad_book").hide();
	$("#content-discover").show();
	$("#content-me").hide();
	$("#headline").text("发现");
	$("#tool").hide();
	$("#pic1").attr('src', "img/icon/menu/聊天.svg");
	$("#pic2").attr('src', "img/icon/menu/通讯录.svg");
	$("#pic3").attr('src', "img/icon/menu/发现-press.svg");
	$("#pic4").attr('src', "img/icon/menu/me.svg");
	document.getElementById("weixin").style.color="rgb(158,158,158)";
	document.getElementById("txl").style.color="rgb(158,158,158)";
	document.getElementById("fx").style.color="rgb(102,187,106)";
	document.getElementById("wo").style.color="rgb(158,158,158)";
}

function display_me() {
	$(".nav_btn_no").css({
		"outline": "none"
	});
	document.getElementById("wo").style.color="rgb(102,187,106)";
	$("#content-index").hide();
	$("#content-ad_book").hide();
	$("#content-discover").hide();
	$("#content-me").show();
	$("#headline").text("我");
	$("#tool").hide();
	$("#pic1").attr('src', "img/icon/menu/聊天.svg");
	$("#pic2").attr('src', "img/icon/menu/通讯录.svg");
	$("#pic3").attr('src', "img/icon/menu/发现.svg");
	$("#pic4").attr('src', "img/icon/menu/me-press.svg");
	document.getElementById("weixin").style.color="rgb(158,158,158)";
	document.getElementById("txl").style.color="rgb(158,158,158)";
	document.getElementById("fx").style.color="rgb(158,158,158)";
	document.getElementById("wo").style.color="rgb(102,187,106)";
}
//$(".praise_area").hide();
function display_friends() {
	$(".nav_btn_no").css({
		"outline": "none"
	});
	$("#friends").show();
	$("#content-discover").hide();
	$("#tool_camera").show();
	$("#tool").hide();
	$("#content-index").hide();
	$("#content-ad_book").hide();
	$("#content-me").hide();
	$("#headline").text("朋友圈");
	$("#tool_discover").show();
	$("#nav").hide();
}
var add_no = true;

function display_tool_add() {
	if(add_no) {
		$("#tool_add_ex").show();
		add_no = false;
	} else {
		$("#tool_add_ex").hide();
		add_no = true;
	}

}
 

var parise_no1 = true;

function display_praise1(){
	
	if(parise_no1) {
		$("#praise_btn1").show();
		parise_no1 = false;
	} else {
		$("#praise_btn1").hide();
		parise_no1 = true;
	}
}
var parise_no2 = true;

function display_praise2(){
	
	if(parise_no2) {
		$("#praise_btn2").show();
		parise_no2 = false;
	} else {
		$("#praise_btn2").hide();
		parise_no2 = true;
	}
}
var parise_no3 = true;

function display_praise3(){
	
	if(parise_no3) {
		$("#praise_btn3").show();
		parise_no3 = false;
	} else {
		$("#praise_btn3").hide();
		parise_no3 = true;
	}
}

function back_discover(){
	$(".nav_btn_no").css({
		"outline": "none"
	});
	$("#friends").hide();
	$("#content-discover").show();
	$("#tool_camera").hide();
	$("#tool_discover").hide();
	$("#nav").show();
}
