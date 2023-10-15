import React, { useContext, useEffect, useMemo } from "react";
import useGetUser from "../CustomHook/useGetUser";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const { userInfoFromLocalStorage } = useContext(AuthContext);

  const role = userInfoFromLocalStorage()?.role;
  const [data, refetch] = useGetUser();

  const { register, reset, handleSubmit } = useForm({
    defaultValues: useMemo(() => {
      console.log("User has changed");

      let keysToKeep;
      if (role === "LTP") {
        keysToKeep = ["email", "address", "adharNo", "phone"];
      } else {
        keysToKeep = ["email", "address", "phone"];
      }
      const newObj = {};

      for (const key of keysToKeep) {
        if (data && key in data) {
          newObj[key] = data[key];
        }
      }

      console.log(newObj, "NEW OBJ");
      return { ...newObj };
    }, [data]),
  });

  useEffect(() => {
    reset(data);
  }, [data]);

  const onSubmit = (formValue) => {
    console.log(formValue, "Formvalue");
    let keysToKeep;
    if (role === "LTP") {
      keysToKeep = ["email", "address", "adharNo", "phone"];
    } else {
      keysToKeep = ["email", "address", "phone"];
    }
    const newObj = {};

    for (const key of keysToKeep) {
      if (formValue && key in formValue) {
        newObj[key] = formValue[key];
      }
    }

    console.log(newObj, "FOrm r value");

    fetch(
      `https://residential-building.vercel.app/updateUserInfo/${
        userInfoFromLocalStorage()._id
      }`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newObj),
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
    <div className="dark:bg-white p-10">
      <p className="text-center font-roboto font-bold text-3xl mb-10">
        Update Your Profile
      </p>

      {/* user information  */}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* if there is a button in form, it will close the modal */}

        {/* form input boxes  */}

        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="text"
              {...register("email", { required: true })}
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="test@gmail.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
            >
              Phone no
            </label>
            <input
              type="text"
              {...register("phone", { required: true })}
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter phone no"
              maxLength={10}
              required
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
            >
              Address
            </label>
            <textarea
              id="address"
              rows="2"
              {...register("address", { required: true })}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter address..."
            ></textarea>
          </div>
        </div>

        {role === "LTP" && (
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="adharNo"
                className="block mb-2 text-base font-bold '' text-gray-900 dark:text-white"
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
        )}

        {/* {error.length !== 0 && (
            <p className="text-red-500 text-center my-6">{error}</p>
          )} */}

        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white transition-all duration-700 shadow-md hover:shadow-violetDark bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-gradient-to-l font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
