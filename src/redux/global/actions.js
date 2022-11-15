import { SHOW_MODAL, MODAL_CONTENT, EDIT_ITEM, DISABLE_BTN } from './constants';

export const setShowModal = (payload) => {
  return {
    type: SHOW_MODAL,
    payload
  };
};

export const setModalContent = (payload) => {
  return {
    type: MODAL_CONTENT,
    payload
  };
};

export const editItem = (payload) => {
  return {
    type: EDIT_ITEM,
    payload
  };
};

export const disableBtn = (payload) => {
  return {
    type: DISABLE_BTN,
    payload
  };
};
