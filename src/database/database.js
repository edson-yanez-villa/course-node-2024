import { Sequelize } from "sequelize";
import 'dotenv/config'


export const sequelize = new Sequelize(
    process.env.DATABASE_URL, 
    process.env.DATABASE_USER, 
    process.env.DATABASE_PASSWORD, 
    {
        dialect: process.env.DATABASE_DIALECT,
        host: process.env.DATABASE_HOST || 'localhost',
        logging: console.log,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
)