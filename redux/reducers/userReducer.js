import { combineReducers } from 'redux';

import {
  GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_ERROR,
  GET_USER_DETAIL_REQUEST, GET_USER_DETAIL_SUCCESS, GET_USER_DETAIL_ERROR,
  CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_ERROR,
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR,
  DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_ERROR,
} from "../types/userType";

import { FAILED, IDLE, REQUEST, SUCCESS } from "../../utils/cons";

const DEFAULT_STATE = {
  status: IDLE, payload: null, error: null
}

const list = (state = DEFAULT_STATE, action) => {
  const { type, payload, error } = action

  switch (type) {
    case GET_USER_REQUEST:
      return {
        status: REQUEST, payload: null, error: null
      }
    case GET_USER_SUCCESS:
      return {
        status: SUCCESS, payload, error: null
      }
    case GET_USER_ERROR:
      return {
        status: FAILED, payload: null, error
      }
    default:
      return { ...state }
  }
}

const detail = (state = DEFAULT_STATE, action) => {
  const { type, payload, error } = action

  switch (type) {
    case GET_USER_DETAIL_REQUEST:
      return {
        status: REQUEST, payload: null, error: null
      }
    case GET_USER_DETAIL_SUCCESS:
      return {
        status: SUCCESS, payload, error: null
      }
    case GET_USER_DETAIL_ERROR:
      return {
        status: FAILED, payload: null, error
      }
    default:
      return { ...state }
  }
}

const create = (state = DEFAULT_STATE, action) => {
  const { type, payload, error } = action

  switch (type) {
    case CREATE_USER_REQUEST:
      return {
        status: REQUEST, payload: null, error: null
      }
    case CREATE_USER_SUCCESS:
      return {
        status: SUCCESS, payload, error: null
      }
    case CREATE_USER_ERROR:
      return {
        status: FAILED, payload: null, error
      }
    default:
      return { ...state }
  }
}

const update = (state = DEFAULT_STATE, action) => {
  const { type, payload, error } = action

  switch (type) {
    case UPDATE_USER_REQUEST:
      return {
        status: REQUEST, payload: null, error: null
      }
    case UPDATE_USER_SUCCESS:
      return {
        status: SUCCESS, payload, error: null
      }
    case UPDATE_USER_ERROR:
      return {
        status: FAILED, payload: null, error
      }
    default:
      return { ...state }
  }
}

const removed = (state = DEFAULT_STATE, action) => {
  const { type, payload, error } = action

  switch (type) {
    case DELETE_USER_REQUEST:
      return {
        status: REQUEST, payload: null, error: null
      }
    case DELETE_USER_SUCCESS:
      return {
        status: SUCCESS, payload, error: null
      }
    case DELETE_USER_ERROR:
      return {
        status: FAILED, payload: null, error
      }
    default:
      return { ...state }
  }
}

const userReducer = combineReducers({
  list,
  detail,
  create,
  update,
  removed
})

export default userReducer