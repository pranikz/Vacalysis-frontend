import React, { useRef, useState } from "react";
import { getdata } from "../service/api";
import { useEffect } from "react";
import axios from "axios";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const url = "http://localhost:5000";

const Main = ({ className }) => {
  const getdataAgeCount = async () => {
    try {
      return await axios.get(`${url}/api/add/count?is_Vaccinated=${checked}`);
    } catch (error) {
      console.log("error while calling api", error);
    }
  };
  const getResults = async () => {
    try {
      return await axios.get(`${url}/api/add/results`);
    } catch (error) {
      console.log("error while calling api", error);
    }
  };
  const dataFetchedRef = useRef(false);
  const [datas, setDatas] = useState([]);
  const [graphOne, setgraphOne] = useState([]);
  const [graphTwo, setgraphTwo] = useState([]);
  const [checked, setChecked] = useState(false);
  const toggleChecked = () => setChecked((value) => !value);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getAllData();
  }, []);
  const getAllData = async () => {
    let response = await getdata();
    setDatas(response.data);
    console.log(response.data);
  };
  const getGraphData = async () => {
    let response = await getdataAgeCount();
    setgraphOne(response.data);
    console.log("Graph data:", graphOne);
  };
  const getGraphDataTwo = async () => {
    let response = await getResults();
    setgraphTwo(response.data);
    console.log("Graph data:", response.data);
  };

  return (
    <div className={`${className} md:pt-2.5 bg-gray-900 `}>
      <div className="py-32 md:py-10  bg-gray-900 mobile-nav ">
        <div className="lg:grid lg:grid-cols-2 mx-auto max-w-8xl lg:px-2 lg:gap-8">
          <div className=" lg:my-2.5 mx-auto max-w-med px-4 sm:max-w-2xl lg:px-0">
            <p className="text-base text-gray-300 sm:mt-5 sm:text-xl mb-10">
              Populated data
            </p>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Vaccinated
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Birthdate
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Gender
                    </th>
                  </tr>
                </thead>
                {datas.map((data, i) => {
                  return (
                    <tbody key={i}>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {data?.name}
                        </th>
                        <td className="px-4 py-4">
                          {data?.is_Vaccinated.toString()}
                        </td>
                        <td className="px-4 py-4">
                          {new Date(data?.birthdate).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                        <td className="px-4 py-4">{data?.gender}</td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
          <div className="md:pt-2.5 h-auto  lg:relative">
            <div className="mx-auto max-w-med px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
              <div className=" lg:my-2.5 mx-auto max-w-med px-4 sm:max-w-2xl lg:px-0">
                <p className="text-base text-gray-300 sm:mt-5 sm:text-xl mb-10">
                  Graphical data
                </p>
                <div>
                  <div className="flex md:gap-7 justify-between">
                    <form>
                      <div className="flex gap-10">
                        <label className="block text-black dark:text-white text-2xl font-bold mb-1">
                          Is vacinnated?
                        </label>
                        <input
                          className="w-5"
                          type="checkbox"
                          checked={checked}
                          onChange={toggleChecked}
                        />
                      </div>
                    </form>
                    <button
                      className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => {
                        getGraphData();
                      }}
                    >
                      fetch graph
                    </button>
                  </div>

                  <BarChart width={300} height={250} data={graphOne}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="count" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="age" fill="#8884d8" />
                  </BarChart>
                </div>
                <div className="mt-10">
                  <div className="flex md:gap-7 justify-between ">
                    <div className="flex gap-10">
                      <label className="block text-black dark:text-white text-2xl font-bold mb-1">
                        Result graph
                      </label>
                    </div>
                    <button
                      className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => {
                        getGraphDataTwo();
                      }}
                    >
                      Final Results
                    </button>
                  </div>
                  <BarChart width={300} height={250} data={graphTwo}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="gender" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    <Bar dataKey="count" fill="#8884d8" />
                    <Bar dataKey="age" fill="#82ca9d" />
                  </BarChart>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
