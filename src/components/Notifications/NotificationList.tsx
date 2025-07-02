import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import * as notificationService from '../../services/notificationService';

const NotificationList = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);

  const fetchNotifications = () => {
    if (user) {
      notificationService.getNotifications(localStorage.getItem('token')!).then(setNotifications);
    }
  };

  useEffect(() => { fetchNotifications(); }, [user]);

  const handleMarkAsRead = async (id: string) => {
    await notificationService.markAsRead(id, localStorage.getItem('token')!);
    fetchNotifications();
  };

  return (
    <div>
      <h3>Notifications</h3>
      <ul>
        {notifications.map(n => (
          <li key={n.id} style={{ fontWeight: n.read ? 'normal' : 'bold' }}>
            {n.message}
            {!n.read && <button onClick={() => handleMarkAsRead(n.id)}>Mark as read</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList; 