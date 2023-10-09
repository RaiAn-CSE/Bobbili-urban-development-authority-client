
function DynamicDocument({ UpdatedDynamicDocumentData, role, handleFileChange, gradientColor }) {
  const someEventHandler = (event, index) => {
    // Call the function from props
    handleFileChange(event, index);
  
    // Additional logic in the child component, if needed
  };
  return (
    <div>
      {UpdatedDynamicDocumentData?.map((document, index) => {
        const { id, question, upload, approved, requirements } = document;
        return (
          <div key={id} className="w-full px-2 py-5 rounded">
            <div className="text-[17px]">
              <p className="pb-4 font-bold">{index+9}. {question}</p>
              <div className="ml-6">
                {requirements?.map((requirement, ind) => {
                  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n'];
                  return (
                    <div key={ind + 1} className="mb-8">
                      <div className="mb-3">
                        <span className="font-bold">{letters[ind]}. </span>{requirement.requirement}
                      </div>
                      {role === "LTP" && (
                        <input
                          name={id}
                          type="file"
                          accept=".pdf, image/*"
                          onChange={(event) => someEventHandler(event, index)}
                          className="file-input file-input-bordered w-full max-w-xs"
                        />
                      )}

                      {requirement.upload !== "" && (
                        <a
                          href={`https://drive.google.com/file/d/${requirement.upload}/view?usp=sharing`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${gradientColor} text-white hover:underline ms-5 py-2 px-5 rounded-full`}
                        >
                          View
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DynamicDocument;
