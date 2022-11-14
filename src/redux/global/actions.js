import { SHOW_MODAL, MODAL_CONTENT } from './constants';

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
