import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const getUsers = async (token: string) =>
  (await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } })).data;

export const createUser = async (user: any, token: string) =>
  (await axios.post(API_URL, user, { headers: { Authorization: `Bearer ${token}` } })).data;

export const updateUser = async (id: string, user: any, token: string) =>
  (await axios.put(`${API_URL}/${id}`, user, { headers: { Authorization: `Bearer ${token}` } })).data;

export const deleteUser = async (id: string, token: string) =>
  (await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } })).data;

export const banUser = async (id: string, token: string) =>
  (await axios.put(`/api/users/${id}/ban`, {}, { headers: { Authorization: `Bearer ${token}` } })).data; 