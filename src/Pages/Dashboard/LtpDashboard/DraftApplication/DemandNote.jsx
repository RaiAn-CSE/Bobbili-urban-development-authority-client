function DemandNote() {
    return (
        <div className='py-10'>
            {/* Part01 */}
            <div className='text-center'>
                <h1>Bobbili Urban Development Authority PLANNING DEPARTMENT</h1>
                <p className='text-base underline'>Demand Note (Challan/ Memo)</p>
            </div>
            {/* Part02 */}
            <div className='flex items-center justify-between mt-10 text-base lg:px-10'>
                <div className='space-y-2'>
                    <p>File No: <span className="font-bold">16.10.2023</span></p>
                    <p>Name: <span className="font-bold">Nothing Added</span></p>
                    <p>Address: <span className="font-bold">California, USA</span></p>
                </div>
                <div className='space-y-2'>
                    <p>Memo Date: <span className="font-bold">16/10/2023</span> </p>
                    <p>BA No: <span className="font-bold">2023</span> </p>
                    <p>Case Type: <span className="font-bold">LTP</span> </p>
                </div>
            </div>
            {/* Part03 */}
            <div className='overflow-x-auto mt-10 flex items-center justify-center lg:px-10'>
                <table className='table table-md text-base'>
                    <thead className='text-black'>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Particulars</th>
                            <th>Area (m2)</th>
                            <th>Unit Rate</th>
                            <th>Gross Amount</th>
                            <th>Previous Paid</th>
                            <th>Net Amount</th>
                        </tr>
                    </thead>
                    <tbody className='text-black'>
                        <tr className="text-black">
                            <td className='border-black text-black'>01</td>
                            <td className='border-black text-black'>Development Charges (Built Up Area)</td>
                            <td className='border-black text-black'></td>
                            <td className='border-black text-black'></td>
                            <td className='border-black text-black'></td>
                            <td className='border-black text-black'></td>
                            <td className='border-black text-black'></td>
                        </tr>
                        <tr>
                            <td className='border-black text-black'>02</td>
                            <td className='border-black text-black'>Development Charges (Vacant Land)</td>
                            <td className='border-black text-black'></td>
                            <td className='border-black text-black'></td>
                            <td className='border-black text-black'></td>
                            <td className='border-black text-black'></td>
                            <td className='border-black text-black'></td>
                        </tr>
                        <tr>
                            <td className='border-black text-black'>03</td>
                            <td className='border-black text-black'>Paper Publication Charges</td>
                            <td className='border-black text-black'></td>
                            <td className='border-black text-black'></td>
                            <td className='border-black text-black'></td>
                            <td className='border-black text-black'></td>
                            <td className='border-black text-black'></td>
                        </tr>
                        <tr>
                            <td className='border-black text-black'>04</td>
                            <td className='border-black text-black'>Building Permit Fees</td>
                            <td className='border-black text-black'></td>
                            <td className='border-black text-black'></td>
                            <td className='border-black text-black'></td>
                            <td className='border-black text-black'></td>
                            <td className='border-black text-black'></td>
                        </tr>
                        <tr>
                            <td className='border-black text-black'>05</td>
                            <td className='border-black text-black'>Processing Fees</td>
                            <td className='border-black text-black'></td>
                            <td className='border-black text-black'></td>
                            <td className='border-black text-black'></td>
                            <td className='border-black text-black'></td>
                            <td className='border-black text-black'></td>
                        </tr>
                    </tbody>

                </table>
            </div>
            <p className='text-sm text-center font-semibold'>Note :- Please ensure the payment of fee within validity period failing which leads to application disablement.</p>

            <div className='flex items-center justify-start mt-10 text-base font-semibold lg:pl-10'>
                <div>
                    <p>Total Amount to be Paid
                        (INR) :
                    </p>
                    <p>Amount In Words: Rupees  Seventy Two Thousand Six Hundred Fourty Only</p>
                    <p>Bobbili Urban Development Authority</p>
                </div>
            </div>
        </div>
    )
}

export default DemandNote;