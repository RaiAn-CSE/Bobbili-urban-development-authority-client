import React, { useContext, useEffect, useState } from "react";
import InputField from "../../../Components/InputField";
import { GiMoneyStack } from "react-icons/gi";
import { GrAttachment } from "react-icons/gr";
import UDAChargeImg from "../../../../assets/images/mobile-transfer.png";
import GramChargeImg from "../../../../assets/images/pay-per-click.png";
import LabourChargeImg from "../../../../assets/images/payment-method.png";
import GreenChargeImg from "../../../../assets/images/money.png";
import { AiOutlineFileText } from "react-icons/ai";
import { useOutletContext } from "react-router";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import SaveData from "./SaveData";

const Payment = () => {
  const stepperData = useOutletContext();
  const { getApplicationData } = useContext(AuthContext);
  const [isStepperVisible, currentStep, steps, handleStepClick] = stepperData;
  const [generalInformation, setGeneralInformation] = useState({});
  const [plotDetails, setPlotDetails] = useState({});
  const [ltpDetailsData, setLtpDetailsData] = useState({});
  const [applicantDetailsData, setApplicantDetailsData] = useState({});

  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));

  useEffect(() => {
    const gettingData = async () => {
      const applicationData = await getApplicationData(applicationNo);
      setGeneralInformation(applicationData?.buildingInfo?.generalInformation)
      setPlotDetails(applicationData?.buildingInfo?.plotDetails)
      setLtpDetailsData(applicationData?.applicantInfo?.ltpDetails)
      setApplicantDetailsData(applicationData?.applicantInfo?.applicantDetails)
    };
    gettingData();
  }, []);

  const { confirmAlert } = useContext(AuthContext);
  // Plots Details
  const { proposedPlotAreaCal, roadWideningAreaCal, netPlotAreaCal, buildingExcludeStilt, compoundingWallProposed, existingRoad, existingRoadMts, frontSetback, marketValueSqym, natureOfRoad, proposedRoadMts, rareSetback, side1Setback, side2Setback, siteRegistered, statusOfRoad, totalBuiltUpArea, totalParkingArea, totalPlotDocument, totalPlotGround } = plotDetails;

  // General Informatin
  const { applicationType, bpsApprovedNoServer, caseType, district, gramaPanchayat, iplpNo, lpNo, lrsNo, mandal, natureOfPermission, natureOfTheSite, plotNo, plotNo2, previewsApprovedFileNo, surveyNo, village } = generalInformation;

  const builtup_Area = Number(totalBuiltUpArea);
  const vacant_area = 1;
  const net_Plot_Area = Number(netPlotAreaCal);
  const market_value = Number(marketValueSqym);
  const nature_of_site = natureOfTheSite;
  const BuiltUp_area_SquareFeet = builtup_Area * 10.7639;

  console.log(typeof builtup_Area, "builtup_Area")

  // ======UDA Charged Segment======
  // ====Built up Development====
  const builtupAreaChargedUnitRate = 15; //per Sqm.
  const builtUpAreaDevelopmentCharged = builtupAreaChargedUnitRate * builtup_Area;

  // ====Vacant Development====
  const vacantAreaChargedUnitRate = 10; // per Sqm.
  const vacantAreaDevelopmentCharged = vacantAreaChargedUnitRate * vacant_area;

  // ====33% Penalization====
  const calculatePenalizationCharges = (net_Plot_Area, nature_of_site) => {
    let penalizationCharges = 0;
    if (nature_of_site !== "Plot port of RLP/IPLP but not regularised") {
      return penalizationCharges = 0;
    }

    if (net_Plot_Area <= 100) {
      penalizationCharges = net_Plot_Area * 200 * 0.33;
    } else if (net_Plot_Area <= 300) {
      penalizationCharges = net_Plot_Area * 400 * 0.33;
    } else {
      return penalizationCharges = 0;
    }

    return penalizationCharges;
  };
  // ====Total 33% Penalization Charged====
  const TotalPenalizationCharged = calculatePenalizationCharges(net_Plot_Area, nature_of_site);

  function calculateOpenSpaceCharge(nature_of_site, net_Plot_Area, market_value) {
    const condition01 = nature_of_site === "Newly Developed/ Built up area";
    const condition02 = nature_of_site === "Plot port of RLP/IPLP but not regularised";

    if (condition01 || condition02) {
      return net_Plot_Area * 1.196 * market_value * 0.14;
    } else {
      return 0;
    }
  }

  // ==== Total 14% Open Space Charged====
  const TotalOpenSpaceCharged = calculateOpenSpaceCharge(nature_of_site, net_Plot_Area, market_value);

  // ==== Labour Cess Component 2 ====
  const labourCessComponentUnitRate2 = 1400; // per Sq.Ft.

  const laboutCessCompo2Calculation = (BuiltUp_area_SquareFeet) => {
    let labourCessComponentCharge2 = 0;
    if (BuiltUp_area_SquareFeet < 10000) {
      labourCessComponentCharge2 =
        labourCessComponentUnitRate2 * BuiltUp_area_SquareFeet * 10.76;
    } else if (BuiltUp_area_SquareFeet > 10000) {
      labourCessComponentCharge2 =
        labourCessComponentUnitRate2 * BuiltUp_area_SquareFeet * 10.76 * (0.01 * 0.02);
    }
    return labourCessComponentCharge2;
  };
  // ===== Total labour cess Compo 2 Charged====
  const TotalLabourCessComp2Charged = laboutCessCompo2Calculation(BuiltUp_area_SquareFeet).toFixed(4);

  // =====UDA Total=====
  const UDATotal = () => {
    // Calculate UDA Total Charged
    const UDATotalCharged =
      (builtUpAreaDevelopmentCharged +
        vacantAreaDevelopmentCharged +
        TotalPenalizationCharged +
        TotalOpenSpaceCharged +
        TotalLabourCessComp2Charged);
    return UDATotalCharged;
  };
  // =====UDA Total Charged=====
  const UDATotalCharged = UDATotal();

  // =======Grama Panchayet Segment=======

  // ====Grama Panchayet fees====
  const bettermentChargedUnitRate = 40; //per Sqm.
  const bettermentCharged = bettermentChargedUnitRate * net_Plot_Area;

  // ====Building Permit====
  const buildingPermitUnitRate = 20; //per Sqm.
  const buildingPermitFees = buildingPermitUnitRate * builtup_Area;

  // ====Site Approval Charged====
  const siteApprovalUnitRate = 10; //per Sqm.
  const siteApprovalCharged = siteApprovalUnitRate * net_Plot_Area;

  // ====Paper Publication Charged====
  const paperPublicationCharged = 1500; //Fixed

  // ====Processing Fees====
  const processingUnitRate = 7; //per Sqm.
  const processingFees = processingUnitRate * builtup_Area;

  // =====Grama Panchayet Total=====
  const gramaPanchayetTotal = () => {
    return (bettermentCharged + buildingPermitFees + siteApprovalCharged + paperPublicationCharged + processingFees).toFixed(4);
  };
  // =====Grama Panchayet Total Charged=====
  const GramaPanchayetTotalCharged = gramaPanchayetTotal();


  // ======Green Fee Charged======
  let greenFeeCharged = 0;
  const greenFeeChargesUnitRate = 3; //per Sq.ft
  if (BuiltUp_area_SquareFeet > 5000) {
    greenFeeCharged = (greenFeeChargesUnitRate * BuiltUp_area_SquareFeet * 10.76).toFixed(4);
  }

  // ====Labour Cess Component 1 Charged====
  const labourCessComponentUnitRate1 = 1400; // per Sq.ft.
  const labourCessCompo1Charged = (labourCessComponentUnitRate1 * BuiltUp_area_SquareFeet * 10.76 * (0.01 * 0.98)).toFixed(4);

  console.log({ UDATotalCharged, GramaPanchayetTotalCharged, labourCessCompo1Charged, TotalLabourCessComp2Charged, builtup_Area, TotalOpenSpaceCharged, TotalPenalizationCharged, nature_of_site })
  // send data into database
  const sendPaymentData = async (url) => {
    return await sendUserDataIntoDB(url, "PATCH", {
      applicationNo: JSON.parse(localStorage.getItem("CurrentAppNo")),
      payment: {},
    });
  };

  return (
    <div className="grid my-5 lg:my-0 lg:p-2">
      <div>
        <div className="flex justify-end">
          <button className="btn btn-md">
            <AiOutlineFileText size={19} />
            <span className="font-semibold">Application</span>
          </button>
        </div>
        <div className="flex items-center">
          <img
            src={UDAChargeImg}
            alt="Image icon for uda charge section"
            className="h-10 me-3"
          />
          <h3 className="font-bold text-xl">UDA Charge</h3>
        </div>
        <div className="divider m-0"></div>

        <div className="grid grid-cols-2 lg:grid-cols-3 mt-5 mb-7">
          <InputField
            id="myInput1"
            name="myInput"
            label="Development charges(on Vacant land)"
            placeholder="1000"
            type="number"
            value={vacantAreaDevelopmentCharged}
          />
          <InputField
            id="myInput2"
            name="myInput"
            label="Development charges(on Built-up area)"
            placeholder="1000"
            type="number"
            value={builtUpAreaDevelopmentCharged}
          />
          <InputField
            id="myInput3"
            name="myInput"
            label="Impact fee (50% to UDA)"
            placeholder="5000"
            type="number"
            value={0}
          />
          <InputField
            id="myInput4"
            name="myInput"
            label="Total"
            placeholder="7000"
            type="number"
            value={UDATotalCharged}
          />
          <div>
            <button className="btn btn-md text-sm px-3 mt-10 ml-3 bg-green-300 hover:bg-green-400 hover:shadow-md transition-all duration-500">
              <GiMoneyStack size={25} /> pay now
            </button>
          </div>
        </div>
      </div>

      <div className="my-5">
        <div className="flex items-center">
          <img
            src={GramChargeImg}
            alt="Image icon for Grama Panchayat fee section"
            className="h-10 me-3"
          />
          <h3 className="font-bold text-xl">Grama Panchayat fee</h3>
        </div>
        <div className="divider m-0"></div>

        <div className="grid grid-cols-2 lg:grid-cols-4 mt-3">
          <InputField
            id="myInput5"
            name="myInput"
            label="Site approval charges"
            placeholder="1000"
            type="number"
            value={siteApprovalCharged}
          />
          <InputField
            id="myInput6"
            name="myInput"
            label="Building permit fee"
            placeholder="1000"
            type="number"
            value={buildingPermitFees}
          />
          <InputField
            id="myInput7"
            name="myInput"
            label="Betterment charge"
            placeholder="1000"
            type="number"
            value={bettermentCharged}
          />
          <InputField
            id="myInput8"
            name="myInput"
            label="14% open space charges"
            placeholder="5000"
            type="number"
            value={TotalOpenSpaceCharged}
          />
          <InputField
            id="myInput8"
            name="myInput"
            label="Impact fee (50% to G.P.)"
            placeholder="5000"
            type="number"
            value={0}
          />
          <InputField
            id="myInput8"
            name="myInput"
            label="33% penalization charges"
            placeholder="0"
            type="number"
            value={TotalPenalizationCharged}
          />
          <InputField
            id="myInput8"
            name="myInput"
            label="Total"
            placeholder="13000"
            type="number"
            value={GramaPanchayetTotalCharged}
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 mb-8">
          <InputField
            id="myInput5"
            name="myInput"
            label="DD/Challan no."
            placeholder="1234"
            type="number"
          />
          <InputField
            id="myInput6"
            name="myInput"
            label="DD/Challan date"
            placeholder="06-04-2023"
            type="text"
          />
          <InputField
            id="myInput7"
            name="myInput"
            label="Bank name"
            placeholder="xxxx"
            type="text"
          />
          <InputField
            id="myInput8"
            name="myInput"
            label="Branch"
            placeholder="xxxx"
            type="text"
          />
        </div>
        <div className="px-3 mb-4 flex justify-end">
          <div className="w-[250px]">
            <input
              className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
              type="file"
              id="formFileMultiple"
              multiple
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center">
          <img
            src={LabourChargeImg}
            alt="Image icon for labour charge section"
            className="h-10 me-3"
          />
          <h3 className="font-bold text-xl">Labour cess charge</h3>
        </div>
        <div className="divider m-0"></div>

        <div className="grid lg:grid-cols-4 mt-3">
          <InputField
            id="myInput8"
            name="myInput"
            label="Site approval charges"
            placeholder="3000"
            type="number"
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 mb-8">
          <InputField
            id="myInput5"
            name="myInput"
            label="DD/Challan no."
            placeholder="1234"
            type="number"
          />
          <InputField
            id="myInput6"
            name="myInput"
            label="DD/Challan date"
            placeholder="06-04-2023"
            type="text"
          />
          <InputField
            id="myInput7"
            name="myInput"
            label="Bank name"
            placeholder="xxxx"
            type="text"
          />
          <InputField
            id="myInput8"
            name="myInput"
            label="Branch"
            placeholder="xxxx"
            type="text"
          />
        </div>
        <div className="px-3 mb-4 flex justify-end">
          <div className="w-[250px]">
            <input
              className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
              type="file"
              id="formFileMultiple"
              multiple
            />
          </div>
        </div>
      </div>

      {/* Green fee charge  */}
      <div className="mt-5 mb-8">
        <div className="flex items-center">
          <img
            src={GreenChargeImg}
            alt="Image icon for green charge section"
            className="h-10 me-3"
          />
          <h3 className="font-bold text-xl">Green fee charge</h3>
        </div>
        <div className="divider m-0"></div>

        <div className="grid lg:grid-cols-4 mt-3">
          <InputField
            id="myInput8"
            name="myInput"
            label="Site approval charges"
            placeholder="2000"
            type="number"
            value={greenFeeCharged}
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          <InputField
            id="myInput5"
            name="myInput"
            label="DD/Challan no."
            placeholder="1234"
            type="number"
          />
          <InputField
            id="myInput6"
            name="myInput"
            label="DD/Challan date"
            placeholder="06-04-2023"
            type="text"
          />
          <InputField
            id="myInput7"
            name="myInput"
            label="Bank name"
            placeholder="xxxx"
            type="text"
          />
          <InputField
            id="myInput8"
            name="myInput"
            label="Branch"
            placeholder="xxxx"
            type="text"
          />
        </div>
      </div>

      <div className="px-3 mb-4 flex justify-end">
        <div className="w-[250px]">
          <input
            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
            type="file"
            id="formFileMultiple"
            multiple
          />
        </div>
      </div>

      {/* save & continue  */}
      {/* navigation button  */}
      <SaveData
        isStepperVisible={isStepperVisible}
        currentStep={currentStep}
        steps={steps}
        stepperData={stepperData}
        confirmAlert={confirmAlert}
        collectInputFieldData={sendPaymentData}
      />
    </div>
  );
};

export default Payment;
