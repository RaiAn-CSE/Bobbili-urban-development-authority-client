import React from 'react'

function ApplicationHeader() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Adding 1 because months are zero-indexed
    const year = currentDate.getFullYear();
    
    const monthString = month < 10 ? "0" + month : month.toString();
    const FormDate = [...day.toString(), ...monthString, ...year.toString()];
    

    const header = ["File No.", "ULB ABBREVIATION", "BP", "ZONE", "CIR", "WD", "", "", "", ""];

    return (
        <div className='my-5'>
            <div className='text-center font-bold'>
                <h2>FORM - 6</h2>
                <h2 className='mt-3'>………………….(ULB)</h2>
                <h2 className='mt-3'>BUILDING PERMISSION APPLICATION</h2>
            </div>
            <div className='mt-6'>
                <table className="table border-0">
                    <tbody>
                        <div className='w-full flex items-center justify-between font-bold'>
                            <tr>
                                {header.map(data => <td className='bg-green-200 border border-black px-2 h-10'>{data}</td>)}
                            </tr>
                            <tr>
                                <td className='bg-green-200 border border-black px-2 h-10'>
                                    Date:</td> {FormDate.map(data => <td className='bg-green-200 border border-black px-2 h-10'>{data}</td>)}
                            </tr>
                        </div>
                    </tbody>
                </table>
            </div>
            <div className='mt-5'>
                <h1 className='font-bold'>To</h1>
                <p>The Commissioner,</p>
                <p className='mt-3'>……………………………………………..(ULB)</p>
                <span>(Use CAPITAL LETTERS only)</span>
            </div>
        </div>
    )
}

export default ApplicationHeader;