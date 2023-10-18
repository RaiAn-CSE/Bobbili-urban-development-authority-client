import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function PsDocument({ role, id, approved, uploadId, handleStatus, type, PreviousDocumentData }) {
    const [valueData, setValueData] = useState("");

    const handleDocumentStatus = (event, id, uploadId, type) => {
        const data = event?.target?.value;
        if (type === "dynamic") {
            handleStatus({ approved: data, id, uploadId, type });
        } else {
            handleStatus({ approved: data, id, type });
        }
        toast.success(data, uploadId, id);
    }


    // useEffect(() => {
    //     if (PreviousDocumentData?.length) {
    //         const dynamicMatch = PreviousDocumentData.find(data => data.id === id && data.uploadId === uploadId);
    //         const defaultMatch = PreviousDocumentData.find(data => data.id == id);
    //         if (type === "dynamic") {
    //             if (dynamicMatch) {
    //                 setValueData(dynamicMatch.event);
    //             }
    //         } else {
    //             if (defaultMatch) {
    //                 setValueData(defaultMatch.event);
    //             }
    //         }
    //     }
    // }, [PreviousDocumentData, id, uploadId, type]);

    return (
        <div className='dark:text-white'>
            <div className="flex items-center mt-6">
                {/* Approved Button */}
                {role === "PS" && (
                    <div className="space-x-10 mt-2 ms-4 lg:pr-2">
                        <label
                            className={`ml-2 inline-flex items-center space-x-1 text-black 
                            `}
                        >
                            <input
                                id={id}
                                type="radio"
                                name={type === "dynamic" ? uploadId + id : id}
                                value="approved"
                                className="radio radio-sm radio-success mr-3 lg:mr-0"
                                onChange={(event) => handleDocumentStatus(event, id, uploadId, type)}
                                checked={approved === "approved"}
                            />
                            <span>Approve</span>
                        </label>
                        <label
                            className={`ml-2 inline-flex items-center space-x-1 text-black 
                           `}
                        >
                            <input
                                id={type === "dynamic" ? uploadId : id}
                                type="radio"
                                name={type === "dynamic" ? uploadId + id : id}
                                value="shortfall"
                                className="radio radio-sm radio-success mr-3 lg:mr-0"
                                onChange={(event) => handleDocumentStatus(event, id, uploadId, type)}
                                checked={approved === "shortfall"}
                            />
                            <span>Shortfall</span>
                        </label>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PsDocument;
