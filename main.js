$(document).ready(function(){

	/* Menu bar - title-, page- and button_background- change */
	$("#sidebar li").click(function(){
		$("#sidebar li").attr("class", "");
		$(this).attr("class", "selected");

		$("#content > div").css("display", "none");
        $("#content_" + this.getAttribute("href").substring(1)).css("display", "block");

        var newTitle = $(document).attr("title").split(",")[0] + ", " + this.innerHTML;

        $(document).attr("title", newTitle);
        $("#overskrift").html(newTitle);
    });


















	/* Insert new employees to the database */
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
		
			var querystring = "INSERT INTO employees(emp_no, birth_date, first_name, last_name, gender, hire_date) VALUES (" ;
			querystring += emp_no + ", '" + birth + "','" + firstname + "','" + lastname + "','" + gender + "','" + hire + "')";
			$("#content_newEmployee").load("/query?query=" + encodeURIComponent(querystring));
			
		}
		
		e.preventDefault();
		});









    /* Show all employees example with input fields for string manipulation and example view */
    function toggleShow(elmVisible, elmHref) {
        $("#content_show > div").css("display", "none");
        $("#content_" + elmVisible).css("display", "block");

        $("#content_show > ul > li").attr("class", "");
        $("li[href='?" + elmHref + "']").attr("class", "selected");
    }

    /* Show all employees */
    $("li[href='?show']").click(function (e) {
        toggleShow("showEmployees", "show");
        var query = encodeURIComponent("SELECT * FROM employees LIMIT 10");
        $("#content_employees").load("/query?select=" + query);
    });

    /* Show all departments */
    $("li[href='?showDepartments']").click(function (e) {
        toggleShow("showDepartments", "showDepartments");
        var query = encodeURIComponent("SELECT * FROM departments");
        $("#content_departments").load("/query?select=" + query);
    });


				/* TODO : INSERT ... works now.
	INSERT INTO departments(dept_no, dept_name) VALUES("d999", "Test");*/
});