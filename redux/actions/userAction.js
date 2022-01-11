import {
  getUser,
  getDetailUser,
  createUser,
  updateUser,
  deleteUser
} from "../../services/users";

import {
  GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_ERROR,
  GET_USER_DETAIL_REQUEST, GET_USER_DETAIL_SUCCESS, GET_USER_DETAIL_ERROR,
  CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_ERROR,
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR,
  DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_ERROR,
} from "../types/userType";

const setDispatchData = (type, payload, error) => {
  return {
    type,
    payload,
    error
  }
}

export const getUserAction = (params) => {
  return async (dispatch) => {
    dispatch(setDispatchData(GET_USER_REQUEST, null, null));
    try {
      const response = await getUser(params)

      dispatch(setDispatchData(GET_USER_SUCCESS, response?.data, null));
    } catch (e) {
      dispatch(setDispatchData(GET_USER_ERROR, null, e.response?.data));
    }
  }
}

export const getDetailUserAction = (id) => {
  return async (dispatch) => {
    dispatch(setDispatchData(GET_USER_DETAIL_REQUEST, null, null));
    try {
      const response = await getDetailUser(id)

      dispatch(setDispatchData(GET_USER_DETAIL_SUCCESS, response?.data, null));
    } catch (e) {
      dispatch(setDispatchData(GET_USER_DETAIL_ERROR, null, e.response?.data));
    }
  }
}

export const createUserAction = (body) => {
  return async (dispatch) => {
    dispatch(setDispatchData(CREATE_USER_REQUEST, null, null));
    try {
      const response = await createUser(body)

      dispatch(setDispatchData(CREATE_USER_SUCCESS, response?.data, null));
    } catch (e) {
      dispatch(setDispatchData(CREATE_USER_ERROR, null, e.response?.data));
    }
  }
}

export const updateUserAction = (id, body) => {
  return async (dispatch) => {
    dispatch(setDispatchData(UPDATE_USER_REQUEST, null, null));
    try {
      const response = await updateUser(id, body)

      dispatch(setDispatchData(UPDATE_USER_SUCCESS, response?.data, null));
    } catch (e) {
      dispatch(setDispatchData(UPDATE_USER_ERROR, null, e.response?.data));
    }
  }
}

export const deleteUserAction = (id) => {
  return async (dispatch) => {
    dispatch(setDispatchData(DELETE_USER_REQUEST, null, null));
    try {
      const response = await deleteUser(id)

      dispatch(setDispatchData(DELETE_USER_SUCCESS, response?.data, null));
    } catch (e) {
      dispatch(setDispatchData(DELETE_USER_ERROR, null, e.response?.data));
    }
  }
}