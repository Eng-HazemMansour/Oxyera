'use client';

import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'elevated' | 'bordered';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', padding = 'md', variant = 'default', children, ...props }, ref) => {
    const baseClasses = 'bg-white rounded-xl transition-all duration-200';
    
    const variants = {
      default: 'shadow-soft',
      elevated: 'shadow-lg hover:shadow-xl',
      bordered: 'border border-gray-200 shadow-sm hover:shadow-md'
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    };

    const classes = `${baseClasses} ${variants[variant]} ${paddings[padding]} ${className}`;

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card; 