import React, { useState } from "react";

const ImageUploadInput = ({ id, onFileChange, siteBoundariesImageFiles }) => {
  console.log(siteBoundariesImageFiles, "Site boundaries image files");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileChange(id, file);
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="basis-[80%] w-full">
        <label
          htmlFor={id}
          className="flex flex-col items-center justify-center w-full cursor-pointer bg-gray-50 hover:bg-gray-200"
        >
          <div className="flex flex-col items-center justify-center p-[10px]">
            {siteBoundariesImageFiles && siteBoundariesImageFiles[id] ? (
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Uploaded file: </span>
                {siteBoundariesImageFiles[id].name}
              </p>
            ) : (
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
            )}
          </div>
          <input
            id={id}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div className="basis-[20%]">
        <button className="w-full py-1 px-1 text-white bg-gradient-to-r from-violet-400 to-fuchsia-400 hover:underline rounded-full">
          View
        </button>
      </div>
    </div>
  );
};

export default ImageUploadInput;
