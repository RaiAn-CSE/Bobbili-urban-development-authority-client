import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import SupportIcon from "../../../assets/images/customer-service.png";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import { BsFillHouseCheckFill, BsFillHouseLockFill } from "react-icons/bs";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import BeatLoader from "react-spinners/BeatLoader";

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

          // set information to localstorage to stay logged in
          localStorage.setItem("loggedUser", JSON.stringify(userInfo));

          // set information to cookie to implement remember me functionality

          if (checkbox) {
            console.log(checkbox);
            document.cookie = "userId=" + id + ";path=http://localhost:5173/";
            document.cookie =
              "password=" + password + ";path=http://localhost:5173/";
          }

          // move to another page after successfully login
          setLoading(false);
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
  let [color, setColor] = useState("#36d7b7");
  const override = {
    display: "block",
    width: "fit-content",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <>
      <div className="relative">
        {/* support icon  */}

        {/* login form  */}

        <div className="rounded-lg border p-4 sm:p-6 md:p-8 ">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl text-center font-bold Roboto text-gray-900 ">
              Sign in
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
                required
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-bold Roboto text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type={`${show === true ? "text" : "password"}`}
                id="password"
                placeholder="••••••••"
                defaultValue={cookieUserPassword}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pe-10"
                {...register("password", { required: true })}
                required
              />

              <div
                className="absolute top-[55%] right-3 w-fit"
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
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
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
                  className="w-full Roboto bg-[#FFD66C] cursor-pointer hover:shadow-md font-bold  text-sm px-5 py-2.5 text-center "
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
