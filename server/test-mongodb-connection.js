import mongoose from 'mongoose';

async function testMongoDBConnection() {
  const MONGODB_URI = 'mongodb+srv://Invenia:Invenia%402303@invenia.vbwsmgm.mongodb.net/Invenia?retryWrites=true&w=majority';
  
  console.log('Attempting to connect to MongoDB...');
  
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
      socketTimeoutMS: 45000,
      connectTimeoutMS: 5000,
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority'
    });

    console.log('✅ Successfully connected to MongoDB!');

    // Test a simple operation
    const testCollection = mongoose.connection.db.collection('test_connection');
    await testCollection.insertOne({ test: 'connection_test', timestamp: new Date() });
    console.log('✅ Successfully wrote test document to MongoDB');
    
    // Clean up
    await testCollection.deleteOne({ test: 'connection_test' });
    console.log('✅ Cleaned up test document');
    
    // List all collections to verify access
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('Error details:', error);
    process.exit(1);
  }
}

testMongoDBConnection();
