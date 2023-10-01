import React from 'react'

function DocumentFooter() {
    return (
        <div>
            <div className="lg:ml-6">

                {/* Recomendation */}
                <div>
                    <p className="mb-3">Recomendation</p>
                    <textarea className="textarea textarea-bordered" cols={80} rows={5} name="recomendation"></textarea>
                </div>
                {/* Approved Buttons */}
                <div className="space-x-10 mt-2 lg:pr-2">
                    <label className={`ml-2 inline-flex items-center space-x-1 text-black"}`}>
                        <input
                            type="radio"
                            value="approved"
                            className="radio radio-sm radio-success mr-3 lg:mr-0"
                        />
                        <span>Approve</span>
                    </label>
                    <label className={`ml-2 inline-flex items-center space-x-1 text-black}`}>
                        <input
                            type="radio"
                            value="shortfall"
                            className="radio radio-sm radio-success mr-3 lg:mr-0"
                        />
                        <span>Shortfall</span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default DocumentFooter;