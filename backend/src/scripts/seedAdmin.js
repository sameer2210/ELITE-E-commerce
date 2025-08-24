//to add admin in db run this code --  node src/scripts/seedAdmin.js

// src/scripts/seedAdmin.js
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/user.model.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    // check if an admin already exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      console.log(`Admin already exists: ${adminExists.email}`);
      process.exit();
    }

    // create admin from env
    await User.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'admin',
    });

    console.log('Admin user created successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
