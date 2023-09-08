import React, { useState } from "react";
import { useForm } from "react-hook-form";
import House from "../../assets/images/house.jpg";
import Logo from "../../assets/images/logo.png";
import SupportIcon from "../../assets/images/customer-service.png";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  const getCookie = (searchData) => {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");

    // Loop through the array elements
    for (var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");

      /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
      if (searchData == cookiePair[0].trim()) {
        // Decode the cookie value and return
        return decodeURIComponent(cookiePair[1]);
      }
    }

    // Return null if not found
    return null;
  };

  const cookieUserId = getCookie("userId");
  const cookieUserPassword = getCookie("password");
  console.log(getCookie("userId"));

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const location = useLocation();

  const from = location?.state?.from?.pathName || "/dashboard";

  const onSubmit = (data) => {
    const { id, password, checkbox } = data;
    console.log(data);

    const userInfo = {
      id,
      password,
    };

    console.log(userInfo);

    fetch(`http://localhost:5000/getUser?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // checking data whether data is found or not
        if (data.status) {
          // console.log(1);

          const { userInfo } = data;
          // console.log(userInfo);

          // checking whether password is matching or not
          if (userInfo.password === password) {
            console.log("1");

            // set information to localstorage to stay logged in
            localStorage.setItem("loggedUser", JSON.stringify(userInfo));

            // set information to cookie to implement remember me functionality

            if (checkbox) {
              document.cookie = "userId=" + id + ";path=http://localhost:5173/";
              document.cookie =
                "password=" + password + ";path=http://localhost:5173/";
            }

            // move to another page after successfully login
            navigate(from, { replace: true });
          } else {
            toast.error("Password is wrong");
          }
        } else {
          console.log(0);
          toast.error("No information found!");
        }
      });
  };

  return (
    <>
      <div className="flex h-screen relative">
        {/* support icon  */}

        <div className="absolute bottom-[2%] right-[2%] w-[5vw] h-[5vw] rounded-full cursor-pointer">
          <img
            className="object-cover"
            src={SupportIcon}
            alt="Customer support icon"
          />
        </div>

        {/* image part  */}
        <div className="basis-1/2 h-full bg-[#f3a683] text-center lg:text-left">
          <img className="h-full object-cover" src={House} alt="house" />
        </div>

        {/* login form  */}
        <div className="basis-1/2  flex justify-center items-center">
          <div className="w-[80%] mx-auto rounded-lg  p-4  sm:p-6 md:p-8 ">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <img
                  className="h-[8vw] mx-auto"
                  src={Logo}
                  alt="The website logo"
                />
              </div>
              <h1 className="text-2xl text-center font-bold Roboto text-gray-900 ">
                Welcome Back!
              </h1>
              <div>
                <label
                  htmlFor="userId"
                  className="block mb-2 text-sm font-bold Roboto text-gray-900 dark:text-white"
                >
                  Your ID
                </label>
                <input
                  type="text"
                  {...register("id", { required: true })}
                  id="userId"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  defaultValue={cookieUserId}
                  placeholder="name@company.com"
                />
                {errors.id?.type === "required" && (
                  <p role="alert">UserID is required</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-bold Roboto text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  id="password"
                  placeholder="••••••••"
                  defaultValue={cookieUserPassword}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                />
                {errors.password?.type === "required" && (
                  <p role="alert">Password is required</p>
                )}
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    {...register("checkbox", { required: true })}
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
                    required
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm font-medium Roboto text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <div className="w-[30%] mx-auto">
                <input
                  type="submit"
                  value="Login"
                  className="w-full rounded-full Roboto bg-[#FFD66C] cursor-pointer hover:shadow-md font-bold  text-sm px-5 py-2.5 text-center "
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
