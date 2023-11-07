import React, { useContext, useEffect, useMemo } from "react";
import useGetUser from "../CustomHook/useGetUser";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { BiSolidUserRectangle } from "react-icons/bi";
import toast from "react-hot-toast";
import UpdateProfileInput from "./UpdateProfileInput";
import { MdContactPhone } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";

const UpdateProfile = () => {
  const { userInfoFromLocalStorage } = useContext(AuthContext);

  const role = userInfoFromLocalStorage()?.role;
  const [data, refetch] = useGetUser();

  const { register, reset, handleSubmit } = useForm({
    defaultValues: useMemo(() => {
      console.log("User has changed");

      // let keysToKeep;
      // if (role === "LTP") {
      //   keysToKeep = ["contactEmail", "address", "adharNo", "phone"];
      // } else {
      //   keysToKeep = ["contactEmail", "address", "phone"];
      // }
      // const newObj = {};

      // for (const key of keysToKeep) {
      //   if (data && key in data) {
      //     newObj[key] = data[key];
      //   }
      // }

      // console.log(newObj, "NEW OBJ");
      return { ...data };
    }, [data]),
  });

  useEffect(() => {
    reset(data);
  }, [data]);

  const onSubmit = (formValue) => {
    console.log(formValue, "Formvalue");

    delete formValue["_id"];
    // let keysToKeep;
    // if (role === "LTP") {
    //   keysToKeep = [
    //     "department",
    //     "townPlaning",
    //     "designation",
    //     "registrationNo",
    //     "qualification",

    //     "contactEmail",
    //     "mobileNo",
    //     "phone",
    //     "fax",

    //     "address",
    //     "city",
    //     "country",
    //     "aadharNo",
    //     "state",
    //     "zip",

    //     // "engineer",
    //     // "email",
    //     // "address",
    //     // "adharNo",
    //     // "phone"
    //   ];
    // } else {
    //   keysToKeep = ["contactEmail", "address", "phone"];
    // }
    // const newObj = {};

    // for (const key of keysToKeep) {
    //   if (formValue && key in formValue) {
    //     newObj[key] = formValue[key];
    //   }
    // }

    console.log(formValue, "FOrm r value");

    fetch(
      `http://localhost:5000/updateUserInfo/${userInfoFromLocalStorage()._id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formValue),
      }
    )
      .then((res) => res.json())
      .then(async (result) => {
        console.log(result);
        if (result.acknowledged) {
          refetch();
          toast.success("Update successfully");
        } else {
          toast.error("Failed to update");
        }
      })
      .catch(() => {
        toast.error("Server error");
      });
  };

  return (
    <div className="py-10 text-gray-900">
      <p className="text-center font-roboto font-bold text-3xl mb-10 dark:text-black">
        Update Your Profile
      </p>

      {/* user information  */}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* if there is a button in form, it will close the modal */}

        {/* Basic Information  */}
        <div className="divide-y-2 divide-gray-200 mb-[60px]">
          <div className="flex items-center ">
            <h3 className="font-bold text-xl px-5 mb-4 ml-1 flex justify-center items-center">
              <BiSolidUserRectangle size={30} className="mr-2" />
              <span>Basic Information</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 px-5 nm_Container mx-6">
            <UpdateProfileInput
              id="department"
              name="department"
              label="Department"
              placeholder="Department"
              type="text"
              register={register}
            />
            <UpdateProfileInput
              id="townPlaning"
              name="townPlaning"
              label="Town Planing"
              placeholder="Town Planing"
              type="text"
              register={register}
            />
            <UpdateProfileInput
              id="designation"
              name="designation"
              label="Designation"
              placeholder="Designation"
              type="text"
              register={register}
            />
            <UpdateProfileInput
              id="engineer"
              name="engineer"
              label="Engineer"
              placeholder="Engineer"
              type="text"
              register={register}
            />
            <UpdateProfileInput
              id="registrationNo"
              name="registrationNo"
              label="Registration No"
              placeholder="Registration No"
              type="text"
              register={register}
            />
            <UpdateProfileInput
              id="qualification"
              name="qualification"
              label="Qualification"
              placeholder="Qualification"
              type="text"
              register={register}
            />
          </div>
        </div>

        {/* Contact Information  */}
        <div className="divide-y-2 divide-gray-200 mb-[60px]">
          <div className="flex items-center mb-4 ml-1">
            <h3 className="font-bold text-xl px-5 flex justify-center items-center">
              <MdContactPhone size={30} className="mr-2" />
              <span>Contact Information</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 px-5 nm_Container mx-6">
            <UpdateProfileInput
              id="contactEmail"
              name="contactEmail"
              label="Email"
              placeholder="Email"
              type="email"
              register={register}
            />
            <UpdateProfileInput
              id="mobileNo"
              name="mobileNo"
              label="Mobile No."
              placeholder="Mobile No."
              type="text"
              register={register}
            />
            <UpdateProfileInput
              id="phone"
              name="phone"
              label="Phone"
              placeholder="Phone"
              type="text"
              register={register}
            />
            <UpdateProfileInput
              id="fax"
              name="fax"
              label="Fax"
              placeholder="Fax"
              type="text"
              register={register}
            />
          </div>
        </div>

        {/* Address Information  */}
        <div className="divide-y-2 divide-gray-200 mb-[60px]">
          <div className="flex items-center">
            <h3 className="font-bold text-xl px-5 mb-4 ml-1 flex justify-center items-center">
              <FaAddressCard size={30} className="mr-2" />
              <span>Address Information</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 px-5 nm_Container mx-5">
            <UpdateProfileInput
              id="address"
              name="address"
              label="Address"
              placeholder="Address"
              type="text"
              register={register}
            />
            <UpdateProfileInput
              id="city"
              name="city"
              label="City"
              placeholder="City"
              type="text"
              register={register}
            />
            <UpdateProfileInput
              id="country"
              name="country"
              label="Country"
              placeholder="Country"
              type="text"
              register={register}
            />
            <UpdateProfileInput
              id="aadharNo"
              name="aadharNo"
              label="Aadhar No."
              placeholder="Aadhar No."
              type="text"
              register={register}
            />
            <UpdateProfileInput
              id="state"
              name="state"
              label="State"
              placeholder="State"
              type="text"
              register={register}
            />
            <UpdateProfileInput
              id="zip"
              name="zip"
              label="Zip"
              placeholder="Zip"
              type="text"
              register={register}
            />
          </div>
        </div>

        {/* <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-semibold text-gray-600"
            >
              Email
            </label>
            <input
              type="text"
              {...register("email", { required: true })}
              id="email"
              className="w-full px-3 py-2 border rounded-lg max-w-xs text-gray-600 bg-gray-50 border-violet-500 focus:outline-none focus:ring-2 ring-violet-100"
              placeholder="test@gmail.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-bold text-gray-900 "
            >
              Phone no
            </label>
            <input
              type="text"
              {...register("phone", { required: true })}
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg  block w-full p-2.5"
              placeholder="Enter phone no"
              maxLength={10}
              required
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-bold text-gray-900 "
            >
              Address
            </label>
            <textarea
              id="address"
              rows="2"
              {...register("address", { required: true })}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 "
              placeholder="Enter address..."
            ></textarea>
          </div>
        </div>

        {role === "LTP" && (
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="adharNo"
                className="block mb-2 text-base font-bold text-gray-900"
              >
                Aadhar no
              </label>
              <input
                type="text"
                {...register("adharNo", { required: true })}
                id="adharNo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Aadhar no"
                required
              />
            </div>
          </div>
        )} */}

        {/* {error.length !== 0 && (
            <p className="text-red-500 text-center my-6">{error}</p>
          )} */}

        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white transition-all duration-700 shadow-md hover:shadow-violetDark bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-gradient-to-l font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
