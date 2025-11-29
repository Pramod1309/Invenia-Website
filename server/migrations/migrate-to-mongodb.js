import mysql from 'mysql2/promise';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Subscriber from '../models/Subscriber.js';
import Contact from '../models/Contact.js';
import ChatLog from '../models/ChatLog.js';

dotenv.config();

// MySQL Configuration
const mysqlConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'Pramod@1309',
  database: process.env.MYSQL_DATABASE || 'invenia',
  multipleStatements: true,
};

// MongoDB Configuration
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://Invenia:Invenia%402303@invenia.vbwsmgm.mongodb.net/Invenia?retryWrites=true&w=majority';

async function migrate() {
  console.log('Starting migration from MySQL to MongoDB...');
  
  // Connect to MySQL
  console.log('Connecting to MySQL...');
  const mysqlConn = await mysql.createConnection(mysqlConfig);
  
  try {
    // Connect to MongoDB with retry logic
    console.log('Connecting to MongoDB...');
    const maxRetries = 3;
    let retryCount = 0;
    
    while (retryCount < maxRetries) {
      try {
        await mongoose.connect(mongoUri, {
          dbName: 'Invenia',
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
        });
        console.log('Successfully connected to MongoDB');
        break;
      } catch (error) {
        retryCount++;
        console.error(`MongoDB connection attempt ${retryCount} failed:`, error.message);
        if (retryCount === maxRetries) {
          throw new Error(`Failed to connect to MongoDB after ${maxRetries} attempts`);
        }
        console.log(`Retrying in 3 seconds... (${maxRetries - retryCount} attempts remaining)`);
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }

    // Clear existing collections (optional, remove if you want to keep existing data)
    console.log('Clearing existing collections...');
    await Promise.all([
      Subscriber.deleteMany({}),
      Contact.deleteMany({}),
      ChatLog.deleteMany({}),
    ]);

    // Migrate subscribers
    console.log('Migrating subscribers...');
    const [subscribers] = await mysqlConn.query('SELECT * FROM subscribers');
    if (subscribers.length > 0) {
      await Subscriber.insertMany(subscribers.map(sub => ({
        email: sub.email,
        createdAt: sub.created_at,
      })));
      console.log(`Migrated ${subscribers.length} subscribers`);
    } else {
      console.log('No subscribers to migrate');
    }

    // Migrate contacts
    console.log('Migrating contacts...');
    const [contacts] = await mysqlConn.query('SELECT * FROM contacts');
    if (contacts.length > 0) {
      await Contact.insertMany(contacts.map(contact => ({
        name: contact.name,
        email: contact.email,
        phone: contact.phone || '',
        message: contact.message,
        createdAt: contact.created_at,
      })));
      console.log(`Migrated ${contacts.length} contacts`);
    } else {
      console.log('No contacts to migrate');
    }

    // Migrate chat logs
    console.log('Migrating chat logs...');
    const [chatLogs] = await mysqlConn.query('SELECT * FROM chat_logs');
    if (chatLogs.length > 0) {
      await ChatLog.insertMany(chatLogs.map(log => ({
        role: log.role,
        content: log.content,
        sessionId: log.session_id || null,
        createdAt: log.created_at,
      })));
      console.log(`Migrated ${chatLogs.length} chat logs`);
    } else {
      console.log('No chat logs to migrate');
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    // Close connections
    await mysqlConn.end();
    await mongoose.connection.close();
    console.log('Connections closed');
    process.exit(0);
  }
}

migrate();
