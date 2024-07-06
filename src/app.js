import express from 'express';
import morgan from 'morgan';

const app = express();

//Import Routes
import userRoutes from './routes/user.routes.js';
import tasksRoutes from './routes/tasks.routes.js';
import router from './routes/auth.routes.js';
// import { authenticateToken } from './middlewares/authenticate.middleware.js';


//Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/login', router);

export default app;