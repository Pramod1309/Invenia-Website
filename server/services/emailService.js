import nodemailer from 'nodemailer';

// Create transporter function to ensure env vars are loaded
const createTransporter = () => {
  console.log('Creating email transporter with config:', {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    from: process.env.EMAIL_FROM,
    passLength: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0
  });

  const port = parseInt(process.env.EMAIL_PORT) || 587;
  
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,          
    port: port,          
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false // Allow self-signed certificates
    },
    debug: true, // Enable debug output
    logger: true // Log to console
  });
};

// Verify transporter connection
const verifyTransporter = async (transporter) => {
  try {
    await transporter.verify();
    console.log('SMTP connection verified successfully');
    return true;
  } catch (error) {
    console.error('SMTP verification failed:', error.message);
    return false;
  }
};

// =======================
// Send Welcome Email
// =======================
export const sendWelcomeEmail = async (to, name) => {
  try {
    const transporter = createTransporter();
    
    // Verify connection first
    const isVerified = await verifyTransporter(transporter);
    if (!isVerified) {
      console.error('Transporter verification failed, attempting to send anyway...');
    }

    const mailOptions = {
      from: `"Invenia Techlabs" <${process.env.EMAIL_FROM}>`,
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

    console.log('Attempting to send welcome email to:', to);
    const result = await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent successfully to ${to}`, result);
    return { success: true };
  } catch (error) {
    console.error("Error sending welcome email:", {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode
    });
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
      from: `"Invenia Techlabs" <${process.env.EMAIL_FROM}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${formData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Company:</strong> ${formData.company}</p>
          <p><strong>Requirement:</strong></p>
          <p>${formData.requirement ? formData.requirement.replace(/\n/g, "<br>") : 'N/A'}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="font-size: 12px; color: #6b7280;">
            This is an automated message from the Invenia Techlabs website.
          </p>
        </div>
      `,
    };

    console.log('Attempting to send contact form email to:', process.env.ADMIN_EMAIL);
    const result = await transporter.sendMail(mailOptions);
    console.log(`Contact form email sent successfully`, result);
    return { success: true };
  } catch (error) {
    console.error("Error sending contact form email:", {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode
    });
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
      from: `"Invenia Techlabs" <${process.env.EMAIL_FROM}>`,
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

    console.log('Attempting to send subscription email to:', email);
    const result = await transporter.sendMail(mailOptions);
    console.log(`Subscription email sent successfully to ${email}`, result);
    return { success: true };
  } catch (error) {
    console.error("Error sending subscription email:", {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode
    });
    return { success: false, error: error.message };
  }
};

