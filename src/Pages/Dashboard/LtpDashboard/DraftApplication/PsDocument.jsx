import React from 'react'

function PsDocument({ role }) {
    return (
        <div>
            <div className="flex items-center mt-6">
                {/* Approved Button */}
                {role === "PS" && (
                    <div className="space-x-10 mt-2 ms-4 lg:pr-2">
                        <label
                            className={`ml-2 inline-flex items-center space-x-1 text-black ${approved === "approved" ? "font-extrabold" : ""
                                }`}
                        >
                            <input
                                type="radio"
                                name="approved"
                                value="approved"
                                className="radio radio-sm radio-success mr-3 lg:mr-0"
                                onChange={(event) => setApprovedConfirmation(event.target.value)}
                            />
                            <span>Approve</span>
                        </label>
                        <label
                            className={`ml-2 inline-flex items-center space-x-1 text-black ${approved === "shortfall" ? "font-extrabold" : ""
                                }`}
                        >
                            <input
                                type="radio"
                                name="approved"
                                value="shortfall"
                                className="radio radio-sm radio-success mr-3 lg:mr-0"
                                onChange={(event) => setApprovedConfirmation(event.target.value)}
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