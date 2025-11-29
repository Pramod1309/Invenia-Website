import express from 'express';
import { addSubscriber } from '../db-utils.js';

const router = express.Router();

router.post('/api/subscribe', express.json(), async (req, res) => {
  console.log('Subscription request received:', req.body);
  
  try {
    const { email } = req.body;

    // Basic validation
    if (!email || typeof email !== 'string') {
      console.log('Invalid email format received:', email);
      return res.status(400).json({ 
        success: false, 
        message: 'A valid email address is required' 
      });
    }

    const trimmedEmail = email.trim();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      console.log('Invalid email format:', email);
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid email address' 
      });
    }

    console.log('Attempting to save subscriber:', trimmedEmail);
    
    // Save to MongoDB
    const result = await addSubscriber(trimmedEmail);
    console.log('Subscription result:', result);

    if (!result.success) {
      return res.status(400).json({ 
        success: false, 
        message: result.message || 'Failed to subscribe. Please try again.' 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Thank you for subscribing to our newsletter!' 
    });

  } catch (error) {
    console.error('Error in subscription handler:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An unexpected error occurred. Please try again later.'
    });
  }
});

export default router;
