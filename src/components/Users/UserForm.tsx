import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import * as userService from '../../services/userService';

const UserForm = ({ onUserCreated }: { onUserCreated: () => void }) => {
  const { user } = useAuth();
  const [form, setForm] = useState({ email: '', name: '', password: '', role: 'user' });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await userService.createUser(form, localStorage.getItem('token')!);
    setSuccess(true);
    setForm({ email: '', name: '', password: '', role: 'user' });
    onUserCreated();
  };

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create User</h3>
      {success && <div>User created!</div>}
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="Password" required />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Create</button>
    </form>
  );
};

export default UserForm; 