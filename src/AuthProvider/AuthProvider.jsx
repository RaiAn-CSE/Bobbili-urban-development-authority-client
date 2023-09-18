import React, { createContext, useState } from "react";
import { toast } from "react-hot-toast";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  // get user information from the localStorage
  const userInfoFromLocalStorage = JSON.parse(
    localStorage.getItem("loggedUser")
  );

  // update user info
  const updateUserInfoInLocalStorage = (id) => {
    fetch(`https://residential-building.vercel.app/getUser?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status) {
          console.log(1);

          const { userInfo } = data;
          console.log(userInfo);

          // set information to localstorage to stay logged in
          localStorage.setItem("loggedUser", JSON.stringify(userInfo));
          toast.success("user update successfully");
        } else {
          setLoading(false);
          toast.error("User update failed");
        }
      });
  };

  //   send user data into the database
  const sendUserDataIntoDB = (url, method = "PATCH", data) => {
    setLoading(true);
    console.log(data);
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(url, config)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          setLoading(false);
          toast.error("Failed to store data");
        } else {
          setLoading(false);
          toast.success("Data stored Successfully");
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Failed to store data");
      });
  };

  const getUserData = async (id) => {
    console.log(id, "AUTH ID");

    const response = await fetch(
      `https://residential-building.vercel.app/getUser?id=${id}`
    );
    const data = await response.json();
    return data;
  };

  //   create a object to transfer data into various components
  const userInfo = {
    updateUserInfoInLocalStorage,
    userInfoFromLocalStorage,
    sendUserDataIntoDB,
    getUserData,
  };
  return (
    <>
      <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
