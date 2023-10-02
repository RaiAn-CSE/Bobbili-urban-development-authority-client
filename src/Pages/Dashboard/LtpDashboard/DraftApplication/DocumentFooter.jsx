import React from 'react'

function DocumentFooter({ setApprovedConfirmation, setRecomendationMessage }) {
    const handleRecomendationMessage = (e) => {
        const RecomdMessage = e.target.value;
        console.log({RecomdMessage})
        setRecomendationMessage(RecomdMessage);
    }
    const handleConfirmation = (data) => {
        setApprovedConfirmation(data)
    }
    return (
        <div>
            <div className="lg:ml-6">

                {/* Recomendation */}
                <div>
                    <p className="mb-3">Recomendation</p>
                    <textarea onChange={(e) => handleRecomendationMessage(e)} className="textarea textarea-bordered" cols={80} rows={5} name="recomendation"></textarea>
                </div>
                {/* Approved Buttons */}
                <div className="space-x-10 mt-2 lg:pr-2">
                    <label className={`ml-2 inline-flex items-center space-x-1 text-black"}`}>
                        <input
                            type="radio"
                            value="approved"
                            name='finalApproved'
                            className="radio radio-sm radio-success mr-3 lg:mr-0"
                            onClick={() => handleConfirmation("true")}

                        />
                        <span>Approve</span>
                    </label>
                    <label className={`ml-2 inline-flex items-center space-x-1 text-black}`}>
                        <input
                            type="radio"
                            value="shortfall"
                            name='finalApproved'
                            className="radio radio-sm radio-success mr-3 lg:mr-0"
                            onClick={() => handleConfirmation("false")}
                        />
                        <span>Shortfall</span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default DocumentFooter;