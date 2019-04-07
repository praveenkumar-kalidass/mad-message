import Api from "../Api/Room";
import Room from "../ActionTypes/Room";
import socket from "../Api/Socket";

const getRoomDetails = (id) => (dispatch) => {
  dispatch(startLoading());
  Api.getRoomDetails(id).then((response) => {
    dispatch(loadRoomDetails(response.data));
  });
};

const loadRoomDetails = (data) => ({
  type: Room.LOAD_ROOM_DETAILS,
  data
});

const startRoom = (roomId) => (dispatch) => {
  socket.emit("subscribe", roomId);
  socket.on("message", (data) => {
    dispatch(loadRoomMessage(data));
  });
};

const stopRoom = (roomId) => () => {
  socket.emit("unsubscribe", roomId);
};

const loadRoomMessage = (data) => ({
  type: Room.LOAD_ROOM_MESSAGE,
  data
});

const sendMessage = (data) => () => {
  Api.postMessage(data).then(() => {});
};

const startLoading = () => ({
  type: Room.START_ROOM_LOADING
});

export {
  getRoomDetails,
  startRoom,
  stopRoom,
  sendMessage
};
