import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import * as communityService from '../../services/communityService';

const CommunityList = () => {
  const { user } = useAuth();
  type Community = {
    id: string;
    name: string;
    description: string;
    // Add other fields as needed
  };

  const [communities, setCommunities] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [editing, setEditing] = useState(null);

  const fetchCommunities = () => {
    if (user) {
      communityService.getCommunities(localStorage.getItem('token')!).then(setCommunities);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, [user]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await communityService.createCommunity(form, localStorage.getItem('token')!);
    setForm({ name: '', description: '' });
    fetchCommunities();
  };

  const handleDelete = async (id: string) => {
    await communityService.deleteCommunity(id, localStorage.getItem('token')!);
    fetchCommunities();
  };

  const handleEdit = (c: any) => setEditing(c);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await communityService.updateCommunity(editing.id, editing, localStorage.getItem('token')!);
    setEditing(null);
    fetchCommunities();
  };

  return (
    <div>
      <h2>Community Groups</h2>
      {user?.role === 'admin' && (
        <form onSubmit={handleCreate}>
          <input
            name="name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
          />
          <button type="submit">Add Community</button>
        </form>
      )}
      <ul>
        {communities.map((c) => (
          <li key={c.id}>
            {editing && editing.id === c.id ? (
              <form onSubmit={handleEditSubmit}>
                <input
                  name="name"
                  value={editing.name}
                  onChange={e => setEditing({ ...editing, name: e.target.value })}
                  required
                />
                <textarea
                  name="description"
                  value={editing.description}
                  onChange={e => setEditing({ ...editing, description: e.target.value })}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditing(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <strong>{c.name}</strong>: {c.description}
                {user?.role === 'admin' && (
                  <>
                    <button onClick={() => handleEdit(c)}>Edit</button>
                    <button onClick={() => handleDelete(c.id)}>Delete</button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityList; 