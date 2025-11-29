import Subscriber from './models/Subscriber.js';
import Contact from './models/Contact.js';
import ChatLog from './models/ChatLog.js';

export async function addSubscriber(email) {
  if (!email || typeof email !== 'string') {
    console.error('Invalid email parameter:', email);
    return { 
      success: false, 
      message: 'A valid email address is required',
      error: 'INVALID_EMAIL'
    };
  }

  const trimmedEmail = email.trim();
  
  try {
    console.log('Creating new subscriber:', trimmedEmail);
    
    // Check if email already exists
    const existing = await Subscriber.findOne({ email: trimmedEmail });
    if (existing) {
      console.log('Email already subscribed:', trimmedEmail);
      return { 
        success: false, 
        message: 'This email is already subscribed.',
        error: 'DUPLICATE_EMAIL'
      };
    }
    
    const subscriber = new Subscriber({ 
      email: trimmedEmail,
      subscribedAt: new Date()
    });
    
    await subscriber.save();
    console.log('Successfully subscribed:', trimmedEmail);
    
    return { 
      success: true, 
      message: 'Thank you for subscribing!',
      data: {
        email: trimmedEmail,
        subscribedAt: subscriber.subscribedAt
      }
    };
    
  } catch (error) {
    console.error('Error in addSubscriber:', {
      email: trimmedEmail,
      error: error.message,
      stack: error.stack,
      code: error.code,
      name: error.name
    });
    
    if (error.code === 11000) {
      return { 
        success: false, 
        message: 'This email is already subscribed.',
        error: 'DUPLICATE_EMAIL'
      };
    }
    
    return { 
      success: false, 
      message: 'Failed to subscribe. Please try again.',
      error: 'SUBSCRIPTION_FAILED',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    };
  }
}

export async function addContact(contactData) {
  const { name, email, message, phone = '', company = '' } = contactData;
  
  // Validate required fields
  if (!name || !email) {
    console.error('Missing required fields:', { name, email });
    return { 
      success: false, 
      message: 'Name and email are required fields' 
    };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.error('Invalid email format:', email);
    return { 
      success: false, 
      message: 'Please enter a valid email address' 
    };
  }

  try {
    console.log('Creating new contact:', { email, name });
    
    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.toString().trim() : '',
      message: message ? message.trim() : 'No message provided',
      company: company ? company.trim() : '',
      createdAt: new Date()
    });

    await contact.save();
    console.log('Contact saved successfully:', contact._id);
    
    return { 
      success: true, 
      message: 'Thank you for contacting us! We will get back to you soon.',
      data: {
        contactId: contact._id,
        email: contact.email,
        name: contact.name
      }
    };
    
  } catch (error) {
    console.error('Error saving contact:', {
      error: error.message,
      code: error.code,
      name: error.name,
      stack: error.stack,
      contactData: { 
        name: contactData.name,
        email: contactData.email,
        hasPhone: !!contactData.phone,
        hasCompany: !!contactData.company
      }
    });

    if (error.code === 11000) {
      return { 
        success: false, 
        message: 'This email has already been used. Please try a different email or contact support.'
      };
    }
    
    return { 
      success: false, 
      message: 'Failed to process your request. Please try again later.'
    };
  }
}

export async function saveChatLog(role, content, sessionId = null) {
  try {
    const chatLog = new ChatLog({
      role,
      content,
      sessionId,
    });
    await chatLog.save();
    return { success: true };
  } catch (error) {
    console.error('Error saving chat log:', error);
    return { success: false };
  }
}

export async function getChatHistory(sessionId, limit = 10) {
  try {
    return await ChatLog.find({ sessionId })
      .sort({ createdAt: -1 })
      .limit(limit);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
}
