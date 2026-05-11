// imports
import dbConnect from '../lib/database';
import createUserModel from '@/assets/models/userModel'; // Rename import for clarity

export async function getModels() {
    const sequelize = await dbConnect();

    // Initialize the model with the actual sequelize instance
    const User = createUserModel(sequelize);

    const models = {
        User,
    };

    if (process.env.NODE_ENV === 'development') {
        console.log('-- Syncing Database Models (Alter Mode) --');
        await sequelize.sync({ alter: true });
    }

    return models;
}
