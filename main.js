"use strict";

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
        if (selected[0] == "dept")
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




    function emp(data, querystring, querystring2) {
        var emp_no = data.emp_no;
        $.each(data, function (id, value) {
            $.each(value, function (id, value) {
                //alert(id + "-" + value);
                emp_no = 1 + value;
                //alert(emp_no)
            })
        })
        querystring += emp_no + querystring2;
        //alert(querystring)
        $("#new_employees").load("/query?query=" + encodeURIComponent(querystring));
    }

    // $('#date').datepicker({changeMonth: true, changeYear: true, yearRange: '1950:2021'});

    /* Insert new employees to the database */
    $("#emp").click(function (e) {
        var select = $("#database_table").val();

        if (select == "employees") {
            var emp_no = $("input[name='emp_no']").val();
            var birth = $("input[type='date'][name='birth']").val();
            var firstname = $("input:text[name='first']").val();
            var lastname = $("input:text[name='last']").val();
            var gender = $("input:radio[name='gender']:checked").val();
            var hire = $("input[type='date'][name='hire']").val();

            if (birth == "dd-mm-åååå" || firstname == "" || lastname == "" || hire == "dd-mm-åååå") {
                alert("please fill all fields!!!!1")
            } else {
                var emp_no = 0;

                var querystring = "INSERT INTO " + select + "(emp_no, birth_date, first_name, last_name, gender, hire_date) VALUES (";
                var querystring2 = ", '" + birth + "','" + firstname + "','" + lastname + "','" + gender + "','" + hire + "')";


                var query = "select emp_no from employees order by emp_no desc limit 1";
                $.getJSON("/query?select=" + encodeURIComponent(query), function (data) {
                    emp(data, querystring, querystring2);

                })
            }
        } else if (select == "departments") {
            var dept_no = $("#new_departments input[name='dept_no']").val();
            var dept_N = $("input:text[name='dept_N']").val();
            if (dept_no == "" || dept_N == "") {
                alert("please fill all fields!!!!2")
            } else {
                if (dept_no >= 1000) {
                    alert("dept number have to be only maxlength 3")
                    return;
                } else {
                    var restrict = "SELECT * FROM departments WHERE dept_no = '" + dept_no +"';";
                    $.getJSON("/query?select=" + encodeURIComponent(restrict), function (data) {
    
                        var newR = 0;
    
                        $.each(data, function (key5, val) {
                            newR = 1;
                        });
                        if (newR != 0) {
                            alert("The same department cannot have to numbers");
                        } else {
                    var querystring = "INSERT INTO " + select + "(dept_no, dept_name) VALUES (";
                    querystring += "'d" + dept_no + "', '" + dept_N + "')";
                    $("#new_departments").load("/query?query=" + encodeURIComponent(querystring));
                }
            });
            }
        }
        } else if (select == "dept_emp" || select == "dept_manager") {
            var emp_no = $("input[name='emp_n']").val();
            var dept_no = $("#dept_no").val();
            var form_d = $("input[type='date'][name='form_d']").val();
            var to_d = $("input[type='date'][name='to_d']").val();
            if (emp_no == "" || form_d == "dd-mm-åååå") {
                alert("please fill all fields!!!!3")
            } else {
                if (to_d == "" || !to_d) {
                    to_d = "9999-01-01";
                }
                var restrict = "SELECT * FROM "+ select +" WHERE emp_no = " + emp_no +";";
                $.getJSON("/query?select=" + encodeURIComponent(restrict), function (data) {

                    var newR = 0;

                    $.each(data, function (key4, val) {
                        newR = 1;
                    });


                    if (newR != 0) {
                        alert("The same person can not be in two department a same time");
                    } else {
                var querystring = "INSERT INTO " + select + "(emp_no ,dept_no, from_date, to_date) VALUES (";
                querystring += emp_no + ",'" + dept_no + "', '" + form_d + "','" + to_d + "')";
                alert(querystring)
                $("#new_dept").load("/query?query=" + encodeURIComponent(querystring));

            }
        });
    }

        } else if (select == "salaries") {
            var emp_no = $("input[name='emp']").val();
            var salar = $("input[name='salar']").val();
            var from = $("input[type='date'][name='from']").val();
            var to = $("input[type='date'][name='to']").val();
            if (emp_no == "" || salar == "" || from == "dd-mm-åååå") {
                alert("please fill all fields!!!!4")
            } else {
                if (to == "" || !to) {
                    to = "9999-01-01";
                }
                var restrict = "SELECT * FROM salaries WHERE emp_no = " + emp_no + " AND from_date = '" + from + "';";
                $.getJSON("/query?select=" + encodeURIComponent(restrict), function (data) {

                    var newR = 0;

                    $.each(data, function (key2, val) {
                        newR = 1;
                    });
                    if (newR != 0) {
                        alert("The same person can not get salaries two times the same day");
                    } else {
                        var querystring = "INSERT INTO " + select + "(emp_no ,salary, from_date, to_date) VALUES (";
                        querystring += emp_no + "," + salar + ", '" + from + "','" + to + "')";
                        alert(querystring)
                        $("#new_salaries").load("/query?query=" + encodeURIComponent(querystring));
                    }
                });
            }
        } else {
            var emp_no = $("input[name='emp_nu']").val();
            var title = $("input:text[name='title']").val();
            var from_date = $("input[type='date'][name='from_date']").val();
            var to_date = $("input[type='date'][name='to_date']").val();
            if (emp_no == "" || title == "" || from_date == "dd-mm-åååå") {
                alert("please fill all fields!!!!5");
            } else {
                alert("1")
                if (to_date == "" || !to_date) {
                    to_date = "9999-01-01";
                }
                var restrict = "SELECT * FROM titles WHERE emp_no = " + emp_no + " AND title = '" + title + "';";
                $.getJSON("/query?select=" + encodeURIComponent(restrict), function (data) {
                    var newR = 0;

                    $.each(data, function (key3, val) {
                        newR = 1;
                    });
                    if (newR != 0) {
                        alert("The same person can not have two titles a the same time");
                    } else {
                        var querystring = "INSERT INTO " + select + "(emp_no ,title, from_date, to_date) VALUES (";
                        querystring += emp_no + ",'" + title + "', '" + from_date + "','" + to_date + "')";
                        $("#new_titles").load("/query?query=" + encodeURIComponent(querystring));
                    }
                });
            }
        }
        e.preventDefault();
    });











































    /* Assign show/delete/update onclick's */
    $.each(designObject.liHrefs, function (href, query) {
        var splitQuery = query.split(", ");
        $("li[href='?" + href + "']").click(function () {
            var query = encodeURIComponent(splitQuery[0]);
            var table = splitQuery[1];
            toggleShow(href, query, table);
        });
    });
});

