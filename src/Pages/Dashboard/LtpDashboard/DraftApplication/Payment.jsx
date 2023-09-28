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
import toast from "react-hot-toast";
import axios from "axios";
import SaveData from "./SaveData";

const Payment = () => {
  const stepperData = useOutletContext();
  const {
    getApplicationData,
    confirmAlert,
    alertToTransferDataIntoDepartment,
  } = useContext(AuthContext);
  const [isStepperVisible, currentStep, steps, handleStepClick] = stepperData;
  const [generalInformation, setGeneralInformation] = useState({});
  const [applicationData, setApplicationData] = useState([]);
  const [plotDetails, setPlotDetails] = useState({});
  const [ltpDetailsData, setLtpDetailsData] = useState({});
  const [applicantDetailsData, setApplicantDetailsData] = useState({});
  const [natureOfTheSiteValue, setNatureOfTheSiteValue] = useState("");
  const [condition, setCondition] = useState("");
  const [loading, setLoading] = useState(false);
  const [calculatedData, setCalculatedData] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({
    gramaBankReceipt: "",
    labourCessBankReceipt: "",
    greenFeeBankReceipt: "",
  });
  const [sentData, setSentData] = useState(0);

  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));

  const formData = new FormData();

  useEffect(() => {
    console.log(applicationNo, "APPLICATION NO");

    const gettingData = async () => {
      const applicationData = await getApplicationData(applicationNo);

      setLoading(true);
      if (applicationData) {
        setLoading(false);
        setApplicationData(applicationData);
      }
    };
    gettingData();
  }, []);

  useEffect(() => {
    console.log("UPDATED APPLICATION");
    setGeneralInformation((prev) => {
      console.log(prev, "Prev");
      const newValue = applicationData?.buildingInfo?.generalInformation;
      console.log(newValue, "new Value");
      const updateValue = { ...prev, ...newValue };

      console.log(updateValue, "UPDATE VALUE");
      return updateValue;
    });

    console.log(generalInformation, "AFTER UPDATE");
    setPlotDetails((prev) => {
      const newValue = applicationData?.buildingInfo?.plotDetails;
      const updateValue = { ...prev, ...newValue };
      return updateValue;
    });
    setLtpDetailsData((prev) => {
      const newValue = applicationData?.applicantInfo?.ltpDetails;
      const updateValue = { ...prev, ...newValue };
      return updateValue;
    });
    setApplicantDetailsData((prev) => {
      const newValue = applicationData?.applicantInfo?.applicantDetails;
      const updateValue = { ...prev, ...newValue };
      return updateValue;
    });

    console.log(generalInformation, "general information");
    setNatureOfTheSiteValue(generalInformation.natureOfTheSite);
    console.log(generalInformation?.natureOfTheSite, "After");
    if (
      generalInformation?.natureOfTheSite === "Approved Layout" ||
      generalInformation?.natureOfTheSite === "Regularised under LRS" ||
      generalInformation?.natureOfTheSite ===
        "Congested/ Gramakanta/ Old Built-up area" ||
      generalInformation.natureOfTheSite === "Newly Developed/ Built up area"
    ) {
      console.log("aschi");
      setCondition(1);
    }
    if (
      generalInformation?.natureOfTheSite === "Newly Developed/ Built up area"
    ) {
      setCondition(2);
    }

    // calculation process
    calculateFees();
  }, [applicationData, condition]);

  const calculateFees = () => {
    // Plots Details
    const {
      proposedPlotAreaCal,
      roadWideningAreaCal,
      netPlotAreaCal,
      buildingExcludeStilt,
      compoundingWallProposed,
      existingRoad,
      existingRoadMts,
      frontSetback,
      marketValueSqym,
      natureOfRoad,
      proposedRoadMts,
      rareSetback,
      side1Setback,
      side2Setback,
      siteRegistered,
      statusOfRoad,
      totalBuiltUpArea,
      totalParkingArea,
      totalPlotDocument,
      totalPlotGround,
    } = plotDetails;
    // General Informatin
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

    const builtup_Area = Number(totalBuiltUpArea);
    const vacant_area = 1;
    const net_Plot_Area = Number(netPlotAreaCal);
    const market_value = Number(marketValueSqym);
    const nature_of_site = natureOfTheSite;
    const BuiltUp_area_SquareFeet = builtup_Area * 10.7639;

    console.log(typeof builtup_Area, "builtup_Area");

    // ======UDA Charged Segment======
    // ====Built up Development====
    const builtupAreaChargedUnitRate = 15; //per Sqm.
    const builtUpAreaDevelopmentCharged =
      builtupAreaChargedUnitRate * builtup_Area;

    // ====Vacant Development====
    const vacantAreaChargedUnitRate = 10; // per Sqm.
    const vacantAreaDevelopmentCharged =
      vacantAreaChargedUnitRate * vacant_area;

    // ====33% Penalization====
    const calculatePenalizationCharges = (net_Plot_Area, nature_of_site) => {
      let penalizationCharges = 0;
      if (nature_of_site !== "Plot port of RLP/IPLP but not regularised") {
        return (penalizationCharges = 0);
      }

      if (net_Plot_Area <= 100) {
        penalizationCharges = net_Plot_Area * 200 * 0.33;
      } else if (net_Plot_Area <= 300) {
        penalizationCharges = net_Plot_Area * 400 * 0.33;
      } else {
        return (penalizationCharges = 0);
      }

      return penalizationCharges;
    };
    // ====Total 33% Penalization Charged====
    const TotalPenalizationCharged = calculatePenalizationCharges(
      net_Plot_Area,
      nature_of_site
    );

    function calculateOpenSpaceCharge(
      nature_of_site,
      net_Plot_Area,
      market_value
    ) {
      const condition01 = nature_of_site === "Newly Developed/ Built up area";
      const condition02 =
        nature_of_site === "Plot port of RLP/IPLP but not regularised";

      if (condition01 || condition02) {
        return net_Plot_Area * 1.196 * market_value * 0.14;
      } else {
        return 0;
      }
    }

    // ==== Total 14% Open Space Charged====
    const TotalOpenSpaceCharged = calculateOpenSpaceCharge(
      nature_of_site,
      net_Plot_Area,
      market_value
    );

    // ==== Labour Cess Component 2 ====
    const labourCessComponentUnitRate2 = 1400; // per Sq.Ft.

    const laboutCessCompo2Calculation = (BuiltUp_area_SquareFeet) => {
      let labourCessComponentCharge2 = 0;
      if (BuiltUp_area_SquareFeet < 10000) {
        labourCessComponentCharge2 =
          labourCessComponentUnitRate2 * BuiltUp_area_SquareFeet * 10.76;
      } else if (BuiltUp_area_SquareFeet > 10000) {
        labourCessComponentCharge2 =
          labourCessComponentUnitRate2 *
          BuiltUp_area_SquareFeet *
          10.76 *
          (0.01 * 0.02);
      }
      return labourCessComponentCharge2;
    };
    // ===== Total labour cess Compo 2 Charged====
    const TotalLabourCessComp2Charged = laboutCessCompo2Calculation(
      BuiltUp_area_SquareFeet
    ).toFixed(4);

    // =====UDA Total=====
    const UDATotal = () => {
      // Calculate UDA Total Charged
      const UDATotalCharged =
        builtUpAreaDevelopmentCharged +
        vacantAreaDevelopmentCharged +
        TotalPenalizationCharged +
        TotalOpenSpaceCharged +
        TotalLabourCessComp2Charged;
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
      return (
        bettermentCharged +
        buildingPermitFees +
        siteApprovalCharged +
        paperPublicationCharged +
        processingFees
      ).toFixed(4);
    };
    // =====Grama Panchayet Total Charged=====
    const GramaPanchayetTotalCharged = gramaPanchayetTotal();

    // ======Green Fee Charged======
    let greenFeeCharged = 0;
    const greenFeeChargesUnitRate = 3; //per Sq.ft
    if (BuiltUp_area_SquareFeet > 5000) {
      greenFeeCharged = (
        greenFeeChargesUnitRate *
        BuiltUp_area_SquareFeet *
        10.76
      ).toFixed(4);
    }

    // ====Labour Cess Component 1 Charged====
    const labourCessComponentUnitRate1 = 1400; // per Sq.ft.
    const labourCessCompo1Charged = (
      labourCessComponentUnitRate1 *
      BuiltUp_area_SquareFeet *
      10.76 *
      (0.01 * 0.98)
    ).toFixed(4);

    setCalculatedData({
      UDATotalCharged,
      GramaPanchayetTotalCharged,
      builtUpAreaDevelopmentCharged,
      labourCessCompo1Charged,
      TotalLabourCessComp2Charged,
      vacantAreaDevelopmentCharged,
      builtup_Area,
      TotalOpenSpaceCharged,
      TotalPenalizationCharged,
      nature_of_site,
      siteApprovalCharged,
      greenFeeCharged,
      GramaPanchayetTotalCharged,
      TotalPenalizationCharged,
      TotalOpenSpaceCharged,
      bettermentCharged,
      buildingPermitFees,
    });
  };

  console.log(calculatedData, "Calculated data");

  // THIS FUNCTION USED FOR GETTING SELECTED FILE
  const handleFileChange = (e, fileName) => {
    const file = e.target.files[0];

    file && toast.success("Uploaded successfully");

    setSelectedFiles((prev) => {
      console.log(prev, fileName, "BEFORE");
      prev[fileName] = file;
      console.log(prev, fileName, "AFTER");
      return prev;
    });
    console.log(file, fileName, "GG");
    console.log(selectedFiles, "HH");
  };

  // send data into database
  const sendPaymentData = async (url) => {
    console.log("object");

    const checkEmptyFileInput = Object.values(selectedFiles).every(
      (file) => file !== ""
    );
    console.log(checkEmptyFileInput);

    if (checkEmptyFileInput) {
      // UPLOAD IMAGE FILE INTO THE CLOUD STORAGE AT FIRST
      for (const file in selectedFiles) {
        console.log(file);
        formData.append("files", selectedFiles[file]);
      }
      console.log(...formData);

      try {
        const response = await axios.post(
          "http://localhost:5000/upload?page=payment",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Important for file uploads
            },
          }
        );
        // Handle success or display a success message to the user

        console.log(response, "response");

        if (response?.data.msg === "Successfully uploaded") {
          const fileId = response.data.fileId;
          console.log(fileId, fileId);

          const vacantArea = document.getElementById("vacantArea").value;
          const builtUpArea = document.getElementById("builtUpArea").value;
          const UdaImpactFee = document.getElementById("UdaImpactFee").value;
          const UDATotalCharged =
            document.getElementById("UDATotalCharged").value;
          const gramaSiteApproval =
            document.getElementById("gramaSiteApproval").value;
          const buildingPermitFees =
            document.getElementById("buildingPermitFees").value;
          const bettermentCharged =
            document.getElementById("bettermentCharged").value;
          const TotalOpenSpaceCharged = document.getElementById(
            "TotalOpenSpaceCharged"
          ).value;
          const gramaImpactFee =
            document.getElementById("gramaImpactFee").value;
          const TotalPenalizationCharged = document.getElementById(
            "TotalPenalizationCharged"
          ).value;
          const GramaPanchayetTotalCharged = document.getElementById(
            "GramaPanchayetTotalCharged"
          ).value;
          const gramaChallanNo =
            document.getElementById("gramaChallanNo").value;
          const gramaChallanDate =
            document.getElementById("gramaChallanDate").value;
          const gramaBankName = document.getElementById("gramaBankName").value;
          const gramaBankBranch =
            document.getElementById("gramaBankBranch").value;
          const labourCessSiteApproval = document.getElementById(
            "labourCessSiteApproval"
          ).value;
          const labourCessChallanNo = document.getElementById(
            "labourCessChallanNo"
          ).value;
          const labourCessChallanDate = document.getElementById(
            "labourCessChallanDate"
          ).value;
          const labourCessBankName =
            document.getElementById("labourCessBankName").value;
          const labourCessBankBranch = document.getElementById(
            "labourCessBankBranch"
          ).value;
          const greenFeeSiteApproval = document.getElementById(
            "greenFeeSiteApproval"
          ).value;
          const greenFeeChargeChallanNo = document.getElementById(
            "greenFeeChargeChallanNo"
          ).value;
          const greenFeeChargeChallanDate = document.getElementById(
            "greenFeeChargeChallanDate"
          );
          const greenFeeChargeBankName = document.getElementById(
            "greenFeeChargeBankName"
          ).value;
          const greenFeeChargeBankBranch = document.getElementById(
            "greenFeeChargeBankBranch"
          ).value;

          const udaCharge = {
            vacantArea,
            builtUpArea,
            UdaImpactFee,
            UDATotalCharged,
          };
          const gramaPanchayatFee = {
            gramaSiteApproval,
            buildingPermitFees,
            bettermentCharged,
            TotalOpenSpaceCharged,
            gramaImpactFee,
            TotalPenalizationCharged,
            GramaPanchayetTotalCharged,
            gramaChallanNo,
            gramaChallanDate,
            gramaBankName,
            gramaBankBranch,
            gramaBankReceipt: fileId[0],
          };
          const labourCessCharge = {
            labourCessBankBranch,
            labourCessBankName,
            labourCessChallanDate,
            labourCessChallanNo,
            labourCessSiteApproval,
            labourCessBankReceipt: fileId[1],
          };
          const greenFeeCharge = {
            greenFeeChargeBankBranch,
            greenFeeChargeBankName,
            greenFeeChargeChallanDate,
            greenFeeChargeChallanNo,
            greenFeeSiteApproval,
            greenFeeBankReceipt: fileId[2],
          };

          console.log(
            udaCharge,
            greenFeeCharge,
            labourCessCharge,
            gramaPanchayatFee
          );

          return await sendUserDataIntoDB(url, "PATCH", {
            applicationNo: JSON.parse(localStorage.getItem("CurrentAppNo")),
            payment: {
              udaCharge,
              greenFeeCharge,
              labourCessCharge,
              gramaPanchayatFee,
            },
          });
        }
      } catch (error) {
        // Handle errors, e.g., show an error message to the user
        toast.error("Error to upload documents");
      }
    } else {
      toast.error("Please check empty field");
    }
  };

  console.log(condition, "CONSOLE");
  console.log(applicationData, "APPDATA");

  if (loading) {
    return "Loading...";
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="grid my-5 lg:my-0 lg:p-2"
    >
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
            id="vacantArea"
            name="vacantArea"
            label="Development charges(on Vacant land)"
            placeholder="1000"
            type="number"
            ltpDetails={calculatedData?.vacantAreaDevelopmentCharged}
          />
          <InputField
            id="builtUpArea"
            name="builtUpArea"
            label="Development charges(on Built-up area)"
            placeholder="1000"
            type="number"
            ltpDetails={calculatedData?.builtUpAreaDevelopmentCharged}
          />
          <InputField
            id="UdaImpactFee"
            name="UdaImpactFee"
            label="Impact fee (50% to UDA)"
            placeholder="5000"
            type="number"
            ltpdetails={0}
          />
          <InputField
            id="UDATotalCharged"
            name="UDATotalCharged"
            label="Total"
            placeholder="7000"
            type="number"
            ltpDetails={calculatedData?.UDATotalCharged}
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
            id="gramaSiteApproval"
            name="gramaSiteApproval"
            label="Site approval charges"
            placeholder="1000"
            type="number"
            ltpDetails={calculatedData?.siteApprovalCharged}
          />
          <InputField
            id="buildingPermitFees"
            name="buildingPermitFees"
            label="Building permit fee"
            placeholder="1000"
            type="number"
            ltpDetails={calculatedData?.buildingPermitFees}
          />

          {condition !== 1 && (
            <InputField
              id="bettermentCharged"
              name="bettermentCharged"
              label="Betterment charge"
              placeholder="1000"
              type="number"
              ltpDetails={calculatedData?.bettermentCharged}
            />
          )}
          {condition !== 1 && (
            <InputField
              id="TotalOpenSpaceCharged"
              name="TotalOpenSpaceCharged"
              label="14% open space charges"
              placeholder="5000"
              type="number"
              ltpDetails={calculatedData?.TotalOpenSpaceCharged}
            />
          )}
          <InputField
            id="gramaImpactFee"
            name="gramaImpactFee"
            label="Impact fee (50% to G.P.)"
            placeholder="5000"
            type="number"
            ltpDetails={0}
          />
          {condition !== 1 && condition !== 2 && (
            <InputField
              id="TotalPenalizationCharged"
              name="TotalPenalizationCharged"
              label="33% penalization charges"
              placeholder="0"
              type="number"
              ltpDetails={calculatedData?.TotalPenalizationCharged}
            />
          )}
          <InputField
            id="GramaPanchayetTotalCharged"
            name="GramaPanchayetTotalCharged"
            label="Total"
            placeholder="13000"
            type="number"
            ltpDetails={calculatedData?.GramaPanchayetTotalCharged}
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 mb-4">
          <InputField
            id="gramaChallanNo"
            name="gramaChallanNo"
            label="DD/Challan no."
            placeholder="1234"
            type="number"
          />
          <InputField
            id="gramaChallanDate"
            name="gramaChallanDate"
            label="DD/Challan date"
            placeholder="06-04-2023"
            type="text"
          />
          <InputField
            id="gramaBankName"
            name="gramaBankName"
            label="Bank name"
            placeholder="xxxx"
            type="text"
          />
          <InputField
            id="gramaBankBranch"
            name="gramaBankBranch"
            label="Branch"
            placeholder="xxxx"
            type="text"
          />
        </div>
        <div className="px-3 mb-8 flex justify-end">
          <div className="form-control w-full max-w-xs">
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              id="gramaBankReceipt"
              onChange={(e) => handleFileChange(e, "gramaBankReceipt")}
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
            id="labourCessSiteApproval"
            name="labourCessSiteApproval"
            label="Site approval charges"
            placeholder="3000"
            type="number"
            ltpDetails={calculatedData?.siteApprovalCharged}
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 mb-8">
          <InputField
            id="labourCessChallanNo"
            name="labourCessChallanNo"
            label="DD/Challan no."
            placeholder="1234"
            type="number"
          />
          <InputField
            id="labourCessChallanDate"
            name="labourCessChallanDate"
            label="DD/Challan date"
            placeholder="06-04-2023"
            type="text"
          />
          <InputField
            id="labourCessBankName"
            name="labourCessBankName"
            label="Bank name"
            placeholder="xxxx"
            type="text"
          />
          <InputField
            id="labourCessBankBranch"
            name="labourCessBankBranch"
            label="Branch"
            placeholder="xxxx"
            type="text"
          />
        </div>
        <div className="px-3 mb-4 flex justify-end">
          <div className="form-control w-full max-w-xs">
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              id="labourCessBankReceipt"
              onChange={(e) => handleFileChange(e, "labourCessBankReceipt")}
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
            id="greenFeeSiteApproval"
            name="greenFeeSiteApproval"
            label="Site approval charges"
            placeholder="2000"
            type="number"
            ltpDetails={calculatedData?.greenFeeCharged}
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          <InputField
            id="greenFeeChargeChallanNo"
            name="greenFeeChargeChallanNo"
            label="DD/Challan no."
            placeholder="1234"
            type="number"
          />
          <InputField
            id="greenFeeChargeChallanDate"
            name="greenFeeChargeChallanDate"
            label="DD/Challan date"
            placeholder="06-04-2023"
            type="text"
          />
          <InputField
            id="greenFeeChargeBankName"
            name="greenFeeChargeBankName"
            label="Bank name"
            placeholder="xxxx"
            type="text"
          />
          <InputField
            id="greenFeeChargeBankBranch"
            name="greenFeeChargeBankBranch"
            label="Branch"
            placeholder="xxxx"
            type="text"
          />
        </div>
      </div>

      <div className="px-3 mb-4 flex justify-end">
        <div className="form-control w-full max-w-xs">
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            id="greenFeeBankReceipt"
            onChange={(e) => handleFileChange(e, "greenFeeBankReceipt")}
          />
        </div>
      </div>

      <input type="submit" value="GET" onClick={sendPaymentData} />

      {/* save & continue  */}
      {/* navigation button  */}
      <SaveData
        isStepperVisible={isStepperVisible}
        currentStep={currentStep}
        steps={steps}
        stepperData={stepperData}
        confirmAlert={confirmAlert}
        collectInputFieldData={sendPaymentData}
        sentToPS={alertToTransferDataIntoDepartment}
        setSentData={setSentData}
        sentData={sentData}
      />
    </form>
  );
};

export default Payment;
