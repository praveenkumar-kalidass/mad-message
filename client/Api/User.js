import axios from "axios";
const api = "http://localhost:3000";

export default {
  getAllUsers: () => (
    axios.get(`${api}/api/user`)
  )
};
