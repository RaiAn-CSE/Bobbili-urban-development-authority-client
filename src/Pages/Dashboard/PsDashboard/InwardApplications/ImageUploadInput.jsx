import React, { useState } from "react";

const ImageUploadInput = ({
    id,
    siteInspectionValue,
    handleFileChange,
    selectedFile,
}) => {
    // const [selectedFile, setSelectedFile] = useState(null);

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     // console.log(file, id);
    //     setSelectedFile(file);
    // };
    return (
        <div className="flex items-center justify-center w-full">
            <label
                htmlFor={id}
                className="flex flex-col items-center justify-center w-full cursor-pointer bg-gray-50 hover:bg-gray-100  dark:bg-gray-700  dark:hover:bg-gray-600"
            >
                <div className="flex flex-col items-center justify-center p-[10px]">
                    {selectedFile ? (
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Uploaded file: </span>
                            {selectedFile.name}
                        </p>
                    ) : (
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and
                            drop
                        </p>
                    )}
                </div>
                <input
                    id={id}
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, id)}
                    //   onChange={handleFileChange}
                    value={siteInspectionValue}
                />
            </label>
        </div>
    );
};

export default ImageUploadInput;
