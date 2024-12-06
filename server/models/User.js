const sequelize = require('../utils/db.js');
const DataTypes = require('sequelize');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'Username is required' },
        len: {
          args: [1],
          msg: 'Username should be at least 1 character',
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'admin',
      validate: {
        notNull: { msg: 'Role is required' },
        len: {
          args: [1],
          msg: 'Role should be at least 1 character',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'Email is required' },
        isEmail: { msg: 'Enter a valid email address' },
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password is required' },
        len: {
          args: [1],
          msg: 'Password should be at least 1 character',
        },
      },
    },
  },
  {
    timestamps: true,
    tableName: 'users',
  }
);

// Sync the model with the database
User.sync({ force: false })
  .then(() => {
    console.log('User model synced with database');
  })
  .catch((err) => {
    console.error('Error syncing User model:', err);
  });

module.exports = User;
