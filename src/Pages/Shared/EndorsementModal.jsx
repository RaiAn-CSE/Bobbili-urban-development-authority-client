import React, { useContext, useEffect, useState } from "react";
import customScroll from "../../Style/Scrollbar.module.css";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const EndorsementModal = () => {
  const { getApplicationData, ownerNamePattern } = useContext(AuthContext);

  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));
  const cameFrom = JSON.parse(localStorage.getItem("page"));

  const [gramaPanchayat, setGramaPanchayat] = useState("");
  const [applicationNumber, setApplicationNumber] = useState("");
  const [surveyNo, setSurveyNo] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [dataFromDb, setDataFromDb] = useState({});

  useEffect(() => {
    const getData = async () => {
      const applicationData = await getApplicationData(applicationNo, cameFrom);
      // console.log(applicationData, "All info ApplicationData");
      setDataFromDb(applicationData);
      setGramaPanchayat(
        applicationData?.buildingInfo?.generalInformation?.gramaPanchayat
      );
      setApplicationNumber(applicationData?.applicationNo);
      setSurveyNo(applicationData?.buildingInfo?.generalInformation?.surveyNo);
      setOwnerName(applicationData?.applicantInfo?.applicantDetails[0]?.name);
    };
    getData();
  }, []);

  console.log(dataFromDb, "GDD");
  const date = new Date();
  const currentDate = date
    .toISOString()
    .split("T")[0]
    .split("-")
    .reverse()
    .join("-");

  return (
    <div className="dark:bg-white px-10">
      <dialog id="my_modal_2" className="modal">
        {/* divide-y-2 divide-gray-200 */}
        <div
          className={`${customScroll.customScrolling} rounded-lg modal-box py-10 px-10 bg-white text-gray-900 mb-10 w-11/12 max-w-5xl divide-y-2 divide-gray-200 relative`}
        >
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm text-white hover:bg-violet-600 btn-circle btn-ghost absolute top-2 right-2 bg-violet-500">
              ✕
            </button>
            <h3 className="font-bold text-lg text-center">ENDORSEMENT!</h3>
          </form>

          <div className="py-5 pt-2">
            <div className="flex justify-between">
              <h2>Letter No.:1112/4232/21</h2>
              <h2>Date:{currentDate}</h2>
            </div>
            <div className="flex flex-col py-4">
              <p className="text-start">
                Sub: - BUILDINGS -{" "}
                <span className="underline">{gramaPanchayat}</span> Grama
                panchayat - required compliances - Endorsement issued -
                Regarding
              </p>
              <p>
                Ref: - Application of Sri/Smt/Kum{" "}
                <span className="underline">
                  {ownerNamePattern(
                    dataFromDb?.applicantInfo?.applicantDetails
                  ) ?? "N/A"}
                </span>
              </p>
              <p className="text-start">
                With reference to your application for building permission vide
                B.A.No <span className="underline">{applicationNumber}</span>{" "}
                for construction of Residential/ Individual Residential Building
                building in Survey .No.{" "}
                <span className="underline">{surveyNo}</span>
              </p>
              <p className="font-semibold">
                Objections found in Primary Documents:-
              </p>
            </div>
            <div
              className={`overflow-x-auto overflow-y-auto ${customScroll.customScrolling}`}
            >
              <p className="font-bold">
                You are requested to comply the shortfalls raised in documents:
              </p>
              <table className="w-full border text-center text-sm font-light border-neutral-500">
                <thead className="border-b font-medium border-neutral-500 ">
                  <tr>
                    <th
                      scope="col"
                      className="border-r px-6 py-4 border-neutral-500  bg-gray-200"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="border-r px-6 py-4 border-neutral-500  bg-gray-200"
                    >
                      Name of the Document
                    </th>
                    <th
                      scope="col"
                      className="border-r px-6 py-4 border-neutral-500  bg-gray-200"
                    >
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Ground Position  */}
                  <tr className="border-b border-neutral-500">
                    <td
                      rowSpan=""
                      className="whitespace-nowrap border-r px-6 py-4 border-neutral-500"
                    >
                      1
                    </td>
                    <td
                      colSpan=""
                      className={`whitespace-nowrap border-r px-6 py-4 border-neutral-500 text-base`}
                    >
                      Latest Encumbrance Certificate issued by Registration
                      Department.
                    </td>
                    <td
                      colSpan=""
                      className={`whitespace-nowrap border-r px-6 py-4 border-neutral-500 text-base`}
                    >
                      ,
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-500">
                    <td
                      rowSpan=""
                      className="whitespace-nowrap border-r px-6 py-4 border-neutral-500"
                    >
                      2
                    </td>
                    <td
                      colSpan=""
                      className={`whitespace-nowrap border-r px-6 py-4 border-neutral-500 text-base`}
                    >
                      Self-Attested copies of Ownership
                      Documents-lease-deed/sale deed etc.giving the physical
                      description of the plot/property.giving the physical
                      description of the plot/property.
                    </td>
                    <td
                      colSpan=""
                      className={`whitespace-nowrap border-r px-6 py-4 border-neutral-500 text-base`}
                    >
                      ,
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-10">
              <p className="font-bold">
                Drawing Plan Remarks and Recommendation: Shortfall
              </p>
              <table className="min-w-full border text-center text-sm font-light border-neutral-500">
                <td
                  scope="col"
                  className="border-r px-6 py-10 border-neutral-500"
                ></td>
              </table>
            </div>

            <div className="mt-10">
              <p className="font-bold">
                Documents Remarks and Recommendation: Shortfall
              </p>
              <table className="min-w-full border text-center text-sm font-light border-neutral-500">
                <td
                  scope="col"
                  className="border-r px-6 py-10 border-neutral-500"
                ></td>
              </table>
            </div>

            <div className="mt-10">
              <p className="font-bold">
                Inspection Remarks and Recommendation : Shortfall
              </p>
              <table className="min-w-full border text-center text-sm font-light border-neutral-500">
                <td
                  scope="col"
                  className="border-r px-6 py-10 border-neutral-500"
                ></td>
              </table>
            </div>

            <div className="mt-14 flex flex-col items-end">
              <p>Panchayat Secretary</p>
              <p>___________ Grama Panchayat</p>
              <p>__________Mandal</p>
              <p>______________ District</p>
            </div>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default EndorsementModal;
