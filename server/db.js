require("dotenv").config();
var mysql = require("mysql");
var express = require("express");
var app = express();
var cors = require("cors");
app.use(express.json());
app.use(cors());
const multer = require("multer");
const path = require("path");
app.use("/public", express.static("public"));
var nodemailer = require("nodemailer");

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});
con.connect(function () {
  console.log("I am Connected");
});

const storage = multer.diskStorage({
  destination: path.join(__dirname, "./public/"),
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

app.post("/api/register", (req, resp) => {
  var name = req.body.name;
  var email = req.body.email;
  var mobile = req.body.mobile;
  var password = req.body.password;
  const checkQuery = "SELECT * FROM customers WHERE email = ?";
  con.query(checkQuery, [email], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return resp.send("Database error");
    }
    if (result.length > 0) {
      return resp.status(409).json({ message: "Email already registered" });
    }
    const insertQuery =
      "INSERT INTO customers (name, email, mobile, password) VALUES (?, ?, ?, ?)";
    con.query(insertQuery, [name, email, mobile, password], (err) => {
      if (err) {
        console.error("Insert error:", err);
        return resp.send("Insert failed");
      }
      resp.status(200).json({ message: "Customer registered successfully" });
    });
  });
});

app.post("/api/verify", (req, resp) => {
  var email = req.body.email;
  var password = req.body.password;
  const query = "Select * from customers where email=? and password=?";
  con.query(query, [email, password], (err, result) => {
    if (result.length > 0) {
      resp.send(result);
    } else {
      resp.send({ message: "Invalid Email or Password" });
    }
  });
});

app.post("/api/postservice", (req, resp) => {
  let upload = multer({ storage: storage }).single("npimg");
  upload(req, resp, function (err) {
    if (!req.file) {
      console.log("not found");
    } else {
      var name = req.body.name;
      var city = req.body.city;
      var price = req.body.price;
      var desc = req.body.desc;
      var img = req.file.filename;
      const query =
        "Insert into service (name,city,price,description,img) values(?,?,?,?,?)";
      con.query(query, [name, city, price, desc, img]);
      resp.json("");
    }
  });
});

app.get("/api/service_get", (req, resp) => {
  const ins = "select * from service";
  con.query(ins, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return resp.status(500).json({ error: "Database fetch failed" });
    }
    if (!Array.isArray(result)) {
      return resp.status(500).json({ error: "Invalid data format" });
    }
    resp.json(result); // make sure to use json()
  });
});

app.post("/api/save_booking", (req, resp) => {
  var id = req.body.id;
  var price = req.body.price;
  var email = req.body.email;

  // Insert the booking
  const insertQuery = "INSERT INTO booking (id, price) VALUES (?, ?)";
  con.query(insertQuery, [id, price], (err, result) => {
    if (err) {
      console.log(err);
      return resp.status(500).send("Database Insert Error");
    }

    const bookingId = result.insertId;

    const Smtp = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const message = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Booking Success",
      html: `
                <p>Your destination booking was successful. <br><h2>Booking ID: ${bookingId}</h2></p>
                <p>Please do not share this email with anyone for security reasons.</p>
                <i>If you have any questions, contact support.</i>
                <p>Thank you!</p>`,
    };

    Smtp.sendMail(message, (err, info) => {
      if (err) {
        console.log(err);
        return resp.status(500).send("Email sending failed");
      } else {
        return resp.send({ message: "Email Sent Successfully" });
      }
    });
  });
});

const PORT = process.env.PORT || 2040;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
