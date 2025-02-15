import app from './app.js';
import 'dotenv/config';
import logger from './logs/logger.js';
import { sequelize } from './database/database.js';

async function main() {
    // start sequelize
    await sequelize.sync({ force: false });

    const port = process.env.PORT;
    app.listen(port);
    logger.info(`Server running on port ${port}`);
}

main();