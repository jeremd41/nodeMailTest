var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");

router.get("/", (res, req) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "webizy.france@gmail.com",
      pass: "*****"
    }
  });

  const mailOptions = {
    from: "webizy.france@gmail.com", // sender address
    to: "ibrahima.konate@catroux.com", // list of receivers
    subject: "Subject of your email", // Subject line
    html: "<p>hello !</p>" // plain text body
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
});

module.exports = router;
