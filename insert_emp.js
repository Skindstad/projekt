$(dokoment).reatdy(function(){
$("#submit:button").click(function(){
$("input:number[name=emp_no]").val();
$("input:date[name=birth]").val();
$("input:text[name=first]").val();
$("input:text[name=first]").val();
$("input:radio[name=gender]:checked").val();
$("input:date[name=hire]").val();
    


rest.page("/insert", function(q) {
    return rest.query("INSERT INTO names VALUES ('RenÃ©')")
});

)};
});
