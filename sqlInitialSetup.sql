/* Please import the database files prior to running below scripts */



CREATE USER AdminEmp;
SET PASSWORD FOR AdminEmp = "1234";
GRANT ALL ON employees.* TO AdminEmp;