import axios from "axios";

export default axios.create({
  baseURL: "http://172.23.113.133:3000", //uni
  // baseURL: "http://192.168.1.231:3000",
  headers: {
    "Content-type": "application/json",
  },
});
