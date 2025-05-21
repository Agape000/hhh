import express from 'express';
import cors from 'cors';
import session from 'express-session'; 
import carRoutes from './routes/carRoute.js';
import packageRoutes from './routes/packageRoute.js';
import servicePackageRoutes from './routes/servicePackageRoute.js';
import paymentRoutes from './routes/paymentRoute.js';
import authRoutes from './routes/authRoute.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

app.use(session({
  secret: 'your-secret-key', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60, 
    secure: false, 
    sameSite: 'lax',
  }
}));

app.use('/api/cars', carRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/services', servicePackageRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/auth', authRoutes);

app.listen(4444, () => {
  console.log('Server running at http://localhost:4444');
});
