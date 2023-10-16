import React from 'react'

function DemandNote() {
    return (
        <div>
            {/* Part01 */}
            <div className='text-center'>
                <h1>Bobbili Urban Development Authority PLANNING DEPARTMENT</h1>
                <p className='text-base underline'>Demand Note (Challan/ Memo)</p>
            </div>
            {/* Part02 */}
            <div className='flex justify-around mt-10 text-base'>
                <div className='space-y-2'>
                    <p>File No:</p>
                    <p>Name:</p>
                    <p>Address:</p>
                </div>
                <div className='space-y-2'>
                    <p>Memo Date:</p>
                    <p>BA No:</p>
                    <p>Case Type:</p>
                </div>
            </div>
            {/* Part03 */}
            <div className='overflow-x-auto mt-10 pb-10 flex items-center justify-center'>
                <table className='"table table-xs text-base border-black'>
                    <thead>
                        <th>Sr. No.</th>
                        <th>Particulars</th>
                        <th>Area (m2)</th>
                        <th>Unit Rate</th>
                        <th>Gross Amount</th>
                        <th>Previous Paid</th>
                        <th>Net Amount</th>
                    </thead>
                    <tbody className='text-black'>
                        <tr>
                            <td className='text-black'>01</td>
                            <td className='text-black'>Development Charges (Built Up Area)</td>
                            <td className='text-black'></td>
                            <td className='text-black'></td>
                            <td className='text-black'></td>
                            <td className='text-black'></td>
                            <td className='text-black'></td>
                        </tr>
                        <tr>
                            <td className='text-black'>02</td>
                            <td className='text-black'>Development Charges (Vacant Land)</td>
                            <td className='text-black'></td>
                            <td className='text-black'></td>
                            <td className='text-black'></td>
                            <td className='text-black'></td>
                            <td className='text-black'></td>
                        </tr>
                        <tr>
                            <td className='text-black'>03</td>
                            <td className='text-black'>Paper Publication Charges</td>
                            <td className='text-black'></td>
                            <td className='text-black'></td>
                            <td className='text-black'></td>
                            <td className='text-black'></td>
                            <td className='text-black'></td>
                        </tr>
                        <tr>
                            <td className='text-black'>04</td>
                            <td className='text-black'>Building Permit Fees</td>
                            <td className='text-black'></td>
                            <td className='text-black'></td>
                            <td className='text-black'></td>
                            <td className='text-black'></td>
                            <td className='text-black'></td>
                        </tr>
                        <tr>
                            <td className='text-black'>05</td>
                            <td className='text-black'>Processing Fees</td>
                            <td className='text-black'></td>
                            <td className='text-black'></td>
                            <td className='text-black'></td>
                            <td className='text-black'></td>
                            <td className='text-black'></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DemandNote;