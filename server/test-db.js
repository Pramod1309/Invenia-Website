// test-db.js
import mongoose from 'mongoose';
import connectToDatabase from './mongo.js';

// Test data
const testUser = {
  name: 'Test User',
  email: 'test@example.com'
};

async function testDatabase() {
  try {
    // Connect to database
    console.log('Connecting to MongoDB...');
    const db = await connectToDatabase();
    
    // Create a test schema and model
    const testSchema = new mongoose.Schema({
      name: String,
      email: { type: String, unique: true },
      createdAt: { type: Date, default: Date.now }
    });
    
    const TestModel = mongoose.model('Test', testSchema);
    
    // Test CRUD operations
    console.log('Testing CRUD operations...');
    
    // Create
    console.log('Creating test document...');
    const created = await TestModel.create(testUser);
    console.log('Created document:', created);
    
    // Read
    console.log('Reading document...');
    const found = await TestModel.findOne({ email: testUser.email });
    console.log('Found document:', found);
    
    // Update
    console.log('Updating document...');
    const updated = await TestModel.findOneAndUpdate(
      { email: testUser.email },
      { name: 'Updated Test User' },
      { new: true }
    );
    console.log('Updated document:', updated);
    
    // Clean up (Delete)
    console.log('Cleaning up test data...');
    await TestModel.deleteOne({ email: testUser.email });
    console.log('Test data cleaned up');
    
    console.log('✅ All tests completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during test:', error);
    process.exit(1);
  }
}

testDatabase();
