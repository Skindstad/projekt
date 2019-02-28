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





    /* Insert select change functionality */
    function toggleInsert(elmData, elmSecond = "") {
        $("#content_insert > form > div").css("display", "none");
        $("#new_" + elmData[0]).css("display", "block");

        if (elmData.length == 2) {
            $("#new_" + elmData[0] + " .toggleInp").css("display", "none");
            $("#new_" + elmData[0] + "_" + elmData[1]).css("display", "block");
        }
    }

    $("li[href='?insert").click(function () {
        toggleInsert("employees");
    });

    $("#database_table").change(function () {
        var selected = $(this).children("option:selected").val().split("_");
        toggleInsert(selected);
    });












	/* Insert new employees to the database */
	$("#emp").click(function(e){
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
    function toggleShow(elmVisible, query, elmHref = elmVisible) {
        $("#content_show > div").css("display", "none");
        $("#content_" + elmVisible).css("display", "block");

        $("#content_show > ul > li").attr("class", "");
        $("li[href='?" + elmHref + "']").attr("class", "selected");

        $("#contentData_" + elmVisible).load("/query?select=" + query);
    }

    /* Show all employees */
    $("li[href='?show']").click(function (e) {
        var query = encodeURIComponent("SELECT * FROM employees LIMIT 10");
        toggleShow("showEmployees", query, "show");
    });

    /* Show all departments */
    $("li[href='?showDepartments']").click(function (e) {
        var query = encodeURIComponent("SELECT * FROM departments");
        toggleShow("showDepartments", query);
    });

    /* Show manager of departments */
    $("li[href='?showDeptManager']").click(function (e) {
        var query = encodeURIComponent("SELECT * FROM dept_manager");
        toggleShow("showDeptManager", query);
    });

    /* Show titles */
    $("li[href='?showTitles']").click(function (e) {
        var query = encodeURIComponent("SELECT * FROM titles LIMIT 10");
        toggleShow("showTitles", query);
    });

    /* Show department employees */
    $("li[href='?showDeptEmp']").click(function (e) {
        var query = encodeURIComponent("SELECT * FROM dept_emp LIMIT 10");
        toggleShow("showDeptEmp", query);
    });

    /* Show salaries */
    $("li[href='?showSalaries']").click(function (e) {
        var query = encodeURIComponent("SELECT * FROM salaries LIMIT 10");
        toggleShow("showSalaries", query);
    });


				/* TODO : INSERT ... works now.
	INSERT INTO departments(dept_no, dept_name) VALUES("d999", "Test");*/
});