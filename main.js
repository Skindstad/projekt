$(document).ready(function () {

    /* Menu bar - title-, page- and button_background- change */
    $("#sidebar li[href]").click(function () {
        $("#sidebar li[href]").attr("class", "");
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
        toggleInsert(["employees"]);
        $("#content_insert > form option").prop("selected", false);
        $("#content_insert > form").val("employees");
    });

    $("#database_table").change(function () {
        var selected = $(this).children("option:selected").val().split("_");
        toggleInsert(selected);
        if (selected[0]=="dept")
            populateDepartments();

    });

    

    function populateDepartments() {
        var select = $("#dept_no");
        select.children().remove();

        var query = "SELECT dept_no, dept_name FROM departments";
        $.getJSON("/query?select=" + encodeURIComponent(query), function (data) {

            $.each(data, function (key, val) {
                var newOpt = new Option(val["dept_name"], val["dept_no"]);
                select.append(newOpt);
            });
        });
    }




function emp(data,querystring,querystring2) {
	var emp_no = data.emp_no;
	$.each(data,function(id,value){
		$.each(value,function(id,value){
		//alert(id + "-" + value);
		emp_no = 1 + value;
		//alert(emp_no)
		})
	})
	querystring += emp_no + querystring2;
		//alert(querystring)
			$("#new_employees").load("/query?query=" + encodeURIComponent(querystring));
		}



	/* Insert new employees to the database */
	$("#emp").click(function(e){
		var select = $("#database_table").val();
		
		if(select == "employees"){
		var emp_no = $("input[name='emp_no']").val();
		var birth = $("input[type='date'][name='birth']").val();
		var firstname = $("input:text[name='first']").val();
		var lastname = $("input:text[name='last']").val();
		var gender = $("input:radio[name='gender']:checked").val();
		var hire = $("input[type='date'][name='hire']").val();

		if (birth == "dd-mm-åååå" || firstname == "" || lastname == "" || hire == "dd-mm-åååå"){
			alert("please fill all fields!!!!1")
		} else {
			var emp_no = 0;

			var querystring = "INSERT INTO "+ select +"(emp_no, birth_date, first_name, last_name, gender, hire_date) VALUES (" ;
			 var querystring2 =  ", '" + birth + "','" + firstname + "','" + lastname + "','" + gender + "','" + hire + "')";
			

			var query = "select emp_no from employees order by emp_no desc limit 1";
			$.getJSON("/query?select=" + encodeURIComponent(query),function(data){
				emp(data,querystring,querystring2);

			} )
		}
	} else if ( select == "departments"){
		var dept_no = $("#new_departments input[name='dept_no']").val();
		var dept_N = $("input:text[name='dept_N']").val();
		if (dept_no == "" || dept_N == ""){
			alert("please fill all fields!!!!2")
		} else {
			//alert(dept_no);
			if(dept_no >= 1000){
				alert("dept number have to be only maxlength 3")
				return;
			}else {
			var querystring = "INSERT INTO "+ select +"(dept_no, dept_name) VALUES (" ;
			querystring +="'d"+ dept_no + "', '" + dept_N +"')";
			$("#new_departments").load("/query?query=" + encodeURIComponent(querystring));	
			}
		}
        } else if (select == "dept_emp" || select == "dept_manager"){
		var emp_no = $("input[name='emp_n']").val();
		var dept_no = $("#dept_no").val();
		var form_d = $("input[type='date'][name='form_d']").val();
		var to_d = $("input[type='date'][name='to_d']").val();
		alert(dept_no)
		if (emp_no == "" || form_d == "dd-mm-åååå"){
			alert("please fill all fields!!!!3")
			}else {
            if (to_d == "" || !to_d) {
				to_d = "9999-01-01";
			}
			var querystring = "INSERT INTO "+select+"(emp_no ,dept_no, from_date, to_date) VALUES (" ;
			querystring += emp_no + ",'"+ dept_no + "', '" + form_d +"','"+ to_d +"')";
			alert(querystring)
			$("#new_dept").load("/query?query=" + encodeURIComponent(querystring));	
			
		}


	} else if ( select == "salaries"){
		var emp_no = $("input[name='emp']").val();
		var salar = $("input[name='salar']").val();
		var from = $("input[type='date'][name='from']").val();
		var to = $("input[type='date'][name='to']").val();
		alert(salar)
        if (emp_no == "" || salar == "" || from == "dd-mm-åååå") {
			alert("please fill all fields!!!!4")
		} else {
            if (to == "" || !to){
				to = "9999-01-01";
            }
			var querystring = "INSERT INTO "+select+"(emp_no ,salary, from_date, to_date) VALUES (" ;
			querystring += emp_no + ","+ salar + ", '" + from +"','"+ to +"')";
			alert(querystring)
			$("#new_salaries").load("/query?query=" + encodeURIComponent(querystring));
		}
			}else {
				alert(select)
				var emp_no = $("input[name='emp_nu']").val();
				var title = $("input:text[name='title']").val();
				var form_date = $("input[type='date'][name='form_date']").val();
				var to_date = $("input[type='date'][name='to_date']").val();
            if (emp_no == "" || title == "" || form_date == "dd-mm-åååå") {
					alert("please fill all fields!!!!5")
            } else {
                if (to_date == "" || !to_date) {
					to_date = "9999-01-01";
					}
					var querystring = "INSERT INTO "+select+"(emp_no ,title, from_date, to_date) VALUES (" ;
					querystring += emp_no + ",'"+ title + "', '" + form_date +"','"+ to_date +"')";
					alert(querystring)
					$("#new_titles").load("/query?query=" + encodeURIComponent(querystring));
				}
			}
		
		e.preventDefault();
		});











    /* Design    */
    var designColumns = {
        showEmployees: {
            edit_delete: "",
            emp_no: "Medarbejder nr.:",
            first_name: "Fornavn:",
            last_name: "Efternavn:",
            gender: "Køn:",
            birth_date : "Født:",
            hire_date : "Ansat:"
        },

        showDepartments: {
            edit_delete: "",
            dept_no: "Afdelings nr.:",
            dept_name: "Afdelings navn:"
        },

        showDeptManager: {
            edit_delete: "",
            emp_no: "Medarbejder nr.:",
            dept_no: "Afdelings nr.:",
            from_date: "Fra dato:",
            to_date: "Til dato:"
        },

        showTitles: {
            edit_delete: "",
            emp_no: "Medarbejder nr.:",
            title: "Titel:",
            from_date: "Fra dato:",
            to_date: "Til dato:"
        },

        showDeptEmp: {
            edit_delete: "",
            emp_no: "Medarbejder nr.:",
            dept_no: "Afdelings nr.:",
            from_date: "Fra dato:",
            to_date: "Til dato:"
        },

        showSalaries: {
            edit_delete: "",
            emp_no: "Medarbejder nr.:",
            salary: "Løn:",
            from_date: "Fra dato:",
            to_date: "Til dato:"
        },

        methods: {

            /* For show employees */            
            birth_date: function (val) { return val.split("T")[0]; },
            hire_date: function (val) { return val.split("T")[0]; },
            edit_delete: function (val) {
                return "<ul><li><input type=\"checkbox\"></li><li class=\"x\" title=\"Slet\">S</li><li class=\"e\" title=\"Ændre\">Æ</li></ul>";
            },
            gender: function (val) { return "<span class=\"" + val + "\">" + val + "</span>"; },
            from_date: function (val) { return val.split("T")[0]; },
            to_date: function (val) { return val.split("T")[0]; }            
        }
    }



    /* Delete single row */
    function deleteRow(table, elm) {
        var row = $(elm).parents("div[class^='row']");
        var columnElements = $(row).children("div[class!='edit_delete']");
        var deleteQuery = "";
        
        $.each(columnElements, function (index, elm) {
            if ($(elm).html().indexOf("<") == -1) {
                deleteQuery += (deleteQuery.length > 0 ? " AND " : "WHERE ")
                    + "" + $(elm).attr("class") + "='" + $(elm).html().split(": ")[1] + "'";
            }
        });

        deleteQuery = "DELETE FROM " + table + " " + deleteQuery;
        alert(deleteQuery);
        $.getJSON("/query?query=" + deleteQuery);
        $(row).fadeOut(2000, function(){ $(this).remove(); });
    }
    


    /* Insert the retrieved data */
    function insertData(query, designIdentifier, table) {

        var keyQuery = "SHOW KEYS FROM salaries WHERE Key_name = \"PRIMARY\"";

        //alert(9);
        $.getJSON("/query?select=" + keyQuery, function (data) {

           // alert(data);
        });
        
        $.getJSON("/query?select=" + query, function (data) {
            var rows = [];

            $.each(data, function (rowNumber, rowValues) {
                var rowElement = "";
                
                /* If identifiers are specified - use these, otherwise use provided */
                if (designColumns[designIdentifier])
                    $.each(designColumns[designIdentifier], function (identifier, value) {
                        
                        /* If a specific function is assigned for an identifier - use returned value */
                        var rowDisplayValue = rowValues[identifier];
                        if (designColumns["methods"][identifier])
                            rowDisplayValue = designColumns["methods"][identifier](rowValues[identifier]); 

                        rowElement += "<div class=\"" + identifier + "\" title=\"" + rowValues[identifier] + "\">" + value + " " + rowDisplayValue + "</div>";
                    });
                else
                    $.each(rowValues, function (identifier, value) {
                        rowElement += "<div class=\"" + identifier + "\">" + identifier + " " + value + "</div>";
                    });

                rows.push("<div class=\"row" + ((rows.length % 2) + 1) + "\">" + rowElement + "</div>");
            });

            $("#contentData_" + designIdentifier).html(rows.join(""));

            /* Assign deletion method */
            $("#contentData_" + designIdentifier + " .x").click(function () {
                deleteRow(table, this);
            })
        });
    }



    /* Show all employees example with input fields for string manipulation and example view */
    function toggleShow(elmVisible, query, table, elmHref = elmVisible) {
        $("#content_show > div[class!='limiter']").css("display", "none");
        $("#content_" + elmVisible).css("display", "block");

        $("#content_show > ul > li").attr("class", "");
        $("li[href='?" + elmHref + "']").attr("class", "selected");
        insertData(query, elmVisible, table);
    }

    /* Show all employees */
    $("li[href='?show']").click(function (e) {
        var query = encodeURIComponent("SELECT * FROM employees LIMIT 10");
        toggleShow("showEmployees", query, "employees", "show");
    });

    /* Show all departments */
    $("li[href='?showDepartments']").click(function (e) {
        var query = encodeURIComponent("SELECT * FROM departments");
        toggleShow("showDepartments", query, "departments");
    });

    /* Show manager of departments */
    $("li[href='?showDeptManager']").click(function (e) {
        var query = encodeURIComponent("SELECT * FROM dept_manager");
        toggleShow("showDeptManager", query, "dept_manager");
    });

    /* Show titles */
    $("li[href='?showTitles']").click(function (e) {
        var query = encodeURIComponent("SELECT * FROM titles LIMIT 10");
        toggleShow("showTitles", query, "titles");
    });

    /* Show department employees */
    $("li[href='?showDeptEmp']").click(function (e) {
        var query = encodeURIComponent("SELECT * FROM dept_emp LIMIT 10");
        toggleShow("showDeptEmp", query, "dept_emp");
    });

    /* Show salaries */
    $("li[href='?showSalaries']").click(function (e) {
        var query = encodeURIComponent("SELECT * FROM salaries LIMIT 10");
        toggleShow("showSalaries", query, "salaries");
    });
});