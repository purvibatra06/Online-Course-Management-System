import nodemailer from 'nodemailer';

export const sendResetPasswordMail = async (fullName, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSword
      }
    });
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'For reset password',
      html: `<p>Hi ${fullName},</p>
    <p>Please click the link below to reset your password:</p>
    <a href="https://supreme-space-system-4jq7gqvr79q7fqg94-6090.app.github.dev/api/user/reset-password?token=${token}">Reset Password</a>`
    }
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail has been sent", info.response);
      }
    })
  } catch (error) {
    res.status(400).send({ success: false, message: error });
  }
}