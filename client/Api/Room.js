import axios from "axios";
const api = "http://localhost:3000";

export default {
  getRoomDetails: (id) => (
    axios.get(`${api}/api/room/${id}`)
  )
};
