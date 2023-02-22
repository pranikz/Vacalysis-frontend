import axios from "axios";
import toast from "react-hot-toast";
const refresh = () => window.location.reload(true);
const url = "http://localhost:5000";

export const getdata = async (data) => {
  try {
    return await axios.get(`${url}/api/add/data`);
  } catch (error) {
    console.log("error while calling api", error);
  }
};

export const addVote = async (data) => {
  try {
    return await axios.post(`${url}/api/add/vote`, data).then((res) => {
      if (res.status === 200) {
        toast.success("Success!");
        setTimeout(refresh, 500);
      }
    });
  } catch (error) {
    console.log("error while calling api", error);
    toast.error("Ahhhh try again!");
  }
};
