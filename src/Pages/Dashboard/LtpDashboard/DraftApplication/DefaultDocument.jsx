import { useState } from "react";
import DefaultDocumentData from "../../../../assets/DefaultDocument.json"

function DefaultDocument({ PreviousDefaultDocumentData, role, handleFileChange, gradientColor }) {

    const [UpdatedDefaultData, setUpdatedDefaultData] = useState([]);
    
    if (PreviousDefaultDocumentData) {
        setUpdatedDefaultData([...PreviousDefaultDocumentData])
    } else {
        setUpdatedDefaultData([...DefaultDocumentData])
    }

    return (
        <div className="w-full px-2 py-5 rounded">
            {UpdatedDefaultData?.map(data => {
                const { id, question, approved, upload } = data;
                return (
                    <div key={id}>
                        <p className="pb-4 font-bold">{id}. {question}</p>
                        {role === "LTP" && (
                            <input
                                name={id}
                                type="file"
                                accept=".pdf, image/*"
                                onChange={(event) => handleFileChange(event, index)}
                                className="file-input file-input-bordered w-full max-w-xs"
                            />
                        )}
                        {upload !== "" && (
                            <Link
                                to={`https://drive.google.com/file/d/${upload}/view?usp=sharing`}
                                target="_blank"
                                className={`${gradientColor} text-white hover:underline ms-5 py-2 px-5 rounded-full`}
                            >
                                View
                            </Link>
                        )}</div>
                )
            })}
        </div>
    )
}

export default DefaultDocument;