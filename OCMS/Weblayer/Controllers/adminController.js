import * as adminService from "../../Servicelayer/adminService.js";
import { sendMail } from '../Middlewares/nodemailerMiddleware.js';

export const register = async (req, res) => {
  try {
    const result = await adminService.registerAdmin(req.body);
    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const login = async (req, res) => {
  try {
    const result = await adminService.loginAdmin(req.body);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result, 
    })
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    })
  }
}

export const sendTestEmail = async (req, res) => {
  try {
    const { to, subject, message , html } = req.body;
    const info = await sendMail({
      to,
      subject,
      text: message,
      html
    });
    res.status(200).json({
      success: true,
      message: 'Email sent!',
      id: info.messageId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};