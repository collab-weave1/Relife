import React from 'react';
import { Heart, Leaf } from 'lucide-react';

export const Footer = () => (
  <footer className="mt-auto bg-gradient-to-r from-green-600 to-blue-600 dark:from-gray-800 dark:to-gray-900 border-t border-green-200 dark:border-gray-700 py-4">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2 text-white pl-6 ml-16 mb-2 md:mb-0">
          <Leaf className="w-5 h-5 text-green-200" />
          <span className="text-sm font-medium">
            Built with <Heart className="w-4 h-4 text-red-400 inline mx-1" /> for a sustainable future
          </span>
        </div>
        <div className="text-white/80 text-sm">
          &copy; {new Date().getFullYear()} ReLife. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
);