import axios from "axios";

export default axios.create({
 // baseURL: "http://192.168.1.231:3000",
  // baseURL: "http://172.23.113.133:3000",
  // baseURL: "http://192.168.1.100:3000",
  // baseURL: "http://192.168.1.99:3000",
  // baseURL: "http://172.23.116.118:3000",
  // baseURL: "http://192.168.0.14:3000", //casa victoria
  // baseURL: "http://172.28.2.174:3000", // resi victoria
  baseURL: "http://172.23.117.239:3000", // esmad
  headers: {
    "Content-type": "application/json",
  },
});
