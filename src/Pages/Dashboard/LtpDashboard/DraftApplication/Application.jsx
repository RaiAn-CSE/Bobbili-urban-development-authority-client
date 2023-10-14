import React, { useContext, useEffect, useState } from "react";
import ApplicationHeader from "./ApplicationHeader";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import { RxCross1 } from "react-icons/rx"

function Application({ setOpenApplication }) {
  const { getApplicationData } = useContext(AuthContext);
  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));
  const [generalInformation, setGeneralInformation] = useState({});
  const [plotDetails, setPlotDetails] = useState({});
  const [ltpDetailsData, setLtpDetailsData] = useState({});
  const [applicantDetailsData, setApplicantDetailsData] = useState({});

  // useEffect(() => {
  //   // Opening the modal when the component mounts
  //   const modal = document.getElementById("my_modal_5");
  //   if (modal) {
  //     modal.showModal();
  //   }
  // }, []);

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
  } = generalInformation;
  // console.log({generalInformation})
  // Plot Details
  const {
    proposedPlotAreaCal,
    roadWideningAreaCal,
    netPlotAreaCal,
  } = plotDetails;

  // LTP Details
  const {
    type,
    name,
    address: ltpAddress,
    email: ltpEmail,
    licenseNo,
    phoneNo: ltpPhone,
    validity,
  } = ltpDetailsData;
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

  console.log("LtPName", name);
  // ====Applicant Info
  const Part01 = [
    { "Name(in full)": ApplicantName },
    { "Door No/Flat No.": adharNo },
    { "Road/Street": roadWideningAreaCal },
    { "Village": village },
    { "Mandal": mandal },
    { "District": district },
    { "PIN Code": pinCode },
    { "Phone No": applicantPhone },
    { "E-mail": AppEmail }
  ];

  // //
  const Part02 = [
    { "Survey No": surveyNo },
    { "L.P Mo./LRS No.": lrsNo },
    { "Plot No": plotNo },
    { "Village": village },
    { "Grama Panchayat": gramaPanchayat },
    { "Mandal": gramaPanchayat },
    { "District": district },
  ];


  // Part03
  const Part03 = [
    "SITE AREA (IN SQ.M)",
    "NO. OF FLOORS",
    "FLOOR AREA (IN SQ.M)",
    "PARKING FLOOR AREA (IN SQ.M)",
    "USE OF THE BUILDING",
  ];
  // index0 for part03
  const row1 = [
    { "(a) AS PER DOCUMENTS": "" },
    { "(b) AS PER SUBMITTED PLAN": "" },
    { "(c) ROAD WIDENING AREA": roadWideningAreaCal },
    { "(d)   NET AREA": netPlotAreaCal },
  ];

  const row2 = [
    { CELLAR: "" },
    { STILT: "" },
    { GROUND: "" },
    { UPPER: "" },
    { FLOOR: "" },
    { TOTAL: "" },
  ];

  // Part-4
  // index4
  const row5 = [
    {
      "INDIVIDUAL RESIDENTIAL/GROUP HOUSING/ COMMERCIAL/INSTITUTIONAL/ROW HOUSING/OTHERS (SPECIFY)":
        "Hello",
    },
  ];

  const NameCol = [
    { "BUILDER / DEVELOPER/ CONSTRUCTION FIRM": "" },
    { ARCHITECT: "" },
    { ENGINEER: "" },
    { "STRUCTURAL ENGINEER": "" },
    { "SUPERVISOR/SURVEYOR": "" },
    { "TOWN PLANNER": "" },
  ];
  const AddressCol = [
    { address: village },
    { address: village },
    { address: village },
    { address: village },
    { address: village },
    { address: village },
  ];
  const LicenceNo = [
    { licenceNo: adharNo },
    { licenceNo: adharNo },
    { licenceNo: adharNo },
    { licenceNo: adharNo },
    { licenceNo: adharNo },
    { licenceNo: adharNo },
  ];

  const part03SubArray = [0, 1, 4];

  // Part01 && Part02 Keys and Values
  const renderCol = (data, index, type) => {
    const keys = type === "keys";
    const isArray = Array.isArray(data);
    if (isArray) {
      return (
        <td className={`bg-white border border-black ${type == "keys" && "w-1/3"} p-0`}>
          <div className="flex">
            {data?.map((e, i) => (
              <p
                key={i}
                className={`flex items-center p-2 border-l border-black h-12 ${i === 0 && "w-1/2 border-l-0"
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
        <td className={`bg-white border border-black ${type == "keys" && "w-1/3"} p-0`}>
          <p className="h-12 p-2 flex items-center">
            {keys ? Object.keys(data) : Object.values(data)}
          </p>
        </td>
      );
    }
  };



  // Part04
  const ColDataShow04 = (data, numb) => {
    return (
      <div key={numb}>
        {" "}
        {data.map((d, i) => {
          return (
            <>
              <p
                key={i}
                className={`${i == 0 ? "border-t-0" : "border-t"
                  } border-black h-20 py-4 px-2 ${numb == 2 ? "block" : "hidden"
                  }`}
              >
                <p
                  className={
                    "font-semibold inline-block border-b-2 border-dotted border-black underline-offset-4 mb-2"
                  }
                >
                  Signature
                </p>
                <p>{Object.keys(data[i])[0]}</p>
              </p>
              <p
                className={`border-black px-2 h-20 flex items-center ${i == 0 ? "border-t-0" : "border-t"
                  } ${numb == 2 ? "hidden" : "block"}`}
              >
                {numb == 1 ? i + 1 : Object.values(data[i])[0]}
              </p>
            </>
          );
        })}
      </div>
    );
  };
  return (
    <div className="w-full h-full text-black">
      <dialog id="my_modal_5" className="modal">
        <div className="modal-box w-full max-w-4xl p-14">
          {/* Header */}
          <ApplicationHeader />
          <div>
            {/* Part01 */}
            <div className="overflow-x-auto">
              <table className="table bg-white table-sm cursor-default">
                {/*Part01 head */}
                <thead>
                  <tr>
                    <th className="bg-blue-200 border border-black fontbold text-black">
                      A
                    </th>
                    <th className="bg-blue-200 border-l border-t border-black fontbold text-black">
                      ADDRESS OF THE APPLICANT
                    </th>
                    <th className="bg-blue-200 border-r border-t border-black fontbold text-black"></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {Part01.map((item, index) => {
                    return (
                      <tr key={index + 1} className="bg-white">
                        {/* col-01 */}
                        <th className="bg-white border border-black w-6">
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
                {/*Part02 head */}
                <thead>
                  <tr>
                    <th className="bg-blue-200 border border-black fontbold text-black">
                      B
                    </th>
                    <th className="bg-blue-200 border-l border-t border-black text-black">
                      LOCATION OF THE PROPOSED SITE
                    </th>
                    <th className="bg-blue-200 border-r border-t border-black"></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {Part02.map((item, index) => {
                    return (
                      <tr key={index} className="bg-white">
                        {/* col-01 */}
                        <th className="bg-white border border-black w-6">
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
              {/*Part03 head */}
              <thead>
                <tr>
                  <th className="bg-blue-200 border border-black fontbold text-black">
                    C
                  </th>
                  <th className="bg-blue-200 border-l border-t border-black fontbold text-black">
                    DETAILS OF THE PROPOSED CONSTRUCTION
                  </th>
                  <th className="bg-blue-200 border-t border-black fontbold text-black">
                  </th>
                  <th className="bg-blue-200 border-y border-r border-black fontbold text-black">
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="border border-black">
                  <td className="border border-black w-[5%]">1</td>
                  <td className="border border-black w-[30%]">Site Area (Sq.mtr.)</td>
                  <td className="p-0 border-t border-black w-[30%]">
                    <tr className=" border-black">
                      <td className="border-r border-black">As per Document</td>
                      <td className="border-r border-black">a</td>
                    </tr>
                    <tr className=" border-black">
                      <td className="border-r border-black"> As on Ground</td>
                      <td className="border-r border-black">b</td>
                    </tr>
                    <tr className=" border-black">
                      <td className="border-r border-black">As on Proposed</td>
                      <td className="border-r border-black">c</td>
                    </tr>
                  </td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">02</td>
                  <td className="border border-black">Total Number of floors</td>
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
                  <td className="border border-black">Ground floor (sq.mtr.)</td>
                  <td className="border border-black"></td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">c</td>
                  <td className="border border-black">First floor (sq.mtr.)</td>
                  <td className="border border-black"></td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">d</td>
                  <td className="border border-black">Second floor (sq.mtr.)</td>
                  <td className="border border-black"></td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">03</td>
                  <td className="border border-black">Total Built-up area and parking area (sq.mtr.)</td>
                  <td className="border border-black"></td>
                  <td className="border border-black"></td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">04</td>
                  <td className="border border-black">Numbers Of Units</td>
                  <td></td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">05</td>
                  <td className="border border-black">Vacant site area</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
         <div className="mt-7">
         <p className="font-bold">Primary</p>
          <p>I hereby declare that I am the owner/ PAH in possession of the plot on which the work is proposed and that the statement made in this form is true and correct to the best of my knowledge.
          </p>
         </div>
          {/* Part04 */}
          <div className="overflow-x-auto mt-10">
            <table className="table bg-white table-sm">
              {/*Part04 head */}
              <thead>

              </thead>
              <tbody>
                <tr></tr>
                <tr></tr>

              </tbody>
            </table>
          </div>
          <form method="dialog" className="mt-5">
            <button
              onClick={() => setOpenApplication(false)}
              className="btn text-center"
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
