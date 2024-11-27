// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import productRoutes from './routes/products.js';
// import authRoutes from './routes/auth.js';
// import orderRoutes from './routes/orders.js';

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/products', productRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/orders', orderRoutes);

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/orders.js';
import productRoutes from './routes/products.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Connect to MongoDB
const MONGODB_URI = 'mongodb://localhost:27017/dairydelight';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB at localhost'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
