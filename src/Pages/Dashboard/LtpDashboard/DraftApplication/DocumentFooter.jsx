function DocumentFooter({
  submitData,
  approvedConfirmation,
  recomendationMessage,
  handleRecomendationMessage,
  handleConfirmation,
}) {
  const handleMessage = (e) => {
    handleRecomendationMessage(e);
  };
  const handleConfirm = (data) => {
    handleConfirmation(data);
  };

  console.log(approvedConfirmation && approvedConfirmation === "true", "Checking");
  return (
    <div className="dark:text-white">
      <div className="lg:ml-6">
        {/* Approved Buttons */}
        <div className="space-x-14 mb-7">
          <label
            className={`ml-2 inline-flex items-center space-x-1 text-black"}`}
          >
            <input
              type="radio"
              value="approved"
              name="finalApproved"
              className="radio radio-sm radio-success mr-3 lg:mr-0"
              // defaultChecked=
              checked={approvedConfirmation && approvedConfirmation === "true"}
              onClick={() => handleConfirm("true")}
            />
            <span className="text-gray-900">Approve</span>
          </label>
          <label
            className={`ml-2 inline-flex items-center space-x-1 text-black}`}
          >
            <input
              type="radio"
              value="shortfall"
              name="finalApproved"
              className="radio radio-sm radio-success mr-3 lg:mr-0"
              checked={approvedConfirmation && approvedConfirmation === "false"}
              onClick={() => handleConfirm("false")}
            />
            <span className="text-gray-900">Shortfall</span>
          </label>
        </div>
        {/* Recomendation */}
        <div className="my-4 mx-3 ">
          <label
            htmlFor="recomendation"
            className="block mb-1 font-semibold text-gray-600"
          >
            Recommendation
          </label>
          <textarea
            id="recomendation"
            name="recomendation"
            rows={6}
            className="w-3/4 px-3 py-2 border rounded-lg  border-gray-300 text-gray-900 bg-gray-50 focus:border-gray-400 focus:outline-none focus:ring-2 ring-gray-200"
            defaultValue={recomendationMessage && recomendationMessage}
            placeholder="Recommendation"
            onChange={(event)=>handleMessage(event)}
          ></textarea>
        </div>

        {/* <div>
          <p className="mb-4 font-bold text-gray-600">Recomendation</p>
          <textarea
            onChange={(e) => handleMessage(e)}
            className="textarea textarea-bordered bg-gray-50"
            cols={80}
            rows={5}
            defaultValue={recomendationMessage && recomendationMessage}
            name="recomendation"
          ></textarea>
        </div> */}
      </div>
    </div>
  );
}

export default DocumentFooter;
