import { SHOW_MODAL, MODAL_CONTENT, EDIT_ITEM, DISABLE_BTN } from './constants';

const INITIAL_STATE = {
  showModal: false,
  modalContent: <div></div>,
  itemToPUT: {},
  disable: true
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
    default:
      return state;
  }
};

export default globalReducer;
