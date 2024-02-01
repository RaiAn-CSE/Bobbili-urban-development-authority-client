import React, { useEffect } from 'react';
import InputField from '../../../Components/InputField';
import useGetPageWiseApplication from '../../../CustomHook/useGetPageWiseApplication';

const PreviousFileModal = ({ FileModal }) => {

    const { setIsModalOpen, isModalOpen } = FileModal;

    useEffect(() => {
        const modal = document.getElementById("fileModal");
        if (isModalOpen) {
            modal.showModal();
        }
    }, [isModalOpen]);

    const handlePreviousApplication = (e) => {
        e.preventDefault(); // Corrected to include the parentheses
        console.log('hsgdfsyfg');

        const formData = document.getElementById('FileNo');
        console.log(formData.value);
    }



    return (
        <>
            <dialog id="fileModal" className="modal">
                <div
                    className="modal-box bg-white"
                >
                    {/* Close Modal Process */}
                    <div method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button onClick={() => setIsModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </div>


                    <h3 className="font-bold text-lg">Enter previous approved file no :</h3>

                    <InputField
                        id="FileNo"
                        name="FileNo"
                        label="File no."
                        placeholder="Enter your file no."
                        type="number"
                        ltpDetails={FileNo}
                    />

                    <div className=' flex justify-end'>
                        <button onClick={handlePreviousApplication} className='fancy-button'>Save</button>
                    </div>


                    {/* <div className="modal-action">
                        <form method="dialog">
                            <button className="btn" onClick={() => setIsModalOpen(false)}>Close</button>
                        </form>
                    </div> */}

                </div>
            </dialog>
        </>
    );
};

export default PreviousFileModal;