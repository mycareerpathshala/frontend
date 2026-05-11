// imports
import { DataTypes } from 'sequelize';

// Export a function instead of a static constant
const createUserModel = (sequelize) => {
    // Check if the model is already defined to prevent Next.js re-init errors
    if (sequelize.models.User) return sequelize.models.User;

    const User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            firstName: { type: DataTypes.STRING, allowNull: false },
            lastName: { type: DataTypes.STRING, allowNull: false },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: { isEmail: true },
            },
            password: { type: DataTypes.STRING, allowNull: false },
            role: {
                type: DataTypes.ENUM('admin', 'user'),
                allowNull: false,
                defaultValue: 'user',
            },
        },
        {
            tableName: 'users',
            underscored: true,
            timestamps: true,
        },
    );

    return User;
};

// export default
export default createUserModel;
