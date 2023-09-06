import React from "react";
import { useQuery } from "react-query";

const useUser = () => {
  return useQuery({
    queryFn: async () => {
      const data = await axios.get(`http://localhost:5000/getUser?${userInfo}`);

      return data;
    },
  });
};

export default useUser;
