import { SHOW_MODAL, MODAL_CONTENT, EDIT_ITEM } from './constants';

const INITIAL_STATE = {
  showModal: false,
  modalContent: <div></div>,
  itemToPUT: {}
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
    default:
      return state;
  }
};

export default globalReducer;
