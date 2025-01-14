import axios from "axios";

export default axios.create({
  // baseURL: "http://192.168.1.77:3000",
    baseURL: "http://192.168.137.1:3000",
  headers: {
    "Content-type": "application/json",
  },
});
