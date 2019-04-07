import axios from "./index";

export default {
  getRoomDetails: (id) => (
    axios.get(`/api/room/${id}`)
  ),
  postMessage: (data) => (
    axios.post("/api/message", data)
  )
};
