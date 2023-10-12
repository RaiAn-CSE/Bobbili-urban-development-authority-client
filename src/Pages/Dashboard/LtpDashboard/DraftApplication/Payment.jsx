import React, { useContext, useEffect, useState } from "react";
import InputField from "../../../Components/InputField";
import { GiMoneyStack } from "react-icons/gi";
import UDAChargeImg from "../../../../assets/images/mobile-transfer.png";
import GramChargeImg from "../../../../assets/images/pay-per-click.png";
import LabourChargeImg from "../../../../assets/images/payment-method.png";
import GreenChargeImg from "../../../../assets/images/money.png";
import { useOutletContext } from "react-router";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import SaveData from "./SaveData";
import { Link } from "react-router-dom";
import { MdReceiptLong } from "react-icons/md";
import Application from "./Application";

const Payment = () => {
  const [openApplication, setOpenApplication] = useState(false);
  const stepperData = useOutletContext();
  const {
    getApplicationData,
    confirmAlert,
    alertToTransferDataIntoDepartment,
    sendUserDataIntoDB,
    userInfoFromLocalStorage,
  } = useContext(AuthContext);
  const [isStepperVisible, currentStep, steps, handleStepClick] = stepperData;
  const [applicationData, setApplicationData] = useState({});
  const [condition, setCondition] = useState("");
  const [calculatedData, setCalculatedData] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({
    gramaBankReceipt: "",
    labourCessBankReceipt: "",
    greenFeeBankReceipt: "",
  });
  const [imageId, setImageId] = useState({
    gramaBankReceipt: "",
    labourCessBankReceipt: "",
    greenFeeBankReceipt: "",
  });
  const [sentData, setSentData] = useState(0);
  const role = userInfoFromLocalStorage().role;
  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));
  const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";

  useEffect(() => {
    getApplicationData(applicationNo).then((applicationData) => {
      setApplicationData(applicationData);
      console.log(applicationData, "LJADJFKJAKSLDJKL:ASJKLFJA");
      console.log(applicationData?.buildingInfo?.generalInformation);

      const generalInformation =
        applicationData?.buildingInfo?.generalInformation;

      const ltpDetails = applicationData?.applicantInfo?.ltpDetails;

      const applicantDetailsData =
        applicationData?.applicantInfo?.applicantDetails;

      const plotDetails = applicationData?.buildingInfo?.plotDetails;

      const gramaPanchaytImgId = applicationData?.payment?.gramaPanchayatFee
        ?.gramaBankReceipt
        ? applicationData?.payment?.gramaPanchayatFee?.gramaBankReceipt
        : "";

      const greenFeeImgId = applicationData?.payment?.greenFeeCharge
        ?.greenFeeBankReceipt
        ? applicationData?.payment?.greenFeeCharge?.greenFeeBankReceipt
        : "";

      const labourCessImageId = applicationData?.payment?.labourCessCharge
        ?.labourCessBankReceipt
        ? applicationData?.payment?.labourCessCharge?.labourCessBankReceipt
        : "";

      setImageId({
        gramaBankReceipt: gramaPanchaytImgId,
        labourCessBankReceipt: labourCessImageId,
        greenFeeBankReceipt: greenFeeImgId,
      });

      if (
        generalInformation?.natureOfTheSite === "Approved Layout" ||
        generalInformation?.natureOfTheSite === "Regularised under LRS" ||
        generalInformation?.natureOfTheSite ===
          "Congested/ Gramakanta/ Old Built-up area" ||
        generalInformation?.natureOfTheSite === "Newly Developed/ Built up area"
      ) {
        setCondition(1);
      }
      if (
        generalInformation?.natureOfTheSite === "Newly Developed/ Built up area"
      ) {
        setCondition(2);
      }
      // calculation process
      calculateFees(
        generalInformation,
        ltpDetails,
        applicantDetailsData,
        plotDetails
      );
    });
  }, []);

  const calculateFees = (
    generalInformation,
    ltpDetails,
    applicantDetailsData,
    plotDetails
  ) => {
    // Plots Details
    const { netPlotAreaCal, marketValueSqym, totalBuiltUpArea, vacantLand } =
      plotDetails;
    console.log(plotDetails, "plotDetails");
    // General Informatin
    const { natureOfTheSite } = generalInformation;

    const builtup_Area = Number(totalBuiltUpArea);
    const vacant_area = Number(vacantLand);
    const net_Plot_Area = Number(netPlotAreaCal);
    const market_value = Number(marketValueSqym);
    const nature_of_site = natureOfTheSite;
    const BuiltUp_area_SquareFeet = Number(builtup_Area * 10.7639);

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

    // ====Open Space====
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

    // ==== Total 14% Open Space Charged ====
    const TotalOpenSpaceCharged = calculateOpenSpaceCharge(
      nature_of_site,
      net_Plot_Area,
      market_value
    );

    // ==== Labour Cess Component 2 ====
    const labourCessComponentUnitRate2 = 1400; // per Sq.Ft.

    const laboutCessCompo2Calculation = (BuiltUp_area_SquareFeet) => {
      let labourCessComponentCharge2 = 0;
      if (BuiltUp_area_SquareFeet <= 10000) {
        labourCessComponentCharge2 =
          labourCessComponentUnitRate2 * BuiltUp_area_SquareFeet * 10.76;
      } else if (BuiltUp_area_SquareFeet > 10000) {
        labourCessComponentCharge2 =
          labourCessComponentUnitRate2 *
          BuiltUp_area_SquareFeet *
          10.76 *
          0.01 *
          0.02;
      }
      return labourCessComponentCharge2;
    };
    // ===== Total labour cess Compo 2 Charged====
    const TotalLabourCessComp2Charged = laboutCessCompo2Calculation(
      BuiltUp_area_SquareFeet
    );

    // =====UDA Total=====
    const UDATotal = () => {
      // Calculate UDA Total Charged
      const UDATotalCharged =
        builtUpAreaDevelopmentCharged +
        vacantAreaDevelopmentCharged +
        TotalPenalizationCharged +
        TotalOpenSpaceCharged +
        TotalLabourCessComp2Charged;
      return Math.round(UDATotalCharged);
    };
    // =====UDA Total Charged=====
    const UDATotalCharged = UDATotal();
    console.log(
      {
        builtUpAreaDevelopmentCharged,
        vacantAreaDevelopmentCharged,
        TotalPenalizationCharged,
        TotalOpenSpaceCharged,
        TotalLabourCessComp2Charged,
        UDATotalCharged,
      },
      "UDATotalCharged-in"
    );

    // =======Grama Panchayet Segment=======

    // ====Grama Panchayet fees====
    const bettermentChargedUnitRate = 40; //per Sqm.
    const bettermentCharged = bettermentChargedUnitRate * net_Plot_Area;

    // ====Paper Publication Charged====
    const paperPublicationCharged = 1500; //Fixed

    // ====Processing Fees====
    const processingUnitRate = 7; //per Sqm.
    const processingFees = processingUnitRate * builtup_Area;

    // =====Grama Panchayet Total=====
    const gramaPanchayetTotal = () => {
      return bettermentCharged + paperPublicationCharged + processingFees;
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
      nature_of_site,
      greenFeeCharged,
      TotalPenalizationCharged,
      TotalOpenSpaceCharged,
      bettermentCharged,
      processingFees,
      paperPublicationCharged,
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

  const getData = () => {
    console.log(document.getElementById("vacantArea"), "BY ID");
    console.log(document.getElementById("builtUpArea"), "BY ID");
    console.log(document.getElementById("UdaImpactFee"), "BY ID");
    console.log(document.getElementById("UDATotalCharged"), "BY ID");
    console.log(document.getElementById("gramaSiteApproval"), "BY ID");
    // console.log(document.getElementById("buildingPermitFees"), "BY ID");
    console.log(document.getElementById("bettermentCharged"), "BY ID");
    console.log(document.getElementById("TotalOpenSpaceCharged"), "BY ID");
    console.log(document.getElementById("gramaImpactFee"), "BY ID");
    console.log(document.getElementById("TotalPenalizationCharged"), "BY ID");
    console.log(document.getElementById("GramaPanchayetTotalCharged"), "BY ID");
    console.log(document.getElementById("gramaChallanNo"), "BY ID");
    console.log(document.getElementById("gramaChallanDate"), "BY ID");
    console.log(document.getElementById("gramaBankBranch"), "BY ID");
    console.log(document.getElementById("gramaBankName"), "BY ID");
    console.log(document.getElementById("labourCessSiteApproval"), "BY ID");
    console.log(document.getElementById("labourCessChallanNo"), "BY ID");
    console.log(document.getElementById("labourCessChallanDate"), "BY ID");
    console.log(document.getElementById("labourCessBankBranch"), "BY ID");
    console.log(document.getElementById("greenFeeSiteApproval"), "BY ID");
    console.log(document.getElementById("greenFeeChargeChallanNo"), "BY ID");
    console.log(document.getElementById("greenFeeChargeChallanDate"), "BY ID");
    console.log(document.getElementById("greenFeeChargeBankName"), "BY ID");
    console.log(document.getElementById("greenFeeChargeBankBranch"), "BY ID");
  };

  // send data into database
  const sendPaymentData = async (url) => {
    console.log("object");

    // let totalFileChecked = 1;

    console.log(selectedFiles, "SELECTED FILES");

    // UPLOAD IMAGE FILE INTO THE CLOUD STORAGE AT FIRST
    for (const file in selectedFiles) {
      const formData = new FormData();
      console.log(file);

      if (selectedFiles[file]) {
        formData.append("file", selectedFiles[file]);

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
            console.log(fileId, "fileId");
            // fileUploadSuccess = 1;
            imageId[file] = fileId;

            console.log(imageId, "IMAGE ID");
          }
        } catch (error) {
          console.log(error, "ERROR");
          // Handle errors, e.g., show an error message to the user
          toast.error("Error to upload documents");
        }
      }
    }

    const vacantArea = document.getElementById("vacantArea")?.value;

    const builtUpArea = document.getElementById("builtUpArea")?.value;
    // const UdaImpactFee = document.getElementById("UdaImpactFee")?.value;
    const UDATotalCharged = document.getElementById("UDATotalCharged")?.value;
    const gramaSiteApproval =
      document.getElementById("gramaSiteApproval")?.value;

    const bettermentCharged =
      document.getElementById("bettermentCharged")?.value;
    const TotalOpenSpaceCharged = document.getElementById(
      "TotalOpenSpaceCharged"
    )?.value;

    const TotalPenalizationCharged = document.getElementById(
      "TotalPenalizationCharged"
    )?.value;
    const GramaPanchayetTotalCharged = document.getElementById(
      "GramaPanchayetTotalCharged"
    )?.value;
    const gramaChallanNo = document.getElementById("gramaChallanNo")?.value;
    const gramaChallanDate = document.getElementById("gramaChallanDate")?.value;
    const gramaBankName = document.getElementById("gramaBankName")?.value;
    const gramaBankBranch = document.getElementById("gramaBankBranch")?.value;
    const labourCessSiteApproval = document.getElementById(
      "labourCessSiteApproval"
    )?.value;
    const labourCessChallanNo = document.getElementById(
      "labourCessChallanNo"
    )?.value;
    const labourCessChallanDate = document.getElementById(
      "labourCessChallanDate"
    )?.value;
    const labourCessBankName =
      document.getElementById("labourCessBankName")?.value;
    const labourCessBankBranch = document.getElementById(
      "labourCessBankBranch"
    )?.value;
    const greenFeeSiteApproval = document.getElementById(
      "greenFeeSiteApproval"
    )?.value;
    const greenFeeChargeChallanNo = document.getElementById(
      "greenFeeChargeChallanNo"
    )?.value;
    const greenFeeChargeChallanDate = document.getElementById(
      "greenFeeChargeChallanDate"
    )?.value;
    const greenFeeChargeBankName = document.getElementById(
      "greenFeeChargeBankName"
    )?.value;
    const greenFeeChargeBankBranch = document.getElementById(
      "greenFeeChargeBankBranch"
    )?.value;

    const udaCharge = {
      vacantArea: vacantArea ?? "",
      builtUpArea: builtUpArea ?? "",
      UDATotalCharged: UDATotalCharged ?? "",
    };
    const gramaPanchayatFee = {
      gramaSiteApproval: gramaSiteApproval ?? "",
      // buildingPermitFees: buildingPermitFees ?? "",
      bettermentCharged: bettermentCharged ?? "",
      TotalOpenSpaceCharged: TotalOpenSpaceCharged ?? "",
      gramaImpactFee: gramaImpactFee ?? "",
      TotalPenalizationCharged: TotalPenalizationCharged ?? "",
      GramaPanchayetTotalCharged: GramaPanchayetTotalCharged ?? "",
      gramaChallanNo: gramaChallanNo ?? "",
      gramaChallanDate: gramaChallanDate ?? "",
      gramaBankName: gramaBankName ?? "",
      gramaBankBranch: gramaBankBranch ?? "",
      gramaBankReceipt: imageId["gramaBankReceipt"],
    };
    const labourCessCharge = {
      labourCessBankBranch: labourCessBankBranch ?? "",
      labourCessBankName: labourCessBankName ?? "",
      labourCessChallanDate: labourCessChallanDate ?? "",
      labourCessChallanNo: labourCessChallanNo ?? "",
      labourCessSiteApproval: labourCessSiteApproval ?? "",
      labourCessBankReceipt: imageId["labourCessBankReceipt"],
    };
    const greenFeeCharge = {
      greenFeeChargeBankBranch: greenFeeChargeBankBranch ?? "",
      greenFeeChargeBankName: greenFeeChargeBankName ?? "",
      greenFeeChargeChallanDate: greenFeeChargeChallanDate ?? "",
      greenFeeChargeChallanNo: greenFeeChargeChallanNo ?? "",
      greenFeeSiteApproval: greenFeeSiteApproval ?? "",
      greenFeeBankReceipt: imageId["greenFeeBankReceipt"],
    };

    console.log("PRINT ALL GETTED DATA");

    console.log(udaCharge, gramaPanchayatFee, labourCessCharge, greenFeeCharge);

    return await sendUserDataIntoDB(url, "PATCH", {
      applicationNo: JSON.parse(localStorage.getItem("CurrentAppNo")),
      payment: {
        udaCharge,
        greenFeeCharge,
        labourCessCharge,
        gramaPanchayatFee,
      },
    });
  };

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid my-5 mx-7 font-roboto text-xl lg:my-0 lg:p-2 dark:text-gray-100"
      >
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
              id="labourCess02"
              name="labourCess02"
              label="Labour Cess Component 2"
              placeholder="0"
              type="number"
              ltpDetails={calculatedData?.TotalPenalizationCharged}
            />
            <InputField
              id="UDATotalCharged"
              name="UDATotalCharged"
              label="Total"
              placeholder="7000"
              type="number"
              ltpDetails={calculatedData?.UDATotalCharged}
            />
            {role === "LTP" && (
              <div>
                <button
                  className={`btn btn-md text-sm px-3 mt-10 ml-3  text-white shadow-md transition-all duration-500 ${gradientColor}`}
                >
                  <GiMoneyStack size={25} /> pay now
                </button>
              </div>
            )}
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
              id="paperPublication"
              name="paperPublication"
              label="Paper Publication Charges"
              placeholder="1000"
              type="number"
              ltpDetails={calculatedData?.paperPublicationCharged}
            />
            <InputField
              id="processingFee"
              name="processingFee"
              label="Processing Fee"
              placeholder="5000"
              type="number"
              ltpDetails={calculatedData?.processingFees}
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
              type="text"
              ltpDetails={
                applicationData?.payment?.gramaPanchayatFee?.gramaChallanNo ??
                ""
              }
            />
            <InputField
              id="gramaChallanDate"
              name="gramaChallanDate"
              label="DD/Challan date"
              placeholder="06-04-2023"
              type="text"
              ltpDetails={
                applicationData?.payment?.gramaPanchayatFee?.gramaChallanDate ??
                ""
              }
            />
            <InputField
              id="gramaBankName"
              name="gramaBankName"
              label="Bank name"
              placeholder="xxxx"
              type="text"
              ltpDetails={
                applicationData?.payment?.gramaPanchayatFee?.gramaBankName ?? ""
              }
            />
            <InputField
              id="gramaBankBranch"
              name="gramaBankBranch"
              label="Branch"
              placeholder="xxxx"
              type="text"
              ltpDetails={
                applicationData?.payment?.gramaPanchayatFee?.gramaBankBranch ??
                ""
              }
            />
          </div>
          <div className="px-3 mb-8 flex justify-end">
            <div className="form-control w-full max-w-xs">
              {role === "LTP" && (
                <input
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs dark:text-black dark:border-none"
                  id="gramaBankReceipt"
                  onChange={(e) => handleFileChange(e, "gramaBankReceipt")}
                />
              )}
            </div>
            {applicationData?.payment?.gramaPanchayatFee?.gramaBankReceipt && (
              <Link
                to={`https://drive.google.com/file/d/${applicationData?.payment?.gramaPanchayatFee?.gramaBankReceipt}/view?usp=sharing`}
                target="_blank"
                className="flex justify-center items-center ms-10 px-6  hover:underline bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-lg shadow-lg rounded-full"
              >
                <MdReceiptLong className="me-1" />
                View Challan
              </Link>
            )}
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
              id="labourCess01"
              name="labourCess01"
              label="Labour Cess Component 1"
              placeholder="3000"
              type="number"
              ltpDetails={calculatedData?.labourCessCompo1Charged}
            />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 mb-8">
            <InputField
              id="labourCessChallanNo"
              name="labourCessChallanNo"
              label="DD/Challan no."
              placeholder="1234"
              type="text"
              ltpDetails={
                applicationData?.payment?.labourCessCharge
                  ?.labourCessChallanNo ?? ""
              }
            />
            <InputField
              id="labourCessChallanDate"
              name="labourCessChallanDate"
              label="DD/Challan date"
              placeholder="06-04-2023"
              type="text"
              ltpDetails={
                applicationData?.payment?.labourCessCharge
                  ?.labourCessChallanDate ?? ""
              }
            />
            <InputField
              id="labourCessBankName"
              name="labourCessBankName"
              label="Bank name"
              placeholder="xxxx"
              type="text"
              ltpDetails={
                applicationData?.payment?.labourCessCharge
                  ?.labourCessBankName ?? ""
              }
            />
            <InputField
              id="labourCessBankBranch"
              name="labourCessBankBranch"
              label="Branch"
              placeholder="xxxx"
              type="text"
              ltpDetails={
                applicationData?.payment?.labourCessCharge
                  ?.labourCessBankBranch ?? ""
              }
            />
          </div>
          <div className="px-3 mb-4 flex justify-end">
            <div className="form-control w-full max-w-xs">
              {role === "LTP" && (
                <input
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs dark:text-black dark:border-none"
                  id="labourCessBankReceipt"
                  onChange={(e) => handleFileChange(e, "labourCessBankReceipt")}
                />
              )}
            </div>

            {applicationData?.payment?.labourCessCharge
              ?.labourCessBankReceipt && (
              <Link
                to={`https://drive.google.com/file/d/${applicationData?.payment?.labourCessCharge?.labourCessBankReceip}/view?usp=sharing`}
                target="_blank"
                className="flex justify-center items-center ms-10 px-6 hover:underline bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-lg shadow-lg rounded-full"
              >
                <MdReceiptLong className="me-1" />
                View Challan
              </Link>
            )}
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
              id="GreenFeeCharge"
              name="GreenFeeCharge"
              label="Green fee charge"
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
              type="text"
              ltpDetails={
                applicationData?.payment?.greenFeeCharge
                  ?.greenFeeChargeChallanNo ?? ""
              }
            />
            <InputField
              id="greenFeeChargeChallanDate"
              name="greenFeeChargeChallanDate"
              label="DD/Challan date"
              placeholder="06-04-2023"
              type="text"
              ltpDetails={
                applicationData?.payment?.greenFeeCharge
                  ?.greenFeeChargeChallanDate ?? ""
              }
            />
            <InputField
              id="greenFeeChargeBankName"
              name="greenFeeChargeBankName"
              label="Bank name"
              placeholder="xxxx"
              type="text"
              ltpDetails={
                applicationData?.payment?.greenFeeCharge
                  ?.greenFeeChargeBankName ?? ""
              }
            />
            <InputField
              id="greenFeeChargeBankBranch"
              name="greenFeeChargeBankBranch"
              label="Branch"
              placeholder="xxxx"
              type="text"
              ltpDetails={
                applicationData?.payment?.greenFeeCharge
                  ?.greenFeeChargeBankBranch ?? ""
              }
            />
          </div>
        </div>

        <div className="px-3 mb-4 flex justify-end">
          <div className="form-control w-full max-w-xs">
            {role === "LTP" && (
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs dark:text-black dark:border-none"
                id="greenFeeBankReceipt"
                onChange={(e) => handleFileChange(e, "greenFeeBankReceipt")}
              />
            )}
          </div>
          {applicationData?.payment?.greenFeeCharge?.greenFeeBankReceipt && (
            <Link
              to={`https://drive.google.com/file/d/${applicationData?.payment?.greenFeeCharge?.greenFeeBankReceipt}/view?usp=sharing`}
              target="_blank"
              className="flex justify-center items-center ms-10 px-6 hover:underline bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-lg shadow-lg rounded-full"
            >
              <MdReceiptLong className="me-1" />
              View Challan
            </Link>
          )}
        </div>

        {/* <input type="submit" value="GET" onClick={sendPaymentData} /> */}

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
    </>
  );
};

export default Payment;
