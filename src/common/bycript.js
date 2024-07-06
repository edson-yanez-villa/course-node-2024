import logger from "../logs/logger.js";
import bcrypt from 'bcrypt';
import 'dotenv/config';

export const encrypt = async (text) => {
    try {
        const salt = +process.env.BCRYPT_SALT_ROUNDS;
        return await bcrypt.hash(text, salt);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error to encrypt');
    }
};

export const compare = async (text, hash) => {
    try {
        return await bcrypt.compare(text, hash);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error to compare');
    }
}