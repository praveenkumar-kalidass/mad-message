import axios from "./index";

export default {
  getUserDetail: (id) => (
    axios.get(`/api/user/${id}`)
  ),
  getAllUsers: () => (
    axios.get("/api/user/all")
  ),
  getRooms: (userId) => (
    axios.get(`/api/room/list/${userId}`)
  ),
  updateMessages: (data) => (
    axios.post("/api/message/read", data)
  ),
  addRoom: (data) => (
    axios.post("/api/room", data)
  )
};
