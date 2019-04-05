import Api from "../Api/Room";
import Room from "../ActionTypes/Room";

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

const startLoading = () => ({
  type: Room.START_ROOM_LOADING
});

export {
  getRoomDetails
};
