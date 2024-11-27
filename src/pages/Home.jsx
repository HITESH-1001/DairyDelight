import React from 'react';
import { Link } from 'react-router-dom';
import { Milk, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-20">
          <div className="text-center">
            <Milk className="h-16 w-16 text-blue-600 mx-auto" />
            <h1 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Fresh Dairy Products
            </h1>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Discover our selection of premium dairy products, from farm-fresh milk
              to artisanal cheese.
            </p>
            <div className="mt-8">
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Shop Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}