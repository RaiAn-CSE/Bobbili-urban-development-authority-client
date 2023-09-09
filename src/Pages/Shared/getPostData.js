import toast from "react-hot-toast";

function getPostData( bodyData ) {
    
    console.log(bodyData,"BodyData")
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
    };
    fetch("http://localhost:5000/dashboard/draftApplication/", requestOptions)
        .then((response) => {
            if (!response.ok) {
                return toast.error("Network error!");
            }
            return toast.success("Data Added Successfully")
        })
        .catch((error) => toast.error("User error!"))
    return;
}

export default getPostData;


