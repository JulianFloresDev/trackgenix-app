import {
  SHOW_MODAL,
  MODAL_CONTENT,
  EDIT_ITEM,
  DISABLE_BTN,
  FETCH_DATA_OFF,
  FETCH_DATA_ON
} from './constants';

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

export const fetchDataOn = () => {
  return {
    type: FETCH_DATA_ON
  };
};

export const fetchDataOff = () => {
  return {
    type: FETCH_DATA_OFF
  };
};