/* Show selected content, start at employees view */
function toggleShow(elmVisible, query, table) {

    /* Used to refresh current viewed items */
    designObject.lastToggleShow.elmVisible = elmVisible;
    designObject.lastToggleShow.query = query;
    designObject.lastToggleShow.table = table;
    
    $("#content_show").css("display", "block");
    $("#content_show > div[class!='limiter']").css("display", "none");
    $("#content_" + elmVisible).css("display", "block");

    $("#content_show > ul > li").attr("class", "");
    $("li[href='?" + elmVisible + "']").attr("class", "selected");
    insertData(query, elmVisible, table);
}

/* Design object*/
var designObject = {

    lastToggleShow: {
        elmVisible: "",
        query: "",
        table: "",
        init: function () { toggleShow(this.elmVisible, this.query, this.table) }
    },

    liHrefs: {
        showEmployees: "SELECT * FROM employees LIMIT 50, employees",
        showDepartments: "SELECT * FROM departments LIMIT 50, departments",
        showDeptManager: "SELECT * FROM dept_manager LIMIT 50, dept_manager",
        showTitles: "SELECT * FROM titles LIMIT 50, titles",
        showDeptEmp: "SELECT * FROM dept_emp LIMIT 50, dept_emp",
        showSalaries: "SELECT * FROM salaries LIMIT 50, salaries"
    },

    /* Order of columns and visible columns */
    showEmployees: ["edit_delete", "emp_no", "first_name", "last_name", "gender", "birth_date", "hire_date"],
    showDepartments: ["edit_delete", "dept_no", "dept_name"],
    showDeptManager: ["edit_delete", "emp_no", "dept_no", "from_date", "to_date"],
    showTitles: ["edit_delete", "emp_no", "title", "from_date", "to_date"],
    showDeptEmp: ["edit_delete", "emp_no", "dept_no", "from_date", "to_date"],
    showSalaries: ["edit_delete", "emp_no", "salary", "from_date", "to_date"],

    translations: {
        emp_no: "Medarbejder nr.:",
        dept_no: "Afdelings nr.:",
        dept_name: "Afdeling:",
        first_name: "Fornavn:",
        last_name: "Efternavn:",
        gender: "Køn:",
        title: "Stilling:",
        salary: "Lønning:",
        birth_date: "Født:",
        hire_date: "Ansat:",
        from_date: "Fra dato:",
        to_date: "Til dato:"
    },

    /* Used to change content based on column names */
    methods: {
        birth_date: function (val) { return val.split("T")[0]; },
        hire_date: function (val) { return val.split("T")[0]; },
        edit_delete: function (val) {
            return "<ul><li class=\"x\" title=\"Slet\">S</li><li class=\"e\" title=\"Ændre\">Æ</li></ul>";
        },
        gender: function (val) { return "<span class=\"" + val + "\">" + val + "</span>"; },
        raw_gender: function (val) { return val.split(">")[1].split("<")[0]; },
        from_date: function (val) { return val.split("T")[0]; },
        to_date: function (val) { return val.split("T")[0]; }
    },

    /* Used to change change input type - text to date */
    datetimes: {
        from_date: true,
        to_date: true,
        hire_date: true,
        birth_date: true
    }
}

