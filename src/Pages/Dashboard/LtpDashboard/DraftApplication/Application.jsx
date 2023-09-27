import React, { useContext, useEffect, useState } from "react";
import ApplicationHeader from "./ApplicationHeader";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import Loading from "../../../Shared/Loading";

function Application({ setOpenApplication }) {
  const { getApplicationData } = useContext(AuthContext);
  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));
  const [generalInformation, setGeneralInformation] = useState({});
  const [plotDetails, setPlotDetails] = useState({});
  const [ltpDetailsData, setLtpDetailsData] = useState({});
  const [applicantDetailsData, setApplicantDetailsData] = useState({});

  useEffect(() => {
    // Opening the modal when the component mounts
    const modal = document.getElementById("my_modal_5");
    if (modal) {
      modal.showModal();
    }
  }, []);

  useEffect(() => {
    const gettingData = async () => {
      const applicationData = await getApplicationData(applicationNo);
      setGeneralInformation(applicationData?.buildingInfo?.generalInformation)
      setPlotDetails(applicationData?.buildingInfo?.plotDetails)
      setLtpDetailsData(applicationData?.applicantInfo?.ltpDetails)
      setApplicantDetailsData(applicationData?.applicantInfo?.applicantDetails[0])
    };
    gettingData();
  }, []);


  // General Information
  const { applicationType, bpsApprovedNoServer, caseType, district, gramaPanchayat, iplpNo, lpNo, lrsNo, mandal, natureOfPermission, natureOfTheSite, plotNo, plotNo2, previewsApprovedFileNo, surveyNo, village } = generalInformation;
  // console.log({generalInformation})
  // Plot Details
  const { proposedPlotAreaCal, roadWideningAreaCal, netPlotAreaCal, buildingExcludeStilt, compoundingWallProposed, existingRoad, existingRoadMts, frontSetback, marketValueSqym, natureOfRoad, proposedRoadMts, rareSetback, side1Setback, side2Setback, siteRegistered, statusOfRoad, totalBuiltUpArea, totalParkingArea, totalPlotDocument, totalPlotGround } = plotDetails;

  // LTP Details
  const { type, name, address: ltpAddress, email: ltpEmail, licenseNo, phoneNo: ltpPhone, validity } = ltpDetailsData;
  // Applicant Details
  const { name: ApplicantName, identity, phone: applicantPhone, email: AppEmail, adharNo, pinCode, address: applicantAddress } = applicantDetailsData;


  console.log("LtPName", name)
  // ====Applicant Info
  const Part01 = [
    { "NAME": "John Doe" },
    { "DOOR No. / FLAT No.": "123" },
    { "ROAD/STREET": "Main Street" },
    [{ "VILLAGE": "Village 1" }, { "MANDAL": "Mandal 1" }],
    { "CITY/TOWN": ["PIN", "12345"] },
    { "DISTRICT": "District 1" },
    { "E-MAIL": "john@example.com" },
    [{ "MOBILE": "1234567890" }, { "ALTERNATE": "9876543210" }]
  ];

  let Part01Keys = [];
  let Part01Values = [];

  // Part01.map((item, i) => {
  //   // const values = Object.values(Part01[i])
  //   // Part01Values.push(values);
  //   if (typeof item == "object") {
  //     const keys = Object.keys(Part01[i]);
  //     if (keys[0] == 0) {
  //       return Part01Keys.push(item)
  //     } else {
  //       return Part01Keys.push(keys);
  //     }
  //   }
  // })
  // const Part01KeysArray = Part01Keys.flat();
  // const Part01ValuesArray = Part01Values.flat();
  // console.log({ Part01KeysArray, Part01ValuesArray });

  // // LTP Info
  const Part02 = [
    { "PLOT NOs": "" },
    { "SANCTIONED LAYOUT NO. / LRS NO": "" },
    [{ "SURVEY NO.": "" }, { "VILLAGE": "" }],
    { "PREMISES / DOOR No.": "" },
    { "ROAD/ STREET": "" },
    [{ "WARD NO.": "" }, { "BLOCK No": "" }],
    { "LOCALITY": "" },
    [{ "CIRCLE/DIVISION": "" }, { "DIVISION": "" }],
    [{ "CITY/TOWN": "" }, { "DISTRICT": "" }],
  ];
  // let Part02Keys = [];
  // let Part02Values = [];

  // Part02.map((item, i) => {
  //   const values = Object.values(Part02[i])
  //   Part02Values.push(values);

  //   if (typeof item == "object") {
  //     const keys = Object.keys(Part02[i]);
  //     if (keys[0] == 0) {
  //       return Part02Keys.push(item)
  //     } else {
  //       return Part02Keys.push(keys);
  //     }
  //   }
  // })
  // const Part02KeysArray = Part02Keys.flat();
  // const Part02ValuesArray = Part02Values.flat();
  // console.log({ Part02KeysArray, Part02ValuesArray });

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
        "Hello, This is Tanjimul Islam Sabbir",
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
    { address: "123 Main St" },
    { address: "Apt 456" },
    { address: "789 Elm St" },
    { address: "Unit 101" },
    { address: "456 Oak Ave" },
    { address: "Suite 303" },
  ];
  const LicenceNo = [
    { licenceNo: "AB123456" },
    { licenceNo: "CD789012" },
    { licenceNo: "EF345678" },
    { licenceNo: "GH901234" },
    { licenceNo: "IJ567890" },
    { licenceNo: "KL123456" },
  ];


  const part01IndexArray = [3, 4, 7];
  const part02SubArray = [2, 5, 7, 8];
  const part03SubArray = [0, 1, 4];


  // Part01
  const renderCol = (data, index, type) => {
    const isString = typeof data === "object";
    const keys = type === "keys";
 
    const isArray = Array.isArray(data)
    if (isArray) {
      return (
        <td className="bg-white border border-black w-36 p-0">
          <div className="flex">
            {data.map((e, i) => (
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
      console.log(isString, data, "isString,data");
      return (
        <td className="bg-white border border-black w-36 p-0">
          <p className="h-12 p-2 flex items-center">{(keys ? Object.keys(data) : Object.values(data))}</p>
        </td>
      );
    }
    ;
  };

  // Part03
  const ColDataShow03 = (data, index) => {
    let colData;
    if (index === 0) {
      colData = row1;
    } else if (index === 1) {
      colData = row2;
    } else if (index == 4) {
      colData = row5;
    } else {
      colData = [];
    }
    return (
      <td className="w-full bg-white border border-black p-0">
        {part03SubArray.includes(index) ? (
          <p className="flex ">
            {colData.map((d, i) => (
              <p
                className={`w-full border-black py-4 border-l ${i == 0 && "border-l-0"
                  }`}
              >
                <p className="px-2">{Object.keys(colData[i])[0]}</p>
                {/* {Object.values(colData[i])[0]} */}
                <p
                  className={`${index !== 4
                    ? "border-t "
                    : "font-bold inline-block border-b-2 border-dotted border-black underline-offset-4 mt-2 ml-2"
                    } border-black px-2 pt-2`}
                >
                  {i + 1}
                </p>
              </p>
            ))}
          </p>
        ) : (
          <p className="py-4 px-2"></p>
        )}
      </td>
    );
  };
  // Part04
  const ColDataShow04 = (data, numb) => {
    return (
      <>
        {" "}
        {data.map((d, i) => {
          return (
            <>
              <p
                className={`${i == 0 ? "border-t-0" : "border-t"
                  } border-black h-20 py-4 px-2 ${numb == 2 ? "block" : "hidden"
                  }`}
              >
                <p
                  className={
                    "font-semibold inline-block border-b-2 border-dotted border-black underline-offset-4 mb-2"
                  }
                >
                  Tanjimul Islam Sabbir{Object.values(data[i])[0]}
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
      </>
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
              <table className="table bg-white table-sm">
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
                  <tr className="bg-white p-0">
                    <td>
                      {Part01.map((data, index) => index + 1)}
                    </td>
                    {/* col-02 */}
                    {/* {renderCol(Part02KeysArray)} */}

                    {/* col-03*/}
                    <td className="bg-white border border-black p-0">
                      {/* {renderCol(Part02ValuesArray)} */}
                    </td>
                  </tr>
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
                    console.log(item, "Item")
                    return (
                      <tr key={item} className="bg-white">
                        {/* col-01 */}
                        <th className="bg-white border border-black w-14">
                          {index + 1}
                        </th>
                        {/* col-02 */}

                        {renderCol(item, index, "keys")}

                        {/* col-03 */}
                        {renderCol(item, index, "values")}
                      </tr>
                    )
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
                  <th className="bg-blue-200 border-r border-t border-black fontbold text-black"></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {Part03.map((data, index) => (
                  <>
                    <tr key={index} className="bg-white">
                      <th className="bg-white border border-black w-14">
                        {index + 1}
                      </th>
                      <td className="bg-white border border-black w-32 p-4">
                        {data}
                      </td>
                      {/* <td className='bg-white border border-black'></td> */}
                      {ColDataShow03(data, index)}
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          {/* Part04 */}
          <div className="overflow-x-auto mt-10">
            <table className="table bg-white table-sm">
              {/*Part04 head */}
              <thead>
                <tr>
                  <th className="bg-blue-200 border border-black fontbold text-black">
                    D
                  </th>

                  <th className="bg-blue-200 border-l border-t border-black fontbold text-black">
                    DETAILS OF THE LICENSED TECHNICAL PERSONNEL:
                  </th>
                  <th className="bg-blue-200 border-t border-black fontbold text-black"></th>
                  <th className="bg-blue-200 border-r border-t border-black fontbold text-black"></th>
                </tr>
                <tr>
                  <th className="bg-white border border-black fontbold text-black">
                    SL.NO
                  </th>
                  <th className="bg-white border border-black fontbold text-black">
                    NAME
                  </th>
                  <th className="bg-white border border-black fontbold text-black">
                    ADDRESS
                  </th>
                  <th className="bg-white border border-black fontbold text-black">
                    LICENSE NO.
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <td className="bg-white border border-black p-0 w-10 font-bold">
                  {ColDataShow04([1, 2, 3, 4, 5, 6], 1)}
                </td>
                <td className="bg-white border border-black p-0">
                  {ColDataShow04(NameCol, 2)}
                </td>
                <td className="bg-white border border-black p-0">
                  {ColDataShow04(AddressCol, 3)}
                </td>
                <td className="bg-white border border-black p-0">
                  {ColDataShow04(LicenceNo, 4)}
                </td>
              </tbody>
            </table>
          </div>
          <form method="dialog">
            <button
              onClick={() => setOpenApplication(false)}
              className="btn mt-5 text-right"
            >
              Close
            </button>
          </form>
        </div>
      </dialog >
    </div >
  );
}

export default Application;
