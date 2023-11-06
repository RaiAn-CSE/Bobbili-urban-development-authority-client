import React, { useContext, useEffect, useState } from "react";
import ApplicationHeader from "./ApplicationHeader";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";

function Application({ setOpenApplication }) {
  const { getApplicationData } = useContext(AuthContext);
  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));
  const [generalInformation, setGeneralInformation] = useState({});
  const [plotDetails, setPlotDetails] = useState({});
  const [ltpDetailsData, setLtpDetailsData] = useState({});
  const [applicantDetailsData, setApplicantDetailsData] = useState({});
  const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";
  useEffect(() => {
    // Opening the modal when the component mounts
    const modal = document.getElementById("my_modal_5");
    if (modal) {
      modal.showModal();
    }

    // Add an event listener to close the modal when clicking outside
    modal.addEventListener("click", handleModalClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      modal.removeEventListener("click", handleModalClick);
    };
  }, []);

  const handleModalClick = () => {
    setOpenApplication(false);
  };

  useEffect(() => {
    const gettingData = async () => {
      const applicationData = await getApplicationData(applicationNo);
      setGeneralInformation(applicationData?.buildingInfo?.generalInformation);
      setPlotDetails(applicationData?.buildingInfo?.plotDetails);
      setLtpDetailsData(applicationData?.applicantInfo?.ltpDetails);
      setApplicantDetailsData(
        applicationData?.applicantInfo?.applicantDetails[0]
      );
    };
    gettingData();
  }, []);

  // General Information
  const {
    applicationType,
    bpsApprovedNoServer,
    caseType,
    district,
    gramaPanchayat,
    iplpNo,
    lpNo,
    lrsNo,
    mandal,
    natureOfPermission,
    natureOfTheSite,
    plotNo,
    plotNo2,
    previewsApprovedFileNo,
    surveyNo,
    village,
  } = generalInformation || {};

  // Plot Details
  const { proposedPlotAreaCal, roadWideningAreaCal, netPlotAreaCal } =
    plotDetails || {};

  // LTP Details
  const {
    type,
    name,
    address: ltpAddress,
    email: ltpEmail,
    licenseNo,
    phoneNo: ltpPhone,
    validity,
  } = ltpDetailsData || {};

  // Applicant Details
  const {
    name: ApplicantName,
    identity,
    phone: applicantPhone,
    email: AppEmail,
    adharNo,
    pinCode,
    address: applicantAddress,
  } = applicantDetailsData || {};

  // ====Applicant Info
  const Part01 = [
    { "Name(in full)": ApplicantName },
    { "Door No/Flat No.": adharNo },
    { "Road/Street": roadWideningAreaCal },
    { Village: village },
    { Mandal: mandal },
    { District: district },
    { "PIN Code": pinCode },
    { "Phone No": applicantPhone },
    { "E-mail": AppEmail },
  ];

  const Part02 = [
    { "Survey No": surveyNo },
    { "L.P Mo./LRS No.": lrsNo },
    { "Plot No": plotNo },
    { Village: village },
    { "Grama Panchayat": gramaPanchayat },
    { Mandal: gramaPanchayat },
    { District: district },
  ];

  // Part01 && Part02 Keys and Values
  const renderCol = (data, index, type) => {
    const keys = type === "keys";
    const isArray = Array.isArray(data);
    if (isArray) {
      return (
        <td
          className={`bg-white border border-black ${type === "keys" && "w-1/3"
            } p-0`}
        >
          <div className="flex">
            {data?.map((e, i) => (
              <p
                key={i}
                className={`flex items-center p-2 border-l border-black h-12 ${i === 0 && "w-1/2 border-l-0 bg-white"
                  }`}
              >
                {(keys ? Object.keys(data[i]) : Object.values(data[i])) || e}
              </p>
            ))}
          </div>
        </td>
      );
    } else {
      return (
        <td
          className={`bg-white border border-black ${type === "keys" && "w-1/3"
            } p-0`}
        >
          <p className="h-12 p-2 flex items-center">
            {keys ? Object.keys(data) : Object.values(data)}
          </p>
        </td>
      );
    }
  };

  return (
    <div className="w-full h-full text-black">
      <dialog id="my_modal_5" className="modal">
        <div className="modal-box w-full max-w-4xl p-14 bg-white relative">
          {/* Header */}
          <ApplicationHeader />
          <div>

            {/* Part01 */}
            <div className="overflow-x-auto">
              <table className="table bg-white table-sm cursor-default">
                {/* Part01 head */}
                <thead className="bg-gray-400 border border-black text-black dark:text-white">
                  <tr>
                    <th className="border border-black">A</th>
                    <th className="border border-black text-end">
                      ADDRESS OF THE APPLICANT
                    </th>
                    <th className="border border-black"></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {Part01.map((item, index) => {
                    return (
                      <tr key={index + 1} className="bg-white">
                        {/* col-01 */}
                        <th className="bg-white border border-black w-[10%]">
                          {index + 1}
                        </th>
                        {/* col-02 */}
                        {renderCol(item, index, "keys")}
                        {/* col-03 */}
                        {renderCol(item, index, "values")}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Part02 */}
            <div className="overflow-x-auto mt-10 text-black">
              <table className="table bg-white table-sm">
                {/* Part02 head */}
                <thead className="bg-gray-400 border border-black text-black uppercase">
                  <tr>
                    <th className="border border-black">B</th>
                    <th className="border border-black">LOCATION OF THE PROPOSED SITE</th>
                    <th className="border border-black"></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {Part02.map((item, index) => {
                    return (
                      <tr key={index} className="bg-white">
                        {/* col-01 */}
                        <th className="bg-white border border-black w-[10%]">
                          {index + 1}
                        </th>
                        {/* col-02 */}
                        {renderCol(item, index, "keys")}
                        {/* col-03 */}
                        {renderCol(item, index, "values")}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {/* Part 03 */}
          <div className="overflow-x-auto mt-10">
            <table className="table bg-white table-sm">
              {/* Part 03 head */}
              <thead className="bg-gray-400 text-black dark:text-white">
                <tr>
                  <th className="border border-black w-[10%]">D</th>
                  <th className="border border-black uppercase">
                    DETAILS OF THE PROPOSED CONSTRUCTION
                  </th>
                  <th className="border border-black"></th>
                  <th className="border border-black"></th>
                </tr>
              </thead>
              <tbody className="text-start">
                <tr className="border border-black">
                  <td className="border border-black w-[10%]">01</td>
                  <td className="border border-black w-[30%]">
                    Site Area (Sq.mtr.)
                  </td>
                  <td className="p-0 border-0 border-r border-black">
                    <td className="border-0 border-b border-black w-full block">
                      As per Document
                    </td>
                    <td className="border-0 border-b border-black w-full block">
                      As on Ground
                    </td>
                    <td className="border-0 w-full block">As on Proposed</td>
                  </td>
                  <td className="p-0 border-0 border-y border-black">
                    <td className="border-0 border-b border-black w-full block">
                      As per Document
                    </td>
                    <td className="border-0 border-b border-black w-full block">
                      As on Ground
                    </td>
                    <td className="border-0 w-full block">As on Proposed</td>
                  </td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">02</td>
                  <td className="border border-black">
                    Total Number of floors
                  </td>
                  <td className="border border-black"></td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black"></td>
                  <td className="border border-black">Floor name</td>
                  <td className="border-r border-black">Built up area</td>
                  <td className="">Parking Area</td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">a</td>
                  <td className="border border-black">Site floor (sq. mtr.)</td>
                  <td className="border border-black"></td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">b</td>
                  <td className="border border-black">
                    Ground floor (sq.mtr.)
                  </td>
                  <td className="border border-black"></td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">c</td>
                  <td className="border border-black">First floor (sq.mtr.)</td>
                  <td className="border border-black"></td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">d</td>
                  <td className="border border-black">
                    Second floor (sq.mtr.)
                  </td>
                  <td className="border border-black"></td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">03</td>
                  <td className="border border-black">
                    Total Built-up area and parking area (sq.mtr.)
                  </td>
                  <td className="border border-black"></td>
                  <td className="border border-black"></td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">04</td>
                  <td className="border border-black">Numbers Of Units</td>
                  <td className="border-0"></td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">05</td>
                  <td className="border border-black">Vacant site area</td>
                  <td className="border-0"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-7">
            <p className="font-bold">Primary</p>
            <p>
              I hereby declare that I am the owner/ PAH in possession of the
              plot on which the work is proposed and that the statement made in
              this form is true and correct to the best of my knowledge.
            </p>
          </div>
          <div>
            <table className="mt-7 w-full">
              <thead>
                <tr>
                  <th className="border border-black p-1"></th>
                  <th className="border border-black p-1">Signature</th>
                  <th className="border border-black p-1"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-black">
                  <td className="border border-black p-1" style={{ width: "10%" }}>
                    01
                  </td>
                  <td className="border border-black p-1" style={{ width: "40%" }}>
                    Signature of owner
                  </td>
                  <td
                    className="border border-black p-1"
                    style={{ width: "50%" }}
                  ></td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black p-1" style={{ width: "10%" }}>
                    02
                  </td>
                  <td className="border border-black p-1" style={{ width: "40%" }}>
                    Signature of the LTP
                  </td>
                  <td
                    className="border border-black"
                    style={{ width: "50%" }}
                  ></td>
                </tr>
              </tbody>
            </table>
          </div>
          <form method="dialog" className="mt-5">
            <button
              onClick={() => setOpenApplication(false)}
              className={`btn btn-md text-sm px-3 mt-10 ml-3 border-none text-white shadow-md transition-all duration-500 ${gradientColor} hover:shadow-lg hover:shadow-violetDark hover:bg-gradient-to-bl`}
            >
              Close
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Application;
