import React, { useEffect } from "react";
import ApplicationHeader from "./ApplicationHeader";

function Application({ setOpenApplication }) {
  const Part01 = [
    "NAME",
    "DOOR No. / FLAT No.",
    "ROAD/STREET",
    ["VILLAGE", "MANDAL"],
    "CITY/TOWN",
    "DISTRICT",
    "E-MAIL",
    ["MOBILE", "ALTERNATE"],
  ];

  const Part02 = [
    "PLOT NOs",
    "SANCTIONED LAYOUT NO. / LRS NO",
    ["SURVEY NO.", "VILLAGE"],
    "PREMISES / DOOR No.",
    "ROAD/ STREET",
    ["WARD NO.", "BLOCK No"],
    "LOCALITY",
    ["CIRCLE/DIVISION", "DIVISION"],
    ["CITY/TOWN", "DISTRICT"],
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
    { "(c) ROAD WIDENING AREA": "" },
    { "(d)   NET AREA": "" },
  ];

  const row2 = [
    { CELLAR: "" },
    { STILT: "" },
    { GROUND: "" },
    { UPPER: "" },
    { FLOOR: "" },
    { TOTAL: "" },
  ];

  // index4
  const row5 = [
    {
      "INDIVIDUAL RESIDENTIAL/GROUP HOUSING/ COMMERCIAL/INSTITUTIONAL/ROW HOUSING/OTHERS (SPECIFY)":
        "Hello, This is Tanjimul Islam Sabbir",
    },
  ];

  // Part-4
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

  // Part01
  // Name
  const applicantName = ["Tanjimul Islam Sabbir"];
  // const PhoneTD = ["d", "d"];
  const flatNo = ["125"];
  const roadStreet = ["1250/road, Randhuno-3"];
  const applicantDistrict = ["Rajshahi"];
  const applicantEmail = ["tanjimulislamsabbir@hotmail.com"];
  const PhoneTD = ["01780242695", "01538280207"];
  const CityTown = ["PIN", "3432"];
  // const CityTown=[{PIN:''}];
  const Village = ["Binodpur", "Kazla"];
  // const Village=[{Village:"",Mondal:""}]
  // Part02
  const part01IndexArray = [3, 4, 7];
  const part02SubArray = [2, 5, 7, 8];
  const part03SubArray = [0, 1, 4];

  useEffect(() => {
    // Opening the modal when the component mounts
    const modal = document.getElementById("my_modal_5");
    if (modal) {
      modal.showModal();
    }
  }, []);

  // Part01
  function renderPart01Col2(data, index) {
    if (index === 3 || index === 7) {
      return (
        <td key={index} className="bg-white border border-black w-36 p-0">
          <div className="flex">
            {data.map((e, i) => (
              <p
                key={i}
                className={`flex items-center p-2 ${(index === 3 || index === 7) && "border-l"
                  } border-black h-12 ${i === 0 && "border-l-0"}`}
              >
                {e}
              </p>
            ))}
          </div>
        </td>
      );
    } else {
      return (
        <td key={index} className="bg-white border border-black w-36 p-0">
          <p className="h-12 p-2 flex items-center">{data}</p>
        </td>
      );
    }
  }

  const ColDataShow01 = (data, index) => {
    let subColData;

    if (index === 0) {
      subColData = applicantName;
    } else if (index === 1) {
      subColData = flatNo;
    } else if (index === 2) {
      subColData = roadStreet;
    } else if (index === 3) {
      subColData = Village;
    } else if (index === 4) {
      subColData = CityTown;
    } else if (index === 5) {
      subColData = applicantDistrict;
    } else if (index === 6) {
      subColData = applicantEmail;
    } else if (index === 7) {
      subColData = PhoneTD;
    } else {
      subColData = [];
    }

    return (
      <p>
        <p>
          <p className="flex">
            {subColData.map((d, i) => {
              return (
                <p
                  className={`h-12 flex flex-col justify-center p-4 ${i > 0 && "border-l border-black"
                    } ${i == 0 && "w-1/2 border-l-0"}`}
                >
                  {d}
                </p>
              );
            })}
          </p>
        </p>
      </p>
    );
  };

  // Part02
  const ColDataShow02 = (data, index) => {
    return (
      <td className="bg-white border border-black p-0">
        {part02SubArray.includes(index) ? (
          <p className="flex ">
            {data.map((d, i) => (
              <p
                className={`border-black py-4 border-l px-2 ${i == 0 && "w-1/2 border-l-0"
                  }`}
              >
                {i + 1}
              </p>
            ))}
          </p>
        ) : (
          <p className="py-4 px-2">{index+1}</p>
        )}
      </td>
    );
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
                  {/* row 1 */}
                  {Part01.map((data, index) => (
                    <>
                      <tr key={index} className="bg-white p-0">
                        <th className="bg-white border border-black w-14 px-2">
                          {index + 1}
                        </th>

                        {/* col-02 */}
                        {renderPart01Col2(data, index)}

                        {/* col-03*/}
                        <td className="bg-white border border-black p-0">
                          {ColDataShow01(data, index)}
                        </td>
                      </tr>
                    </>
                  ))}
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
                  {Part02.map((data, index) => (
                    <>
                      <tr key={index} className="bg-white">
                        {/* col-01 */}
                        <th className="bg-white border border-black w-14">
                          {index + 1}
                        </th>
                        {/* col-02 */}
                        <td className="bg-white border border-black w-64 p-0">
                          {part02SubArray.includes(index) ? (
                            <p className="flex ">
                              {data.map((d, i) => (
                                <p
                                  className={`border-black py-4 px-2 ${i == 0 && "w-1/2 border-r"
                                    }`}
                                >
                                  {d}
                                </p>
                              ))}
                            </p>
                          ) : (
                            <p className="py-4 px-2">{data}</p>
                          )}
                        </td>
                        {/* col-03 */}
                        {ColDataShow02(data, index, part02SubArray)}
                      </tr>
                    </>
                  ))}
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
      </dialog>
    </div>
  );
}

export default Application;
