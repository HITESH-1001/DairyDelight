import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

const products = [
  {
    name: "Fresh Whole Milk",
    description: "Farm-fresh whole milk, rich in nutrients and naturally creamy.",
    price: 3.99,
    category: "milk",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800",
    stock: 100
  },
  {
    name: "Organic Butter",
    description: "Premium organic butter made from grass-fed cow's milk.",
    price: 4.99,
    category: "butter",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=800",
    stock: 50
  },
  {
    name: "Aged Cheddar Cheese",
    description: "Sharp cheddar cheese aged for 12 months for maximum flavor.",
    price: 6.99,
    category: "cheese",
    image: "https://images.unsplash.com/photo-1566454825481-9c19d2ab25f5?auto=format&fit=crop&w=800",
    stock: 75
  },
  {
    name: "Greek Yogurt",
    description: "Creamy Greek yogurt, high in protein and probiotic cultures.",
    price: 2.99,
    category: "yogurt",
    image: "https://images.unsplash.com/photo-1571212515416-fca988684e60?auto=format&fit=crop&w=800",
    stock: 80
  },
  {
    name: "Low-Fat Milk",
    description: "Fresh low-fat milk, perfect for a healthy lifestyle.",
    price: 3.49,
    category: "milk",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800",
    stock: 90
  },
  {
    name: "Mozzarella Cheese",
    description: "Fresh mozzarella cheese, perfect for pizzas and salads.",
    price: 5.99,
    category: "cheese",
    image: "https://images.unsplash.com/photo-1551489186-ccb95a1ea6a3?auto=format&fit=crop&w=800",
    stock: 60
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`Seeded ${insertedProducts.length} products`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();