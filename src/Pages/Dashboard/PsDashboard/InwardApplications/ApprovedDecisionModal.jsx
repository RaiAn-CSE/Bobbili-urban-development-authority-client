import React, { useEffect } from "react";

export default function ApprovedDecisionModal({
  showApprovedModal,
  setShowApprovedModal,
  downloadFiles,
  downloading,
  wantToSend,
  setWantToSend,
  submitSignedFiles,
  setSubmitSignedFiles,
  handleFileChange,
  submitting,
  setSubmitting,
  sentPsDecision,
}) {
  useEffect(() => {
    if (showApprovedModal) {
      document.getElementById("my_modal_1").showModal();
    }
  }, [showApprovedModal]);

  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white">
          <h3 className="text-black font-bold text-2xl text-center">
            Do you want to Proceed?
          </h3>
          {wantToSend ? (
            <div className="text-black ml-4 mt-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // role === "LTP"
                  //   ? confirmAlert(stepperData, handleFileUpload)
                  //   : confirmAlert(stepperData, sentPsDecision);
                }}
                className="text-black mx-3"
              >
                {/* AutoCAD Drawing */}
                <div className="text-lg mb-6 ">
                  <p className="pr-3 font-bold text-black">1. Proceeding PDF</p>
                  <div className="flex  items-center mt-3">
                    <label className="relative cursor-pointer mr-6">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(event) =>
                          handleFileChange(event, "proceeding")
                        }
                        className="file-input file-input-bordered border-black file-input-md w-full text-gray-400 bg-white dark:text-black"
                        required
                      />
                    </label>
                  </div>
                </div>

                {/* Drawing PDF */}
                <div className="text-lg mb-2 ">
                  <p className="pr-3 font-bold text-black">2. Drawing PDF</p>
                  <div className="flex items-center mt-5">
                    <label className="relative cursor-pointer mr-6">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(event) => handleFileChange(event, "drawing")}
                        className="file-input file-input-bordered border-black file-input-md w-full max-w-xs text-gray-400 bg-white dark:text-black"
                        required
                      />
                    </label>
                  </div>
                </div>

                {submitting ? (
                  <div className="mt-6 flex justify-center items-center">
                    <button className="btn bg-violetLight hover:bg-violetLight text-white ">
                      <span className="loading loading-spinner"></span>
                      Submitting...
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center mt-6">
                    <button
                      className="btn bg-warning hover:bg-warning border-none text-black text-center"
                      onClick={() => setWantToSend(false)}
                    >
                      Back
                    </button>
                    <button
                      className="btn bg-violetLight border-none hover:bg-violetLight text-white text-center"
                      onClick={sentPsDecision}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </form>
            </div>
          ) : (
            <>
              <p className="pt-4 text-black text-center font-semibold">
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
                    <button
                      className="btn btn-success text-white"
                      onClick={() => {
                        setWantToSend(true);
                        setSubmitSignedFiles(initialValues);
                      }}
                    >
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
            </>
          )}
        </div>
      </dialog>
    </div>
  );
}
