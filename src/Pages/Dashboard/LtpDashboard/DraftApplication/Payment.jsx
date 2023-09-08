import React from "react";
import { Link } from "react-router-dom";
import InputField from "../../../Components/InputField";
import { GiMoneyStack } from "react-icons/gi";

const Payment = () => {
  return (
    <div className="flex flex-col p-6 lg:p-2 my-5">
      <div>
        <h3>UDA Charge</h3>
        <div className="divider m-0"></div>

        <div className="grid grid-cols-2 lg:grid-cols-5">
          <InputField id="myInput1" name="myInput" label='Development charges(on Vacant land)' placeholder="1000" type="number" />
          <InputField id="myInput2" name="myInput" label='Development charges(on Built-up area)' placeholder="1000" type="number" />
          <InputField id="myInput3" name="myInput" label='Impact fee (50% to UDA)' placeholder="5000" type="number" />
          <InputField id="myInput4" name="myInput" label='Total' placeholder="7000" type="number" />
          <div className="flex justify-start items-center ml-3">
            <button className="btn"><GiMoneyStack size={25} color='#6fd7bd' /> pay now</button>
          </div>
        </div>
      </div>

      <div>
        <h3>Grama Panchayat fee</h3>
        <div className="divider m-0"></div>

        <div className="grid grid-cols-2 lg:grid-cols-5">
          <InputField id="myInput5" name="myInput" label='Site approval charges' placeholder="1000" type="number" />
          <InputField id="myInput6" name="myInput" label='Building permit fee' placeholder="1000" type="number" />
          <InputField id="myInput7" name="myInput" label='Betterment charge' placeholder="1000" type="number" />
          <InputField id="myInput8" name="myInput" label='14% open space charges' placeholder="5000" type="number" />
          <InputField id="myInput8" name="myInput" label='Impact fee (50% to G.P.)' placeholder="5000" type="number" />
          <InputField id="myInput8" name="myInput" label='33% penalization charges' placeholder="0" type="number" />
          <InputField id="myInput8" name="myInput" label='Total' placeholder="13000" type="number" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5">
          <InputField id="myInput5" name="myInput" label='DD/Challan no.' placeholder="1234" type="number" />
          <InputField id="myInput6" name="myInput" label='DD/Challan date' placeholder="06-04-2023" type="text" />
          <InputField id="myInput7" name="myInput" label='Bank name' placeholder="xxxx" type="text" />
          <InputField id="myInput8" name="myInput" label='Branch' placeholder="xxxx" type="text" />
        </div>
      </div>


      <div>
        <h3>Labour cess charge</h3>
        <div className="divider m-0"></div>

        <div className="grid lg:grid-cols-5">
          <InputField id="myInput8" name="myInput" label='Site approval charges' placeholder="3000" type="number" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5">
          <InputField id="myInput5" name="myInput" label='DD/Challan no.' placeholder="1234" type="number" />
          <InputField id="myInput6" name="myInput" label='DD/Challan date' placeholder="06-04-2023" type="text" />
          <InputField id="myInput7" name="myInput" label='Bank name' placeholder="xxxx" type="text" />
          <InputField id="myInput8" name="myInput" label='Branch' placeholder="xxxx" type="text" />
        </div>
      </div>

      <div>
        <h3>Green fee charge</h3>
        <div className="divider m-0"></div>

        <div className="grid lg:grid-cols-5">
          <InputField id="myInput8" name="myInput" label='Site approval charges' placeholder="2000" type="number" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5">
          <InputField id="myInput5" name="myInput" label='DD/Challan no.' placeholder="1234" type="number" />
          <InputField id="myInput6" name="myInput" label='DD/Challan date' placeholder="06-04-2023" type="text" />
          <InputField id="myInput7" name="myInput" label='Bank name' placeholder="xxxx" type="text" />
          <InputField id="myInput8" name="myInput" label='Branch' placeholder="xxxx" type="text" />
        </div>

        <div className="flex justify-center mb-5">
          <Link className="mr-2" to="">
            <button class="btn">Save All</button>
          </Link>
          <Link to="">
            <button class="btn">Sent to Department</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Payment;
