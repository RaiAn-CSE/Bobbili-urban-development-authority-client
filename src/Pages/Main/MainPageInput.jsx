import React from 'react';

const MainPageInput = ({ label, id, text, placeholder, ltpDetails }) => {
    return (
        <div className='flex items-center px-3 mt-5'>
            <label className="basis-[35%] block mb-1 font-semibold bg-gradient-to-r from-violet-400 to-fuchsia-400 text-transparent bg-clip-text" htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                type={text}
                className='basis-[65%] w-full px-3 py-2 border rounded-lg max-w-xs border-violet-400 text-violet-400 bg-violet-50 focus:border-violet-500 focus:outline-none focus:ring-2 ring-violet-200'
                placeholder={placeholder}
                defaultValue={ltpDetails}
                readOnly
            />
        </div>
    );
};

export default MainPageInput;