import {
  SHOW_MODAL,
  MODAL_CONTENT,
  EDIT_ITEM,
  DISABLE_BTN,
  FETCH_DATA_OFF,
  FETCH_DATA_ON,
  SET_USER,
  GET_USER_ERROR
} from './constants';

const INITIAL_STATE = {
  showModal: false,
  modalContent: <div></div>,
  itemToPUT: {},
  disable: true,
  isFetchingData: false,
  user: JSON.parse(sessionStorage.getItem('userLogged')) || {}
};
const globalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        showModal: action.payload
      };
    case MODAL_CONTENT:
      return {
        ...state,
        modalContent: action.payload
      };
    case EDIT_ITEM:
      return {
        ...state,
        itemToPUT: action.payload
      };
    case DISABLE_BTN:
      return {
        ...state,
        disable: false
      };
    case FETCH_DATA_ON:
      return {
        ...state,
        isFetchingData: true
      };
    case FETCH_DATA_OFF:
      return {
        ...state,
        isFetchingData: false
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case GET_USER_ERROR:
      return {
        ...state,
        user: {}
      };
    default:
      return state;
  }
};

export default globalReducer;
