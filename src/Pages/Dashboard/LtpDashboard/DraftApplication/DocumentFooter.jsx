function DocumentFooter({
  submitData,
  approvedConfirmation,
  recomendationMessage,
  handleRecomendationMessage,
  handleConfirmation
}) {
  const handleMessage = (e) => {
    handleRecomendationMessage(e)
  };
  const handleConfirm = (data) => {
    handleConfirmation(data)
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
            <span>Approve</span>
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
            <span>Shortfall</span>
          </label>
        </div>
        {/* Recomendation */}
        <div>
          <p className="mb-4 font-bold">Recomendation</p>
          <textarea
            onChange={(e) => handleMessage(e)}
            className="textarea textarea-bordered border-black"
            cols={80}
            rows={5}
            defaultValue={recomendationMessage && recomendationMessage}
            name="recomendation"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default DocumentFooter;
