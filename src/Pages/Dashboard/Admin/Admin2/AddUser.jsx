import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import { FaRegCalendarAlt } from "react-icons/fa";
import Style from "../../../../Style/AddUserStyle.module.css";

const AddUser = () => {
  const { register, handleSubmit, resetField } = useForm();

  const [userType, setUserType] = useState(null);

  const {
    userInfoFromLocalStorage,
    checkLicenseExpirationOfLtp,
    fetchDataFromTheDb,
  } = useContext(AuthContext);

  const userRole = userInfoFromLocalStorage().role;

  const navigate = useNavigate();

  const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";

  const [allLocationData, setAllLocationData] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [allMandal, setAllMandal] = useState([]);
  const [allPanchayat, setAllPanchayat] = useState([]);

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedMandal, setSelectedMandal] = useState("");
  const [selectedPanchayat, setSelectedPanchayat] = useState("");

  useEffect(() => {
    (async function () {
      const locationData = await fetchDataFromTheDb(
        "https://residential-building.vercel.app/getDistricts"
      );
      console.log(locationData, "LOC");
      const extractsDataFromDB = locationData[0]?.district;
      setAllLocationData(extractsDataFromDB);
      const districts = extractsDataFromDB?.map((each) => each?.name);
      setAllDistricts(districts);
    })();
  }, []);

  const detectSelectOfDistrict = (e) => {
    setAllMandal([]);
    setAllPanchayat([]);
    setSelectedMandal("");
    setSelectedPanchayat("");

    const chooseDistrict = e.target.value;
    console.log(chooseDistrict);
    setSelectedDistrict(chooseDistrict);

    // Reset the selected value of the Mandal dropdown to "select"
    const mandalSelect = document.getElementById("mandal");
    mandalSelect.value = "";

    const panchayatSelect = document.getElementById("panchayat");
    panchayatSelect.value = "";

    allDistricts.forEach((eachDistrict, index) => {
      if (eachDistrict === chooseDistrict) {
        setAllMandal(allLocationData[index]?.mandal);
      }
    });
  };

  const detectChangeOfMandals = (e) => {
    setAllPanchayat([]);
    setSelectedPanchayat("");

    const panchayatSelect = document.getElementById("panchayat");
    panchayatSelect.value = "";

    const value = e.target.value;
    setSelectedMandal(value);

    console.log(value);

    console.log(allMandal, "DCM");

    const mandalWiseVillage = allMandal.find(
      (eachMandal) => eachMandal?.name === value
    )?.village;

    console.log(mandalWiseVillage);
    setAllPanchayat(mandalWiseVillage);
  };

  const detectChangeOfPanchayat = (e) => {
    setSelectedPanchayat(e.target.value);
  };

  const onSubmit = (data) => {
    console.log(data);

    if (data?.role.toLowerCase().includes("select an option")) {
      toast.error("Please select a role");
    } else {
      let userInfo;

      if (data?.role.toLowerCase() === "ltp") {
        const { validity } = data;

        const isValidate = checkLicenseExpirationOfLtp(validity);

        if (isValidate.length === 10) {
          userInfo = {
            ...data,
            validity: isValidate,
          };
        } else {
          toast.error(isValidate);
        }
      } else if (data?.role.toLowerCase() === "ps") {
        console.log(selectedDistrict, "District");
        console.log(selectedMandal, "MAndal");
        console.log(selectedPanchayat, "Panchayat");

        if (selectedDistrict?.length) {
          if (selectedMandal?.length) {
            if (selectedPanchayat?.length) {
              const address = {
                district: selectedDistrict,
                mandal: selectedMandal,
                gramaPanchayat: selectedPanchayat,
              };

              userInfo = { ...data, ...address };
            } else {
              toast.error("Please select a grama panchayat");
            }
          } else {
            toast.error("Please select a mandal");
          }
        } else {
          toast.error("Please select a district");
        }
      } else {
        userInfo = { ...data };
      }

      console.log(userInfo, "USER INFO");

      if (userInfo) {
        // store users data in the database
        fetch("https://residential-building.vercel.app/addUser", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(userInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);

            if (data.acknowledged) {
              toast.success("User added successfully");
              navigate("/dashboard/allUser");
            }
            if (data?.result === 0) {
              console.log(data.message);
              toast.error(data.message);
            }
          })
          .catch(() => {
            toast.error("Server is not responded");
          });
      }
    }
  };

  const handleChangeRole = (e) => {
    const value = e.target.value;
    console.log(value);
    setUserType(e.target.value);
  };
  return (
    <div className="mt-10 text-black">
      <h1 className="text-xl lg:text-3xl text-center font-roboto font-bold text-black">
        Add a New User
      </h1>

      <form
        className="w-2/3 mx-auto mt-10 font-roboto text-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-base font-bold text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter user name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="id"
              className="block mb-2 text-base '' font-bold text-gray-900"
            >
              User ID
            </label>
            <input
              type="text"
              {...register("userId", { required: true })}
              id="id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter user id"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-base font-bold '' text-gray-900"
            >
              Password
            </label>
            <input
              type="text"
              {...register("password", { required: true })}
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-violet-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="•••••••••"
              required
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block mb-2 text-base font-bold text-gray-900 "
            >
              Role
            </label>
            <select
              id="role"
              {...register("role", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-violet-500 focus:border-blue-500 block w-full p-2.5 "
              onChange={(e) => handleChangeRole(e)}
            >
              <option value="Select an option">Select an option</option>
              <option value="LTP">LTP</option>
              <option value="PS">PS</option>
              <option value="UDA">UDA</option>
              {userRole === "Super Admin" && (
                <>
                  <option value="Admin1">Admin1</option>
                  <option value="Admin2">Admin2</option>
                </>
              )}
            </select>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-base font-bold text-gray-900"
            >
              Email
            </label>
            <input
              type="text"
              {...register("email", { required: true })}
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="test@gmail.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-base font-bold text-gray-900"
            >
              Phone no
            </label>
            <input
              type="text"
              {...register("phone", { required: true })}
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter phone no"
              maxLength={10}
              required
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block mb-2 text-base font-bold text-gray-900"
            >
              Address
            </label>
            <textarea
              id="address"
              rows="2"
              {...register("address", { required: true })}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 "
              placeholder="Enter address..."
            ></textarea>
          </div>
        </div>

        {userType === "LTP" && (
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="licenseNo"
                className="block mb-2 text-base font-bold text-gray-900"
              >
                License No
              </label>
              <input
                type="text"
                {...register("licenseNo", { required: true })}
                id="licenseNo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter license no"
                required
              />
            </div>

            <div>
              <label
                htmlFor="adharNo"
                className="block mb-2 text-base font-bold text-gray-900"
              >
                Adhar no
              </label>
              <input
                type="text"
                {...register("adharNo", { required: true })}
                id="adharNo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter phone no"
                required
              />
            </div>
            <div>
              <label
                htmlFor="validity"
                className="block mb-2 text-base font-bold text-gray-900"
              >
                Validity
              </label>
              <input
                type="date"
                {...register("validity", { required: true })}
                id="validity"
                className="bg-violet border border-gray-300 text-black text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-400 dark:text-white"
              />
              {/* <FaRegCalendarAlt className="absolute bottom-[15%] right-[5%] bg-transparent" /> */}
            </div>
          </div>
        )}

        {userType === "PS" && (
          <div className="flex justify-between items-center">
            {/* district  */}
            <div className="basis-1/5">
              <label
                htmlFor="district"
                className="block mb-2 text-base font-bold text-gray-900"
              >
                District
              </label>
              <select
                id="district"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                defaultValue={selectedDistrict}
                onChange={(e) => detectSelectOfDistrict(e)}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {allDistricts.map((eachDistrict) => {
                  return (
                    <option key={eachDistrict} value={eachDistrict}>
                      {eachDistrict}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* mandal */}

            <div className="basis-1/5">
              <label
                htmlFor="mandal"
                className="block mb-2 text-base font-bold text-gray-900"
              >
                Mandal
              </label>
              <select
                id="mandal"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                defaultValue={selectedMandal}
                onChange={(e) => detectChangeOfMandals(e)}
                disabled={allMandal?.length === 0}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {allMandal?.map((eachMandal, index) => {
                  return (
                    <option key={index} value={eachMandal?.name}>
                      {eachMandal?.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* gram panchayat  */}
            <div className="basis-1/5">
              <label
                htmlFor="panchayat"
                className="block mb-2 text-base font-bold text-gray-900"
              >
                Grama Panchayat
              </label>
              <select
                id="panchayat"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                defaultValue={selectedPanchayat}
                disabled={allPanchayat?.length === 0}
                onChange={(e) => detectChangeOfPanchayat(e)}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {allPanchayat?.map((eachPanchayt, index) => {
                  return <option key={index}>{eachPanchayt}</option>;
                })}
              </select>
            </div>
          </div>
        )}

        <div className="flex justify-center my-10">
          {/* <input
            type="submit"
            className={`text-white ${gradientColor} nm_Container cursor-pointer font-bold rounded-full text-base  sm:w-auto px-10  py-2.5 text-center`}
            value="ADD"
          /> */}
          <button
            type="submit"
            className={`${Style.addButton} bg-gradient-to-b from-[#a29bfe] to-[#6c5ce7]`}
          >
            <span className={`${Style.button__text}`}>Add User</span>
            <span className={`${Style.button__icon}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                stroke="currentColor"
                height="24"
                fill="none"
                className="svg"
              >
                <line y2="19" y1="5" x2="12" x1="12"></line>
                <line y2="12" y1="12" x2="19" x1="5"></line>
              </svg>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
