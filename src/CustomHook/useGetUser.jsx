import React, { useState } from "react";

const useGetUser = (id) => {
  const [user, setUser] = useState([]);

  fetch(`https://residential-building.vercel.app/getUser?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setUser(data);
    });

  return [user, setUser];
};

export default useGetUser;
