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

	/*insert new employees to the database*/
	$("#submit").click(function(e){
		var emp_no = $("input[name='emp_no']").val();
		var birth = $("input[type='date'][name='birth']").val();
		var firstname = $("input:text[name='first']").val();
		var lastname = $("input:text[name='last']").val();
		var gender = $("input:radio[name='gender']:checked").val();
		var hire = $("input[type='date'][name='hire']").val();
			
		if (emp_no == "" || birth == "dd-mm-åååå" || firstname == "" || lastname == "" || hire == "dd-mm-åååå"){
			alert("please fill all fields!!!!")
		} else {
		
			var querystring = "INSERT INTO employees(emp_no, birth_date, first_name, last_name, sex, hire_date) VALUES (" ;
			querystring += emp_no + ", '" + birth + "','" + firstname + "','" + lastname + "','" + gender + "','" + hire + "')";
			alert(querystring);
			$("#content_newEmployee").html("/query?query=" + encodeURIComponent(querystring));
			
		}
		
		e.preventDefault();
		});
});