import React from "react";
import UserImg from "../../assets/images/test.jpg";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <div className="w-10 rounded-full">
          <img src={UserImg} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
