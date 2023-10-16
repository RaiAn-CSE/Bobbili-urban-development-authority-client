import React from 'react'
import DemandNote from './DemandNote';

function Modal() {
    const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";
    return (
        <div>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box w-11/12 max-w-4xl relative">
                    <DemandNote />
                </div>

                <form method="dialog" className="modal-backdrop absolute top-0 right-10">
                    <button className={`btn btn-md text-sm px-3 mt-10 ml-3 border-none text-white shadow-md transition-all duration-500 ${gradientColor} hover:shadow-lg hover:shadow-violetDark hover:bg-gradient-to-bl`}>Close</button>
                </form>
            </dialog>
        </div>
    )
}

export default Modal;