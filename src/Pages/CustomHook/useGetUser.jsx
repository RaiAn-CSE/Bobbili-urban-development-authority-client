import React, { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useQuery } from "react-query";

const useGetUser = () => {
  const { userInfoFromLocalStorage } = useContext(AuthContext);

  const { data, refetch, isLoading, isError, isSuccess } = useQuery(
    [`specificUserInfo`],
    async () => {
      const response = await fetch(
        `http://localhost:5000/getUser?id=${userInfoFromLocalStorage().userId}`
      );
      return await response.json();
    }
  );

  if (data?.userInfo) {
    localStorage.setItem("loggedUser", JSON.stringify({ ...data?.userInfo }));
  }
  console.log(data, "Data");
  return [data, refetch, isLoading, isError, isSuccess];
};

export default useGetUser;
