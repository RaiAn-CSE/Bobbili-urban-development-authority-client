import React from "react";
import InputField from "../../../Components/InputField";
import { GiMoneyStack } from "react-icons/gi";
import UDAChargeImg from "../../../../assets/images/mobile-transfer.png";
import GramChargeImg from "../../../../assets/images/pay-per-click.png";
import LabourChargeImg from "../../../../assets/images/payment-method.png";
import GreenChargeImg from "../../../../assets/images/money.png";

const Payment = () => {
  
  // Sending data to Backend
  const handleBackendData = () => {
    const applicationId = JSON.parse(localStorage.getItem("applicationId"))
    getPostData({ applicationNo: applicationId, payment: {} })
  }
  const builtup_Area = 1;
  const vacant_area = 1;
  const net_Plot_Area = 1;
  const market_value = 1;

  // UDA Charge
  const builtupAreaChargedUnitRate = 15; //per Sqm.
  const builtUpAreaDevelopmentCharged = (builtupAreaChargedUnitRate * builtup_Area);

  const vacantAreaChargedUnitRate = 10; // per Sqm.
  const vacantAreaDevelopmentCharged = (vacantAreaChargedUnitRate * vacant_area);
  const UDATotal = () => {
    return;
  }

  // Grama Panchayet fees
  const bettermentChargedUnitRate = 40; //per Sqm.
  const bettermentCharged = (bettermentChargedUnitRate * net_Plot_Area);

  const buildingPermitUnitRate = 20; //per Sqm.	
  const buildingPermitFees = (buildingPermitUnitRate * builtup_Area);

  const siteApprovalUnitRate = 10; //per Sqm.
  const siteApprovalCharges = (siteApprovalUnitRate * net_Plot_Area);

  const paperPublicationCharges = 1500;	//Fixed	

  const processingUnitRate = 7; //per Sqm.	
  const processingFees = (processingUnitRate * builtup_Area);

  // 33% penalization
  const penalization = (net_Plot_Area) => {
    if (net_Plot_Area > 100) {
      const penalizationChargesUnitRate = 200; //per Sqm Less than 100Sqm
      const penalizationCharges = ((penalizationChargesUnitRate * net_Plot_Area) * 0.33);
      return penalizationCharges;

    }
    if (net_Plot_Area > 100 || net_Plot_Area <= 300) {
      const penalizationChargesUnitRate = 400;
      const penalizationCharges = ((penalizationChargesUnitRate * net_Plot_Area) * 0.33);
      return penalizationCharges;
    }
  }

  const openSpaceCharge = ((net_Plot_Area * 1.196 * market_value) * 0.14); // Open Space Charge= 14%

  const gramaPanchayetTotal = () => {
    return ;
  }

  // Green fee charge
  const greenFeeChargesUnitRate = 3; //per Sq.ft
  const greenFeeCharges = (greenFeeChargesUnitRate * builtup_Area * 10.76);

  // Labour Cess 
  const labourCessComponentUnitRate = 1400;
  const labourCessComponent = (((labourCessComponentUnitRate * builtup_Area * 10.76) * 0.01) * 0.98);

  return (
    <div className="grid my-5 lg:my-0 lg:p-2">
      <div>
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
           
            value={vacantAreaDevelopmentCharged} placeholder="1000"
            type="number"
          />
          <InputField
            id="myInput2"
            name="myInput"
            label="Development charges(on Built-up area)"
           
            value={builtUpAreaDevelopmentCharged} placeholder="1000"
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

        <div className="grid grid-cols-2 lg:grid-cols-5">
          <InputField id="myInput5" name="myInput" label='Site approval charges' value={siteApprovalCharges} placeholder="1000" type="number" />
          <InputField id="myInput6" name="myInput" label='Building permit fee' value={buildingPermitFees} placeholder="1000" type="number" />
          <InputField id="myInput7" name="myInput" label='Betterment charge' value={bettermentCharged} placeholder="1000" type="number" />
          <InputField id="myInput8" name="myInput" label='14% open space charges' value={openSpaceCharge} placeholder="5000" type="number" />
          <InputField id="myInput8" name="myInput" label='Impact fee (50% to G.P.)' placeholder="5000" type="number" />
          <InputField id="myInput8" name="myInput" label='33% penalization charges' value={penalization(net_Plot_Area)} placeholder="0" type="number" />
          <InputField id="myInput8" name="myInput" label='Total' value={UDATotal()} placeholder="13000" type="number" />
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
    </div>
  );
};

export default Payment;
