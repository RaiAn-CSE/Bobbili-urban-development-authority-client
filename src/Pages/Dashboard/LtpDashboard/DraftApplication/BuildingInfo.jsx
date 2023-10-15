import React, { useContext, useEffect, useState } from "react";
import InputField from "../../../Components/InputField";
import { FaHandPointRight } from "react-icons/fa";
import generalInfoImage from "../../../../assets/images/general-information.png";
import plotImage from "../../../../assets/images/land.png";
import wallImage from "../../../../assets/images/gate.png";
import { useOutletContext } from "react-router";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import allDistrictData from "../../../../assets/buildingInfo.json";
import SaveData from "./SaveData";
import FloorDetails from "./FloorDetails";

const BuildingInfo = () => {
  const stepperData = useOutletContext();

  const [isStepperVisible, currentStep, steps] = stepperData;

  const {
    confirmAlert,
    sendUserDataIntoDB,
    userInfoFromLocalStorage,
    getApplicationData,
  } = useContext(AuthContext);

  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));

  const { _id: id } = userInfoFromLocalStorage();

  // Here declared all variables initial value in the use state

  // general information sections all variable initialization

  const [dataFromDB, setDataFromDB] = useState({});

  const [generalInformation, setGeneralInformation] = useState("");
  // Case Type
  const [selectedOptionCase, setSelectedOptionCase] = useState("");
  const [selectedOptionPermission, setSelectedOptionPermission] =
    useState("General");
  const [selectedNatureOfTheSite, setSelectedNatureOfTheSite] = useState("");

  const [districtData, setDistrictData] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedMandal, setSelectedMandal] = useState("");
  const [selectedGrama, setSelectedGrama] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");

  // HERE PLOT DETAIL SECTIONS VARIABLES ARE INITIALIZED
  const [plotDetails, setPlotDetails] = useState("");
  const [plotDetailsFloor, setPlotDetailsFloor] = useState("");
  const [scheduleBoundaries, setScheduleBoundaries] = useState("");

  const [totalFloor, setTotalFloor] = useState(["Floor1"]);

  const [builtUpAreaSum, setBuiltUpAreaSum] = useState(0);
  const [parkingAreaSum, setParkingAreaSum] = useState(0);

  const [builtUpArea, setBuiltUpArea] = useState([0, 0, 0, 0]);
  const [parkingArea, setParkingArea] = useState([0, 0, 0, 0]);

  const [proposedPlotArea, setProposedPlotArea] = useState("");
  const [roadWideningArea, setRoadWideningArea] = useState("");
  const [netPlotArea, setNetPlotArea] = useState("");

  // HERE SCHEDULE BOUNDARIES SECTIONS VARIABLES ARE INITIALIZED
  // Selector Get Data from server:
  const [natureOfRoadValue, setNatureOfRoadValue] = useState("");
  const [northValue, setNorthValue] = useState("");
  const [southValue, setSouthValue] = useState("");
  const [eastValue, setEastValue] = useState("");
  const [westValue, setWestValue] = useState("");

  // options

  const [floorOptions, setFloorOptions] = useState([
    "Stilt / Parking Floor",
    "Ground Floor",
    "First Floor",
    "Second Floor",
  ]);

  // const [floorTrack, setFloorTrack] = useState([
  //   "Stilt / Parking Floor",
  //   "Ground Floor",
  //   "First Floor",
  //   "Second Floor",
  // ]);

  // SIDE EFFECT HANDLED

  // HERE TOTAL BUILTUP AREA AND TOTAL PARKING AREA IS CALCULATED
  useEffect(() => {
    const totalBuiltUpArea = builtUpArea.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });

    setBuiltUpAreaSum(totalBuiltUpArea === 0 ? "" : totalBuiltUpArea);

    const totalParkingArea = parkingArea.reduce(
      (acc, currentValue) => acc + currentValue,
      0
    );

    setParkingAreaSum(totalParkingArea === 0 ? "" : totalParkingArea);
  }, [builtUpArea, parkingArea]);

  // HERE NET PLOTAREA CALCULATED
  useEffect(() => {
    const plot = proposedPlotArea === "" ? 0 : proposedPlotArea;
    const roadWide = roadWideningArea === "" ? 0 : roadWideningArea;
    calculateNetPlotArea(plot, roadWide);
  }, [proposedPlotArea, roadWideningArea]);

  // HERE DATA IS GETTING FROM THE DATABASE AS WELL AS UPDATING THE USE STATES  AND  ALL DISTRICTS ARE FETCHED
  useEffect(() => {
    const getData = async () => {
      const applicationData = await getApplicationData(applicationNo);
      console.log(applicationData, "All info ApplicationData");
      if (Object.keys(applicationData).length) {
        setDataFromDB(applicationData);
      }
    };
    getData();

    // const apiUrl = "../../src/assets/buildingInfo.json";
    // fetch(apiUrl)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     setDistrictData(result.district);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });

    setDistrictData(allDistrictData.district);
  }, []);

  useEffect(() => {
    if (Object.keys(dataFromDB).length) {
      const generalInformation = dataFromDB?.buildingInfo?.generalInformation;

      const plotDetails = dataFromDB?.buildingInfo?.plotDetails;

      const scheduleBoundaries = dataFromDB?.buildingInfo?.scheduleBoundaries;

      if (Object.keys(generalInformation).length) {
        setGeneralInformation(generalInformation);
        setSelectedOptionCase(generalInformation?.caseType);
        setSelectedOptionPermission(generalInformation?.natureOfPermission);
        setSelectedNatureOfTheSite(generalInformation?.natureOfTheSite);
        setSelectedDistrict(generalInformation?.district);
        setSelectedMandal(generalInformation?.mandal);
        setSelectedGrama(generalInformation?.gramaPanchayat);
        setSelectedVillage(generalInformation?.village);
      }

      if (Object.keys(plotDetails).length) {
        const plotDetailsFloor =
          dataFromDB?.buildingInfo?.plotDetails?.floorDetails;
        setRadio4(plotDetails?.compoundingWallProposed);
        setRadio5(plotDetails?.siteRegistered);
        // update floor details as well as builtup area and parking area
        plotDetails?.floorDetails?.map((floor, index) => {
          setBuiltUpArea((prev) => {
            const oldData = [...prev];
            oldData[index] = parseFloat(floor?.builtUpArea);

            return oldData;
          });
          setParkingArea((prev) => {
            const oldData = [...prev];
            oldData[index] = parseFloat(floor?.parkingArea);

            return oldData;
          });
        });
        setPlotDetails(plotDetails);
        setPlotDetailsFloor(plotDetailsFloor);
        setProposedPlotArea(plotDetails?.proposedPlotAreaCal);
        setRoadWideningArea(plotDetails?.roadWideningAreaCal);
        setNetPlotArea(plotDetails?.netPlotAreaCal);
        setBuiltUpAreaSum(plotDetails?.totalBuiltUpArea);
        setParkingAreaSum(plotDetails?.totalParkingArea);
        setNatureOfRoadValue(plotDetails?.natureOfRoad);
      }

      if (Object.keys(scheduleBoundaries).length) {
        setWestValue(scheduleBoundaries?.west);
        setEastValue(scheduleBoundaries?.east);
        setSouthValue(scheduleBoundaries?.south);
        setNorthValue(scheduleBoundaries?.north);

        setScheduleBoundaries(scheduleBoundaries);
      }
    }
  }, [dataFromDB]);

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
  };

  // ========================(Calculation part start)
  const handleProposedPlotAreaChange = (e) => {
    let newValue = e.target.value;
    // Check if the entered value is a valid number and less than or equal to 300

    const roadWideValue = roadWideningArea !== "" ? roadWideningArea : 0;
    if (newValue > 300) {
      e.target.value = 300;
      newValue = 300;
    }
    if (newValue < 0) {
      e.target.value = 0;
      newValue = 0;
    }
    setProposedPlotArea(newValue);
  };

  const handleRoadWideningAreaChange = (e) => {
    let newValue = e.target.value;
    // Check if the entered value is a valid number and less than or equal to 300
    if (newValue > 300) {
      e.target.value = 300;
      newValue = 300;
    }
    if (newValue < 0) {
      e.target.value = 0;
      newValue = 0;
    }
    setRoadWideningArea(newValue);
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
  };
  // ========================<<<(Calculation part End)>>>...

  // handleBuiltUpArea
  const handleBuiltUpArea = (value, index) => {
    const newBuiltUpArea = parseFloat(value) || 0;
    const updateArea = [...builtUpArea];
    updateArea[index] = newBuiltUpArea;
    setBuiltUpArea(updateArea);
  };

  const increaseFloorNo = () => {
    const newFloor = `Floor${totalFloor.length + 1}`;
    setTotalFloor((prev) => [...prev, newFloor]);
  };

  const decreaseFloorNo = () => {
    totalFloor.pop();
    setTotalFloor([...totalFloor]);
  };

  const handleParkingArea = (value, index) => {
    const newParkingArea = parseFloat(value) || 0;
    const updateArea = [...parkingArea];
    updateArea[index] = newParkingArea;
    setParkingArea(updateArea);
  };
  // ======================================================<<<(Built Up Area Calculation End)>>>>...

  //=============================================<<<<<(District, Mandal & Village Start)>>>>> :
  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    // Reset selected mandal and village when district changes
    setSelectedMandal("");
    setSelectedGrama("");
    setSelectedVillage("");
  };

  const handleMandalChange = (event) => {
    setSelectedMandal(event.target.value);
    // Reset selected village when mandal changes
    setSelectedGrama("");
    setSelectedVillage("");
  };
  //==============================<<<<<(District, Mandal & Village End)>>>>> :

  const handleNatureOfRoad = (event) => {
    setNatureOfRoadValue(event.target.value);
  };

  const handleNorthChange = (event) => {
    setNorthValue(event.target.value);
  };

  const handleSouthChange = (event) => {
    setSouthValue(event.target.value);
  };

  const handleEastChange = (event) => {
    setEastValue(event.target.value);
  };

  const handleWestChange = (event) => {
    setWestValue(event.target.value);
  };

  // const [scheduleBoundariesValue, setScheduleBoundariesValue] = useState({})
  // const handleScheduleBoundaries = (e, id) => {
  //   setScheduleBoundariesValue((pre) => ({
  //     ...pre,
  //     [id]: e.target.value,
  //   }))
  // }

  // Radio Button Get Data from server:
  const [radio1, setRadio1] = useState("");
  const [radio2, setRadio2] = useState("");
  const [radio3, setRadio3] = useState("");
  const [radio4, setRadio4] = useState("");
  const [radio5, setRadio5] = useState("");

  const handleRadio1 = (e) => {
    setRadio1(e.target.value);
  };

  const handleRadio2 = (e) => {
    setRadio2(e.target.value);
  };

  const handleRadio3 = (e) => {
    setRadio3(e.target.value);
  };

  const handleRadio4 = (e) => {
    setRadio4(e.target.value);
  };

  const handleRadio5 = (e) => {
    setRadio5(e.target.value);
  };

  // get data from input field :
  const collectInputFieldData = async (url) => {
    // ==================================================<<<(General Information)>>>:
    const caseTypeData = document.getElementById("caseType").value;
    // Get selected radio input's value
    const selectedApplicationType =
      document.querySelector('input[name="radio-1"]:checked')?.value || "";
    const natureOfPermission =
      document.getElementById("natureOfPermission").value;
    const natureOfTheSite = document.getElementById("natureOfTheSite").value;
    const surveyNo = document.getElementById("SurveyNo").value;
    const district = document.getElementById("district").value;
    const mandal = document.getElementById("mandal").value;
    const gramaPanchayat = document.getElementById("gramaPanchayat").value;
    const village = document.getElementById("village").value;

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

    // ================================================<<<(Plot Details)>>>:
    const totalPlotDocument =
      document.getElementById("TotalPlotDocument").value;
    const totalPlotGround = document.getElementById("TotalPlotGround").value;
    const proposedPlotAreaValue =
      document.getElementById("proposedPlotArea").value;
    const roadWideningAreaValue =
      document.getElementById("roadWideningArea").value;
    const netPlotAreaValue = document.getElementById("netPlotArea").value;

    const existingRoad =
      document.querySelector('input[name="radio-2"]:checked')?.value || "";
    const statusOfRoad =
      document.querySelector('input[name="radio-3"]:checked')?.value || "";

    const natureOfRoad = document.getElementById("natureOfRoad").value;
    const existingRoadMts = document.getElementById("existingRoadMts").value;
    const proposedRoadMts = document.getElementById("proposedRoadMts").value;
    const marketValueSqym = document.getElementById("marketValueSqym").value;
    const vacantLand = document.getElementById("vacantLand").value;
    const noOfUnits = document.getElementById("noOfUnits").value;

    const floorDetails = totalFloor.map((floor, index) => {
      const builtUpArea = document.getElementById(`builtUpArea${index}`).value;
      const parkingArea = document.getElementById(`parkingArea${index}`).value;
      return {
        name: document.getElementById(`floorName${index}`).value,
        builtUpArea: builtUpArea === "" ? 0 : builtUpArea,
        parkingArea: parkingArea === "" ? 0 : parkingArea,
      };
    });

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
    // runningMeter
    const runningMeterData = document.getElementById("runningMeter");
    const runningMeter = runningMeterData ? runningMeterData.value : "";

    const siteRegistered =
      document.querySelector('input[name="radio-5"]:checked')?.value || "";
    const north = document.getElementById("north").value; // ==========================<<<(Schedule of Boundaries)>>>:
    const south = document.getElementById("south").value;
    const east = document.getElementById("east").value;
    const west = document.getElementById("west").value;

    const generalInformation = {
      caseType: caseTypeData,
      applicationType: selectedApplicationType,
      natureOfPermission,
      natureOfTheSite,
      surveyNo,
      district,
      mandal,
      gramaPanchayat,
      village,
      bpsApprovedNoServer: bpsApprovedNo,
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
      proposedPlotAreaCal: proposedPlotAreaValue,
      roadWideningAreaCal: roadWideningAreaValue,
      netPlotAreaCal: netPlotAreaValue,
      statusOfRoad,
      existingRoad,
      natureOfRoad,
      existingRoadMts,
      proposedRoadMts,
      marketValueSqym,
      vacantLand,
      noOfUnits,
      floorDetails,
      totalBuiltUpArea: totalBuiltUpArea === "" ? 0 : totalBuiltUpArea,
      totalParkingArea: totalParkingArea === "" ? 0 : totalParkingArea,
      frontSetback,
      rareSetback,
      side1Setback,
      side2Setback,
      buildingExcludeStilt,
      compoundingWallProposed,
      runningMeter,
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

    const splitApplicationNo = applicationNo.split("/");

    splitApplicationNo[2] = gramaPanchayat?.length ? gramaPanchayat : "XX";
    splitApplicationNo[2] = village?.length ? village : "XX";
    splitApplicationNo[3] = mandal?.length ? mandal : "XX";

    const newApplicationNo = splitApplicationNo.join("/");

    localStorage.setItem("CurrentAppNo", JSON.stringify(newApplicationNo));

    return await sendUserDataIntoDB(url, "PATCH", {
      applicationNo: newApplicationNo,
      buildingInfo,
    });
  };

  const {
    applicationType,
    bpsApprovedNoServer,
    caseType,
    district,
    // gramaPanchayat,
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
    gramaPanchayat,
    village,
  } = generalInformation ?? {};

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
    vacantLand,
    noOfUnits,
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
    runningMeter,
  } = plotDetails ?? {};

  const { east, west, north, south } = scheduleBoundaries ?? {};

  // classes for this component:
  const labelClass = "block mb-1 font-semibold text-gray-600";
  const inputClass =
    "w-full px-3 py-[10px] border rounded-lg max-w-xs  border-gray-300 text-gray-900 bg-gray-50 focus:border-gray-400 focus:outline-none focus:ring-2 ring-gray-200";

  return (
    <>
      <div className="grid my-5 mx-5 lg:my-0 lg:p-2 dark:text-black">
        {/* general information */}
        <div className="divide-y-2 divide-gray-200 mb-10">
          {/* heading  */}
          <div className="flex items-center">
            <img src={generalInfoImage} alt="" className="h-10 me-3" />
            <h3 className="font-bold text-xl">General Information</h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 mt-2 mb-5">
            <div className="flex flex-col justify-center my-4 px-3">
              <label htmlFor="nature" className={labelClass}>
                <span>Case Type</span>
              </label>
              <select
                id="caseType"
                className={inputClass}
                value={selectedOptionCase}
                onChange={handleCaseTypeChange}
              >
                <option disabled value="">
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

            {/* General Information radio button  */}
            <div className="grid grid-cols-1 font-medium  lg:justify-items-center my-4 mx-3">
              <p className="flex items-center font-semibold text-gray-600">
                Application Type?
              </p>
              <div className="grid-cols-1 lg:grid-cols-2 items-center">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio border border-gray-500 h-4 w-4"
                    value="Private"
                    checked={
                      radio1 === "Private"
                        ? radio1 === "Private"
                        : applicationType === "Private"
                    }
                    onChange={handleRadio1}
                  />
                  <span className="ml-2 text-base text-gray-600">Private</span>
                </label>
                <label className="inline-flex items-center md:ml-3">
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio border border-gray-500 h-4 w-4"
                    value="Govt. Land"
                    checked={
                      radio1 === "Govt. Land"
                        ? radio1 === "Govt. Land"
                        : applicationType === "Govt. Land"
                    }
                    onChange={handleRadio1}
                  />
                  <span className="ml-2 text-base text-gray-600">Govt. Land</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col justify-center my-4 mx-3">
              <label className="block text-gray-600 mb-1 font-semibold">
                <span>Nature of permission</span>
              </label>
              <select
                id="natureOfPermission"
                className={inputClass}
                value={selectedOptionPermission}
                onChange={handlePermissionChange}
              >
                <option value="General">General</option>
                <option value="Regularised under BPS">
                  Regularised under BPS
                </option>
                <option value="Housing Scheme">Housing Scheme</option>
              </select>
            </div>

            <div className="my-4 mx-3">
              <label htmlFor="nature" className={labelClass}>
                <span>Nature of the site</span>
              </label>
              <select
                id="natureOfTheSite"
                className={inputClass}
                value={selectedNatureOfTheSite}
                onChange={handleNatureChange}
              >
                <option disabled value="">
                  Select Nature of the site
                </option>
                <option value="Approved Layout">Approved Layout</option>

                {selectedOptionCase === "Alteration Addition Existing" ? (
                  <option value="Regularised under LRS">
                    Regularised under LRS
                  </option>
                ) : null}

                <option value="Plot port of RLP/IPLP but not regularised">
                  Plot port of RLP/IPLP but not regularised
                </option>
                <option value="Congested/ Gramakanta/ Old Built-up area">
                  Congested/ Gramakanta/ Old Built-up area
                </option>
                <option value="Newly Developed/ Built up area">
                  Newly Developed/ Built up area
                </option>
              </select>
            </div>

            <InputField
              id="SurveyNo"
              name="Survey no."
              label="Survey no."
              placeholder="Survey no."
              type="text"
              ltpDetails={surveyNo}
            />

            <div className="flex flex-col justify-center my-4 mx-3">
              <label className={labelClass}>
                <span>District</span>
              </label>
              <select
                id="district"
                name="District"
                className={inputClass}
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

            <div className="flex flex-col justify-center my-4 mx-3">
              <label className={labelClass}>
                <span>Mandal</span>
              </label>
              <select
                id="mandal"
                name="mandal"
                className={inputClass}
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

            <div className="flex flex-col justify-center my-4 mx-3">
              <label className={labelClass}>
                <span>Grama Panchayat</span>
              </label>
              <select
                id="gramaPanchayat"
                name="gramaPanchayat"
                className={inputClass}
                value={selectedGrama}
                onChange={(e) => setSelectedGrama(e.target.value)}
                disabled={!selectedMandal}
              >
                <option value="" disabled>
                  Select Grama Panchayat
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

            <div className="flex flex-col justify-center my-4 mx-3">
              <label className={labelClass}>
                <span>Village</span>
              </label>
              <select
                id="village"
                name="village"
                className={inputClass}
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
                    ltpDetails={bpsApprovedNoServer}
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
                    ltpDetails={previewsApprovedFileNo}
                  />
                </div>
              )}

            {/* Conditionally render input fields based on Nature of the site */}
            {selectedNatureOfTheSite === "Approved Layout" && (
              <>
                <InputField
                  id="LpNo"
                  name="LpNo"
                  label="L.P. no."
                  placeholder="L.P. no."
                  type="number"
                  ltpDetails={lpNo}
                />
                <InputField
                  id="PlotNo"
                  name="PlotNo"
                  label="Plot no."
                  placeholder="Plot no."
                  type="number"
                  ltpDetails={plotNo}
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
                  ltpDetails={lrsNo}
                />
                <InputField
                  id="PlotNo2"
                  name=""
                  label="Plot no"
                  placeholder="Plot no."
                  type="number"
                  ltpDetails={plotNo2}
                />
              </>
            )}

            {selectedNatureOfTheSite ===
              "Plot port of RLP/IPLP but not regularised" && (
                <InputField
                  id="IplpNo"
                  name="IplpNo"
                  label="RLP/IPLP no."
                  placeholder="RLP/IPLP no."
                  type="number"
                  ltpDetails={iplpNo}
                />
              )}
            {/*===================== Conditional Input Field End =====================*/}
          </div>
        </div>

        {/* plot details  */}
        <div className="divide-y-2 divide-gray-200 mb-10">
          <div className="flex items-center">
            <img src={plotImage} alt="" className="h-10 me-3" />
            <h3 className="font-bold text-xl">Plot Details</h3>
          </div>

          <div className="mt-2">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              <InputField
                type="number"
                id="TotalPlotDocument"
                name="TotalPlotDocument"
                label="Total Plot are as per document"
                placeholder="in Sq.Mts."
                ltpDetails={totalPlotDocument}
              />
              <InputField
                type="number"
                id="TotalPlotGround"
                name="TotalPlotGround"
                label="Total Plot are as on ground"
                placeholder="in Sq.Mts."
                ltpDetails={totalPlotGround}
              />

              <div className="my-4 mx-3">
                <label htmlFor="" className={labelClass}>
                  Proposed Plot area
                </label>
                <input
                  type="number"
                  id="proposedPlotArea"
                  name="proposedPlotArea"
                  placeholder="in Sq.Mts."
                  className="w-full px-3 py-2 border rounded-lg max-w-xs border-gray-300 text-gray-900 bg-gray-50 focus:border-gray-400 focus:outline-none focus:ring-2 ring-gray-200"
                  defaultValue={proposedPlotArea ?? ""}
                  onChange={handleProposedPlotAreaChange}
                />
                {/* {proposedPlotArea && (
                  <p className="text-xs text-red-500 mt-2">
                    {proposedPlotArea > 300 && proposedPlotArea !== ""
                      ? "Value must be less than 300"
                      : ""}
                  </p>
                )} */}
              </div>

              <div className="my-4 mx-3">
                <label htmlFor="" className={labelClass}>
                  Road Widening Area
                </label>
                <input
                  id="roadWideningArea"
                  type="roadWideningArea"
                  placeholder="in Sq.Mts."
                  className="w-full px-3 py-2 border rounded-lg max-w-xs border-gray-300 text-gray-900 bg-gray-50 focus:border-gray-400 focus:outline-none focus:ring-2 ring-gray-200"
                  defaultValue={roadWideningArea ?? ""}
                  onChange={handleRoadWideningAreaChange}
                />
                {/* {roadWideningArea && (
                  <p className="text-xs text-red-500 mt-2">
                    {roadWideningArea > 300 && roadWideningArea !== ""
                      ? "Value must be less than 300"
                      : ""}
                  </p>
                )} */}
              </div>

              {/* Automatically calculated Plot Details  */}
              <div className="my-4 mx-3">
                <label htmlFor="disabled-input" className={labelClass}>
                  Net Plot Area (in Sq.Mts.)
                </label>
                <input
                  type="text"
                  id="netPlotArea"
                  name="netPlotArea"
                  placeholder="Automatically calculated"
                  className="w-full px-3 py-2 border rounded-lg max-w-xs"
                  value={netPlotArea ?? ""}
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-1 mx-5 md:mx-10 lg:mx-14 my-10">
              {selectedNatureOfTheSite === "Newly Developed/ Built up area" && (
                <div className="flex flex-col md:flex-row font-medium mb-4 text-lg">
                  <div className="flex items-center mb-3 md:mb-0">
                    <FaHandPointRight className="me-3 w-5 lg:w-auto text-violetLight" />
                    <p className="font-bold text-lg">
                      Whether site abuts any Existing Road?
                    </p>
                  </div>
                  <label className="inline-flex items-center ml-3">
                    <input
                      type="radio"
                      name="radio-2"
                      className="radio border border-gray-500 h-4 w-4"
                      value="yes"
                      checked={
                        radio2 == "yes"
                          ? radio2 == "yes"
                          : existingRoad === "yes"
                      }
                      onChange={handleRadio2}
                    />
                    <span className="ml-2 text-base">Yes</span>
                  </label>
                  <label className="inline-flex items-center ml-3">
                    <input
                      type="radio"
                      name="radio-2"
                      className="radio border border-gray-500 h-4 w-4"
                      value="no"
                      checked={
                        radio2 == "no" ? radio2 == "no" : existingRoad === "no"
                      }
                      onChange={handleRadio2}
                    />
                    <span className="ml-2 text-base">No</span>
                  </label>
                </div>
              )}

              <div className="flex flex-col md:flex-row font-medium mb-4 text-lg mt-4">
                <div className="flex items-center mb-3 md:mb-0">
                  <FaHandPointRight className="me-3 w-5 lg:w-auto text-violetLight" />
                  <p className="font-bold text-lg">Status of Road?</p>
                </div>
                <label className="inline-flex items-center ml-3">
                  <input
                    type="radio"
                    name="radio-3"
                    className="radio border border-gray-500 h-4 w-4"
                    value="Public"
                    checked={
                      radio3 == "Public"
                        ? radio3 == "Public"
                        : statusOfRoad === "Public"
                    }
                    onChange={handleRadio3}
                  />
                  <span className="ml-2 text-base">Public</span>
                </label>
                <label className="inline-flex items-center ml-3">
                  <input
                    type="radio"
                    name="radio-3"
                    className="radio border border-gray-500 h-4 w-4"
                    value="Private"
                    checked={
                      radio3 == "Private"
                        ? radio3 == "Private"
                        : statusOfRoad === "Private"
                    }
                    onChange={handleRadio3}
                  />
                  <span className="ml-2 text-base">Private</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 mt-3">
              <div className="flex flex-col justify-center mx-3">
                <label className={labelClass}>
                  <span>Nature of Road</span>
                </label>
                <select
                  id="natureOfRoad"
                  className={inputClass}
                  value={natureOfRoadValue}
                  onChange={handleNatureOfRoad}
                >
                  <option disabled value="">
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
                placeholder="in Sq.Mts."
                ltpDetails={existingRoadMts}
              />
              <InputField
                id="proposedRoadMts"
                name="name1"
                label="Proposed road (in Mts.)"
                placeholder="in Sq.Mts."
                ltpDetails={proposedRoadMts}
              />
              <InputField
                id="marketValueSqym"
                name="name1"
                label="Market Value (per Sq.Yd.)"
                placeholder="per Sq.Yd."
                ltpDetails={marketValueSqym}
              />
              <InputField
                id="vacantLand"
                name="vacantLand"
                label="Vacant land area"
                placeholder="in Sq.Mts."
                ltpDetails={vacantLand}
              />
              <InputField
                id="noOfUnits"
                name="noOfUnits"
                label="No of units"
                placeholder="No of units"
                ltpDetails={noOfUnits}
              />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4">
              {totalFloor.map((floor, index) => (
                <FloorDetails
                  key={index}
                  floor={floor}
                  index={index}
                  length={totalFloor.length}
                  increaseFloorNo={increaseFloorNo}
                  decreaseFloorNo={decreaseFloorNo}
                  handleBuiltUpArea={handleBuiltUpArea}
                  handleParkingArea={handleParkingArea}
                  parkingAreaValue={parkingArea[index]}
                  builtUpAreaValue={builtUpArea[index]}
                  plotDetailsFloor={
                    plotDetailsFloor ? plotDetailsFloor[index] : undefined
                  }
                  floorOptions={floorOptions}
                  setFloorOptions={setFloorOptions}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 mt-5">
              {/* <InputField
                id="noOfUnits"
                name="noOfUnits"
                label="No of units"
                placeholder="No of units"
              // ltpDetails={noOfUnits}
              /> */}
              <div className="hidden lg:grid"></div>
              <div className="my-4 mx-3 grid">
                <label htmlFor="disabled-input" className={labelClass}>
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
                <label htmlFor="disabled-input2" className={labelClass}>
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
              {/* <InputField
                id="vacantLand"
                name="vacantLand"
                label="Vacant land area"
                placeholder="in Sq.Mts."
                ltpDetails={vacantLand}
              /> */}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4">
              <InputField
                id="frontSetback"
                name="name72"
                label="Front setback (in Mts.)"
                placeholder="in Mts."
                ltpDetails={frontSetback}
              />
              <InputField
                id="rareSetback"
                name="name1"
                label="Rare setback (in Mts.)"
                placeholder="in Mts."
                ltpDetails={rareSetback}
              />
              <InputField
                id="side1Setback"
                name="name1"
                label="Side1 setback (in Mts.)"
                placeholder="in Mts."
                ltpDetails={side1Setback}
              />
              <InputField
                id="side2Setback"
                name="name1"
                label="Side 2 setback (in Mts.)"
                placeholder="in Mts."
                ltpDetails={side2Setback}
              />
              <InputField
                id="buildingExcludeStilt"
                name="name1"
                label="Total Height of The Building Exclude Stilt (in Mts.)"
                placeholder="in Mts."
                ltpDetails={buildingExcludeStilt}
              />
            </div>

            <div className="grid grid-cols-1 mx-5 md:mx-10 lg:mx-14 mb-5">
              <div className="lg:flex">
                <div className="flex flex-col md:flex-row basis-[70%] font-medium text-lg my-10">
                  <div className="flex items-center mb-3 md:mb-0">
                    <FaHandPointRight className="me-3 w-7 lg:w-auto text-violetLight" />
                    <p className="font-bold text-lg">
                      Compounding wall proposed?
                    </p>
                  </div>
                  <label className="inline-flex items-center ml-3">
                    <input
                      type="radio"
                      name="radio-4"
                      className="radio border border-gray-500 h-4 w-4"
                      value="yes"
                      checked={radio4 == "yes"}
                      onChange={handleRadio4}
                    />
                    <span className="ml-2 text-base">Yes</span>
                  </label>
                  <label className="inline-flex items-center ml-3">
                    <input
                      type="radio"
                      name="radio-4"
                      className="radio border border-gray-500 h-4 w-4"
                      value="no"
                      checked={radio4 == "no"}
                      onChange={handleRadio4}
                    />
                    <span className="ml-2 text-base">No</span>
                  </label>
                </div>
                <div className="basis-[30%]">
                  {radio4 === "yes" ? (
                    <InputField
                      id="runningMeter"
                      name="runningMeter"
                      label="Running meter"
                      placeholder="Running meter"
                      ltpDetails={runningMeter}
                    />
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col md:flex-row font-medium mb-4 text-lg">
                <div className="flex items-center mb-3 md:mb-0">
                  <FaHandPointRight className="me-3 w-7 lg:w-auto text-violetLight" />
                  <p className="font-bold text-lg">
                    Whether site Registered as house plot/ Building prior to
                    18-01-2006?
                  </p>
                </div>
                <label className="inline-flex items-center ml-3">
                  <input
                    type="radio"
                    name="radio-5"
                    className="radio border border-gray-500 h-4 w-4"
                    value="yes"
                    checked={radio5 == "yes"}
                    onChange={handleRadio5}
                  />
                  <span className="ml-2 text-base">Yes</span>
                </label>
                <label className="inline-flex items-center ml-3">
                  <input
                    type="radio"
                    name="radio-5"
                    className="radio border border-gray-500 h-4 w-4"
                    value="no"
                    checked={radio5 == "no"}
                    onChange={handleRadio5}
                  />
                  <span className="ml-2 text-base">No</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* schedule boundaries  */}
        <div className="divide-y-2 divide-gray-200">
          <div className="flex items-center">
            <img src={wallImage} alt="A image of wall" className="h-8 me-3" />
            <h3 className="font-bold text-xl">Schedule of Boundaries</h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 items-center mt-2">
            <div className="flex flex-col my-4 justify-center mx-3">
              <label className={labelClass}>
                <span>North</span>
              </label>
              <select
                id="north"
                className={inputClass}
                value={northValue}
                onChange={handleNorthChange}
              >
                <option disabled value="">
                  Select North
                </option>
                <option value="Road">Road</option>
                <option value="Plot">Plot</option>
                <option value="Vacant land">Vacant land</option>
                <option value="Water body">Water body</option>
                <option value="Existing building">Existing building</option>
              </select>
            </div>

            <div className="flex flex-col my-4 justify-center mx-3">
              <label className={labelClass}>
                <span>South</span>
              </label>
              <select
                id="south"
                className={inputClass}
                value={southValue}
                onChange={handleSouthChange}
              >
                <option disabled value="">
                  Select South
                </option>
                <option value="Road">Road</option>
                <option value="Plot">Plot</option>
                <option value="Vacant land">Vacant land</option>
                <option value="Water body">Water body</option>
                <option value="Existing building">Existing building</option>
              </select>
            </div>

            <div className="flex flex-col my-4 justify-center mx-3">
              <label className={labelClass}>
                <span>East</span>
              </label>
              <select
                id="east"
                className={inputClass}
                value={eastValue}
                onChange={handleEastChange}
              >
                <option disabled value="">
                  Select East
                </option>
                <option value="Road">Road</option>
                <option value="Plot">Plot</option>
                <option value="Vacant land">Vacant land</option>
                <option value="Water body">Water body</option>
                <option value="Existing building">Existing building</option>
              </select>
            </div>

            <div className="flex flex-col my-4 justify-center mx-3">
              <label className={labelClass}>
                <span>West</span>
              </label>
              <select
                id="west"
                className={inputClass}
                value={westValue}
                onChange={handleWestChange}
              >
                <option disabled value="">
                  Select West
                </option>
                <option value="Road">Road</option>
                <option value="Plot">Plot</option>
                <option value="Vacant land">Vacant land</option>
                <option value="Water body">Water body</option>
                <option value="Existing building">Existing building</option>
              </select>
            </div>
          </div>
        </div>

        {/* <input type="submit" value="get" onClick={getValue} /> */}

        {/* save & continue  */}
        <SaveData
          isStepperVisible={isStepperVisible}
          currentStep={currentStep}
          steps={steps}
          stepperData={stepperData}
          confirmAlert={confirmAlert}
          collectInputFieldData={collectInputFieldData}
        />
      </div>
    </>
  );
};

export default BuildingInfo;
