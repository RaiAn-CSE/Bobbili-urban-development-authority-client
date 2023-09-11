import React from "react";
import { Link } from "react-router-dom";
import InputField from "../../../Components/InputField";
import { GiMoneyStack } from "react-icons/gi";
import UDAChargeImg from "../../../../assets/images/mobile-transfer.png";
import GramChargeImg from "../../../../assets/images/pay-per-click.png";
import LabourChargeImg from "../../../../assets/images/payment-method.png";
import GreenChargeImg from "../../../../assets/images/money.png";
import { MdOutlineSendToMobile } from "react-icons/md";

const Payment = () => {
  return (
    <div className="grid my-5 lg:my-0 lg:p-2">
      <div className="flex justify-end">
        {/* <Link className="mr-2" to="">
          <button className="btn btn-md bg-green-500 hover:bg-green-600 text-white transition duration-500">
            Save All
          </button>
        </Link> */}
        <Link to="">
          <button className="btn btn-md bg-Primary hover:bg-btnHover transition duration-500">
            <span className="flex items-center"><MdOutlineSendToMobile size={20} /> Sent to Department</span>
          </button>
        </Link>
      </div>
      <div>
        <div className="flex items-center">
          <img
            src={UDAChargeImg}
            alt="Image icon for uda charge section"
            className="h-10 me-3"
          />
          <h3 className="font-bold text-xl">UDA Charge</h3>
        </div>
        <div className="divider m-0"></div>

        <div className="grid grid-cols-2 lg:grid-cols-3 mt-5 mb-7">
          <InputField
            id="myInput1"
            name="myInput"
            label="Development charges(on Vacant land)"
            placeholder="1000"
            type="number"
          />
          <InputField
            id="myInput2"
            name="myInput"
            label="Development charges(on Built-up area)"
            placeholder="1000"
            type="number"
          />
          <InputField
            id="myInput3"
            name="myInput"
            label="Impact fee (50% to UDA)"
            placeholder="5000"
            type="number"
          />
          <InputField
            id="myInput4"
            name="myInput"
            label="Total"
            placeholder="7000"
            type="number"
          />
          <div>
            <button className="btn btn-md text-sm px-3 mt-10 ml-3 bg-yellow-300 hover:bg-yellow-400 hover:shadow-md transition-all duration-500">
              <GiMoneyStack size={25} /> pay now
            </button>
          </div>
        </div>
      </div>

      <div className="my-5">
        <div className="flex items-center">
          <img
            src={GramChargeImg}
            alt="Image icon for Grama Panchayat fee section"
            className="h-10 me-3"
          />
          <h3 className="font-bold text-xl">Grama Panchayat fee</h3>
        </div>
        <div className="divider m-0"></div>

        <div className="grid grid-cols-2 lg:grid-cols-4 mt-3">
          <InputField
            id="myInput5"
            name="myInput"
            label="Site approval charges"
            placeholder="1000"
            type="number"
          />
          <InputField
            id="myInput6"
            name="myInput"
            label="Building permit fee"
            placeholder="1000"
            type="number"
          />
          <InputField
            id="myInput7"
            name="myInput"
            label="Betterment charge"
            placeholder="1000"
            type="number"
          />
          <InputField
            id="myInput8"
            name="myInput"
            label="14% open space charges"
            placeholder="5000"
            type="number"
          />
          <InputField
            id="myInput8"
            name="myInput"
            label="Impact fee (50% to G.P.)"
            placeholder="5000"
            type="number"
          />
          <InputField
            id="myInput8"
            name="myInput"
            label="33% penalization charges"
            placeholder="0"
            type="number"
          />
          <InputField
            id="myInput8"
            name="myInput"
            label="Total"
            placeholder="13000"
            type="number"
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 mb-8">
          <InputField
            id="myInput5"
            name="myInput"
            label="DD/Challan no."
            placeholder="1234"
            type="number"
          />
          <InputField
            id="myInput6"
            name="myInput"
            label="DD/Challan date"
            placeholder="06-04-2023"
            type="text"
          />
          <InputField
            id="myInput7"
            name="myInput"
            label="Bank name"
            placeholder="xxxx"
            type="text"
          />
          <InputField
            id="myInput8"
            name="myInput"
            label="Branch"
            placeholder="xxxx"
            type="text"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center">
          <img
            src={LabourChargeImg}
            alt="Image icon for labour charge section"
            className="h-10 me-3"
          />
          <h3 className="font-bold text-xl">Labour cess charge</h3>
        </div>
        <div className="divider m-0"></div>

        <div className="grid lg:grid-cols-4 mt-3">
          <InputField
            id="myInput8"
            name="myInput"
            label="Site approval charges"
            placeholder="3000"
            type="number"
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 mb-8">
          <InputField
            id="myInput5"
            name="myInput"
            label="DD/Challan no."
            placeholder="1234"
            type="number"
          />
          <InputField
            id="myInput6"
            name="myInput"
            label="DD/Challan date"
            placeholder="06-04-2023"
            type="text"
          />
          <InputField
            id="myInput7"
            name="myInput"
            label="Bank name"
            placeholder="xxxx"
            type="text"
          />
          <InputField
            id="myInput8"
            name="myInput"
            label="Branch"
            placeholder="xxxx"
            type="text"
          />
        </div>
      </div>

      <div className="my-5">
        <div className="flex items-center">
          <img
            src={GreenChargeImg}
            alt="Image icon for green charge section"
            className="h-10 me-3"
          />
          <h3 className="font-bold text-xl">Green fee charge</h3>
        </div>
        <div className="divider m-0"></div>

        <div className="grid lg:grid-cols-4 mt-3">
          <InputField
            id="myInput8"
            name="myInput"
            label="Site approval charges"
            placeholder="2000"
            type="number"
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          <InputField
            id="myInput5"
            name="myInput"
            label="DD/Challan no."
            placeholder="1234"
            type="number"
          />
          <InputField
            id="myInput6"
            name="myInput"
            label="DD/Challan date"
            placeholder="06-04-2023"
            type="text"
          />
          <InputField
            id="myInput7"
            name="myInput"
            label="Bank name"
            placeholder="xxxx"
            type="text"
          />
          <InputField
            id="myInput8"
            name="myInput"
            label="Branch"
            placeholder="xxxx"
            type="text"
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;
