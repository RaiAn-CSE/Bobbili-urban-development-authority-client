import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SupportIcon from "../../../assets/images/customer-service.png";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import { BsFillHouseCheckFill, BsFillHouseLockFill } from "react-icons/bs";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import BeatLoader from "react-spinners/BeatLoader";

import LoginCSS from '../../../Style/Login.module.css'

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { getUserData } = useContext(AuthContext);

  // get Cookie data
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

  let cookieUserId, cookieUserPassword;

  cookieUserId = getCookie("userId");
  cookieUserPassword = getCookie("password");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const location = useLocation();

  const from = location?.state?.from?.pathName || "/dashboard";

  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);
    const { id, password, checkbox } = data;
    console.log(data);

    const userInfo = {
      id,
      password,
    };

    console.log(userInfo);

    // fetch user information from the databaase
    getUserData(id).then((result) => {
      if (result.status) {
        console.log(1);

        const { userInfo } = result;

        // checking whether password is matching or not
        if (userInfo.password === password) {
          console.log("1");

          console.log(userInfo, "LOGIN");
          // set information to localstorage to stay logged in
          localStorage.setItem("loggedUser", JSON.stringify(userInfo));

          console.log(localStorage.getItem("loggedUser"));

          // set information to cookie to implement remember me functionality

          if (checkbox) {
            console.log(checkbox);
            document.cookie = "userId=" + id + ";path=http://localhost:5173/";
            document.cookie =
              "password=" + password + ";path=http://localhost:5173/";
          }

          // move to another page after successfully login
          setLoading(false);
          localStorage.setItem("theme", "light");
          toast.success("Login successfully");
          navigate(from, { replace: true });
        } else {
          setLoading(false);
          toast.error("Password is wrong");
        }
      } else {
        setLoading(false);
        toast.error("No information found!");
      }
    });
  };

  //password hide and show functionality
  const [show, setShow] = useState(false);
  const handlePasswordShow = () => {
    show ? setShow(false) : setShow(true);
  };

  // if (loading) {
  //   return "Loading...";
  // }
  let [color, setColor] = useState("#a36ee0");
  const override = {
    display: "block",
    width: "fit-content",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <>
      <div className="relative dark:bg-white">
        {/* support icon  */}

        {/* login form  */}

        <div className="rounded-lg border p-4 sm:p-6 md:p-8 shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-3xl text-center font-bold text-gray-900">
              Sign in
            </h1>

            <div className={`${LoginCSS.formGroup} relative pt-[20px] max-w-xs`}>
              <input
                type="text"
                {...register("id", { required: true })}
                id="userId"
                className="border-[1.5px] border-solid rounded-md block text-base w-full p-2 border-violet-500 text-violet-900 bg-white focus:border-violet-600 focus:outline-none"
                defaultValue={cookieUserId}
                // placeholder="name@company.com"
                autoFocus
                required
              />
              <label
                htmlFor="userId"
                className='text-gray-400 text-base font-normal absolute top-0 left-[16px] pointer-events-none transform translate-y-7'
              >
                Your ID
              </label>
            </div>

            <div className={`${LoginCSS.formGroup} relative pt-[20px] max-w-xs`}>
              <input
                type={`${show === true ? "text" : "password"}`}
                id="password"
                // placeholder="••••••••"
                defaultValue={cookieUserPassword}
                className="border-[1.5px] border-solid rounded-md block text-base w-full p-2 border-violet-500 text-violet-900 bg-white focus:border-violet-600 focus:outline-none"
                {...register("password", { required: true })}
                required
              />
              <label
                htmlFor="password"
                className='text-gray-400 text-base font-normal absolute top-0 left-[16px] pointer-events-none transform translate-y-7'
              >
                Your password
              </label>

              <div
                className="absolute top-[55%] right-3 w-fit dark:text-black"
                onClick={handlePasswordShow}
              >
                {show ? <BsFillHouseCheckFill /> : <BsFillHouseLockFill />}
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  {...register("checkbox")}
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 "
                />
              </div>
              <label
                htmlFor="remember"
                className="ml-2 text-sm font-roboto font-medium text-gray-900 dark:bg-white bg-white"
              >
                Remember me
              </label>
            </div>
            <div className="w-fit mx-auto">
              {loading ? (
                <BeatLoader
                  color={color}
                  loading={loading}
                  cssOverride={override}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                <input
                  type="submit"
                  value="Sign in"
                  className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white cursor-pointer shadow-md shadow-violetDark transition-all duration-500 hover:shadow-sm hover:shadow-black font-bold text-base px-7 py-2.5 my-1 text-center"
                />
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="absolute bottom-[2%] right-[2%] w-[15vw] h-[15vw] md:w-[12vw] md:h-[12vw] lg:w-[5vw] lg:h-[5vw] rounded-full cursor-pointer">
        <img
          className="object-cover"
          src={SupportIcon}
          alt="Customer support icon"
        />
      </div>
    </>
  );
};

export default Login;
