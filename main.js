$(document).ready(function(){
	$("#sidebar li").click(function(){
		$("#sidebar li").attr("class", "");
		$(this).attr("class", "selected");

		$("#content div").css("display", "none");
		$("#content_" + this.getAttribute("href").substring(1)).css("display", "block");
	});
});