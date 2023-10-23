import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { BsPlusLg } from "react-icons/bs";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import AllDraftApplication from "./AllDraftApplication";
import Swal from "sweetalert2";
import TableLayout from "../../../Components/TableLayout";

const NewApplication = () => {
  const {
    userInfoFromLocalStorage,
    sendUserDataIntoDB,
    alertToConfirmDelete,
    showPageBasedOnApplicationType,
  } = useContext(AuthContext);

  console.log(userInfoFromLocalStorage());

  const { _id: userID } = userInfoFromLocalStorage();
  const [error, setError] = useState("");

  const date = new Date();

  const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";

  // get all draft applications
  const { data, refetch, isLoading, isError, isSuccess } = useQuery(
    ["draftApplications"],
    async () => {
      const response = await fetch(
        `http://localhost:5000/draftApplications/${userID}`
      );
      return await response.json();
    }
  );

  console.log(data, "Query");

  useEffect(() => {
    if (isError) {
      console.log("ERROR");
      setError("No data found");
    } else {
      setError("");
    }

    localStorage.removeItem("currentStep");
  }, [isError]);

  const removeDraftApplication = (applicationNo) => {
    console.log(applicationNo, "DELTE APP NO");
    fetch(`http://localhost:5000/deleteSingleDraft`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ applicationNo, userID }),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          toast.success("Delete successfully");
          refetch();
        } else {
          toast.error("Failed to delete data");
        }
      })
      .catch(() => {
        toast.error("Server is not responded");
      });
  };

  // navigate after clicking on the draft application no
  const navigate = useNavigate();

  // store new application information into the database
  const storeApplicationData = (serialNo) => {
    const url = `http://localhost:5000/addApplication`;

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const applicationNo = `1177/${serialNo}/XX/XX/BUDA/${year}`;

    const data = {
      userId: userID,
      applicationNo,
      buildingInfo: {
        generalInformation: {},
        plotDetails: {},
        scheduleBoundaries: {},
      },
      applicantInfo: { ltpDetails: {}, applicantDetails: {} },
      applicationCheckList: [],
      documents: {
        default: [],
        dynamic: [],
      },
      drawing: { AutoCAD: "", Drawing: "" },
      payment: {
        udaCharge: {},
        gramaPanchayatFee: {},
        labourCessCharge: {},
        greenFeeCharge: {},
      },
      createdDate: `${day}-${month}-${year}`,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          toast.error("Failed to store data");
        } else {
          toast.success("Data stored Successfully");
          // store current application No
          localStorage.setItem(
            "CurrentAppNo",
            JSON.stringify(data.applicationNo)
          );
          localStorage.setItem("stepIndex", JSON.stringify(0));
          navigate("/dashboard/draftApplication/buildingInfo");
        }
      })
      .catch(() => {
        toast.error("Failed to store data");
      });
  };

  const showConfirmModal = () => {
    Swal.fire({
      title: "Do you want to create a new application?",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#a36ee0",
      cancelButtonColor: "#1f1132",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        fetch("http://localhost:5000/getSerialNumber")
          .then((res) => res.json())
          .then((data) => {
            storeApplicationData(data?.serialNo);
          });
      }
    });
  };

  const tableHeader = [
    "Sl.no.",
    "Application no.",
    "Owner name",
    "Phone no.",
    "Case type",
    "Village",
    "Mandal",
    "Created date",
    "Action",
  ];

  const [tableData, setTableData] = useState({});

  useEffect(() => {
    console.log("object");
    setTableData((prev) => {
      const newValue = {
        tableHeader,
        tableData: data,
        removeDraftApplication,
        showPageBasedOnApplicationType,
        navigate,
      };
      return { ...prev, ...newValue };
    });
  }, [isSuccess, data]);

  return (
    <div className=" my-3">
      {/* test  */}
      {/* <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Created at
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full rounded-full"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            Vera Carpenter
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">Admin</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        Jan 21, 2020
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Activo</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full rounded-full"
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            Blake Bowman
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">Editor</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        Jan 01, 2020
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Activo</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full rounded-full"
                            src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            Dana Moore
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">Editor</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        Jan 10, 2020
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Suspended</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-5 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full rounded-full"
                            src="https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            Alonzo Cox
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">Admin</p>
                    </td>
                    <td className="px-5 py-5 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        Jan 18, 2020
                      </p>
                    </td>
                    <td className="px-5 py-5 bg-white text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Inactive</span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div> */}

      <div className="flex justify-end mt-10 mr-3">
        <button
          className={`btn flex font-roboto dark:border-none transition-all duration-700 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-[#fff] hover:bg-gradient-to-l`}
          onClick={showConfirmModal}
        >
          <span className="text-sm">Create a new application</span>
          <BsPlusLg size={20} />
        </button>
      </div>

      <TableLayout props={tableData} />

      {error && (
        <p className="text-lg text-center my-4 font-bold text-error">{error}</p>
      )}

      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default NewApplication;
