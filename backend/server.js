require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 5000;

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure 'uploads' folder exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Vivek@217877",
    database: "contentDB"
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database");
});

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Form Submission API
app.post("/submit-form", upload.single("file"), (req, res) => {
    const { name, email, content } = req.body;
    const filePath = req.file ? req.file.path : null;

    // Insert data into MySQL
    const sql = "INSERT INTO content_requests (name, email, content, file_path) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, content, filePath], (err) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ success: false, message: "Database error" });
        }

        // Email Notification with Attachment
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "vivekdake9@gmail.com",
            subject: "New Content Submission",
            text: `Name: ${name}\nEmail: ${email}\nContent: ${content}\nFile: ${filePath ? "Attached" : "No file uploaded"}`,
            attachments: filePath ? [{ filename: path.basename(filePath), path: filePath }] : []
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.error("Email error:", error);
                return res.status(500).json({ success: false, message: "Email sending failed" });
            }
            res.json({ success: true, message: "Form submitted successfully!" });
        });
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
