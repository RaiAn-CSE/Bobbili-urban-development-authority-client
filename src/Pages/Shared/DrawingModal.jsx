import React, { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const DrawingModal = ({ modalStates }) => {
  const { getApplicationData } = useContext(AuthContext);
  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));
  const cameFrom = JSON.parse(localStorage.getItem("page"));

  const { openDrawing, setOpenDrawing, filteredData } = modalStates;
  const [dataFromDB, setDataFromDB] = useState({});
  console.log(modalStates, "Modal states");
  useEffect(() => {
    const modal = document.getElementById("drawingModal");
    if (openDrawing) {
      modal.showModal();
    }

    if (filteredData) {
      setDataFromDB(filteredData);
    } else {
      const getData = async () => {
        const applicationData = await getApplicationData(
          applicationNo,
          cameFrom
        );
        console.log(applicationData, "All info ApplicationData");
        if (Object.keys(applicationData)?.length) {
          setDataFromDB(applicationData);
        }
      };
      getData();
    }
  }, []);

  console.log(dataFromDB, "DFD");
  return (
    <div className="dark:bg-white">
      <dialog id="drawingModal" className="modal">
        {/* divide-y-2 divide-gray-200 */}
        <div
          className={`ScrollingHidden relative overflow-hidden overflow-y-auto rounded-lg modal-box py-10 px-12 bg-white text-gray-900 w-full max-w-4xl`}
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
            <h3 className="font-bold text-2xl text-center mb-8 uppercase">
              Drawing
            </h3>

            <iframe
              src={`https://drive.google.com/file/d/${dataFromDB?.psSignedFiles?.drawing}/preview`}
              width="100%"
              height="500px"
              frameborder="0"
              allowfullscreen
            ></iframe>
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
