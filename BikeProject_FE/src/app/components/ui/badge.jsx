import React from 'react';

const variantStyles = {
    default: 'bg-blue-600 text-white',
    secondary: 'bg-gray-100 text-gray-700',
    outline: 'border border-gray-300 text-gray-700 bg-transparent',
};

export function Badge({ children, variant = 'default', className = '', ...props }) {
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${variantStyles[variant] || variantStyles.default} ${className}`}
            {...props}
        >
            {children}
        </span>
    );
}
