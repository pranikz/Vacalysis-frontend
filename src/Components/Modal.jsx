import React, { useState } from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addVote } from "../service/api";

const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  const genderList = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];
  const truelist = [
    { value: "true", label: "True" },
    { value: "false", label: "False" },
  ];
  const [name, setName] = useState(null);
  const [gender, setGender] = useState(null);
  const [truestat, setTruestat] = useState(null);
  const [value, setValue] = useState(new Date());
  const handleNameChange = (e) => {
    console.log("Name:", e.target.value);
    setName(e.target.value);
  };
  const handleGenderChange = (e) => {
    console.log("Gender:", e.target.value);
    setGender(e.target.value);
  };
  const handleValueChange = (newValue) => {
    console.log("date:", newValue);
    setValue(newValue);
  };
  const handleVaxChange = (e) => {
    console.log("isVaccinated:", e.target.value);
    setTruestat(e.target.value);
  };
  const handleSubmit = async () => {
    await addVote({
      name: name,
      is_Vaccinated: truestat,
      birthdate: value,
      gender: gender,
    });
  };

  return (
    <>
      <button
        className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Fill Details
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative  my-6  md:w-96 ">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">General Info</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right  "
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-7 w-7 text-xl block bg-gray-400 py-0 items-center  ">
                      X
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <label className="block text-black text-sm font-bold mb-1">
                      Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      name="name"
                      onChange={handleNameChange}
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Gender
                    </label>
                    {genderList.map((x, i) => (
                      <label key={i}>
                        <input
                          type="radio"
                          name="gender"
                          value={x.value}
                          onChange={handleGenderChange}
                        />{" "}
                        {x.label}
                      </label>
                    ))}
                    <label className="block text-black text-sm font-bold mb-1">
                      Birthdate
                    </label>
                    <Datepicker
                      placeholderText="DD/MM/YYYY"
                      nextMonthButtonDisabled
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      dateFormat="dd/MM/yyyy"
                      showIcon
                      name="date"
                      selected={value}
                      maxDate={value}
                      onChange={handleValueChange}
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Is vacinnated?
                    </label>

                    {truelist.map((x, i) => (
                      <label key={i}>
                        <input
                          type="radio"
                          name="is_Vaccinated"
                          value={x.value}
                          onChange={handleVaxChange}
                        />{" "}
                        {x.label}
                      </label>
                    ))}
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      handleSubmit();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
