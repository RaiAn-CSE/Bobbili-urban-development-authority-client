import React, { useEffect } from "react";

export default function ApprovedDecisionModal({
  showApprovedModal,
  setShowApprovedModal,
  downloadFiles,
  downloading,
}) {
  useEffect(() => {
    if (showApprovedModal) {
      document.getElementById("my_modal_1").showModal();
    }
  }, [showApprovedModal]);
  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-center">
            Do you want to Proceed?
          </h3>
          <p className="pt-4 text-center font-semibold">
            Some files need your signature. Get them from sign files.
          </p>
          <div className="modal-action justify-center items-center">
            {downloading ? (
              <button className="btn bg-violetLight hover:bg-violetLight text-white">
                <span className="loading loading-spinner"></span>
                Downloading...
              </button>
            ) : (
              <>
                {/* download pdf  */}
                <button
                  className="btn btn-info text-white"
                  onClick={downloadFiles}
                >
                  Sign Files
                </button>

                {/* submit signed files */}
                <button className="btn btn-success text-white">
                  Send Files
                </button>
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button
                    className="btn btn-error text-white"
                    onClick={() => setShowApprovedModal(false)}
                  >
                    Close
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}
