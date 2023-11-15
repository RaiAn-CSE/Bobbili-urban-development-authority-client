import React, { useContext, useEffect, useState } from "react";
import customScroll from "../../Style/Scrollbar.module.css";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { RxCross2 } from "react-icons/rx";

const EndorsementModal = ({ modalEndorsement }) => {
  const { openEndorsement, setOpenEndorsement } = modalEndorsement;
  const { getApplicationData, ownerNamePattern } = useContext(AuthContext);

  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));
  const cameFrom = JSON.parse(localStorage.getItem("page"));

  const [gramaPanchayat, setGramaPanchayat] = useState("");
  const [applicationNumber, setApplicationNumber] = useState("");
  const [surveyNo, setSurveyNo] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [dataFromDb, setDataFromDb] = useState({});

  useEffect(() => {
    const modal = document.getElementById("endorsementModal");
    if (openEndorsement) {
      modal.showModal();
    }
  }, []);

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
    <div className="dark:bg-white">
      <dialog id="endorsementModal" className="modal">
        {/* divide-y-2 divide-gray-200 */}
        <div
          className={`${customScroll.customScrolling} rounded-lg modal-box py-10 px-12 bg-white text-gray-900 w-full max-w-4xl relative`}
        >
          <form method="dialog" className="absolute top-6 right-6 z-50">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={() => setOpenEndorsement(false)}
              className={`outline outline-red-500 outline-offset-4 text-red-500 rounded-full hover:bg-red-500 hover:text-white hover:outline-offset-0 p-[1px] transition-all duration-1000`}
            >
              <RxCross2 className="text-2xl" />
            </button>
          </form>

          <div className="pt-4">
            <h3 className="font-bold text-2xl text-center mb-8">
              ENDORSEMENT!
            </h3>
            <div className="flex justify-between font-semibold text-lg">
              <h4>Letter No: 1112/4232/21</h4>
              <h4>Date: {currentDate}</h4>
            </div>
            <div className="flex flex-col pt-3 text-base">
              <p className="text-start">
                <span className="font-bold">Sub:</span> BUILDINGS -{" "}
                <span className="underline">{gramaPanchayat}</span>{" "}
                <span className="font-bold">Grama panchayat</span> - required
                compliances - Endorsement issued - Regarding.
              </p>
              <p>
                <span className="font-bold">Ref:</span> Application of
                Sri/Smt/Kum{" "}
                <span className="underline">
                  {ownerNamePattern(
                    dataFromDb?.applicantInfo?.applicantDetails
                  ) ?? "N/A"}
                </span>
                .
              </p>
              <p className="indent-10 mt-3">
                With reference to your application for building permission vide
                B.A.No <span className="underline">{applicationNumber}</span>{" "}
                for construction of{" "}
                <span className="font-bold me-1">
                  Residential/ Individual Residential Building
                </span>
                building in Survey .No.{" "}
                <span className="underline">{surveyNo}</span>.
              </p>
              <p className="font-semibold text-center text-xl mt-8 mb-3">
                Objections Found in Primary Document
              </p>
            </div>
            <div className="mt-1">
              <p className="font-bold text-base">
                You are requested to comply the shortfalls raised in documents:
              </p>
              <table className="border text-sm font-light border-neutral-500">
                <thead className="border-b font-medium border-neutral-500">
                  <tr className="text-base">
                    <th
                      scope="col"
                      className="border-r px-6 py-4 border-neutral-500 bg-gray-200"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="border-r px-6 py-4 border-neutral-500 bg-gray-200"
                    >
                      Name of the Document
                    </th>
                    <th
                      scope="col"
                      className="border-r px-6 py-4 border-neutral-500 bg-gray-200"
                    >
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[15px]">
                  {/* Ground Position  */}
                  <tr className="border-b border-neutral-500">
                    <td
                      rowSpan=""
                      className="break-words border-r px-6 py-4 border-neutral-500"
                    >
                      1
                    </td>
                    <td
                      className={`break-words border-r px-6 py-4 border-neutral-500`}
                    >
                      Latest Encumbrance Certificate issued by Registration
                      Department.
                    </td>
                    <td
                      className={`break-words border-r px-6 py-4 border-neutral-500`}
                    >
                      Self-Attested copies of Ownership Self-Attested copies of
                      Ownership.
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-500">
                    <td
                      rowSpan=""
                      className="break-words border-r px-6 py-4 border-neutral-500"
                    >
                      2
                    </td>
                    <td
                      className={`break-words border-r px-6 py-4 border-neutral-500`}
                    >
                      Self-Attested copies of Ownership
                      Documents-lease-deed/sale deed etc.giving the physical
                      description of the plot/property.
                    </td>
                    <td
                      className={`break-words border-r px-6 py-4 border-neutral-500`}
                    >
                      Self-Attested copies of Ownership.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="my-6">
              <p className="font-bold">
                Drawing Plan Remarks and Recommendation: Shortfall
              </p>
              <table className="min-w-full border text-center text-sm font-light border-neutral-500">
                <td
                  scope="col"
                  className="border-r px-6 py-10 border-neutral-500"
                >
                  {dataFromDb?.psDrawingPageObservation?.message}
                </td>
              </table>
            </div>

            <div className="my-6">
              <p className="font-bold">
                Documents Remarks and Recommendation: Shortfall
              </p>
              <table className="min-w-full border text-center text-sm font-light border-neutral-500">
                <td
                  scope="col"
                  className="border-r px-6 py-10 border-neutral-500"
                >
                  {dataFromDb?.psDocumentPageObservation?.message}
                </td>
              </table>
            </div>

            <div className="mt-3">
              <p className="font-bold">
                Inspection Remarks and Recommendation : Shortfall
              </p>
              <table className="min-w-full border text-center text-sm font-light border-neutral-500">
                <td
                  scope="col"
                  className="border-r px-6 py-10 border-neutral-500"
                >
                  {dataFromDb?.siteInspection?.recommendations}
                </td>
              </table>
            </div>

            <div className="mt-20 flex flex-col items-end">
              <p className="font-semibold">Panchayat Secretary</p>
              <p>___________ Grama Panchayat</p>
              <p>__________Mandal</p>
              <p>______________ District</p>
            </div>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setOpenEndorsement(false)}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default EndorsementModal;
