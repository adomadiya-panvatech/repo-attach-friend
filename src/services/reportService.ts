import axios from 'axios';

export const reportFeed = async (feedId: string, reason: string, token: string) =>
  (await axios.post(`http://localhost:5000/api/feeds/${feedId}/reports`, { reason }, { headers: { Authorization: `Bearer ${token}` } })).data; 