import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { QueryClient, useQuery, useQueryClient } from "react-query";

const useGetUser = () => {
  const { userInfoFromLocalStorage } = useContext(AuthContext);

  // console.log(userInfoFromLocalStorage()?.userId);

  const { data, refetch, isLoading, isError, isSuccess } = useQuery(
    [`specificUserInfo`],
    async () => {
      const response = await fetch(
        `http://localhost:5000/userInformation?id=${userInfoFromLocalStorage()?.userId
        }`
      );
      return await response.json();
    }
  );

  // console.log(data, "Data");

  return [data, refetch, isLoading, isError, isSuccess];
};

export default useGetUser;
