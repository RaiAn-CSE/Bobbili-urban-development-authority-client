import React, { useContext } from "react";
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

  const [isStepperVisible, currentStep, steps, handleStepClick] = stepperData;

  console.log(stepperData);

  const { confirmAlert } = useContext(AuthContext);
  // Sending data to Backend
  // const handleBackendData = () => {
  //   const applicationId = JSON.parse(
  //     localStorage.getItem("draftApplicationData")
  //   ).applicationId;
  //   getPostData({ applicationId: applicationId, payment: {} });
  // };

  // Nature of the site
  //  1. Approved Layout
  //  2. Regularised Under LRS
  //  3. Plot port of RLP/IPLP but not regularised
  //  4. Congested/ Gramakanta/ Old Built-up area
  //  5. Newly Developed/ Built up area

  const builtup_Area = 1;
  const vacant_area = 1;
  const net_Plot_Area = 1;
  const market_value = 1;
  const nature_of_site = "";

  // UDA Charge
  const builtupAreaChargedUnitRate = 15; //per Sqm.
  const builtUpAreaDevelopmentCharged =
    builtupAreaChargedUnitRate * builtup_Area;

  const vacantAreaChargedUnitRate = 10; // per Sqm.
  const vacantAreaDevelopmentCharged = vacantAreaChargedUnitRate * vacant_area;
  // 33% penalization
  const calculatePenalizationCharges = (net_Plot_Area, nature_of_site) => {
    // 200, 400 this are unit rate.
    let penalizationCharges = 0;
    if (nature_of_site !== "Plot port of RLP/IPLP but not regularised") {
      return penalizationCharges;
    }

    if (net_Plot_Area <= 100) {
      penalizationCharges = net_Plot_Area * 200 * 0.33;
    } else if (net_Plot_Area <= 300) {
      penalizationCharges = net_Plot_Area * 400 * 0.33;
    }

    return penalizationCharges;
  };
  // Open Space Charge 14%
  function calculateOpenSpaceCharge(
    nature_of_site,
    net_Plot_Area,
    market_value
  ) {
    let openSpaceCharge = 0;

    switch (nature_of_site) {
      case "Newly Developed/ Built up area":
      case "Plot port of RLP/IPLP but not regularised":
        openSpaceCharge = net_Plot_Area * 1.196 * market_value * 0.14;
        break;
      default:
        openSpaceCharge = 0;
    }

    return openSpaceCharge;
  }

  // Labour Cess Component 2
  const labourCessComponentUnitRate2 = 1400; // per Sq.M.

  const laboutCessCompo2Calculation = (builtup_Area) => {
    let labourCessComponentCharge2 = 0;

    if (builtup_Area < 10000) {
      labourCessComponentCharge2 =
        labourCessComponentUnitRate2 * builtup_Area * 10.76;
    } else if (builtup_Area > 10000) {
      labourCessComponentCharge2 =
        labourCessComponentUnitRate2 * builtup_Area * 10.76 * (0.01 * 0.02);
    }

    return labourCessComponentCharge2;
  };

  const TotalPenalizationCharged = calculatePenalizationCharges(
    net_Plot_Area,
    nature_of_site
  );
  const TotalOpenSpaceCharged = calculateOpenSpaceCharge(
    nature_of_site,
    net_Plot_Area,
    market_value
  );
  const TotalLabourCessComp2Charged = laboutCessCompo2Calculation(builtup_Area);

  const UDATotal = () => {
    const Total =
      builtUpAreaDevelopmentCharged +
      vacantAreaDevelopmentCharged +
      TotalPenalizationCharged +
      TotalOpenSpaceCharged +
      TotalLabourCessComp2Charged;
    return Total;
  };
  const UDATotalCharged = UDATotal();

  // Grama Panchayet fees
  const bettermentChargedUnitRate = 40; //per Sqm.
  const bettermentCharged = bettermentChargedUnitRate * net_Plot_Area;

  const buildingPermitUnitRate = 20; //per Sqm.
  const buildingPermitFees = buildingPermitUnitRate * builtup_Area;

  const siteApprovalUnitRate = 10; //per Sqm.
  const siteApprovalCharged = siteApprovalUnitRate * net_Plot_Area;

  const paperPublicationCharged = 1500; //Fixed

  const processingUnitRate = 7; //per Sqm.
  const processingFees = processingUnitRate * builtup_Area;

  const gramaPanchayetTotal = () => {
    return (
      bettermentCharged +
      buildingPermitFees +
      siteApprovalCharged +
      paperPublicationCharged +
      processingFees
    );
  };
  const GramaPanchayetTotalCharged = gramaPanchayetTotal();

  // Green fee charge
  // if proposed built up area above than 5000 Sq.ft
  const greenFeeChargesUnitRate = 3; //per Sq.ft
  if (builtup_Area > 5000) {
    return (greenFeeCharges = greenFeeChargesUnitRate * builtup_Area * 10.76);
  }

  // Labour Cess Component 1
  const labourCessComponentUnitRate1 = 1400; // per Sq.M.
  const labourCessComponentCharge1 =
    labourCessComponentUnitRate1 * builtup_Area * 10.76 * (0.01 * 0.98);

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
          />
          <InputField
            id="myInput2"
            name="myInput"
            label="Development charges(on Built-up area)"
            placeholder="1000"
            type="number"
          />
          <InputField
            id="myInput3"
            name="myInput"
            label="Impact fee (50% to UDA)"
            placeholder="5000"
            type="number"
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
          />
          <InputField
            id="myInput6"
            name="myInput"
            label="Building permit fee"
            placeholder="1000"
            type="number"
          />
          <InputField
            id="myInput7"
            name="myInput"
            label="Betterment charge"
            placeholder="1000"
            type="number"
          />
          <InputField
            id="myInput8"
            name="myInput"
            label="14% open space charges"
            placeholder="5000"
            type="number"
          />
          <InputField
            id="myInput8"
            name="myInput"
            label="Impact fee (50% to G.P.)"
            placeholder="5000"
            type="number"
          />
          <InputField
            id="myInput8"
            name="myInput"
            label="33% penalization charges"
            placeholder="0"
            type="number"
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
          <div className="ml-7 mt-5">
            <span>
              <GrAttachment />
            </span>
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
          <div className="ml-7 mt-5">
            <span>
              <GrAttachment />
            </span>
          </div>
        </div>
      </div>

      <div className="my-5">
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
