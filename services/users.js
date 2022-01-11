import { apiRequest } from "./api";

export const getUser = (params) =>
  apiRequest({
    path: `/users`,
    method: 'GET',
    params
  });

export const getDetailUser = (id) =>
  apiRequest({
    path: `/users/${id}`,
    method: 'GET',
  });

export const createUser = (bodyRequest) =>
  apiRequest({
    path: `/users`,
    method: 'POST',
    bodyRequest
  });

export const updateUser = (id, bodyRequest) =>
  apiRequest({
    path: `/users/${id}`,
    method: 'PUT',
    bodyRequest
  });

export const deleteUser = (id) =>
  apiRequest({
    path: `/users/${id}`,
    method: 'DELETE',
  });