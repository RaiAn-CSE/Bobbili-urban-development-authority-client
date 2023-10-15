import toast from "react-hot-toast";


function PsDocument({ role, id, approved,uploadId,handleStatus }) {
const handleDocumentStatus=(event,id,uploadId)=>{
    const data=event?.target?.value;
    handleStatus(data,id,uploadId)
    toast.success(data)
}
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
                                name={id}
                                value="approved"
                                className="radio radio-sm radio-success mr-3 lg:mr-0"
                                onChange={(event) => handleDocumentStatus(event,id,uploadId)}
                            />
                            <span>Approve</span>
                        </label>
                        <label
                            className={`ml-2 inline-flex items-center space-x-1 text-black 
                           `}
                        >
                            <input
                                id={id}
                                type="radio"
                                name={id}
                                value="shortfall"
                                className="radio radio-sm radio-success mr-3 lg:mr-0"
                                onChange={(event) => handleDocumentStatus(event,id,uploadId)}
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