import React from 'react';

export function Card({ children, className = '', onClick, ...props }) {
    return (
        <div
            className={`rounded-xl border border-gray-200 bg-white overflow-hidden transition-all duration-200 ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardContent({ children, className = '', ...props }) {
    return (
        <div className={`${className}`} {...props}>
            {children}
        </div>
    );
}
