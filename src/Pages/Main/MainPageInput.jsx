import React from 'react';

const MainPageInput = ({ label, id, text, placeholder, ltpDetails }) => {
    return (
        <div className='flex items-center px-3 mt-5'>
            <label className="basis-[35%] block mb-1 font-semibold text-gray-600" htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                type={text}
                className='basis-[65%] w-full px-3 py-2 border rounded-lg max-w-xs font-medium text-gray-600 bg-gray-50 border-violet-400 focus:border-violet-500 focus:outline-none focus:ring-2 ring-violet-100'
                placeholder={placeholder}
                defaultValue={ltpDetails}
                readOnly
            />
        </div>
    );
};

export default MainPageInput;