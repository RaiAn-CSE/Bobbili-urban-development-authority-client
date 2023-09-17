import toast from "react-hot-toast";

function usePostData(bodyData) {

    console.log(bodyData, "BodyData")
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
    };
    fetch("url", requestOptions)
        .then((response) => {
            if (!response.ok) {
                return toast.error("Network error!");
            }

            return; // toast.success("Data Added Successfully")
        })
        .catch((error) => toast.error(error.message))
    return;
}

export default usePostData;


