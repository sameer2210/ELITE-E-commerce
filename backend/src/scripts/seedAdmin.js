//to add admin in db run this code --  node src/scripts/seedAdmin.js

// src/scripts/seedAdmin.js
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import ensureAdmin from "../utils/ensureAdmin.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();
    await ensureAdmin();
    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
