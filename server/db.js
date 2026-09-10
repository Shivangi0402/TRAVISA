require("dotenv").config();

var mysql = require("mysql2");
var express = require("express");
var app = express();
var cors = require("cors");

app.use(express.json());
app.use(cors());

const multer = require("multer");
const path = require("path");

app.use("/public", express.static("public"));

const { Resend } = require("resend");

var con = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

const storage = multer.diskStorage({
  destination: path.join(__dirname, "./public/"),
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

// REGISTER
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
      return resp.status(409).json({
        message: "Email already registered",
      });
    }

    const insertQuery =
      "INSERT INTO customers (name, email, mobile, password) VALUES (?, ?, ?, ?)";

    con.query(insertQuery, [name, email, mobile, password], (err) => {
      if (err) {
        console.error("Insert error:", err);
        return resp.send("Insert failed");
      }

      resp.status(200).json({
        message: "Customer registered successfully",
      });
    });
  });
});

// LOGIN / VERIFY
app.post("/api/verify", (req, resp) => {
  var email = req.body.email;
  var password = req.body.password;

  const query = "Select * from customers where email=? and password=?";

  con.query(query, [email, password], (err, result) => {
    if (err) {
      console.error("Login database error:", err);
      return resp.status(500).send("Database error");
    }

    if (result.length > 0) {
      resp.send(result);
    } else {
      resp.send({
        message: "Invalid Email or Password",
      });
    }
  });
});

// ADD SERVICE
app.post("/api/postservice", (req, resp) => {
  let upload = multer({ storage: storage }).single("npimg");

  upload(req, resp, function (err) {
    if (err) {
      console.error("Upload error:", err);
      return resp.status(500).send("Upload failed");
    }

    if (!req.file) {
      console.log("not found");
      return resp.status(400).send("Image not found");
    }

    var name = req.body.name;
    var city = req.body.city;
    var price = req.body.price;
    var desc = req.body.desc;
    var img = req.file.filename;

    const query =
      "Insert into service (name,city,price,description,img) values(?,?,?,?,?)";

    con.query(query, [name, city, price, desc, img], (err) => {
      if (err) {
        console.error("Service insert error:", err);
        return resp.status(500).send("Service insert failed");
      }

      resp.json("");
    });
  });
});

// GET SERVICES
app.get("/api/service_get", (req, resp) => {
  const ins = "select * from service";

  con.query(ins, (err, result) => {
    if (err) {
      console.error("Database error:", err);

      return resp.status(500).json({
        error: "Database fetch failed",
      });
    }

    if (!Array.isArray(result)) {
      return resp.status(500).json({
        error: "Invalid data format",
      });
    }

    resp.json(result);
  });
});

// SAVE BOOKING + SEND EMAIL USING RESEND
app.post("/api/save_booking", (req, resp) => {
  var id = req.body.id;
  var price = req.body.price;
  var email = req.body.email;

  const insertQuery = "INSERT INTO booking (id, price) VALUES (?, ?)";

  con.query(insertQuery, [id, price], async (err, result) => {
    if (err) {
      console.log("Booking database error:", err);
      return resp.status(500).send("Database Insert Error");
    }

    const bookingId = result.insertId;

    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      const { data, error } = await resend.emails.send({
        from: "TRAVISA <onboarding@resend.dev>",
        to: [email],
        subject: "Booking Success",
        html: `
          <div>
            <h2>Booking Successful!</h2>

            <p>
              Your destination booking was successful.
            </p>

            <h2>Booking ID: ${bookingId}</h2>

            <p>
              Please do not share this email with anyone for security reasons.
            </p>

            <p>
              If you have any questions, contact support.
            </p>

            <p>
              Thank you!
            </p>
          </div>
        `,
      });

      if (error) {
        console.log("Resend email error:", error);

        return resp.status(500).send("Email sending failed");
      }

      console.log("Resend email sent successfully:", data);

      return resp.send({
        message: "Email Sent Successfully",
      });
    } catch (error) {
      console.log("Resend error:", error);

      return resp.status(500).send("Email sending failed");
    }
  });
});

// START SERVER
const PORT = process.env.PORT || 2040;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});