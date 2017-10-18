var chat_divs = []; //存放缓存盒子的id
var curr_chat_div; //当前聊天盒子
var curr_photo; //对方头像
var curr_div; //当前被点击盒子
var chat_content = document.getElementById("chat-content")
var chat_details = document.getElementsByClassName("detail");
var chat_input = document.getElementById("chat-input");
var headline = document.getElementById("headline");
for(var i = 0; i < chat_details.length; i++) { //点击进入聊天界面
	chat_details[i].index = i; //相同类名的数组的下标赋值

	chat_details[i].onclick = function() {

		curr_div = this;
		var id = this.index;
		$("#chat-input").focus();
		//隐藏外界盒子  显示 内部盒子

		$("#content-index").hide();
		$("#nav").hide();
		$("#chat-content").show();
		$("#chat-bottom").show();
		$("#tool").hide();
		$("#tool_index").show();
		$("#tool_people").show();
		headline.innerText = this.lastElementChild.firstElementChild.innerText; //切换标题为当前对象
		curr_photo = this.firstElementChild.lastElementChild; //对方头像
		photo_url = curr_photo.src;

		if(chat_divs.indexOf(id) == -1) { //将当前聊天对象与已创建盒子匹配
			curr_chat_div = document.createElement("div");
			curr_chat_div.style.display = "";
			curr_chat_div.setAttribute("id", id); //用 chat+i 作为该盒子的id   动态赋值id
			$(curr_chat_div).attr("class", "curr-div")
			chat_divs.push(id);
			flag = false;
			$("#top").after(curr_chat_div); //追加到top下
		} else {
			curr_chat_div = document.getElementById(id);
			$(curr_chat_div).show();
			//			curr_chat_div.setAttribute("class", "curr-div");
			//滚动条总是在最下方
			curr_chat_div.scrollTop = getScrollWH(curr_chat_div).h;
		}

		//获取input元素的焦点
		window.setTimeout(function() {
			$("#chat-input").focus();
		}, 100)

	}
}
$("#chat-input").focus(function() {
	$(this).css("border", "none")
});
$("#chat-input").bind('keypress', function(event) {

	if(event.keyCode == '13') {

		var mess = document.getElementById("chat-input");
		if(mess.value != "" && mess.value != null) {
			var message = document.createElement("div"); //追加到聊天窗口处
			var message_me = document.createElement("div");
			var message_content = document.createElement("div");
			var photo = document.createElement("div");
			message_me.setAttribute("class", "chat-message chat-left");
			message_content.setAttribute("class", "chat-message-content chat-green");
			photo.setAttribute("class", "chat-message-photo-me");
			message_content.innerText = mess.value;

			message_me.appendChild(message_content);
			message_me.appendChild(photo);
			message.appendChild(message_me);
			chat_input.value = "你好";
			//追加到聊天框
			curr_chat_div.appendChild(message);

			//调用回复函数
			res();
		} else {
			return;
		}

	}
});
//返回微信主界面
var tool_index = document.getElementById("tool_index")
tool_index.onclick = function() {
	$("#tool_index").hide();
	$("#chat-content").hide();
	$("#chat-bottom").hide();
	$("#headline").text("微信(1)");
	$("#tool_people").hide();
	$("#tool").show();
	$("#nav").show();
	$("#content-index").show();
	$("#chatExtra").hide();
	curr_chat_div.style.display = "none";
}

//发表情
function preview(file) {

	if(file.files && file.files[0]) {

		var reader = new FileReader();

		reader.readAsDataURL(file.files[0]);
		//当读取完毕时
		reader.onload = function() {
			var message = document.createElement("div"); //追加到聊天窗口处
			var message_me = document.createElement("div");
			var message_content = document.createElement("div");
			var photo = document.createElement("div");
			message_me.setAttribute("class", "chat-message chat-left");
			message_content.setAttribute("class", "chat-message-img");
			photo.setAttribute("class", "chat-message-photo-me");
			message_content.innerHTML = '<img src="' + event.target.result + '" width="100%" height="100%"/>';
			message_me.appendChild(message_content);
			message_me.appendChild(photo);
			message.appendChild(message_me);
			curr_chat_div.appendChild(message);
			console.log(message_content.firstElementChild.width)
			window.setTimeout(function() {
				if(message_content.firstElementChild.width <= 0 && message_content.firstElementChild.height <= 0) {
					message_content.innerHTML = "无法读取该文件,类型格式不支持";
					message_content.setAttribute("class", "chat-message-content chat-green");
				}
			}, 800);
			curr_chat_div.scrollTop = getScrollWH(curr_chat_div).h;
			flag = true;
		}
	}
}

//回复文字
function res() {
	var message = document.createElement("div"); //追加到聊天窗口处
	var message_he = document.createElement("div");
	var message_content_he = document.createElement("div");
	var photo_he = document.createElement("div");
	message_he.className = "chat-message chat-right";
	message_content_he.setAttribute("class", "chat-message-content chat-white");
	photo_he.setAttribute("class", "chat-message-photo-he");

	message_he.appendChild(photo_he);
	message_he.appendChild(message_content_he);
	message.appendChild(message_he);

	//回复  tuling机器人
	var text = "";
	var key = "b7f3afeea99c40c7a9df742f64551105";
	var url = "http://www.tuling123.com/openapi/api";

	var info = {
		"key": key,
		"info": $("#chat-input").val() // = content.value
	}

	$.ajax({
		type: "POST",
		url: url,
		data: info,
		dataType: "json",
		success: function(result) {
			message_content_he.innerText = result.text;
			curr_div.lastElementChild.lastElementChild.innerText = result.text;
		}
	});
	curr_chat_div.appendChild(message);
	//设置当天聊天对象的头像。
	$(".chat-message-photo-he").attr("style", "background:url(" + photo_url + ");background-position: center;background-size: cover;");
	//将滚动条始终处于最下方
	curr_chat_div.scrollTop = curr_chat_div.scrollHeight;

}

