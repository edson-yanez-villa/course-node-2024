import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Status } from "../constants/index.js";
import { Task } from "./task.js";
import logger from "../logs/logger.js";
import { encrypt } from "../common/bycript.js";


export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Username is required'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Password is required'
            }
        }
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: Status.ACTIVE,
        validate: {
            isIn: {
                args: [[Status.ACTIVE, Status.INACTIVE]],
                msg: `Status must be ${Status.ACTIVE} or ${Status.INACTIVE}`
            }
        }
    }
});

// relations one to many
User.hasMany(Task);
// but a task can only have one user
Task.belongsTo(User);


User.beforeCreate(async (user) => {
    try {
        user.password = await encrypt(user.password);
    } catch (error) {
        logger.error(error.message);
        throw new Error("Error to encrypt password");
    }
})


User.beforeUpdate(async (user) => {
    try {
        user.password = await encrypt(user.password);
    } catch (error) {
        logger.error(error.message);
        throw new Error("Error to encrypt password");
    }
})