/* Insert the retrieved data */
function insertData(query, designIdentifier, table) {

    var count = "SELECT COUNT(*) AS \"Total\" FROM " + table;
    $.getJSON("/query?select=" + encodeURIComponent(count), function (data) {

        var total = parseInt(data[0]["Total"]);
        
        $.getJSON("/query?select=" + query, function (data) {

            var lastQuery = unescape(query).split("LIMIT ")[0];
            var amount = parseInt(unescape(query).split("LIMIT ")[1].split(" ")[0]);
            var offset = parseInt(unescape(query).split("OFFSET ")[1] ? unescape(query).split("OFFSET ")[1] : 0);
            var toTarget = parseInt(offset) + parseInt(amount);

            $(".limiter").html("");

            /* Previous page */
            if (offset > 1) {
                var prevOffset = (offset - amount) < 0 ? 0 : (offset - amount);
                var prevPage = $("<div></div>").text("Previous page");
                prevPage.click(function () {
                    var query = lastQuery + "LIMIT " + amount + " OFFSET " + prevOffset;
                    toggleShow(designObject.lastToggleShow.elmVisible, query, table);
                });
                prevPage.attr("class", "queryNav");
                $(".limiter").append(prevPage);
            } else {
                var prevPage = $("<div></div>").text("Previous page");
                prevPage.attr("class", "queryNavDeactive");
                $(".limiter").append(prevPage);
            }

            
            var currentShown = $("<div></div>").text("Showing: " + (offset+1) + " to " + (toTarget > total ? total : toTarget) + " out of " + total + " - Shown each page: ");
            $(".limiter").append(currentShown);

            /* Change limit */
            var amountChange = $("<input>").val(amount);
            amountChange.attr("class", "amountChange");
            amountChange.attr("type", "number")
            amountChange.keyup(function () {
                
                if (parseInt(this.value) > 1000) {
                    this.value = 1000;
                    alert("Max amount is 1000 records each page");
                }
            });
            $(currentShown).append(amountChange);

            var amountChangeOk = $("<div></div>").text("Change");
            amountChangeOk.attr("class", "amountChangeOk");
            amountChangeOk.click(function () {
                var query = lastQuery + "LIMIT " + $(".amountChange").first().val() + " OFFSET " + offset;
                toggleShow(designObject.lastToggleShow.elmVisible, query, table);
            });
            $(currentShown).append(amountChangeOk);

            /* Next page */
            if ((offset+amount) < total) {
                var nextOffset = offset + amount;
                var nextPage = $("<div></div>").text("Next page");
                nextPage.click(function () {
                    var query = lastQuery + "LIMIT " + amount + " OFFSET " + nextOffset;
                    toggleShow(designObject.lastToggleShow.elmVisible, query, table);
                });
                nextPage.attr("class", "queryNav");
                $(".limiter").append(nextPage);
            } else {
                var nextPage = $("<div></div>").text("Next page");
                nextPage.attr("class", "queryNavDeactive");
                $(".limiter").append(nextPage);
            }


            var rows = [];

            $.each(data, function (rowNumber, rowValues) {
                var rowElement = "";

                $.each(designObject[designIdentifier], function (keyNumber, identifier) {
                    var rowDisplayValue = rowValues[identifier];

                    /* If a specific function is assigned for an identifier - use returned value */
                    if (designObject.methods[identifier])
                        rowDisplayValue = designObject.methods[identifier](rowValues[identifier]);

                    rowElement += "<div class=\"" + identifier + "\" title=\"" + rowValues[identifier] + "\">" + designObject.translations[identifier] + " " + rowDisplayValue + "</div>";
                });

                rows.push("<div class=\"row" + ((rows.length % 2) + 1) + "\">" + rowElement + "</div>");
            });

            $("#contentData_" + designIdentifier).html(rows.join(""));

            /* Assign deletion method */
            $("#contentData_" + designIdentifier + " .x").click(function () {
                deleteRow(table, this);
            })
            $("#contentData_" + designIdentifier + " .e").click(function () {
                changeName(table, this);
            })
        });

    });
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
    var deletionChoice = confirm(deleteQuery);

    if (deletionChoice)
        $.get("/query?query=" + deleteQuery, function (data) {
            if (data == "Success")
                $(row).fadeOut(2000, function () { designObject.lastToggleShow.init(); });
            else
                alert("An error occured:\n" + data);
        });
}


