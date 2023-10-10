import React from 'react';

const ImageUploadInput = ({ id }) => {
    return (
        <div className="flex items-center justify-center w-full">
            <label for={id} className="flex flex-col items-center justify-center w-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center p-[10px]">
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                </div>
                <input id={id} type="file" className="hidden" />
            </label>
        </div>
    );
};

export default ImageUploadInput;