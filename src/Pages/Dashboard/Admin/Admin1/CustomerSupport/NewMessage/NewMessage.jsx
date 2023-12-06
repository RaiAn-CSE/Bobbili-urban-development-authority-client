import React, { useEffect, useState } from "react";
import TableLayout from "../../../../../Components/TableLayout";
import Lottie from "lottie-web";
import ErrorAnimation from "../../../../../../assets/ServerError.json";
import ShowNewMessages from "./ShowNewMessages";

const NewMessage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState([]);
  const [tableData, setTableData] = useState({});
  const [tableComponentProps, setTableComponentProps] = useState({});

  const tableHeader = ["Sl.no.", "Name", "Contact", "Action"];

  useEffect(() => {
    setTableData((prev) => {
      const newValue = {
        tableHeader,
        data: allData,
      };
      return { ...prev, ...newValue };
    });
  }, [allData]);
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
              <p className="text-center  font-bold text-xl text-black">
                No application Found
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
