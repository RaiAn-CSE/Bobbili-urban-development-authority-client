import React from 'react'

function ApplicationHeader() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Adding 1 because months are zero-indexed
    const year = currentDate.getFullYear();




    const header = ["File No.", "ULB ABBREVIATION", "BP", "ZONE", "CIR", "WD", "", "", "", ""];

    return (
        <div className='my-5'>
            <div className='text-center font-extrabold '>
                <h2 className='mt-3 underline'>BUILDING PERMISSION APPLICATION</h2>
            </div>
            <div className='mt-6 flex justify-between'>
                <p className='font-bold'>Application No.</p>
                <p> <span className='font-bold'>Date of Submission:</span> {`${day}/${month}/${year}`}</p>
            </div>
            <div className='mt-5'>
                <p>Sub: Building Application for grant of permission for Construction of Building Permission Notice u/s 209 & 227 of APM Act, 1965 / 428 & 433 of HMC Act, 1955.</p>
            </div>
        </div>
    )
}

export default ApplicationHeader;