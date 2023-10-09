

function DefaultDocument() {
    return (
        <div className="w-full text-[17px] px-2 py-5 rounded">
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
            )}
        </div>
    )
}

export default DefaultDocument;