import axios from "axios";
const api = "http://rest.learncode.academy/api/learncode";

export default {
  getAllFriends: () => {
    return axios.get(`${api}/friends`);
  }
};
