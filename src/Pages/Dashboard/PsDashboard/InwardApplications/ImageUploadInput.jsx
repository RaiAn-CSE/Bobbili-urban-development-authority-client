import React, { useState } from "react";
import { Link } from "react-router-dom";

const ImageUploadInput = ({
  id,
  onFileChange,
  siteBoundariesImageFiles,
  imageId,
}) => {
  console.log(siteBoundariesImageFiles, "Site boundaries image files");
  console.log(imageId, "Imageid");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileChange(id, file);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="basis-[80%] w-full">
        <label
          htmlFor={id}
          className="flex flex-col items-center justify-center w-full cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center">
            {siteBoundariesImageFiles && siteBoundariesImageFiles[id] ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Uploaded file: </span>
                {siteBoundariesImageFiles[id].name.slice(0, 10) + "..."}
              </p>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 py-4">
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
      {imageId?.length !== 0 && (
        <div className="basis-[20%]">
          <Link
            to={`https://drive.google.com/file/d/${imageId}/view?usp=share_link`}
            target={"_blank"}
            className="w-full py-1 px-1 text-white bg-gradient-to-r from-violet-400 to-fuchsia-400 hover:underline rounded-full"
          >
            View
          </Link>
        </div>
      )}
    </div>
  );
};

export default ImageUploadInput;
