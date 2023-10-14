function DocumentFooter({
  submitData,
  setApprovedConfirmation,
  setRecomendationMessage,
  approvedConfirmation,
  recomendationMessage,
}) {
  const handleRecomendationMessage = (e) => {
    const RecomdMessage = e.target.value;
    setRecomendationMessage(RecomdMessage);
  };
  const handleConfirmation = (data) => {
    setApprovedConfirmation(data);
  };

  console.log(submitData?.approved);
  //   const path = "LTP";
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
              defaultChecked={
                approvedConfirmation === "true" ||
                submitData?.approved === "true"
              }
              onClick={() => handleConfirmation("true")}
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
              defaultChecked={
                approvedConfirmation === "false" ||
                submitData?.approved === "false"
              }
              onClick={() => handleConfirmation("false")}
            />
            <span>Shortfall</span>
          </label>
        </div>
        {/* Recomendation */}
        <div>
          <p className="mb-4 font-bold">Recomendation</p>
          <textarea
            onChange={(e) => handleRecomendationMessage(e)}
            className="textarea textarea-bordered border-black"
            cols={80}
            rows={5}
            defaultValue={
              submitData?.message?.length !== 0
                ? submitData?.message
                : recomendationMessage
            }
            name="recomendation"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default DocumentFooter;
