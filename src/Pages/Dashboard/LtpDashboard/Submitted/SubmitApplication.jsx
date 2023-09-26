import React, { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";

const SubmitApplication = () => {
  const { userInfoFromLocalStorage } = useContext(AuthContext);

  // get all applications which are submitted already
  const { data, refetch, isLoading, isError } = useQuery(
    ["allSubmitApplication"],
    async () => {
      const response = await fetch(
        `http://localhost:5000/allSubmitApplications?id=${
          userInfoFromLocalStorage()._id
        }`
      );
      return await response.json();
    }
  );

  console.log(data);
  return (
    <div>
      <p>this is Submit Application</p>
    </div>
  );
};

export default SubmitApplication;
