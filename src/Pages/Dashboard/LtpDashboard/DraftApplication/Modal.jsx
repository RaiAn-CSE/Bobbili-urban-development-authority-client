import React from 'react'
import DemandNote from './DemandNote';

function Modal() {
    // document.getElementById('openBtn')?.click();
    // document.getElementById('my_modal_2')?.click()
    // document.getElementById('my_modal_2').showModal()
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* <button id='openBtn' className="btn"
                onClick={() => document.getElementById('my_modal_2').showModal()}>
                open modal</button> */}
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <DemandNote />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default Modal;