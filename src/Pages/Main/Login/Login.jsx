import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SupportIcon from "../../../assets/images/customer-service.png";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import { BsFillHouseCheckFill, BsFillHouseLockFill } from "react-icons/bs";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import BeatLoader from "react-spinners/BeatLoader";
import { motion } from "framer-motion";
import signInAnimation from "../../../assets/signIn.json";
import LoginCSS from "../../../Style/Login.module.css";
import Lottie from "lottie-react";
import logInImg from "../../../assets/images/wave1.svg";

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
    getUserData(id)
      .then((result) => {
        if (result?.status) {
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
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Server Failed");
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
    <div className={`nm_Container z-[10] h-full overflow-hidden bg-[#E8EAEC]`}>
      <div className="relative overflow-hidden ">
        {/* support icon  */}

        {/* login form  */}
        {/* <div className="">
          <div className="flex justify-between  relative text-gray-50">
            <div className={`${LoginCSS.shapeDiv1} rounded-tl-lg`}>
              <h1 className="absolute top-2 left-2 text-2xl font-semibold z-20">Sign</h1>
            </div>
            <svg className="rotate-180 absolute rounded-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="#895DD5" fill-opacity="1" d="M0,160L60,138.7C120,117,240,75,360,85.3C480,96,600,160,720,160C840,160,960,96,1080,74.7C1200,53,1320,75,1380,85.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            </svg>

            <div className={`${LoginCSS.shapeDiv2} rounded-tr-lg`}>
              <h1 className="absolute top-2 right-4 text-2xl font-semibold z-20">in</h1>
            </div>
          </div>
          <div className="flex justify-center">
            <Lottie
              animationData={signInAnimation}
              loop={true}
              className="w-[200px] h-[200px] absolute top-2"
            />
          </div>
        </div> */}

        <div className="nm_Inset mt-[-65%] ml-[-20%] h-[330px] w-[343px] bg-gradient-to-r from-[#cecbf5] via-[#BDB9F6] to-[#8980fd] rounded-full flex justify-center flex-col items-center">
          <p
            className={`text text-white font-medium text-4xl uppercase pt-40 pr-14`}
          >
            Sign in
          </p>
          <p className="text-white font-base text-lg">Welcome back!</p>
        </div>

        <div className="p-4 sm:p-6 md:px-5 md:pt-3 shadow-lg rounded-b-lg">
          <form
            className="space-y-2 font-roboto"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* <h1 className="text-3xl text-center font-bold text-gray-50">
              Sign in
            </h1> */}

            <div
              className={`${LoginCSS.formGroup} relative pt-[20px] max-w-xs`}
            >
              <input
                type="text"
                {...register("id", { required: true })}
                id="userId"
                className="nm_Container border-[1.5px] border-solid rounded-full block text-base w-full py-2 px-4 border-violet-400 text-gray-900 bg-white  focus:border-violet-500 focus:outline-none focus:ring-2 ring-violet-50"
                defaultValue={cookieUserId}
                // placeholder="name@company.com"
                autoFocus
                required
              />
              <label
                htmlFor="userId"
                className="text-violet-400 text-base font-semibold absolute top-0 left-[16px] pointer-events-none transform translate-y-7"
              >
                Your Id
              </label>
            </div>

            <div
              className={`${LoginCSS.formGroup} relative pt-[20px] max-w-xs`}
            >
              <input
                type={`${show === true ? "text" : "password"}`}
                id="password"
                // placeholder="••••••••"
                defaultValue={cookieUserPassword}
                className={`nm_Container border-[1.5px] border-solid rounded-full block text-base w-full py-2 px-4 border-violet-400 text-gray-900 bg-white   ring-violet-50`}
                {...register("password", { required: true })}
                required
              />
              <label
                htmlFor="password"
                className="text-violet-400 text-base font-semibold absolute top-0 left-[20px] pointer-events-none transform translate-y-7"
              >
                Your password
              </label>

              <div
                className="absolute top-[55%] right-3 w-fit dark:text-black"
                onClick={handlePasswordShow}
              >
                {show ? (
                  <BsFillHouseCheckFill className="text-violet-400" />
                ) : (
                  <BsFillHouseLockFill className="text-violet-400" />
                )}
              </div>
            </div>

            <div className="flex items-center pt-2">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  {...register("checkbox")}
                  className="nm_Inset checkbox checked:border-none w-5 h-5 checked:checkbox-primary"
                />
              </div>
              <label
                htmlFor="remember"
                className={`${LoginCSS.checkboxLabel} ml-2 text-sm `}
              >
                Remember me
              </label>
            </div>
            <div className="flex justify-center">
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
                    className="nm_Inset bg-[#8980FD] py-2 px-7 rounded-full text-white cursor-pointer text-center mt-3 uppercase text-md"
                    // className="w-full rounded-sm bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white cursor-pointer font-bold text-base px-7 py-2.5 my-1 text-center hover:bg-gradient-to-r hover:from-violet-600 hover:to-fuchsia-600"
                  />
                </motion.div>
              )}
            </div>
          </form>
        </div>
      </div>
      {/* <div className=" absolute bottom-[2%] right-[2%] w-[15vw] h-[15vw] md:w-[12vw] md:h-[12vw] lg:w-[5vw] lg:h-[5vw] rounded-full cursor-pointer">
        <img
          className="object-cover"
          src={SupportIcon}
          alt="Customer support icon"
        />
      </div> */}
    </div>
  );
};

export default Login;
