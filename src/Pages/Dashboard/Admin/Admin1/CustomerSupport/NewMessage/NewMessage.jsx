import React, { useContext, useEffect, useState } from "react";
import TableLayout from "../../../../../Components/TableLayout";
import Lottie from "lottie-web";
import ErrorAnimation from "../../../../../../assets/ServerError.json";
import ShowNewMessages from "./ShowNewMessages";
import toast from "react-hot-toast";
import Loading from "../../../../../Shared/Loading";
import { AuthContext } from "../../../../../../AuthProvider/AuthProvider";
import socket from "../../../../../Common/socket";
import axios from "axios";

const NewMessage = () => {
  const { userInfoFromLocalStorage } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState([]);
  const [tableData, setTableData] = useState({});
  const [tableComponentProps, setTableComponentProps] = useState({});

  const tableHeader = ["Sl.no.", "Customer Info", "Action"];

  useEffect(() => {
    socket.emit("login", { id: userInfoFromLocalStorage().role.toLowerCase() });
  }, [socket]);

  useEffect(() => {
    socket.on("check-new-message", async (data) => {
      // Handle the new data received from the server
      console.log(data, "New msg data");

      if (data?.change?.operationType === "insert") {
        console.log(allData, "After updating");
        const { data } = await axios.get(
          "http://localhost:5000/messageRequest"
        );

        setAllData(data);
      }
    });

    socket.on("check-accept-message", async (data) => {
      // Handle the new data received from the server
      console.log(data, "Check accept message");

      if (data?.change?.updateDescription?.updatedFields?.noResponse === 1) {
        console.log(allData, "After updating");
        const { data } = await axios.get(
          "http://localhost:5000/messageRequest"
        );

        setAllData(data);
      }
    });

    // return () => {
    //   // Clean up event listeners on component unmount
    //   socket.off("check-accept-message");
    //   //   clearInterval(countDownInterval);
    // };
  }, [socket]);

  useEffect(() => {
    setError("");
    setLoading(true);
    fetch("http://localhost:5000/messageRequest")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAllData(result);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Server Error");
        setError("Server Error");
        setLoading(false);
      });
  }, []);

  const acceptNewMessage = (id) => {
    console.log(id);
  };

  useEffect(() => {
    setTableData((prev) => {
      const newValue = {
        tableHeader,
        data: allData,
      };
      return { ...prev, ...newValue };
    });

    setTableComponentProps({ acceptNewMessage });
  }, [allData]);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {error?.length !== 0 ? (
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh - 10%)]">
          <Lottie
            animationData={ErrorAnimation}
            loop={true}
            className="w-[40%] h-[40%]"
          />
          <p className="text-red-500 font-bold text-lg uppercase">
            {error} data
          </p>
        </div>
      ) : (
        <div>
          <>
            <TableLayout
              tableData={tableData}
              Component={ShowNewMessages}
              tableComponentProps={tableComponentProps}
            />

            {allData?.length === 0 && (
              <p className="text-center  font-bold text-lg text-normalViolet">
                No Request Found
              </p>
            )}

            {/* {isLoading && <p>Loading...</p>} */}
          </>
        </div>
      )}
    </>
  );
};

export default NewMessage;
