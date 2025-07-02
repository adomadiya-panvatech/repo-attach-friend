import axios from 'axios';
const API_URL = 'http://localhost:5000/api/content';

export const getContent = async (token: string) =>
  (await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } })).data;

export const createContent = async (content: any, token: string) =>
  (await axios.post(API_URL, content, { headers: { Authorization: `Bearer ${token}` } })).data;

export const updateContent = async (id: string, content: any, token: string) =>
  (await axios.put(`${API_URL}/${id}`, content, { headers: { Authorization: `Bearer ${token}` } })).data;

export const deleteContent = async (id: string, token: string) =>
  (await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } })).data; 