import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import customScroll from "../../Style/Scrollbar.module.css";
import { RxCross2 } from "react-icons/rx";

const DrawingModal = ({ modalStates }) => {
  const { fetchDataFromTheDb } = useContext(AuthContext);
  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));
  const cameFrom = JSON.parse(localStorage.getItem("page"));

  const { openDrawing, setOpenDrawing } = modalStates;
  console.log(modalStates, "Modal states");
  useEffect(() => {
    const modal = document.getElementById("drawingModal");
    if (openDrawing) {
      modal.showModal();
    }
  }, []);
  return (
    <div className="dark:bg-white">
      <dialog id="drawingModal" className="modal">
        {/* divide-y-2 divide-gray-200 */}
        <div
          className={`${customScroll.customScrolling} rounded-lg modal-box py-10 px-12 bg-white text-gray-900 w-full max-w-4xl relative`}
        >
          <form method="dialog" className="absolute top-6 right-6 z-50">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={() => setOpenDrawing(false)}
              className={`outline outline-red-500 outline-offset-4 text-red-500 rounded-full hover:bg-red-500 hover:text-white hover:outline-offset-0 p-[1px] transition-all duration-1000`}
            >
              <RxCross2 className="text-2xl" />
            </button>
          </form>

          <div className="pt-4">
            <h3 className="font-bold text-2xl text-center mb-8">
              ENDORSEMENT!
            </h3>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setOpenDrawing(false)}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default DrawingModal;
