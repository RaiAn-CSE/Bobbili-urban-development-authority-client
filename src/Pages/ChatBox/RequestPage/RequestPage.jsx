import React from "react";
import { useForm } from "react-hook-form";
import { LuMessagesSquare } from "react-icons/lu";
import { IoMdStar } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";

const RequestPage = ({ props }) => {
  const { setRequestSent, setUserInfo } = props;
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = async (dataFromUser) => {
    console.log(dataFromUser);

    setUserInfo(dataFromUser);

    const messageRequest = {
      userId: `Help-${dataFromUser.name}-${dataFromUser.mobileNo}`,
      name: dataFromUser.name,
      mobile: dataFromUser.mobileNo,
    };

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/messageRequest",
        messageRequest,
        config
      );

      console.log(data, "DATA");

      if (data.acknowledged) {
        setRequestSent(true);
        setUserInfo((prev) => {
          return { ...prev, uniqueId: data.insertedId };
        });
      } else {
        toast.error("Server failed");
      }
    } catch (error) {
      toast.error("Server down");
    }
  };
  return (
    <div className="message-box h-full flex flex-col justify-around rounded-md">
      <div className="flex flex-col items-center">
        <button className="logo-btn mt-5" data-text="Awesome">
          <span className="actual-text text-4xl">&nbsp;BUDA&nbsp;</span>
          <span aria-hidden="true" className="hover-text text-4xl">
            &nbsp;BUDA&nbsp;
          </span>
        </button>

        <LuMessagesSquare
          size={70}
          className="nm_Container text-[#6c5ce7] mt-4"
        />
      </div>
      <form
        className="flex flex-col items-center space-y-6 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="indicator">
            <span className="indicator-item badge badge-xs text-red-500">
              <IoMdStar />
            </span>
            <label htmlFor="name" className="inline-block font-bold">
              Your Name
            </label>
          </div>
          <input
            className="input input-bordered border-2 border-violet-400 w-full max-w-xs rounded-full focus:outline-none"
            placeholder="Enter your name ..."
            type="text"
            id="name"
            {...register("name", { required: true })}
          />
        </div>

        <div>
          <div className="indicator">
            <span className="indicator-item badge badge-xs text-red-500">
              <IoMdStar />
            </span>
            <label htmlFor="mobile" className="inline-block font-bold">
              Mobile No
            </label>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs border-2 border-violet-400 rounded-full focus:outline-none "
            placeholder="Enter your mobile no..."
            {...register("mobileNo", { required: true })}
          />
        </div>
        {/* errors will return when field validation fails  */}
        {errors?.mobileNo && (
          <span className="text-red-500">This field is required</span>
        )}

        <input
          className="nm_Container capitalize p-2 px-4 text-lg rounded-full text-white bg-[#8980FD] cursor-pointer"
          type="submit"
          value={"Sent request"}
        />
      </form>
    </div>
  );
};

export default RequestPage;
