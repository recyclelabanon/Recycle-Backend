const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createAdmin = async () => {
    try {
        console.log('Connecting to database...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to database');

        // Check if admin already exists
        const adminExists = await User.findOne({ email: 'admin890@gmail.com' });
        if (adminExists) {
            console.log('✅ Admin user already exists');
            console.log('Email:', adminExists.email);
            console.log('Role:', adminExists.role);
            await mongoose.connection.close();
            process.exit(0);
        }

        // Create admin user
        const admin = await User.create({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin890@gmail.com',
            password: 'admin@123',
            role: 'admin'
        });

        console.log('✅ Admin user created successfully!');
        console.log('Email:', admin.email);
        console.log('Password: admin@123');
        console.log('Role:', admin.role);

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin user:', error.message);
        await mongoose.connection.close();
        process.exit(1);
    }
};

createAdmin();
