import toast from "react-hot-toast";

function PsDocument({ role, id, approved, uploadId, type, handleDefaultStatus, handleDynamicStatus, setRemarkText, remarkText }) {
	console.log(approved, type, id,"from PS Document");

	const handleDocumentStatus = (event, id, uploadId, type) => {
		const data = event?.target?.value;
		if (type === "dynamic") {
			handleDynamicStatus({ value: data, id, uploadId, type })
			toast.success(`${data}, ${uploadId}, ${id}`);
		} else {
			handleDefaultStatus({ value: data, id, type })
		}
	}

	const handleRemarkText = (event) => {
		const { value } = event?.target;
		if (!value.trim()) {
			return toast.success("No value");
		}

		setRemarkText((prev) => {
			const isDynamic = type === "dynamic";
			const existingIndex = prev.findIndex((item) => (
				item[type]?.id === id && (isDynamic ? item[type]?.uploadId === uploadId : true)
			));

			const existingObject = existingIndex !== -1;

			if (!existingObject) {
				// If the value does not exist, add a new object to the array
				return [...prev, { [type]: { id, uploadId, value } }];
			}

			// If the value already exists, update the existing object with the new value
			const updatedArray = [...prev];
			updatedArray[existingIndex][type].value = value;
			return updatedArray;
		});
	};
	return (
		<div className='dark:text-white'>
			<div className="md:flex items-center mt-6">
				{/* Approved Button */}
				{role === "PS" && (
					<div className="md:flex space-y-4 md:space-x-10 md:space-y-0 mt-2 ms-4 lg:pr-2">
						<div>
							<input
								id={type === "dynamic" ? `approved${id}_${uploadId}` : `approved${id}`}
								type="radio"
								title={id}
								name={type === "dynamic" ? `${id + uploadId}` : id}
								value="approved"
								className="radio radio-sm radio-button__input mr-3 lg:mr-0"
								onClick={(event) => handleDocumentStatus(event, id, uploadId, type)}
								checked={approved === "approved"}
							/>
							<label
								className={`radio-button__label text-base`}
								title={id}
								htmlFor={type === "dynamic" ? `approved${id}_${uploadId}` : `approved${id}`}
							>
								<span className="radio-button__custom"></span>
								Approved
							</label>
						</div>

						<div>
							<input
								id={type === "dynamic" ? `shortfall${id}_${uploadId}` : `shortfall${id}`}
								type="radio"
								title={id}
								name={type === "dynamic" ? `${id + uploadId}` : id}
								value="shortfall"
								className="radio radio-sm radio-button__input mr-3 lg:mr-0"
								onClick={(event) => handleDocumentStatus(event, id, uploadId, type)}
								checked={approved === "shortfall"}
							/>
							<label
								className={`radio-button__label text-base`}
								htmlFor={type === "dynamic" ? `shortfall${id}_${uploadId}` : `shortfall${id}`}
								title={id}
							>
								<span className="radio-button__custom"></span>
								Shortfall
							</label>
						</div>

						<div className={`${approved === "shortfall" ? "block" : "hidden"}`}>
							<p className="text-black font-bold" htmlFor="textarea">Remark:</p>
							<textarea className="textarea mt-2 bg-transparent border border-black text-black" id="textarea"
								name={type === "dynamic" ? `${id}_${uploadId}` : `${id}`}
								defaultValue={remarkText}
								cols="30" rows="1"
								onBlur={(event) => handleRemarkText(event)}
							></textarea>
						</div>
					</div>
				)}
			</div>

		</div>
	)
}

export default PsDocument;
