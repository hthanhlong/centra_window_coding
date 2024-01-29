import nodemailer from "nodemailer";
import { ENV_VARIABLES } from "../config";

console.log("ENV_VARIABLES", ENV_VARIABLES);

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: ENV_VARIABLES.SENDEREMAIL,
    pass: ENV_VARIABLES.PASSWORD,
  },
});
