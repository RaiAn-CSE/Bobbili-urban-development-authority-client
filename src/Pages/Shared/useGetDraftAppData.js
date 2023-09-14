import toast from "react-hot-toast";

async function useGetDraftAppData(applicationId) {
    try {
        const url = `https://draftapplication/${applicationId}`; // Replace with actual API endpoint

        // Perform the fetch operation
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Network error. Please try again later.");
        }
        const data = await response.json();
        toast.success("Data Fetched Successfully");
        // const Id = draftApplicationData.applicationId;
        // if (applicationId == Id) {
        //     localStorage.removeItem("draftApplicationData");
        //     localStorage.setItem("draftApplicationData", JSON.stringify(draftApplicationData));
        // }
        return data; // Returning data
    } catch (error) {
        toast.error(error.message);
        return null;
    }
}

export default useGetDraftAppData;
