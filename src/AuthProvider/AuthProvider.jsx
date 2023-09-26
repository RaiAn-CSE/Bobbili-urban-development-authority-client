import React, { createContext, useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  // get user information from the localStorage
  const userInfoFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("loggedUser"));
  };

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
  const sendUserDataIntoDB = async (url, method = "PATCH", data) => {
    console.log(data, "DATA");
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, config);
    const result = await response.json();
    return result;
  };

  // get userdata
  const getUserData = async (id) => {
    console.log(id, "AUTH ID");

    const response = await fetch(
      `https://residential-building.vercel.app/getUser?id=${id}`
    );
    const data = await response.json();
    return data;
  };

  // set sweet alert's parameters dynamically

  const alertToTransferDataIntoDepartment = (applicationNo) => {
    console.log(applicationNo, "CurrentApplicationNo");

    const data = { userId: userInfoFromLocalStorage()._id, applicationNo };

    const url = `http://localhost:5000/deleteApplication?data=${JSON.stringify(
      data
    )}`;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to update this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sent it!",
      showLoaderOnConfirm: true,
      preConfirm: async (confirm) => {
        console.log("confirm", confirm);

        return await fetch(url, { method: "DELETE" })
          .then((response) => {
            console.log(response, "response");
            if (!response.acknowledged) {
              throw new Error(response.statusText);
            }
            return response;
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Sent!", "Your file has been sent successfully.", "success");
      }
    });
  };

  // confirmation message and send data to database
  const confirmAlert = (stepperData, collectInputFieldData) => {
    const url = `http://localhost:5000/updateDraftApplicationData/${
      userInfoFromLocalStorage()._id
    }`;

    console.log(url, "url");

    Swal.fire({
      title: "Do you want to save your information?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, save it",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      showLoaderOnConfirm: true,
      preConfirm: async (confirm) => {
        console.log("confirm", confirm);

        console.log(collectInputFieldData, "COLLECT INPUT FIELD DATA");

        return await collectInputFieldData(url)
          .then((response) => {
            console.log(response, "response");
            if (!response.acknowledged) {
              throw new Error(response.statusText);
            }
            return response;
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      console.log(result, "result");
      if (result.isConfirmed && result.value.acknowledged) {
        toast.success("Data saved successfully");

        // if stepper data is exist then update stepper steps and navigate to the next step
        if (stepperData) {
          const [currentStep, steps, handleStepClick] = stepperData;
          currentStep < steps.length - 1 && handleStepClick(currentStep + 1);
        }
      } else {
        toast.error("Failed to save data");
      }
    });
  };

  // confirmation to delete data from the database
  const alertToConfirmDelete = (data, removeData) => {
    Swal.fire({
      title: "Do you want to delete the data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, save it",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        removeData(data);
      }
    });
  };

  // specific application data
  const getApplicationData = async (appNo) => {
    const query = JSON.stringify({
      appNo,
      userId: userInfoFromLocalStorage()._id,
    });

    const response = await fetch(
      `https://residential-building.vercel.app/getApplicationData?data=${query}`
    );

    return await response.json();
  };

  // getApplicationData("1177/3/2023");

  //   create a object to transfer data into various components
  const userInfo = {
    updateUserInfoInLocalStorage,
    userInfoFromLocalStorage,
    sendUserDataIntoDB,
    getUserData,
    confirmAlert,
    alertToConfirmDelete,
    getApplicationData,
    alertToTransferDataIntoDepartment,
  };
  return (
    <>
      <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
