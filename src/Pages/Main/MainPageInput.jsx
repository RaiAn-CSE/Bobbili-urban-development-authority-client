import React from 'react';

const MainPageInput = ({ label, id, text, placeholder, ltpDetails }) => {
    return (
        <div className='flex items-center px-5 text-gray-400 mt-5'>
            <label className="basis-[40%]" htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                type={text}
                className='basis-[60%] w-full px-3 py-[7px] border rounded-lg max-w-xs dark:bg-gray-50'
                placeholder={placeholder}
                defaultValue={ltpDetails}
                disabled
            />
        </div>
    );
};

export default MainPageInput;