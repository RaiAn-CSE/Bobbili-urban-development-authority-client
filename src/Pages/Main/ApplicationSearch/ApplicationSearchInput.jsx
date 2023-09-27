import React from 'react';

const ApplicationSearchInput = ({ label, id, text, placeholder }) => {
    return (
        <div className='flex items-center px-5 text-gray-400 mt-2'>
            <label className="basis-[40%]" htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                type={text}
                className='basis-[60%] w-full px-3 py-1 border rounded-lg max-w-xs'
                placeholder={placeholder}
                disabled
            />
        </div>
    );
};

export default ApplicationSearchInput;