/* Change the values within a row */
function changeName(table, elm) {

    var row = $(elm).parents("div[class^='row']");
    var columnElements = $(row).children("div[class!='edit_delete']");
    var changeQuery = "";

    if ($(row).children("div[class='edit_delete']").children(".update").length > 0)
        return;

    /* Do not allow changes on primary keys */
    /* TODO: Consider looking at all items with foreign keys also */
    var keyQuery = "SELECT column_name " +
        "FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE " +
        "WHERE table_schema = 'employees' AND table_name = '" + table + "' AND constraint_name = 'PRIMARY'";

    $.getJSON("/query?select=" + encodeURIComponent(keyQuery), function (data) {
        var excludedFromChange = [];
        var updateQuery = "";

        $.each(data, function (rowNumber, primaryColumns) {
            excludedFromChange.push(primaryColumns["column_name"]);
        });

        $.each(columnElements, function (elmNumber, columnElm) {
            var columnName = $(columnElm).attr("class");

            /* De-convert the values from the database */
            var rawValue = $(columnElm).html().split(": ");
            if (designObject.methods["raw_" + columnName])
                rawValue[1] = designObject.methods["raw_" + columnName](rawValue[1]);

            if (!excludedFromChange.includes(columnName)) {
                var dataType = designObject.datetimes[columnName] ? "date" : "text";
                rawValue[1] = "<input type=\"" + dataType + "\" class=\"editable\" value=\"" + rawValue[1] + "\">";
            } else {
                updateQuery += (updateQuery.length > 0 ? " AND " : "WHERE ") +
                    columnName + "='" + rawValue[1] + "'";
            }
            $(columnElm).html(rawValue.join(": "));
        });

        /* Update the values in the database */
        var update = $("<div></div>");
        update.text("UPDATE");
        update.attr("class", "update");
        update.click(function () {

            var updateQuery = "";
            var identifyQuery = "";

            $.each(columnElements, function (elmNumber, columnElm) {
                var columnName = $(columnElm).attr("class");

                if (!excludedFromChange.includes(columnName)) {
                    var rawValueElm = $(columnElm).children("input");
                    if (rawValueElm.val() != undefined) {
                        var newRawValue = rawValueElm.val();
                        updateQuery += (updateQuery.length > 0 ? ", " : "") +
                            columnName + "='" + newRawValue + "'";
                    }
                } else {
                    identifyQuery += (identifyQuery.length > 0 ? " AND " : "") +
                        columnName + "='" + $(columnElm).html().split(": ")[1] + "'";
                }
            });

            updateQuery = "UPDATE " + table + " SET " + updateQuery + " WHERE " + identifyQuery;
            if (confirm(updateQuery)) {
                $.get("/query?query=" + updateQuery, function () {
                    designObject.lastToggleShow.init();
                });
            }

        });

        $(row).children("div[class='edit_delete']").append(update);

    });
}