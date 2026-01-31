import nodemailer from 'nodemailer';

// Create transporter function to ensure env vars are loaded
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,          
    port: parseInt(process.env.EMAIL_PORT) || 465,          
    secure: process.env.EMAIL_PORT == '465', // true if SSL (465), false if TLS (587)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// =======================
// Send Welcome Email
// =======================
export const sendWelcomeEmail = async (to, name) => {
  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject: "Welcome to Invenia Techlabs",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Welcome to Invenia Techlabs!</h2>
          <p>Hello ${name},</p>
          <p>Thank you for reaching out to us. We've received your message and our team will get back to you shortly.</p>
          <p>In the meantime, feel free to explore our services on our website.</p>
          <p>Best regards,<br>The Invenia Techlabs Team</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="font-size: 12px; color: #6b7280;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent successfully to ${to}`);
    return { success: true };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return { success: false, error: error.message };
  }
};

// =======================
// Send Contact Form Email
// =======================
export const sendContactFormEmail = async (formData) => {
  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${formData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Company:</strong> ${formData.company}</p>
          <p><strong>Requirement:</strong></p>
          <p>${formData.requirement.replace(/\n/g, "<br>")}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="font-size: 12px; color: #6b7280;">
            This is an automated message from the Invenia Techlabs website.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Contact form email sent successfully to ${process.env.ADMIN_EMAIL}`);
    return { success: true };
  } catch (error) {
    console.error("Error sending contact form email:", error);
    return { success: false, error: error.message };
  }
};

// =======================
// Send Newsletter Subscription Email
// =======================
export const sendSubscriptionEmail = async (email) => {
  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Welcome to Invenia Techlabs Newsletter!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Thank You for Subscribing!</h2>
          <p>Hello,</p>
          <p>Thank you for subscribing to the Invenia Techlabs newsletter.</p>
          <p>You'll now receive the latest updates on:</p>
          <ul>
            <li>SAP solutions and best practices</li>
            <li>Industry insights and trends</li>
            <li>New product announcements</li>
            <li>Exclusive webinars and events</li>
          </ul>
          <p>Best regards,<br>The Invenia Techlabs Team</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="font-size: 12px; color: #6b7280;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Subscription email sent successfully to ${email}`);
    return { success: true };
  } catch (error) {
    console.error("Error sending subscription email:", error);
    return { success: false, error: error.message };
  }
};

