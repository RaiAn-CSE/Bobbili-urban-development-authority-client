import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function PsDocument({ role, id, approved, uploadId, type, handleDefaultStatus, handleDynamicStatus, setRemarkText,remarkText }) {

    const handleDocumentStatus = (event, id, uploadId, type) => {
        const data = event?.target?.value;
        if (type === "dynamic") {
            // handleStatus({ approved: data, id, uploadId, type });
            handleDynamicStatus({ approved: data, id, uploadId, type })
        } else {
            // handleStatus({ approved: data, id, type });
            handleDefaultStatus({ approved: data, id, type })
        }
        toast.success(`${data, uploadId, id}`);
    }

    useEffect(() => {
        // Your previous useEffect dependencies here
    }, [approved, uploadId]);

    return (
        <div className='dark:text-white'>
            <div className="md:flex items-center mt-6">
                {/* Approved Button */}
                {role === "PS" && (
                    <div className="md:flex space-y-4 md:space-x-10 md:space-y-0 mt-2 ms-4 lg:pr-2">
                        <div>
                            <input
                                id={type === "dynamic" ? `approved${uploadId}` : `approved${id}`}
                                type="radio"
                                name={type === "dynamic" ? uploadId + id : id}
                                value="approved"
                                className="radio radio-sm radio-button__input mr-3 lg:mr-0"
                                onChange={(event) => handleDocumentStatus(event, id, uploadId, type)}
                                checked={approved === "approved"}
                            />
                            <label
                                className={`radio-button__label text-base ${approved === "approved" ? "" : ""}`}
                                htmlFor={type === "dynamic" ? `approved${uploadId}` : `approved${id}`}
                            >
                                <span className="radio-button__custom"></span>
                                Approved
                            </label>
                        </div>

                        <div>
                            <input
                                id={type === "dynamic" ? `shortfall${uploadId}` : `shortfall${id}`}
                                type="radio"
                                name={type === "dynamic" ? uploadId + id : id}
                                value="shortfall"
                                className="radio radio-sm radio-button__input mr-3 lg:mr-0"
                                onChange={(event) => handleDocumentStatus(event, id, uploadId, type)}
                                checked={approved === "shortfall"}
                            />
                            <label
                                className={`radio-button__label text-base ${approved === "shortfall" ? "" : "font-thin"}`}
                                htmlFor={type === "dynamic" ? `shortfall${uploadId}` : `shortfall${id}`}
                            >
                                <span className="radio-button__custom"></span>
                                Shortfall
                            </label>
                        </div>
                        <div className="">
                            <p className="text-black font-bold" htmlFor="textarea">Remark:</p>
                            <textarea className="textarea mt-2 bg-transparent border border-black text-black" id="textarea"
                                name={type === "dynamic" ? `${id}_${uploadId}` : `${id}`}
                                value={type === "Dynamic" ? (id === remarkText.id && uploadId === remarkText.uploadId) ? remarkText.value : "" : (id === remarkText.id) ? remarkText.value : ""}

                                cols="30" rows="1"
                                onBlur={(event) => setRemarkText((prev) => {
                                    const { name, value } = event.target;
                                    return [...prev, { [type]: { id, uploadId, value } }];

                                })}
                            ></textarea>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default PsDocument;
