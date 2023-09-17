import React from "react";

const useSendData = (url, method, sendInfo) => {
  console.log(sendInfo, "BodyData");

  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  };
  fetch(url, config)
    .then((response) => {
      if (!response.ok) {
        return toast.error("Network error!");
      }

      return; // toast.success("Data Added Successfully")
    })
    .catch((error) => toast.error(error.message));
  return;
};

export default useSendData;
