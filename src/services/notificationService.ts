import axios from 'axios';

export const getNotifications = async (token: string) =>
  (await axios.get('http://localhost:5000/api/notifications', { headers: { Authorization: `Bearer ${token}` } })).data;

export const markAsRead = async (id: string, token: string) =>
  (await axios.put(`http://localhost:5000/api/notifications/${id}/read`, {}, { headers: { Authorization: `Bearer ${token}` } })).data; 