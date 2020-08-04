require('dotenv').config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const nodemailer = require("nodemailer")

var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);

const contactAddress = "webizy.france@gmail.com"
const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ADRESS,
    pass: process.env.GMAIL_PASSWORD,
  },
})
app.post("/contact", function (req, res) {
  mailer.sendMail(
    {
      from: req.body.from,
      to: [contactAddress],
      subject: req.body.subject || "[No subject]",
      html: req.body.message || "[No message]",
    },
    function (err, info) {
      if (err) return res.status(500).send(err)
      res.json({ success: true })
    }
  )
})

var listener = app.listen(8080, function() {
  console.log("Listening on port " + listener.address().port);
});
