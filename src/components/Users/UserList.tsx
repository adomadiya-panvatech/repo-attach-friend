import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import * as userService from '../../services/userService';
import UserForm from './UserForm';

const UserList = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);

  const fetchUsers = () => {
    if (user) {
      userService.getUsers(localStorage.getItem('token')!).then(setUsers);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const handleDelete = async (id: string) => {
    await userService.deleteUser(id, localStorage.getItem('token')!);
    fetchUsers();
  };

  const handleEdit = (u: any) => setEditing(u);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await userService.updateUser(editing.id, editing, localStorage.getItem('token')!);
    setEditing(null);
    fetchUsers();
  };

  const handleBan = async (id: string) => {
    await userService.banUser(id, localStorage.getItem('token')!);
    fetchUsers();
  };

  if (!user) return <div>Login required</div>;

  return (
    <div>
      <h2>User List</h2>
      <UserForm onUserCreated={fetchUsers} />
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {editing && editing.id === u.id ? (
              <form onSubmit={handleEditSubmit}>
                <input
                  name="name"
                  value={editing.name}
                  onChange={e => setEditing({ ...editing, name: e.target.value })}
                />
                <select
                  name="role"
                  value={editing.role}
                  onChange={e => setEditing({ ...editing, role: e.target.value })}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditing(null)}>Cancel</button>
              </form>
            ) : (
              <>
                {u.email} ({u.role}) {u.name}
                {user?.role === 'admin' && u.role !== 'admin' && !u.banned && (
                  <button onClick={() => handleBan(u.id)}>Ban</button>
                )}
                {u.banned && <span style={{color: 'red'}}>Banned</span>}
                <button onClick={() => handleEdit(u)}>Edit</button>
                <button onClick={() => handleDelete(u.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList; 