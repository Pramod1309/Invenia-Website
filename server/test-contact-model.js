import mongoose from 'mongoose';
import './models/Contact.js'; // Import the model to ensure it's registered

async function testContactModel() {
  const MONGODB_URI = 'mongodb+srv://Invenia:Invenia%402303@invenia.vbwsmgm.mongodb.net/Invenia?retryWrites=true&w=majority';
  
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 5000
    });

    console.log('✅ Connected to MongoDB!');

    // Get the Contact model
    const Contact = mongoose.model('Contact');
    
    // Test creating a contact
    console.log('Creating test contact...');
    const testContact = new Contact({
      name: 'Test User',
      email: `test-${Date.now()}@example.com`,
      phone: '1234567890',
      message: 'This is a test message',
      company: 'Test Company'
    });

    const savedContact = await testContact.save();
    console.log('✅ Contact saved successfully:', savedContact);

    // Clean up
    await Contact.deleteOne({ _id: savedContact._id });
    console.log('✅ Test contact cleaned up');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Error details:', error);
    process.exit(1);
  }
}

testContactModel();
