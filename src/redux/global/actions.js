import {
  SHOW_MODAL,
  MODAL_CONTENT,
  EDIT_ITEM,
  FETCH_DATA_OFF,
  FETCH_DATA_ON,
  GET_USER_ERROR,
  SET_USER,
  SET_FILTER_DATA,
  SET_SORT_BY
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

export const setUser = (payload) => {
  return {
    type: SET_USER,
    payload
  };
};

export const getUserError = () => {
  return {
    type: GET_USER_ERROR
  };
};

export const setFilterData = (payload) => {
  return {
    type: SET_FILTER_DATA,
    payload
  };
};

export const setSortBy = (payload) => {
  return {
    type: SET_SORT_BY,
    payload
  };
};
