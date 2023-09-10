import React, { useState } from "react";
import InputField from "../../../Components/InputField";
import { Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import SelectorInput from '../../../Components/SelectorInput';

const BuildingInfo = () => {

  const [selectedOption, setSelectedOption] = useState('');
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const [selectedOptionCase, setSelectedOptionCase] = useState('');
  const [showAdditionalFieldsCase, setShowAdditionalFieldsCase] = useState(false);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    setShowAdditionalFields(selectedValue === 'Regularised under LRS');
  };

  const handleSelectChangeCase = (event) => {
    const selectedValue = event.target.value;
    setSelectedOptionCase(selectedValue);

    setShowAdditionalFieldsCase(selectedValue === 'Alteration Addition Existing' || selectedValue === 'Revision');
  };

  return (
    <div className="grid my-5 lg:my-0 lg:p-2">
      <div>
        <h3 className="font-bold text-xl">General Information</h3>
        <div className="divider m-0"></div>

        <div className="grid grid-cols-2 lg:grid-cols-4">

          <div className="my-2 mx-3">
            <label htmlFor="nature" className="block text-gray-600 mb-1 font-semibold">
              <span>Case Type</span>
            </label>
            <select
              id="nature"
              className="w-full px-3 py-[10px] border rounded-lg max-w-xs"
              value={selectedOptionCase}
              onChange={handleSelectChangeCase}
            >
              <option value="" disabled selected>
                Select Case type
              </option>
              <option>New</option>
              <option>Demolition and Reconstruction</option>
              <option>Alteration Addition Existing</option>
              <option>Revision</option>
            </select>
          </div>

          <div className="grid grid-cols-1 font-medium justify-items-center items-center my-2 mx-3">
            <p className="font-semibold text-gray-600 mb-1">Application Type?</p>
            <div>
              <label className="inline-flex items-center">
                <input type="radio" name="radio-1" className="radio h-4 w-4" value="yes" />
                <span className="ml-2 text-sm">Yes</span>
              </label>
              <label className="inline-flex items-center ml-3">
                <input type="radio" name="radio-1" className="radio h-4 w-4" value="no" />
                <span className="ml-2 text-sm">No</span>
              </label>
            </div>
          </div>

          <div className="my-2 mx-3">
            <label className="block text-gray-600 mb-1 font-semibold">
              <span>Nature of permission</span>
            </label>
            <select className="w-full px-3 py-[10px] border rounded-lg max-w-xs">
              <option disabled selected>Select Nature of permission</option>
              <option>General</option>
              <option>Regularised under BPS</option>
              <option>Housing Scheme</option>
            </select>
          </div>

          <div className="my-2 mx-3">
            <label htmlFor="nature" className="block text-gray-600 mb-1 font-semibold">
              <span>Nature of the site</span>
            </label>
            <select
              id="nature"
              className="w-full px-3 py-[10px] border rounded-lg max-w-xs"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="" disabled selected>
                Select Nature of the site
              </option>
              <option>Approved Layout</option>
              <option>Regularised under LRS</option>
              <option>Plot port of RLP/IPLP but not regularised</option>
              <option>Congested/ Gramakanta/ Old Built-up area</option>
              <option>Newly Developed/ Built up area</option>
            </select>
          </div>

          <InputField id="name5" name="Survey no." label="Survey no." placeholder="Survey no." type='number' />
          <InputField id="name6" name="District" label="District" placeholder="District" />
          <InputField id="name6" name="Mandal" label="Mandal" placeholder="Mandal" />
          <InputField id="name6" name="Grama Panchayat" label="Grama Panchayat" placeholder="Grama Panchayat" />
          <InputField id="name6" name="Village" label="Village" placeholder="Village" />
          {showAdditionalFieldsCase && (
            <>
              <InputField id="name6" name="Village" label="B.A no" placeholder="B.A no" />
            </>
          )}
          {showAdditionalFields && (
            <>
              <InputField id="name6" name="Village" label="L.P. no" placeholder="L.P. no" />
              <InputField id="name7" name="Village" label="Plot no" placeholder="Plot no" />
            </>
          )}
        </div>
      </div>

      <div className="my-5">
        <h3 className="font-bold text-xl">Plot Details</h3>
        <div className="divider m-0"></div>

        <div className="grid grid-cols-2 lg:grid-cols-4">
          <InputField
            id="name7"
            name="name34"
            label="Proposed Plot area"
            placeholder="in Sq.M." />
          <InputField id="name8"
            name="name1"
            label="Total Plot are as on ground"
            placeholder="in Sq.M." />
          <InputField
            id="name9"
            name="name1"
            label="Total Plot per document"
            placeholder="in Sq.M." />
          <InputField
            id="name10"
            name="name1"
            label="Road Widening Area"
            placeholder="in Sq.M." />
          <InputField
            id="name11"
            name="name1"
            label="Net Plot Area"
            placeholder="in Sq.M." />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 my-5">
          <div className="flex justify-center font-medium">
            <p>Whether site abuts any Existing Road?</p>
            <label className="inline-flex items-center ml-3">
              <input type="radio" name="radio-1" className="radio h-4 w-4" value="yes" />
              <span className="ml-2 text-sm">Yes</span>
            </label>
            <label className="inline-flex items-center ml-3">
              <input type="radio" name="radio-1" className="radio h-4 w-4" value="no" />
              <span className="ml-2 text-sm">No</span>
            </label>
          </div>

          <div className="flex justify-center font-medium">
            <p>Status of Road?</p>
            <label className="inline-flex items-center ml-3">
              <input type="radio" name="radio-1" className="radio h-4 w-4" value="Public" />
              <span className="ml-2 text-sm">Public</span>
            </label>
            <label className="inline-flex items-center ml-3">
              <input type="radio" name="radio-1" className="radio h-4 w-4" value="Private" />
              <span className="ml-2 text-sm">Private</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 mt-3">

          <div className="my-2 mx-3">
            <label className="block text-gray-600 mb-1 font-semibold">
              <span>Nature of Road</span>
            </label>
            <select className="w-full px-3 py-[10px] border rounded-lg max-w-xs">
              <option disabled selected>Select Nature of Road</option>
              <option>BT Road</option>
              <option>CC Road</option>
              <option>WBM</option>
              <option>Kutchha/ Graval</option>
            </select>
          </div>

          <InputField
            id="name12"
            name="name1"
            label="Existing road (in Mts.)"
            placeholder="in Sq.M." />
          <InputField
            id="name12"
            name="name1"
            label="Proposed road (in Mts.)"
            placeholder="in Sq.M." />
          <InputField
            id="name12"
            name="name1"
            label="Market Value (per Sq.Yd.)"
            placeholder="per Sq.Yd." />

          <div className="my-2 mx-3">
            <label className="block text-gray-600 mb-1 font-semibold">
              <span>Floor Name</span>
            </label>
            <select className="w-full px-3 py-[10px] border rounded-lg max-w-xs">
              <option disabled selected>Select Floor Name</option>
              <option>Stilt / Parking Floor</option>
              <option>Ground floor</option>
              <option>First Floor</option>
              <option>Second Floor</option>
            </select>
          </div>

          <InputField
            id="name12"
            name="name1"
            label="Plinth Area (in Sq.M.)"
            placeholder="in Sq.M." />
          <InputField
            id="name12"
            name="name1"
            label="Parking Area (in Sq.M.)"
            placeholder="in Sq.M." />
          <div className="flex justify-start items-center ml-3 mt-5">
            <button className="btn"><AiFillPlusCircle size={25} color='#6fd7bd' /></button>
          </div>
        </div>


        <div className="grid grid-cols-4">
          <div className="my-2 mx-3">
            <label htmlFor='disabled-input' className="block text-gray-600 mb-1 font-semibold">
              Total Plinth area
            </label>
            <input
              type='text'
              id='disabled-input'
              name="name1"
              placeholder="Automatically calculated"
              className="w-full px-3 py-2 border rounded-lg max-w-xs" disabled
            />
          </div>

          <div className="my-2 mx-3">
            <label htmlFor='disabled-input2' className="block text-gray-600 mb-1 font-semibold">
              Total Parking area
            </label>
            <input
              id="disabled-input2"
              name="name1"
              placeholder="Automatically calculated"
              className="w-full px-3 py-2 border rounded-lg max-w-xs" disabled
            />
          </div>
        </div>


        <div className="grid grid-cols-2 lg:grid-cols-4">
          <InputField
            id="name7"
            name="Proposed Plot area(in Sq.M.)"
            label="Front setback (in M.)"
            placeholder="in M." />
          <InputField
            id="name8"
            name="name1"
            label="Rare setback (in M.)"
            placeholder="in M." />
          <InputField
            id="name9"
            name="name1"
            label="Side1 setback (in M.)"
            placeholder="in M." />
          <InputField
            id="name10"
            name="name1"
            label="Side 2 setback (in M.)"
            placeholder="in M." />
          <InputField
            id="name11"
            name="name1"
            label="Total Height of The Building Exclude Stilt (in Mts.)"
            placeholder="in Mts." />
        </div>

        <div className="flex font-medium">
          <p>Compounding wall proposed?</p>
          <label className="inline-flex items-center ml-3">
            <input type="radio" name="radio-1" className="radio h-4 w-4" value="yes" />
            <span className="ml-2 text-sm">Yes</span>
          </label>
          <label className="inline-flex items-center ml-3">
            <input type="radio" name="radio-1" className="radio h-4 w-4" value="no" />
            <span className="ml-2 text-sm">No</span>
          </label>
        </div>

        <div className="flex font-medium">
          <p>Whether site Registered as house plot/ Building prior to 18-01 2006?</p>
          <label className="inline-flex items-center ml-3">
            <input type="radio" name="radio-1" className="radio h-4 w-4" value='yes' />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center ml-3">
            <input type="radio" name="radio-1" className="radio h-4 w-4" value='no' />
            <span className="ml-2">No</span>
          </label>
        </div>

      </div>

      <div>
        <h3 className="font-bold text-xl">Schedule of Boundaries</h3>
        <div className="divider m-0"></div>
        <div className="grid grid-cols-2 lg:grid-cols-4 items-center">
          <InputField id="name13" name="name1" label="North" placeholder="North" />
          <InputField id="name14" name="name1" label="South" placeholder="South" />
          <InputField id="name15" name="name1" label="East" placeholder="East" />
          <InputField id="name15" name="name1" label="West" placeholder="West" />
        </div>
      </div>

      <div className="flex justify-center my-5">
        <Link to="/dashboard/draftApplication/applicantInfo">
          <button className="btn">Save And Continue</button>
        </Link>
      </div>
    </div>
  );
};

export default BuildingInfo;
