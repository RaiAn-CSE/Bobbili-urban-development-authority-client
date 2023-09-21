import React, { useContext, useEffect, useState } from "react";
import InputField from "../../../Components/InputField";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaHandPointRight } from "react-icons/fa";
import generalInfoImage from "../../../../assets/images/general-information.png";
import plotImage from "../../../../assets/images/land.png";
import wallImage from "../../../../assets/images/gate.png";
import usePostData from "../../../../CustomHook/usePostData";
import useGetDraftAppData from "../../../../CustomHook/useGetDraftAppData";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useOutletContext } from "react-router";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import SaveData from "./SaveData";
import FloorDetails from "./FloorDetails";

const BuildingInfo = () => {
  const stepperData = useOutletContext();

  const [isStepperVisible, currentStep, steps] = stepperData;

  const { confirmAlert } = useContext(AuthContext);

  console.log(isStepperVisible);
  // Case Type
  const [selectedOptionCase, setSelectedOptionCase] =
    useState("Select Case type");

  const [selectedOptionPermission, setSelectedOptionPermission] = useState(
    "Select Nature of permission"
  );

  // Nature of the site
  const [selectedNatureOfTheSite, setSelectedNatureOfTheSite] = useState(
    "Select Nature of the site"
  );
  const [showInputFields, setShowInputFields] = useState(false);

  // Add a state variable to keep track of the number of sets of input fields
  const [inputFieldCount, setInputFieldCount] = useState(0);

  // Function to add more 3 sets of input fields
  const handleAddInputFields = () => {
    if (inputFieldCount < 3) {
      setInputFieldCount(inputFieldCount + 1);
    }
  };

  // Case Type
  const handleCaseTypeChange = (e) => {
    setSelectedOptionCase(e.target.value);
  };
  const handlePermissionChange = (e) => {
    setSelectedOptionPermission(e.target.value);
  };

  // Nature of the site
  const handleNatureChange = (e) => {
    setSelectedNatureOfTheSite(e.target.value);

    // Check if the selected option should show additional input fields
    if (
      e.target.value === "Approved Layout" ||
      e.target.value === "Regularised under LRS" ||
      e.target.value === "Plot port of RLP/IPLP but not regularised"
    ) {
      setShowInputFields(true);
    } else {
      setShowInputFields(false);
    }
  };

  // Net Plot Area(in Sq.M.) Calculation :
  const [proposedPlotArea, setProposedPlotArea] = useState("");
  const [roadWideningArea, setRoadWideningArea] = useState("");
  const [netPlotArea, setNetPlotArea] = useState("");

  // ========================(Calculation part start)
  const handleProposedPlotAreaChange = (e) => {
    const newValue = e.target.value;
    // Check if the entered value is a valid number and less than or equal to 300
    if (newValue <= 300) {
      setProposedPlotArea(newValue);
      calculateNetPlotArea(newValue, roadWideningArea);
    }
  };

  const handleRoadWideningAreaChange = (e) => {
    const newValue = e.target.value;
    // Check if the entered value is a valid number and less than or equal to 300
    if (newValue <= 300) {
      setRoadWideningArea(newValue);
      calculateNetPlotArea(proposedPlotArea, newValue);
    }
  };

  const calculateNetPlotArea = (proposed, widening) => {
    const proposedArea = parseFloat(proposed);
    const wideningArea = parseFloat(widening);

    if (!isNaN(proposedArea) && !isNaN(wideningArea)) {
      const netArea = proposedArea - wideningArea;
      setNetPlotArea(netArea.toFixed(2)); // Format to 2 decimal places
    } else {
      setNetPlotArea("");
    }
  }; // ========================<<<(Calculation part End)>>>...

  const [totalFloor, setTotalFloor] = useState(["Floor1"]);

  const [builtUpAreaSum, setBuiltUpAreaSum] = useState(0);
  const [parkingAreaSum, setParkingAreaSum] = useState(0);

  const [builtUpArea, setBuiltUpArea] = useState([0]);
  const [parkingArea, setParkingArea] = useState([0]);

  // handleBuiltUpArea
  const handleBuiltUpArea = (value, index) => {
    console.log(index, "INDEX");

    const newBuiltUpArea = parseFloat(value) || 0;
    console.log(newBuiltUpArea, "newBuiltuparea");

    const updateArea = [...builtUpArea];

    updateArea[index] = newBuiltUpArea;

    console.log(updateArea, "Update Area");

    setBuiltUpArea(updateArea);

    // setBuiltUpAreaSum((prev) => prev + newBuiltUpArea);
  };

  console.log(builtUpArea, "BuiltupArea");

  const increaseFloorNo = () => {
    const newFloor = `Floor${totalFloor.length + 1}`;
    setTotalFloor((prev) => [...prev, newFloor]);
  };

  const handleParkingArea = (value, index) => {
    const newParkingArea = [...parkingArea];
    newParkingArea[index] = parseFloat(value) || 0;
    setParkingArea(newParkingArea);
  };

  useEffect(() => {
    const totalBuiltUpArea = builtUpArea.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });

    console.log(totalBuiltUpArea, "totalBuiltUpArea");

    setBuiltUpAreaSum(totalBuiltUpArea);

    const totalParkingArea = parkingArea.reduce(
      (acc, currentValue) => acc + currentValue,
      0
    );

    setParkingAreaSum(totalParkingArea);
  }, [builtUpArea, parkingArea]);

  // ======================================================<<<(Built Up Area Calculation End)>>>>...

  // get data from input field :
  const collectInputFieldData = () => {
    // ==================================================<<<(General Information)>>>:
    const selectedApplicationType =
      document.querySelector('input[name="radio-1"]:checked')?.value || ""; // Get selected radio input's value

    const surveyNo = document.getElementById("SurveyNo").value;
    const gramaPanchayat = document.getElementById("GramaPanchayat").value;

    const bpsApprovedElement = document.getElementById("BpsApprovedNo");
    const bpsApprovedNo = bpsApprovedElement ? bpsApprovedElement.value : "";

    const previewsApprovedFileElement = document.getElementById(
      "PreviewsApprovedFileNo"
    );
    const previewsApprovedFileNo = previewsApprovedFileElement
      ? previewsApprovedFileElement.value
      : "";

    const lpNoElement = document.getElementById("LpNo");
    const lpNo = lpNoElement ? lpNoElement.value : "";

    const plotNoElement = document.getElementById("PlotNo");
    const plotNo = plotNoElement ? plotNoElement.value : "";

    const lrsNoElement = document.getElementById("LrsNo");
    const lrsNo = lrsNoElement ? lrsNoElement.value : "";

    const plotNo2Element = document.getElementById("PlotNo2");
    const plotNo2 = plotNo2Element ? plotNo2Element.value : "";

    const iplpNoElement = document.getElementById("IplpNo");
    const iplpNo = iplpNoElement ? iplpNoElement.value : "";
    const totalPlotDocument =
      document.getElementById("TotalPlotDocument").value; // ==========<<<(Plot Details)>>>:
    const totalPlotGround = document.getElementById("TotalPlotGround").value;
    const netPlotArea = document.getElementById("NetPlotArea").value;

    const existingRoad =
      document.querySelector('input[name="radio-2"]:checked')?.value || "";
    const statusOfRoad =
      document.querySelector('input[name="radio-3"]:checked')?.value || "";

    const natureOfRoad = document.getElementById("natureOfRoad").value;
    const existingRoadMts = document.getElementById("existingRoadMts").value;
    const proposedRoadMts = document.getElementById("proposedRoadMts").value;
    const marketValueSqym = document.getElementById("marketValueSqym").value;

    console.log(totalFloor, "totalFloor");

    const floorDetails = totalFloor.map((floor, index) => {
      console.log(floor);

      return {
        name: document.getElementById(`floorName${index}`).value,
        builtUpArea: document.getElementById(`builtUpArea${index}`).value,
        parkingArea: document.getElementById(`parkingArea${index}`).value,
      };
    });

    console.log(floorDetails, "FloorDetails");

    const totalBuiltUpArea = document.getElementById("totalBuiltUpArea").value;
    const totalParkingArea = document.getElementById("totalParkingArea").value;
    const frontSetback = document.getElementById("frontSetback").value;
    const rareSetback = document.getElementById("rareSetback").value;
    const side1Setback = document.getElementById("side1Setback").value;
    const side2Setback = document.getElementById("side2Setback").value;
    const buildingExcludeStilt = document.getElementById(
      "buildingExcludeStilt"
    ).value;

    const compoundingWallProposed =
      document.querySelector('input[name="radio-4"]:checked')?.value || "";
    const siteRegistered =
      document.querySelector('input[name="radio-5"]:checked')?.value || "";
    const north = document.getElementById("north").value; // ==========================<<<(Schedule of Boundaries)>>>:
    const south = document.getElementById("south").value;
    const east = document.getElementById("east").value;
    const west = document.getElementById("west").value;

    const generalInformation = {
      caseType: selectedOptionCase,
      applicationType: selectedApplicationType,
      natureOfPermission: selectedOptionPermission,
      natureOfTheSite: selectedNatureOfTheSite,
      surveyNo,
      district: selectedDistrict,
      mandal: selectedMandal,
      gramaPanchayat,
      village: selectedVillage,
      bpsApprovedNo,
      previewsApprovedFileNo,
      lpNo,
      plotNo,
      lrsNo,
      plotNo2,
      iplpNo,
    };

    const plotDetails = {
      totalPlotDocument,
      totalPlotGround,
      proposedPlotArea,
      roadWideningArea,
      netPlotArea,
      statusOfRoad,
      existingRoad,
      natureOfRoad,
      existingRoadMts,
      proposedRoadMts,
      marketValueSqym,
      floorDetails,
      totalBuiltUpArea,
      totalParkingArea,
      frontSetback,
      rareSetback,
      side1Setback,
      side2Setback,
      buildingExcludeStilt,
      compoundingWallProposed,
      siteRegistered,
    };

    const scheduleBoundaries = {
      north,
      south,
      east,
      west,
    };

    const buildingInfo = {
      generalInformation,
      plotDetails,
      scheduleBoundaries,
    };
  };

  const [districtData, setDistrictData] = useState([]); //==========<<<<<(District, Mandal & Village Start)>>>>> :
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedMandal, setSelectedMandal] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");

  useEffect(() => {
    const apiUrl = "../../src/assets/buildingInfo.json";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((result) => {
        console.log(result, "json fetch");
        setDistrictData(result.district);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setSelectedDistrict(selectedDistrict);
    // Reset selected mandal and village when district changes
    setSelectedMandal("");
    setSelectedVillage("");
  };

  const handleMandalChange = (event) => {
    const selectedMandal = event.target.value;
    setSelectedMandal(selectedMandal);
    // Reset selected village when mandal changes
    setSelectedVillage("");
  }; //============================================================<<<<<(District, Mandal & Village End)>>>>> :

  // save data into database

  return (
    <div className="grid my-5 lg:my-0 lg:p-2">
      {/* general information */}
      <div className="mb-10">
        {/* heading  */}
        <div className="flex items-center">
          <img src={generalInfoImage} alt="" className="h-10 me-3" />
          <h3 className="font-bold text-xl ">General Information</h3>
        </div>
        {/* divider  */}
        <div className="divider m-0 mb-2"></div>

        <div className="grid grid-cols-2 lg:grid-cols-4 my-5">
          <div className="flex flex-col justify-center px-3">
            <label
              htmlFor="nature"
              className="block text-gray-600 mb-1 font-semibold"
            >
              <span>Case Type</span>
            </label>
            <select
              id="caseType"
              className="w-full px-3 py-[10px] border border-[#10AC84] rounded-lg max-w-xs"
              value={selectedOptionCase}
              onChange={handleCaseTypeChange}
            >
              <option disabled selected value="Select Case type">
                Select Case type
              </option>
              <option value="New">New</option>
              <option value="Demolition and Reconstruction">
                Demolition and Reconstruction
              </option>
              <option value="Alteration Addition Existing">
                Alteration Addition Existing
              </option>
              <option value="Revision">Revision</option>
            </select>
          </div>

          <div className="grid grid-cols-1 font-medium  lg:justify-items-center my-4 mx-3">
            <p className="flex items-center font-semibold text-gray-600">
              Application Type?
            </p>
            <div className="grid-cols-1 lg:grid-cols-2 items-center">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="radio-1"
                  className="radio border border-[#10AC84] h-4 w-4"
                  value="Private"
                />
                <span className="ml-2 text-base">Private</span>
              </label>
              <label className="inline-flex items-center md:ml-3">
                <input
                  type="radio"
                  name="radio-1"
                  className="radio border border-[#10AC84] h-4 w-4"
                  value="Govt. Land"
                />
                <span className="ml-2 text-base">Govt. Land</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col justify-center mx-3">
            <label className="block text-gray-600 mb-1 font-semibold">
              <span>Nature of permission</span>
            </label>
            <select
              className="w-full px-3 py-[10px] border border-[#10AC84] rounded-lg max-w-xs"
              value={selectedOptionPermission}
              onChange={handlePermissionChange}
            >
              <option disabled selected value="Select Nature of permission">
                Select Nature of permission
              </option>
              <option value="General">General</option>
              <option value="Regularised under BPS">
                Regularised under BPS
              </option>
              <option value="Housing Scheme">Housing Scheme</option>
            </select>
          </div>

          <div className="my-4 mx-3">
            <label
              htmlFor="nature"
              className="block text-gray-600 mb-1 font-semibold"
            >
              <span>Nature of the site</span>
            </label>
            <select
              id="nature"
              className="w-full px-3 py-[10px] border border-[#10AC84] rounded-lg max-w-xs"
              value={selectedNatureOfTheSite}
              onChange={handleNatureChange}
            >
              <option disabled selected>
                Select Nature of the site
              </option>
              <option>Approved Layout</option>
              <option>Regularised under LRS</option>
              <option>Plot port of RLP/IPLP but not regularised</option>
              <option>Congested/ Gramakanta/ Old Built-up area</option>
              <option>Newly Developed/ Built up area</option>
            </select>
          </div>

          <InputField
            id="SurveyNo"
            name="Survey no."
            label="Survey no."
            placeholder="Survey no."
            type="text"
          />

          <div className="flex flex-col justify-center mx-3">
            <label className="block text-gray-600 mb-1 font-semibold">
              <span>District</span>
            </label>
            <select
              id="District"
              name="District"
              className="w-full px-3 py-[10px] border border-[#10AC84] rounded-lg max-w-xs"
              onChange={handleDistrictChange}
              value={selectedDistrict}
            >
              <option value="" disabled>
                Select District
              </option>
              {districtData.map((district) => (
                <option key={district.name} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col justify-center mx-3">
            <label className="block text-gray-600 mb-1 font-semibold">
              <span>Mandal</span>
            </label>
            <select
              id="Mandal"
              name="Mandal"
              className="w-full px-3 py-[10px] border border-[#10AC84] rounded-lg max-w-xs"
              onChange={handleMandalChange}
              value={selectedMandal}
              disabled={!selectedDistrict}
            >
              <option value="" disabled>
                Select Mandal
              </option>
              {selectedDistrict &&
                districtData
                  .find((district) => district.name === selectedDistrict)
                  ?.mandal.map((mandal) => (
                    <option key={mandal.name} value={mandal.name}>
                      {mandal.name}
                    </option>
                  ))}
            </select>
          </div>

          <InputField
            id="GramaPanchayat"
            name="Grama Panchayat"
            label="Grama Panchayat"
            placeholder="Grama Panchayat"
          />

          <div className="flex flex-col justify-center mx-3">
            <label className="block text-gray-600 mb-1 font-semibold">
              <span>Village</span>
            </label>
            <select
              id="Village"
              name="Village"
              className="w-full px-3 py-[10px] border border-[#10AC84] rounded-lg max-w-xs"
              value={selectedVillage}
              onChange={(e) => setSelectedVillage(e.target.value)}
              disabled={!selectedMandal}
            >
              <option value="" disabled>
                Select Village
              </option>
              {selectedMandal &&
                districtData
                  .find((district) => district.name === selectedDistrict)
                  ?.mandal.find((mandal) => mandal.name === selectedMandal)
                  ?.village.map((village) => (
                    <option key={village} value={village}>
                      {village}
                    </option>
                  ))}
            </select>
          </div>

          {/*===================== Conditionally render input fields based on Case Type  =====================*/}
          {selectedOptionCase === "Alteration Addition Existing" &&
            selectedOptionPermission === "Regularised under BPS" && (
              <div>
                <InputField
                  id="BpsApprovedNo"
                  name="BpsApprovedNo"
                  label="BPS approved no."
                  placeholder="BPS approved no."
                  type="number"
                />
              </div>
            )}

          {selectedOptionCase === "Alteration Addition Existing" &&
            selectedOptionPermission !== "Regularised under BPS" && (
              <div>
                <InputField
                  id="PreviewsApprovedFileNo"
                  name="PreviewsApprovedFileNo"
                  label="Previews approved file no."
                  placeholder="Previews approved file no."
                  type="number"
                />
              </div>
            )}

          {/* Conditionally render input fields based on Nature of the site */}
          {showInputFields && (
            <>
              {selectedNatureOfTheSite === "Approved Layout" && (
                <>
                  <InputField
                    id="LpNo"
                    name="LpNo"
                    label="L.P. no."
                    placeholder="L.P. no."
                    type="number"
                  />
                  <InputField
                    id="PlotNo"
                    name="PlotNo"
                    label="Plot no."
                    placeholder="Plot no."
                    type="number"
                  />
                </>
              )}
              {selectedNatureOfTheSite === "Regularised under LRS" && (
                <>
                  <InputField
                    id="LrsNo"
                    name=""
                    label="LRS no"
                    placeholder="LRS no."
                    type="number"
                  />
                  <InputField
                    id="PlotNo2"
                    name=""
                    label="Plot no"
                    placeholder="Plot no."
                    type="number"
                  />
                </>
              )}
              {selectedNatureOfTheSite ===
                "Plot port of RLP/IPLP but not regularised" && (
                <InputField
                  id="IplpNo"
                  name=""
                  label="RLP/IPLP no."
                  placeholder="RLP/IPLP no."
                  type="number"
                />
              )}
            </>
          )}
          {/*===================== Conditional Input Field End =====================*/}
        </div>
      </div>

      {/* plot details  */}
      <div className="mb-5">
        <div className="flex items-center">
          <img src={plotImage} alt="" className="h-10 me-3" />
          <h3 className="font-bold text-xl my-3">Plot Details</h3>
        </div>
        <div className="divider m-0"></div>

        <div className="grid grid-cols-2 lg:grid-cols-4 mt-5">
          <InputField
            type="number"
            id="TotalPlotDocument"
            name=""
            label="Total Plot are as per document"
            placeholder="in Sq.M."
          />
          <InputField
            type="number"
            id="TotalPlotGround"
            name=""
            label="Total Plot are as on ground"
            placeholder="in Sq.M."
          />

          <div className="my-4 mx-3">
            <label
              htmlFor="ProposedPlotArea"
              className="block text-gray-600 mb-1 font-semibold"
            >
              Proposed Plot area
            </label>
            <input
              type="number"
              id="ProposedPlotArea"
              placeholder="in Sq.M."
              className="w-full px-3 py-2 border border-green-600 rounded-lg max-w-xs"
              value={proposedPlotArea}
              onChange={handleProposedPlotAreaChange}
            />
          </div>

          <div className="my-4 mx-3">
            <label
              htmlFor="ProposedPlot"
              className="block text-gray-600 mb-1 font-semibold"
            >
              Road Widening Area
            </label>
            <input
              type="number"
              placeholder="in Sq.M."
              className="w-full px-3 py-2 border border-green-600 rounded-lg max-w-xs"
              value={roadWideningArea}
              onChange={handleRoadWideningAreaChange}
            />
          </div>

          {/* Automatically calculated Plot Details  */}
          <div className="my-4 mx-3">
            <label
              htmlFor="disabled-input"
              className="block text-gray-600 mb-1 font-semibold"
            >
              Net Plot Area (in Sq.M.)
            </label>
            <input
              type="text"
              id="NetPlotArea"
              name="NetPlotArea"
              placeholder="Automatically calculated"
              className="w-full px-3 py-2 border rounded-lg max-w-xs"
              value={netPlotArea}
              disabled
            />
          </div>
        </div>

        <div className="grid grid-cols-1 mx-5 md:mx-10 lg:mx-14 my-10">
          <div className="flex flex-col md:flex-row font-medium mb-4 text-lg">
            <div className="flex items-center mb-3 md:mb-0">
              <FaHandPointRight className="me-3 w-5 lg:w-auto text-green-500" />
              <p className="font-bold text-lg">
                Whether site abuts any Existing Road?
              </p>
            </div>
            <label className="inline-flex items-center ml-3">
              <input
                type="radio"
                name="radio-2"
                className="radio border border-[#10AC84] h-4 w-4"
                value="yes"
              />
              <span className="ml-2 text-base">Yes</span>
            </label>
            <label className="inline-flex items-center ml-3">
              <input
                type="radio"
                name="radio-2"
                className="radio border border-[#10AC84] h-4 w-4"
                value="no"
              />
              <span className="ml-2 text-base">No</span>
            </label>
          </div>

          <div className="flex flex-col md:flex-row font-medium mb-4 text-lg mt-4">
            <div className="flex items-center mb-3 md:mb-0">
              <FaHandPointRight className="me-3 w-5 lg:w-auto text-green-500" />
              <p className="font-bold text-lg">Status of Road?</p>
            </div>
            <label className="inline-flex items-center ml-3">
              <input
                type="radio"
                name="radio-3"
                className="radio border border-[#10AC84] h-4 w-4"
                value="Public"
              />
              <span className="ml-2 text-base">Public</span>
            </label>
            <label className="inline-flex items-center ml-3">
              <input
                type="radio"
                name="radio-3"
                className="radio border border-[#10AC84] h-4 w-4"
                value="Private"
              />
              <span className="ml-2 text-base">Private</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 mt-3">
          <div className="flex flex-col justify-center mx-3">
            <label className="block text-gray-600 mb-1 font-semibold">
              <span>Nature of Road</span>
            </label>
            <select
              id="natureOfRoad"
              className="w-full px-3 py-[10px] border border-[#10AC84] rounded-lg max-w-xs"
            >
              <option disabled selected>
                Select Nature of Road
              </option>
              <option>BT Road</option>
              <option>CC Road</option>
              <option>WBM</option>
              <option>Kutchha/ Graval</option>
            </select>
          </div>

          <InputField
            id="existingRoadMts"
            name="name1"
            label="Existing road (in Mts.)"
            placeholder="in Sq.M."
          />
          <InputField
            id="proposedRoadMts"
            name="name1"
            label="Proposed road (in Mts.)"
            placeholder="in Sq.M."
          />
          <InputField
            id="marketValueSqym"
            name="name1"
            label="Market Value (per Sq.Yd.)"
            placeholder="per Sq.Yd."
          />
        </div>

        {/* Render additional input field sets based on inputFieldCount */}
        {/* {Array.from({ length: inputFieldCount }).map((_, index) => (
          <div key={index} className="grid grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col justify-center mx-3">
              <label className="block text-gray-600 mb-1 font-semibold">
                <span>Floor Name</span>
              </label>
              <select
                id={`floorName${index}`}
                className="w-full px-3 py-[10px] border border-[#10AC84] rounded-lg max-w-xs"
              >
                <option disabled selected>
                  Select Floor Name
                </option>
                <option>Stilt / Parking Floor</option>
                <option>Ground floor</option>
                <option>First Floor</option>
                <option>Second Floor</option>
              </select>
            </div>

            <div className="my-4 mx-3">
              <label
                htmlFor={`builtUpArea${index}`}
                className="block text-gray-600 mb-1 font-semibold"
              >
                Built up area (in Sq.M.)
              </label>
              <input
                type="number"
                id={`builtUpArea${index}`}
                placeholder="in Sq.M."
                className="w-full px-3 py-2 border border-green-600 rounded-lg max-w-xs"
                value={builtUpArea[index] || ""}
                onChange={(e) => handleBuiltUpArea(index, e.target.value)}
              />
            </div>

            <div className="my-4 mx-3">
              <label
                htmlFor={`parkingArea${index}`}
                className="block text-gray-600 mb-1 font-semibold"
              >
                Parking Area (in Sq.M.)
              </label>
              <input
                type="number"
                id={`parkingArea${index}`}
                placeholder="in Sq.M."
                className="w-full px-3 py-2 border border-green-600 rounded-lg max-w-xs"
                value={parkingArea[index] || ""}
                onChange={(e) => handleParkingArea(index, e.target.value)}
              />
            </div>
          </div>
        ))} */}

        <div className="grid grid-cols-2 lg:grid-cols-4">
          {totalFloor.map((floor, index) => (
            <FloorDetails
              key={index}
              floor={floor}
              index={index}
              length={totalFloor.length}
              increaseFloorNo={increaseFloorNo}
              handleBuiltUpArea={handleBuiltUpArea}
              handleParkingArea={handleParkingArea}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 mt-5">
          <div className="my-4 mx-3">
            <label
              htmlFor="disabled-input"
              className="block text-gray-600 mb-1 font-semibold"
            >
              Total Built up area
            </label>
            <input
              type="text"
              id="totalBuiltUpArea"
              name="name1"
              placeholder="Automatically calculated"
              className="w-full px-3 py-2 border rounded-lg max-w-xs"
              value={builtUpAreaSum}
              disabled
            />
          </div>

          <div className="my-4 mx-3">
            <label
              htmlFor="disabled-input2"
              className="block text-gray-600 mb-1 font-semibold"
            >
              Total Parking area
            </label>
            <input
              id="totalParkingArea"
              name="name1"
              placeholder="Automatically calculated"
              className="w-full px-3 py-2 border rounded-lg max-w-xs"
              value={parkingAreaSum}
              disabled
            />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4">
          <InputField
            id="frontSetback"
            name="name72"
            label="Front setback (in M.)"
            placeholder="in M."
          />
          <InputField
            id="rareSetback"
            name="name1"
            label="Rare setback (in M.)"
            placeholder="in M."
          />
          <InputField
            id="side1Setback"
            name="name1"
            label="Side1 setback (in M.)"
            placeholder="in M."
          />
          <InputField
            id="side2Setback"
            name="name1"
            label="Side 2 setback (in M.)"
            placeholder="in M."
          />
          <InputField
            id="buildingExcludeStilt"
            name="name1"
            label="Total Height of The Building Exclude Stilt (in Mts.)"
            placeholder="in Mts."
          />
        </div>

        <div className="grid grid-cols-1 mx-5 md:mx-10 lg:mx-14 my-10">
          <div className="flex flex-col md:flex-row font-medium mb-4 text-lg">
            <div className="flex items-center mb-3 md:mb-0">
              <FaHandPointRight className="me-3 w-5 lg:w-auto text-green-500" />
              <p className="font-bold text-lg">Compounding wall proposed?</p>
            </div>
            <label className="inline-flex items-center ml-3">
              <input
                type="radio"
                name="radio-4"
                className="radio border border-[#10AC84] h-4 w-4"
                value="yes"
              />
              <span className="ml-2 text-base">Yes</span>
            </label>
            <label className="inline-flex items-center ml-3">
              <input
                type="radio"
                name="radio-4"
                className="radio border border-[#10AC84] h-4 w-4"
                value="no"
              />
              <span className="ml-2 text-base">No</span>
            </label>
          </div>

          <div className="flex flex-col md:flex-row font-medium mb-4 text-lg mt-4">
            <div className="flex items-center mb-3 md:mb-0">
              <FaHandPointRight className="me-3 w-7 lg:w-auto text-green-500" />
              <p className="font-bold text-lg">
                Whether site Registered as house plot/ Building prior to
                18-01-2006?
              </p>
            </div>
            <label className="inline-flex items-center ml-3">
              <input
                type="radio"
                name="radio-5"
                className="radio border border-[#10AC84] h-4 w-4"
                value="Yes"
              />
              <span className="ml-2 text-base">Yes</span>
            </label>
            <label className="inline-flex items-center ml-3">
              <input
                type="radio"
                name="radio-5"
                className="radio border border-[#10AC84] h-4 w-4"
                value="No"
              />
              <span className="ml-2 text-base">No</span>
            </label>
          </div>
        </div>
      </div>

      {/* schedule boundaries  */}
      <div>
        <div className="flex items-center mb-2">
          <img src={wallImage} alt="A image of wall" className="h-8 me-3" />
          <h3 className="font-bold text-xl">Schedule of Boundaries</h3>
        </div>
        <div className="divider m-0"></div>
        <div className="grid grid-cols-2 lg:grid-cols-4 items-center my-5">
          <div className="flex flex-col  justify-center mx-3">
            <label className="block text-gray-600 mb-1 font-semibold">
              <span>North</span>
            </label>
            <select
              id="north"
              className="w-full px-3 py-[10px] border border-[#10AC84] rounded-lg max-w-xs"
            >
              <option disabled selected>
                Select North
              </option>
              <option>Road</option>
              <option>Plot</option>
              <option>Vacant land</option>
              <option>Water body</option>
            </select>
          </div>

          <div className="flex flex-col  justify-center mx-3">
            <label className="block text-gray-600 mb-1 font-semibold">
              <span>South</span>
            </label>
            <select
              id="south"
              className="w-full px-3 py-[10px] border border-[#10AC84] rounded-lg max-w-xs"
            >
              <option disabled selected>
                Select South
              </option>
              <option>Road</option>
              <option>Plot</option>
              <option>Vacant land</option>
              <option>Water body</option>
            </select>
          </div>

          <div className="flex flex-col  justify-center mx-3">
            <label className="block text-gray-600 mb-1 font-semibold">
              <span>East</span>
            </label>
            <select
              id="east"
              className="w-full px-3 py-[10px] border border-[#10AC84] rounded-lg max-w-xs"
            >
              <option disabled selected>
                Select East
              </option>
              <option>Road</option>
              <option>Plot</option>
              <option>Vacant land</option>
              <option>Water body</option>
            </select>
          </div>

          <div className="flex flex-col  justify-center mx-3">
            <label className="block text-gray-600 mb-1 font-semibold">
              <span>West</span>
            </label>
            <select
              id="west"
              className="w-full px-3 py-[10px] border border-[#10AC84] rounded-lg max-w-xs"
            >
              <option disabled selected>
                Select West
              </option>
              <option>Road</option>
              <option>Plot</option>
              <option>Vacant land</option>
              <option>Water body</option>
            </select>
          </div>
        </div>
      </div>

      <button type="submit" className="btn" onClick={collectInputFieldData}>
        Get Data
      </button>

      {/* save & continue  */}
      {/* navigation button  */}
      <SaveData
        isStepperVisible={isStepperVisible}
        currentStep={currentStep}
        steps={steps}
        stepperData={stepperData}
        confirmAlert={confirmAlert}
      />
    </div>
  );
};

export default BuildingInfo;
