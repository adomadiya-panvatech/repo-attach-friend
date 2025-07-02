import axios from 'axios';

export const getFeeds = async (communityId: string, token: string) =>
  (await axios.get(`http://localhost:5000/api/community/${communityId}/feeds`, { headers: { Authorization: `Bearer ${token}` } })).data;

export const createFeed = async (communityId: string, content: string, token: string) =>
  (await axios.post(`http://localhost:5000/api/community/${communityId}/feeds`, { content }, { headers: { Authorization: `Bearer ${token}` } })).data;

export const moderateFeed = async (communityId: string, feedId: string, status: string, token: string) =>
  (await axios.put(`http://localhost:5000/api/community/${communityId}/feeds/${feedId}/moderate`, { status }, { headers: { Authorization: `Bearer ${token}` } })).data;

export const deleteFeed = async (communityId: string, feedId: string, token: string) =>
  (await axios.delete(`http://localhost:5000/api/community/${communityId}/feeds/${feedId}`, { headers: { Authorization: `Bearer ${token}` } })).data; 