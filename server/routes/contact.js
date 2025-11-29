import express from 'express';
import { sendWelcomeEmail, sendContactFormEmail } from '../services/emailService.js';
import { addContact } from '../db-utils.js';

const router = express.Router();

// Add express.json() middleware to parse JSON bodies
router.use(express.json());

router.post('/api/contact', async (req, res) => {
  console.log('Contact form submission received:', req.body);
  
  try {
    const { name, email, message, phone, company } = req.body;

    // Basic validation
    if (!name || !email) {
      console.log('Validation failed - missing required fields');
      return res.status(400).json({ 
        success: false, 
        message: 'Name and email are required fields' 
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email);
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid email address' 
      });
    }

    console.log('Saving contact to database...');
    // Save to MongoDB
    const contactData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.toString().trim() : '',
      message: message || 'No message provided',
      company: company ? company.trim() : '',
      createdAt: new Date()
    };

    const contactResult = await addContact(contactData);
    console.log('Contact save result:', contactResult);

    if (!contactResult.success) {
      return res.status(400).json({ 
        success: false, 
        message: contactResult.message || 'Failed to save contact information. Please try again.' 
      });
    }

    // Send emails in parallel to improve response time
    console.log('Sending emails...');
    try {
      await Promise.all([
        // Send welcome email to the user
        sendWelcomeEmail(email, name),
        // Send contact form details to admin
        sendContactFormEmail({
          name,
          email,
          company: company || 'Not provided',
          requirement: message || 'No message provided'
        })
      ]);
      console.log('Emails sent successfully');
    } catch (emailError) {
      console.error('Email sending error (non-fatal):', emailError);
      // Continue even if email sending fails
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Thank you for contacting us! We will get back to you soon.' 
    });

  } catch (error) {
    console.error('Error in contact form submission:', {
      error: error.message,
      stack: error.stack,
      body: req.body
    });
    return res.status(500).json({ 
      success: false, 
      message: 'An unexpected error occurred. Please try again later.' 
    });
  }
});

export default router;
