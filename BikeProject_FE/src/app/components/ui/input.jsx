import React from 'react';

export function Input({ className = '', ...props }) {
    return (
        <input
            className={`w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${className}`}
            {...props}
        />
    );
}
