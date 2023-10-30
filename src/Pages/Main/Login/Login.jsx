import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SupportIcon from "../../../assets/images/customer-service.png";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import { BsFillHouseCheckFill, BsFillHouseLockFill } from "react-icons/bs";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import BeatLoader from "react-spinners/BeatLoader";
import { motion } from 'framer-motion'
import signInAnimation from "../../../assets/signIn.json";
import LoginCSS from '../../../Style/Login.module.css'
import Lottie from "lottie-react";

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
      <div className="relative">
        {/* support icon  */}

        {/* login form  */}
        <div className="">
          <div className="flex justify-between relative text-gray-50">
            <div className={`${LoginCSS.shapeDiv1} rounded-tl-lg`}>
              <h1 className="absolute top-2 left-2 text-2xl font-semibold">Sign</h1>
            </div>
            <div className={`${LoginCSS.shapeDiv2} rounded-tr-lg`}>
              <h1 className="absolute top-2 right-4 text-2xl font-semibold">in</h1>
            </div>
          </div>
          <div className="flex justify-center">
            <Lottie
              animationData={signInAnimation}
              loop={true}
              className="w-[200px] h-[200px] absolute top-3"
            />
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-5 shadow-lg mt-14 rounded-b-lg">

          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            {/* <h1 className="text-3xl text-center font-bold text-gray-50">
              Sign in
            </h1> */}

            <div className={`${LoginCSS.formGroup} relative pt-[20px] max-w-xs`}>
              <input
                type="text"
                {...register("id", { required: true })}
                id="userId"
                className="border-[1.5px] border-solid rounded-md block text-base w-full p-2 border-violet-400 text-gray-900 bg-white focus:border-violet-500 focus:outline-none focus:ring-2 ring-violet-50"
                defaultValue={cookieUserId}
                // placeholder="name@company.com"
                autoFocus
                required
              />
              <label
                htmlFor="userId"
                className='text-gray-900 text-base font-normal absolute top-0 left-[16px] pointer-events-none transform translate-y-7'
              >
                Your Id
              </label>
            </div>

            <div className={`${LoginCSS.formGroup} relative pt-[20px] max-w-xs`}>
              <input
                type={`${show === true ? "text" : "password"}`}
                id="password"
                // placeholder="••••••••"
                defaultValue={cookieUserPassword}
                className="border-[1.5px] border-solid rounded-md block text-base w-full p-2 border-violet-400 text-gray-900 bg-white  focus:border-violet-500 focus:outline-none focus:ring-2 ring-violet-50"
                {...register("password", { required: true })}
                required
              />
              <label
                htmlFor="password"
                className='text-gray-900 text-base font-normal absolute top-0 left-[16px] pointer-events-none transform translate-y-7'
              >
                Your password
              </label>

              <div
                className="absolute top-[55%] right-3 w-fit dark:text-black"
                onClick={handlePasswordShow}
              >
                {show ? <BsFillHouseCheckFill className="text-gray-50" /> : <BsFillHouseLockFill className="text-gray-900" />}
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  {...register("checkbox")}
                  className="w-4 h-4"
                />
              </div>
              <label
                htmlFor="remember"
                className="ml-2 text-sm font-roboto font-medium text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="w-full mx-auto">
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
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <input
                    type="submit"
                    value="Sign in"
                    className="w-full rounded-sm bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white cursor-pointer font-bold text-base px-7 py-2.5 my-1 text-center hover:bg-gradient-to-r hover:from-violet-600 hover:to-fuchsia-600"
                  />
                </motion.div>
              )}
            </div>
          </form>
        </div >
      </div >
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
