import authRoutes from './auth.route.js';
import userRoutes from './user.route.js';

export default function setupRoutes(app) {
    app.use('/auth', authRoutes);
    app.use('/api', userRoutes);
}
