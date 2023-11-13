import React, { useContext, useEffect, useState } from "react";
import ApplicationHeader from "./ApplicationHeader";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import { RxCross2 } from "react-icons/rx";

function Application({ setOpenApplication }) {
  const { getApplicationData, ownerNamePattern, calculateNoOfFloors } =
    useContext(AuthContext);
  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));
  const page = JSON.parse(localStorage.getItem("page"));
  const [generalInformation, setGeneralInformation] = useState({});
  const [plotDetails, setPlotDetails] = useState({});
  const [ltpDetailsData, setLtpDetailsData] = useState({});
  const [applicantDetailsData, setApplicantDetailsData] = useState([]);

  useEffect(() => {
    // Opening the modal when the component mounts
    const modal = document.getElementById("my_modal_5");
    if (modal) {
      modal.showModal();
    }
  }, []);

  const handleModalClick = () => {
    setOpenApplication(false);
  };

  useEffect(() => {
    const gettingData = async () => {
      const applicationData = await getApplicationData(applicationNo, page);
      console.log(applicationData, "ApplicationData");
      setGeneralInformation(applicationData?.buildingInfo?.generalInformation);
      setPlotDetails(applicationData?.buildingInfo?.plotDetails);
      setLtpDetailsData(applicationData?.applicantInfo?.ltpDetails);
      setApplicantDetailsData(applicationData?.applicantInfo?.applicantDetails);
    };
    gettingData();
  }, []);

  // General Information
  // const {
  //   applicationType,
  //   bpsApprovedNoServer,
  //   caseType,
  //   district,
  //   gramaPanchayat,
  //   iplpNo,
  //   lpNo,
  //   lrsNo,
  //   mandal,
  //   natureOfPermission,
  //   natureOfTheSite,
  //   plotNo,
  //   plotNo2,
  //   previewsApprovedFileNo,
  //   surveyNo,
  //   village,
  // } = generalInformation || {};

  // console.log(generalInformation, getApplicationData, "generalInformation");

  // // Plot Details
  // const { proposedPlotAreaCal, roadWideningAreaCal, netPlotAreaCal } =
  //   plotDetails || {};
  // // LTP Details
  // const {
  //   type,
  //   name,
  //   address: ltpAddress,
  //   email: ltpEmail,
  //   licenseNo,
  //   phoneNo: ltpPhone,
  //   validity,
  // } = ltpDetailsData || {};

  // // Applicant Details
  // const {
  //   name: ApplicantName,
  //   identity,
  //   phone: applicantPhone,
  //   email: AppEmail,
  //   adharNo,
  //   pinCode,
  //   address: applicantAddress,
  //   ownerDoorNo,
  // } = applicantDetailsData || {};

  // ====Applicant Info
  const Part01 = [
    { "Name(in full)": ownerNamePattern(applicantDetailsData) },
    {
      Address: `${applicantDetailsData[0]?.ownerDoorNo}, ${applicantDetailsData[0]?.ownerStreetNo}`,
    },
    { "Phone / Mobile No.": applicantDetailsData[0]?.phone },
    { "E-mail": applicantDetailsData[0]?.email },
  ];

  const Part02 = [
    { "Survey No": generalInformation?.surveyNo },
    { "L.P Mo./LRS No.": generalInformation.lrsNo },
    { "Plot No": generalInformation?.plotNo },
    { Village: generalInformation?.village },
    { "Grama Panchayat": generalInformation?.gramaPanchayat },
    { Mandal: generalInformation?.mandal },
    { District: generalInformation?.district },
  ];

  const extractFloorInfo = (allFloors, searchFloor) => {
    console.log(allFloors, searchFloor, "Search floor");
    const findFloorInfo = allFloors?.find((floor) =>
      floor?.name?.includes(searchFloor)
    );
    console.log(findFloorInfo, "FFI");
    return findFloorInfo;
  };

  // Part01 && Part02 Keys and Values
  const renderCol = (data, index, type) => {
    console.log(data, "data");
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
    <div className="relative w-full h-full text-black">
      <dialog id="my_modal_5" className="modal">
        <div className="modal-box w-full max-w-4xl p-14 bg-white">
          {/* Header */}
          <ApplicationHeader />
          <div>
            {/* Part01 */}
            <div className="overflow-x-auto">
              <table className="table bg-white table-sm cursor-default">
                {/* Part01 head */}
                <thead className="bg-gray-400 border border-black text-black dark:text-white">
                  <tr className="text-lg font-bold text-black uppercase">
                    <th className="border border-black text-center">A</th>
                    <th colSpan={5} className="border border-black">
                      Address of the Applicant
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {Part01.map((item, index) => {
                    return (
                      <tr key={index + 1} className="bg-white text-center">
                        {/* col-01 */}
                        <th className="bg-white border border-black w-[10%] text-center">
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
            </div >
            {/* Part02 */}
            < div className="overflow-x-auto mt-10 text-black" >
              <table className="table bg-white table-sm">
                {/* Part02 head */}
                <thead className="bg-gray-400 border border-black text-black uppercase">
                  <tr className="text-lg font-bold text-black uppercase">
                    <th className="border border-black">B</th>
                    <th colSpan={5} className="border border-black">
                      Location of the Proposed Site
                    </th>
                  </tr >
                </thead >
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
              </table >
            </div >
          </div >
          {/* Part 03 */}
          < div >
            <table className="mt-7 w-full">
              <thead className="text-center">
                <tr className="bg-gray-400 border border-black text-lg text-black font-bold uppercase">
                  <td>C</td>
                  <td colSpan="5" className="border border-black p-1">
                    Details of Licensed Technical Person
                  </td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black p-2 font-bold">#</td>
                  <td className="border border-black p-2 font-bold">Name</td>
                  <td className="border border-black p-2 font-bold">Address</td>
                  <td className="border border-black p-2 font-bold">
                    License No.
                  </td>
                  <td className="border border-black p-2 font-bold">
                    Validity
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-black text-center">
                  <td className="border border-black p-2">01</td>
                  <td className="border border-black p-2">
                    {ltpDetailsData?.name}
                  </td>
                  <td className="border border-black p-2">
                    {ltpDetailsData?.address}
                  </td>
                  <td className="border border-black p-2">
                    {ltpDetailsData?.licenseNo}
                  </td>
                  <td className="border border-black p-2">
                    {ltpDetailsData?.validity}
                  </td>
                </tr>
              </tbody>
            </table>
          </div >
          {/* Part 04 */}
          < div className="overflow-x-auto mt-10" >
            <table className="table bg-white table-sm">
              {/* Part 04 head */}
              <thead className="bg-gray-400 text-black dark:text-white">
                <tr className="text-lg font-bold text-black uppercase">
                  <th className="border border-black w-[10%]">D</th>
                  <th colSpan={5} className="border border-black">
                    Details of the Proposed Construction
                  </th>
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
                      {plotDetails?.totalPlotDocument}
                    </td>
                    <td className="border-0 border-b border-black w-full block">
                      {plotDetails?.totalPlotGround}
                    </td>
                    <td className="border-0 w-full block">
                      {plotDetails?.proposedPlotAreaCal}
                    </td>
                  </td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">02</td>
                  <td className="border border-black">
                    Total Number of floors
                  </td>
                  <td className="border border-black text-center" colSpan={2}>
                    {calculateNoOfFloors(plotDetails?.floorDetails)}
                  </td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black"></td>
                  <td className="border border-black">Floor name</td>
                  <td className="border-r border-black">Built up area</td>
                  <td className="">Parking Area</td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">a</td>
                  <td className="border border-black">
                    Stilt Floor (sq. mtr.)
                  </td>
                  <td className="border border-black text-center">
                    {
                      extractFloorInfo(plotDetails?.floorDetails, "Stilt")
                        ?.builtUpArea
                    }
                  </td>
                  <td className="border border-black text-center">
                    {
                      extractFloorInfo(plotDetails?.floorDetails, "Stilt")
                        ?.parkingArea
                    }
                  </td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">b</td>
                  <td className="border border-black">
                    Ground floor (sq.mtr.)
                  </td>
                  <td className="border border-black text-center">
                    {" "}
                    {
                      extractFloorInfo(plotDetails?.floorDetails, "Ground")
                        ?.builtUpArea
                    }
                  </td>
                  <td className="border border-black text-center">
                    {" "}
                    {
                      extractFloorInfo(plotDetails?.floorDetails, "Ground")
                        ?.parkingArea
                    }
                  </td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">c</td>
                  <td className="border border-black">First floor (sq.mtr.)</td>
                  <td className="border border-black text-center">
                    {" "}
                    {
                      extractFloorInfo(plotDetails?.floorDetails, "First")
                        ?.builtUpArea
                    }
                  </td>
                  <td className="border border-black text-center">
                    {" "}
                    {
                      extractFloorInfo(plotDetails?.floorDetails, "First")
                        ?.parkingArea
                    }
                  </td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">d</td>
                  <td className="border border-black">
                    Second floor (sq.mtr.)
                  </td>
                  <td className="border border-black text-center">
                    {" "}
                    {
                      extractFloorInfo(plotDetails?.floorDetails, "Second")
                        ?.builtUpArea
                    }
                  </td>
                  <td className="border border-black text-center">
                    {" "}
                    {
                      extractFloorInfo(plotDetails?.floorDetails, "Second")
                        ?.parkingArea
                    }
                  </td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">03</td>
                  <td className="border border-black">
                    Total Built-up area and parking area (sq.mtr.)
                  </td>
                  <td className="border border-black text-center">
                    {plotDetails?.totalBuiltUpArea}
                  </td>
                  <td className="border border-black text-center">
                    {plotDetails?.totalParkingArea}
                  </td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">04</td>
                  <td className="border border-black">Numbers Of Units</td>
                  <td className="border-0 text-center" colSpan={2}>
                    {plotDetails?.noOfUnits}
                  </td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">05</td>
                  <td className="border border-black">Vacant site area</td>
                  <td className="border-0 text-center" colSpan={2}>
                    {plotDetails?.vacantLand}
                  </td>
                </tr>
              </tbody>
            </table>
          </div >
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
              <thead className="bg-gray-400">
                <tr className="text-lg font-bold text-black uppercase">
                  <th colSpan={5} className="border border-black p-1">
                    Signature
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-black">
                  <td
                    className="border border-black p-1"
                    style={{ width: "10%" }}
                  >
                    01
                  </td>
                  <td
                    className="border border-black p-1"
                    style={{ width: "40%" }}
                  >
                    Signature of owner
                  </td>
                  <td
                    className="border border-black p-1"
                    style={{ width: "50%" }}
                  ></td>
                </tr>
                <tr className="border border-black">
                  <td
                    className="border border-black p-1"
                    style={{ width: "10%" }}
                  >
                    02
                  </td>
                  <td
                    className="border border-black p-1"
                    style={{ width: "40%" }}
                  >
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
          <form method="dialog" className="absolute top-16 right-0 z-50">
            <button
              onClick={() => setOpenApplication(false)}
            // className={`text-red-600`}
            >
              <RxCross2 className="text-3xl" />
            </button>
          </form>
        </div >
      </dialog >
    </div >
  );
}

export default Application;
