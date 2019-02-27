$(document).ready(function(){
	$("#sidebar li").click(function(){
		$("#sidebar li").attr("class", "");
		$(this).attr("class", "selected");

		$("#content > div").css("display", "none");
		$("#content_" + this.getAttribute("href").substring(1)).css("display", "block");

		$(document).attr("title", $(document).attr("title").split(",")[0] + ", " + this.innerHTML);
	});

	$("#fetch_allEmployeesByFirstName").click(function(e){
	//$("li").click(function(e){
		$("input[name=showAllEmployees_query]").val("SELECT " +
			$("input[name=showAllEmployees_query_fields]").val() +
			" FROM " + $("input[name=showAllEmployees_query_table]").val() +
			$("input[name=showAllEmployees_query_limit]").val());

		$("#content_showAllEmployees_result_source").html(encodeURIComponent($("input[name=showAllEmployees_query]").val()));

		$("#content_showAllEmployees_result").load("/query?select=" + encodeURIComponent($("input[name=showAllEmployees_query]").val()));


		e.preventDefault();

	});
});