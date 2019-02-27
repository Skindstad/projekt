var rest = require("./RestEasy.js") //Import the Module

rest.dbSetup(       //Must be called if you want to use mysql calls
    "localhost",    //Host
    "AdminEmp",         //User
    "1234",      //Password
    "employees"          //Optionally database
)


rest.page("/", function () {
    return rest.file("index.html")
})

rest.page("/style.css", function () {
    return rest.file("style.css")
})

rest.start(8001) //Initialize the server

//Declaring a root page
//Will be accessed on localhost:8001
//rest.page("/", function () {
//    return "Hello World!" //Strings will be returned directly
//})

//Declaring a page to return json
//Will be accessed on localhost:8001/object
//rest.page("/object", function ()Â {
//    return { text: "cool", otherText: "beans" } //Objects will be returned as a json representation
//})

//Declaring a page that returns something from a database
//Will be accessed on localhost:8001/query
//rest.page("/query", function () {
//    return "SELECT * FROM names"    //Since this starts with SELECT, 
    //the system will try and run it 
    //as a query on the database
//})

//Declaring a page that uses parameters
//Will be accessed on localhost:8001/parameters?a=3&b=5
//rest.page("/parameters", function (q) {  //the parameters can be accessed through the 
    //q object
//    return parseInt(q.a) + parseInt(q.b);
//})

//Declaring a page that uses a different kind of query
//Will be accessed on localhost:8001/insert
//DISCLAIMER no protection against injection has yet been implemented. 
//DONT GO LIVE!!!
//rest.page("/insert", function (q) {
//    return rest.query("INSERT INTO names VALUES ('RenÃ©')")
//})

//Delaring a page that returns the contents of a file
//Will be accessed on localhost:8001/file
