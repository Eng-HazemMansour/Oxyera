'use client';

import { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  error?: string;
  helpText?: string;
  options: SelectOption[];
  placeholder?: string;
  variant?: 'default' | 'filled';
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className = '', 
    label, 
    error, 
    helpText,
    options,
    placeholder,
    variant = 'default',
    id,
    ...props 
  }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).slice(2)}`;
    
    const baseClasses = 'w-full px-3 py-2.5 text-sm rounded-lg border transition-all duration-200 focus-ring disabled:opacity-50 disabled:cursor-not-allowed bg-white appearance-none cursor-pointer';
    
    const variants = {
      default: 'border-gray-300 focus:border-blue-500',
      filled: 'border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500'
    };

    const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';
    
    const selectClasses = `${baseClasses} ${variants[variant]} ${errorClasses} ${className}`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={selectClasses}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option, index) => (
              <option 
                key={index} 
                value={option.value} 
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-red-600 animate-fade-in">
            {error}
          </p>
        )}
        
        {helpText && !error && (
          <p className="mt-1 text-sm text-gray-500">
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select; 