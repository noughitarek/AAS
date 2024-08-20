import React from 'react';

const ErrorMessage: React.FC<{ message?: string }> = ({ message }) => {
    if (!message) return null;

    return <span className='text-danger'>{message}</span>;
};

export default ErrorMessage;
