import axios from "axios";

export default axios.create({
  // baseURL: "http://192.168.1.233:3000", //casa
  baseURL: "http://192.168.137.1:3000", //uni
  headers: {
    "Content-type": "application/json",
  },
});
