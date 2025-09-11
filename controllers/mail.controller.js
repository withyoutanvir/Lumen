import nodemailer from "nodemailer";

const MailSender = (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
    user : process.env.EMAIL_USER,
            pass : process.env.EMAIL_PASS
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: req.body.email, 
    subject: req.body.subject,
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Working");
  });
};

export default MailSender;
