const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const db = mysql.createConnection({
	host: 'waste-management.cvjdzc0iu0ta.ap-south-1.rds.amazonaws.com',
	user: 'admin',
	password: 'admin123',
	database: 'waste-management-system',
	port: 3306,
	multipleStatements: true
})

db.connect((err) => {
	if(err)
		throw err;
	else
		console.log("Connected");
})

const app = express();

app.use(express.json());
app.use(cors());

app.get('/',(req,res) => {
    res.json("Success");
    console.log("!!!");
})

function queryExec(sql,res) {
	db.query(sql, function (error, results) {
    if (error) {
        throw error;
        res.json("Error");
    }
    res.json(results);
	});
}

app.post('/signin', (req, res) => {
	var name = req.body.name,
	username = req.body.username,
	password = req.body.password;
	let sql;
	if( name === "USER")
		sql = `SELECT * FROM User where U_name = '${username}' 
		AND Password = '${password}';`
	else
	  sql = `SELECT * FROM Admin where admin_name = '${username}' 
		AND admin_password = '${password}';`
	queryExec(sql,res);
})

app.post('/register', (req, res) => {
	var username = req.body.username,
	password = req.body.password,
	email = req.body.email,
	areaid = req.body.areaid,
	phone = req.body.phone;
	let sql = `INSERT INTO User (U_name, Password, email, area_id, ph_number) 
  VALUES('${username}', '${password}', '${email}', '${areaid}', '${phone}');`
	queryExec(sql,res);
})

app.get('/adminProfile/:id', (req, res) => {
	var id = req.params.id;
	let sql = `SELECT * FROM User JOIN Admin ON User.area_id = Admin.area_id 
			   WHERE Admin.admin_id = '${id}' AND User.Status !=''; 

			   SELECT * FROM Complaint c INNER JOIN User u ON c.User_id = u.User_id 
			   INNER JOIN Admin a ON a.area_id = u.area_id WHERE a.admin_id=${id}; 

			   SELECT SUM(biowaste), SUM(nonbiowaste), SUM(biowaste)+SUM(nonbiowaste) 
			   as totalwaste FROM Waste_produced LEFT JOIN Admin ON Waste_produced.area_pin
			   = Admin.Area_id WHERE Admin.admin_id = '${id}';

			   SELECT count(*) FROM User LEFT JOIN Admin ON User.area_id = Admin.area_id
			   WHERE Admin.admin_id='${id}';`;
	queryExec(sql,res);
})

app.get('/userProfile/:id', (req, res) => {
	const id =  req.params.id;
	let sql = `SELECT * FROM User WHERE User_id = ${id};`;
	queryExec(sql,res);
})

app.post('/userrequest', (req, res) => {
	var biowaste = req.body.biowaste,
	nonbiowaste = req.body.nonbiowaste,
	areapin = req.body.areapin,
	userid = req.body.userid;
	let sql = `INSERT INTO Waste_produced(biowaste, nonbiowaste, area_pin) VALUES
	('${biowaste}','${nonbiowaste}','${areapin}');
	UPDATE User SET Status = 'To be Picked' WHERE User_id = '${userid}'`;
	queryExec(sql,res);
})

app.post('/usercomplaint', (req, res) => {
	var c_descrip = req.body.c_descrip,
	userid = req.body.userid;
	let sql = `INSERT INTO Complaint(User_id, description, complaint_status) VALUES('${userid}', 
	'${c_descrip}', 'pending')`;
	queryExec(sql,res);
})

app.post('/complaintStatus', (req, res) => {
	var status = req.body.status,
	id = req.body.c_id;
	let sql = `UPDATE Complaint SET complaint_status = '${status}' WHERE complaint_id = '${id}'`;
	queryExec(sql,res);
})

app.post('/userStatus', (req, res) => {
	var status = req.body.status,
	id = req.body.id;
	let sql = `UPDATE User SET Status = '${status}' WHERE User_id = ${id}`;
	queryExec(sql,res);
})

app.listen(3001, err => {
	console.log("The app is running at port 3001");
});