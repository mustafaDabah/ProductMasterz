const nodemailer = require("nodemailer");

module.exports = async (userEamil, subject, htmlTemplate) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.APP_EMAIL_ADDRESS,
        pass: process.env.APP_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.APP_EMAIL_ADDRESS,
      to: userEamil,
      subject: subject,
      html: htmlTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("email sent: " + info.response);
  } catch (err) {
    console.log(err);
    throw new Error("internal server error (nodemailer)");
  }
};
