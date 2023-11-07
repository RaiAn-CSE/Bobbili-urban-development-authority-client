import React from 'react';
import customScroll from "../../Style/Scrollbar.module.css";

const ProceedingModal = () => {
    return (
        <div className='dark:bg-white'>
            <dialog id="proceedingModal" className="modal">
                {/* divide-y-2 divide-gray-200 */}
                <div className={`${customScroll.customScrolling} rounded-lg modal-box py-10 bg-white text-gray-900  mb-10 w-11/12 max-w-5xl divide-y-2 divide-gray-200 relative`}>
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm text-white hover:bg-violet-600 btn-circle btn-ghost absolute top-2 right-2 bg-violet-500">✕</button>
                        <h3 className="font-bold text-lg text-center">Bobbili Urban Development Authority</h3>
                        <h3 className="font-bold text-lg text-center">BUILDING PERMISSION ORDER</h3>
                    </form>
                    <div>
                        <h4>this is resubmit </h4>
                    </div>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog >
        </div >
    );
};

export default ProceedingModal;