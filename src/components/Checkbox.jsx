import React from 'react';
import { Check } from 'lucide-react';

const Checkbox = ({ 
  id,
  checked = false, 
  onChange, 
  className = '',
  ...props 
}) => {
  const handleChange = (e) => {
    onChange(e.target.checked);
  };

  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
        className="sr-only"
        {...props}
      />
      <label
        htmlFor={id}
        className={`relative flex items-center justify-center w-5 h-5 border-2 rounded cursor-pointer transition-all duration-200 ${
          checked 
            ? 'bg-blue-600 border-blue-600 text-white' 
            : 'bg-white border-gray-300 hover:border-blue-400'
        } ${className}`}
      >
        {checked && (
          <Check className="w-3 h-3 text-white" strokeWidth={3} />
        )}
      </label>
    </div>
  );
};

export default Checkbox;