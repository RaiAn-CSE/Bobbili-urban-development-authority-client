import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import Lottie from "lottie-react";
import ShowSubmittedApplication from "../../LtpDashboard/Submitted/ShowSubmittedApplication";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import TableLayout from "../../../Components/TableLayout";
import Loading from "../../../Shared/Loading";
import ErrorAnimation from "../../../../assets/ServerError.json";

const Inward = () => {
  const { userInfoFromLocalStorage, showPageBasedOnApplicationType } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const [allData, setAllData] = useState([]);

  const [storeData, setStoreData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const path = useLocation().pathname;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // get all applications which are submitted already
  const { data, refetch, isLoading, isError, isSuccess } = useQuery(
    ["allInwardApplications"],
    async () => {
      const response = await fetch(
        `http://localhost:5000/submitApplications?userId=${userInfoFromLocalStorage()?._id
        }`
      );
      return await response.json();
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isError) {
      console.log("ERROR");
      setError("Failed to fetch");
      setLoading(false);
    } else {
      setError("");
      setLoading(false);
    }

    setAllData(data);
    setStoreData(data);
  }, [isError, data]);

  console.log(allData);

  const onSubmit = (data) => {
    console.log(data);
    const { search } = data;

    console.log(search, "Search");

    if (search?.includes("BUDA/2023")) {
      console.log("object");
      console.log(
        storeData?.filter(
          (application) => application?.applicationNo === search
        ),
        "FILER"
      );

      console.log(storeData, "StoreData");
      //  search by application No
      setAllData(
        storeData?.filter(
          (application) => application?.applicationNo === search
        )
      );
    } else {
      console.log("Asci");

      setAllData(
        storeData?.filter(
          (application) =>
            application?.applicantInfo?.applicantDetails[0]?.name?.toLowerCase() ===
            search?.toLowerCase()
        )
      );
    }
  };

  const tableHeader = [
    "Sl.no.",
    "Application no.",
    "Owner name",
    "Phone no.",
    "Case type",
    "Village",
    "Mandal",
    "Submitted date",
    "Status",
  ];

  const [tableData, setTableData] = useState({});
  const [tableComponentProps, setTableComponentProps] = useState({});

  useEffect(() => {
    setTableData((prev) => {
      const newValue = {
        tableHeader,
        data: allData,
      };
      return { ...prev, ...newValue };
    });
  }, [isSuccess, allData]);

  useEffect(() => {
    setTableComponentProps((prev) => {
      const newValue = {
        showPageBasedOnApplicationType,
        navigate,
      };
      return { ...prev, ...newValue };
    });
  }, []);

  const detectChange = (e) => {
    if (!e.target.value.length) {
      setAllData(storeData);
    }
  };

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
          {path.includes("searchApplication") && (
            <form
              className="max-w-lg mt-10 ml-6 mb-[-10px] px-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                {...register("search")}
                onChange={detectChange}
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Application no. or owner name"
                required
              />
              <input
                type="submit"
                value="Search"
                className="text-[#fff] font-semibold absolute right-2.5 bottom-2.5 focus:ring-2 focus:outline-none focus:ring-fuchsia-200 rounded-lg text-sm px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500"
              />
            </div> */}

              <div className="search-box">
                <button
                  className="btn-search bg-normalViolet flex justify-center items-center"
                  type="submit"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  // className="input-search"
                  id="default-search"
                  {...register("search")}
                  onChange={detectChange}
                  className="input-search font-roboto"
                  placeholder="Application no. or owner name"
                  required
                />
              </div>
            </form>
          )}

          <>
            <TableLayout
              tableData={tableData}
              Component={ShowSubmittedApplication}
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

export default Inward;