//点击加号
$("#chat-extra-btn").click(function() {
	$("#chatExtra").slideToggle(500);
	curr_chat_div.scrollTop = getScrollWH(curr_chat_div).h;
});

var t1, t12, t2; //时间，  判断鼠标是否为长按
var is_voice = false; //  是否为语音
var is_send = true; //是否要发送
var is_down = false; //鼠标是否按下 未抬起

//点击语音
$("#voice").click(function() {
	if(!is_voice) {
		$("#chat-input").hide();
		$("#voice_key").show();
		is_voice = true;
		$("#voice").attr("class", "keyboard");
	}
	//点击键盘
	else {
		is_voice = false;
		$("#voice").attr("class", "voice");
		$("#chat-input").show();
		$("#voice_key").hide();
	}
});
//微信语音的效果：1.小于1秒无法发送。2.当等于一秒时创建盒子，之后若取消发送删除盒子，若发送成功，将该语音盒子内部添加语音图片，并添加该语音几秒。
var sound; //麦克风音量图片  轮播 的定时函数
//聊天框中创建一条语音消息

//鼠标按下 按住说话
$("#voice_key").mousedown(function() {
	curr_voice = $('<div><div class="chat-message chat-left"><div class="seconds"></div><div class="chat-message-content chat-green text_right"><img class="voice_img" src="img/chat/语音消息.svg" width="0px" height="16px"/></div><div class="chat-message-photo-me"></div></div></div>');
	//麦克风音量框
	mic_div = $('<div id="mic"><div id="mic_img"><img src="img/chat/话筒音量1.svg" width="80px" height="80px" /></div><div id="mic_text"></div></div>');
	mic = $(mic_div);
	is_down = true;
	y1 = getMouseXY().y; //获取鼠标按下的 y 坐标
	$("body").append(mic); //在屏幕中键追加 正在语音的盒子
	t1 = new Date().getTime(); //获取鼠标按下的时间
	var i = 1; //用于控制麦克风音量，轮播图片
	$("#voice_key").html("松开 结束").css("background-color", "rgba(189,189,189,1)");
	$("#mic_text").html("手指上滑， 取消发送").css("background", "none");
	voice_div = setTimeout(function() {
		$(curr_chat_div).append(curr_voice);
	}, 1000);
	sound = setInterval(function() {
		t12 = new Date().getTime();
		i = Math.round(Math.random() * 6 + 1);
		$("#mic_img img").attr("src", "img/chat/话筒音量" + i + ".svg");
	}, 500);
	//move
	$("body").mousemove(function() {;
		if(is_down) {
			var y2 = getMouseXY().y; //获取鼠标移动的坐标 y
			if(y1 - y2 > 100) { //
				is_send = false;
				clearInterval(sound);
				$("#voice_key").html("松开 取消")
				$("#mic_img img").attr("src", "img/chat/取消发送.svg");
				$("#mic_text").html("松开手指， 取消发送").css("background-color", "rgba(183,28,28 ,1)");
			} else {
				clearInterval(sound);
				is_send = true;
				$("#voice_key").html("松开 结束");
				$("#mic_text").html("手指上滑， 取消发送").css("background", "none");
				$("#mic_img img").attr("src", "img/chat/话筒音量2.svg");
				sound = setInterval(function() {
					i = Math.round(Math.random() * 6 + 1);
					$("#mic_img img").attr("src", "img/chat/话筒音量" + i + ".svg");
				}, 500);
			}
			if(!is_down) {
				voice = setTimeout(function() {
					$(".voice_img").css("width", "20px");
					$(curr_chat_div).append(curr_voice);
				}, 1000);
			}
		} else {
			return;
		}
	});

});
$("body").mouseup(function() {
	if(is_down) {
		is_down = false;
		clearTimeout(voice_div);
		clearInterval(sound);
		t2 = new Date().getTime();
		if(t2 - t1 < 1000) {
			$("#mic_img img").attr("src", "img/chat/叹号.svg");
			$("#mic_text").html("说话时间太短").css({
				"color": "white",
				"font-weight": "bold"
			});
			setTimeout(function() {
				$("#voice_key").html("按住 说话").css("background-color", "rgba(245,245,245,1)");
				$("#mic").remove();
			}, 1000)

		} else {
			$("#voice_key").html("按住 说话").css("background-color", "rgba(245,245,245,1)");
			$("#mic").remove();
			if(is_send) {
				//				$(curr_chat_div).append(curr_voice);
				var t3 = new Date().getTime();
				var t4 = Math.round(t3 / 1000 - t1 / 1000);
				if(t4 > 3) {
					var wid = (t4 - 2) * 5;
					console.log(wid);
					$(curr_voice).find(".chat-message-content").css("width", (wid + 40)); //根据语音消息的时间长短动态变换盒子宽度
					console.log($(curr_voice));
				}
				$(curr_voice).find(".seconds").html(t4 + "\""); //获取秒数 显示在语音消息中
				$(".voice_img").css("width", "20px");
			} else {
				$(curr_chat_div.lastElementChild).remove();
			}
		}
	} else {
		return;
	}
})