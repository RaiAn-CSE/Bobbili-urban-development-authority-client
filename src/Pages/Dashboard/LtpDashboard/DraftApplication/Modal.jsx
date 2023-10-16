import React, { useEffect } from 'react'
import DemandNote from './DemandNote';

function Modal({ setViewChallan }) {
    const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";
    useEffect(() => {
        document.getElementById('my_modal_2')?.showModal()
    })
    return (
        <div>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box w-11/12 max-w-4xl border border-emerald-400">
                    <DemandNote />
                </div>
                <form method="dialog" className="modal-backdrop absolute top-10 right-[22%] z-50">
                    <button className={`btn btn-md text-sm px-3 mt-10 ml-3 border-none text-white shadow-md transition-all duration-500 ${gradientColor} hover:shadow-lg hover:shadow-violetDark hover:bg-gradient-to-bl`} onClick={() => setViewChallan(false)}>Close</button>
                </form>
            </dialog>

        </div>
    )
}

export default Modal;