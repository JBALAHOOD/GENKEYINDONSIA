import React from 'react';

const Input = ({ 
  className = '', 
  type = 'text',
  ...props 
}) => {
  return (
    <input
      type={type}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${className}`}
      {...props}
    />
  );
};

export default Input;