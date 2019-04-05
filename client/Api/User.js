import axios from "axios";
const api = "http://localhost:3000";

export default {
  getUserDetail: (id) => (
    axios.get(`${api}/api/user/${id}`)
  ),
  getAllUsers: () => (
    axios.get(`${api}/api/user/all`)
  ),
  getRooms: (userId) => (
    axios.get(`${api}/api/room/list/${userId}`)
  )
};
