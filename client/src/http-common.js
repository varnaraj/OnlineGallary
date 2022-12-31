import axios from "axios";

export default axios.create({
  baseURL: "http://ec2-13-213-36-94.ap-southeast-1.compute.amazonaws.com:8080",
  headers: {
    "Content-type": "application/json",
  },
});
