function DocumentFooter({
  approvedConfirmation,
  recomendationMessage,
  setApprovedConfirmation,
  setRecommendationMessage,
}) {
  const handleMessage = (event) => {
    setRecommendationMessage(event?.target?.value);
  };
  const handleConfirm = (data) => {
    setApprovedConfirmation(data);
  };

  // console.log(approvedConfirmation && approvedConfirmation === "true", "Checking");
  return (
    <div className="dark:text-white font-roboto">
      <div className="lg:ml-6">
        {/* Approved Buttons */}
        <div className="space-x-14 mb-7">
          {/* <label
            className={`ml-2 text-lg inline-flex items-center space-x-1 text-black"}`}
          >
            <input
              type="radio"
              value="approved"
              name="finalApproved"
              className="radio radio-sm radio-success mr-2"
              defaultChecked={
                approvedConfirmation && approvedConfirmation === "true"
              }
              onClick={() => handleConfirm("true")}
            />
            <span className="text-gray-900">Approve</span>
          </label>
          <label
            className={`ml-2 text-lg inline-flex items-center space-x-1 text-black}`}
          >
            <input
              type="radio"
              value="shortfall"
              name="finalApproved"
              className="radio radio-sm radio-success mr-2"
              defaultChecked={
                approvedConfirmation && approvedConfirmation === "false"
              }
              onClick={() => handleConfirm("false")}
            />
            <span className="text-gray-900">Shortfall</span>
          </label> */}

          <div className="radio-button-container ml-3">
            <div className="radio-button">
              <input
                type="radio"
                id="approved"
                name="finalApproved"
                className="radio-button__input"
                value="approved"
                defaultChecked={
                  approvedConfirmation && approvedConfirmation === "true"
                }
                onClick={() => handleConfirm("true")}
              />
              <label className="radio-button__label" htmlFor="approved">
                <span className="radio-button__custom"></span>
                Approve
              </label>
            </div>
            <div className="radio-button">
              <input
                type="radio"
                id="noSiteRegistered"
                className="radio-button__input"
                name="finalApproved"
                value="shortfall"
                defaultChecked={
                  approvedConfirmation && approvedConfirmation === "false"
                }
                onClick={() => handleConfirm("false")}
              />
              <label className="radio-button__label" htmlFor="noSiteRegistered">
                <span className="radio-button__custom"></span>
                Shortfall
              </label>
            </div>
          </div>
        </div>
        {/* Recomendation */}
        <div className="my-4 mx-3 ">
          <label
            htmlFor="recomendation"
            className="block mb-2 font-semibold text-lg text-gray-600"
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
            onChange={(event) => handleMessage(event)}
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
