import React from 'react';
import customScroll from "../../Style/Scrollbar.module.css";

const Resubmit = () => {
    return (
        <div className='dark:bg-white'>
            <dialog id="my_modal_1" className="modal">
                {/* divide-y-2 divide-gray-200 */}
                <div className={`${customScroll.customScrolling} rounded-lg modal-box py-10 bg-white text-gray-900  mb-10 w-11/12 max-w-5xl divide-y-2 divide-gray-200 relative`}>
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm text-white hover:bg-violet-600 btn-circle btn-ghost absolute top-2 right-2 bg-violet-500">✕</button>
                        <h3 className="font-bold text-lg text-center">ENDORSEMENT!</h3>
                    </form>


                    <div className='py-5 pt-2'>
                        <div className='flex justify-between'>
                            <h2>Letter No.:1112/4232/21</h2>
                            <h2>Date:05/23/2023</h2>
                        </div>
                        <div className='flex flex-col py-4'>
                            <p className='text-start'>Sub: - BUILDINGS - ___________ Grama panchayat - required compliances - Endorsement issued - Regarding</p>
                            <p>Ref: - Application of Sri/Smt/Kum ______________</p>
                            <p className='text-start'>With reference to your application for building permission vide B.A.No ____________________  for construction of Residential/ Individual Residential Building building in Survey .No. _______</p>
                        </div>
                        <div className='flex justify-between'>
                            <h2>Letter No.:</h2>
                            <h2>Date:</h2>
                        </div>
                        <div className='flex flex-col py-4'>
                            <p className='text-start'>Sub: - BUILDINGS - ___________ Grama panchayat - required compliances - Endorsement issued - Regarding</p>
                            <p>Ref: - Application of Sri/Smt/Kum ______________</p>
                            <p className='text-start'>With reference to your application for building permission vide B.A.No ____________________  for construction of Residential/ Individual Residential Building building in Survey .No. _______</p>
                        </div>
                        <div className='flex justify-between'>
                            <h2>Letter No.:</h2>
                            <h2>Date:</h2>
                        </div>
                        <div className='flex flex-col py-4'>
                            <p className='text-start'>Sub: - BUILDINGS - ___________ Grama panchayat - required compliances - Endorsement issued - Regarding</p>
                            <p>Ref: - Application of Sri/Smt/Kum ______________</p>
                            <p className='text-start'>With reference to your application for building permission vide B.A.No ____________________  for construction of Residential/ Individual Residential Building building in Survey .No. _______</p>
                        </div>
                        <div className='flex justify-between'>
                            <h2>Letter No.:</h2>
                            <h2>Date:</h2>
                        </div>
                        <div className='flex flex-col py-4'>
                            <p className='text-start'>Sub: - BUILDINGS - ___________ Grama panchayat - required compliances - Endorsement issued - Regarding</p>
                            <p>Ref: - Application of Sri/Smt/Kum ______________</p>
                            <p className='text-start'>With reference to your application for building permission vide B.A.No ____________________  for construction of Residential/ Individual Residential Building building in Survey .No. _______</p>
                        </div>
                    </div>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog >
        </div >
    );
};

export default Resubmit;