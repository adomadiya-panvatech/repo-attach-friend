import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import * as contentService from '../../services/contentService';

const ContentList = () => {
  const { user } = useAuth();
  const [content, setContent] = useState<any[]>([]);
  const [form, setForm] = useState({ title: '', body: '' });
  const [editing, setEditing] = useState<any | null>(null);

  const fetchContent = () => {
    if (user) {
      contentService.getContent(localStorage.getItem('token')!).then(setContent);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [user]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await contentService.createContent(form, localStorage.getItem('token')!);
    setForm({ title: '', body: '' });
    fetchContent();
  };

  const handleDelete = async (id: string) => {
    await contentService.deleteContent(id, localStorage.getItem('token')!);
    fetchContent();
  };

  const handleEdit = (c: any) => setEditing(c);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await contentService.updateContent(editing.id, editing, localStorage.getItem('token')!);
    setEditing(null);
    fetchContent();
  };

  return (
    <div>
      <h2>Content List</h2>
      {user?.role === 'admin' && (
        <form onSubmit={handleCreate}>
          <input
            name="title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
            required
          />
          <textarea
            name="body"
            value={form.body}
            onChange={e => setForm({ ...form, body: e.target.value })}
            placeholder="Body"
            required
          />
          <button type="submit">Add Content</button>
        </form>
      )}
      <ul>
        {content.map((c) => (
          <li key={c.id}>
            {editing && editing.id === c.id ? (
              <form onSubmit={handleEditSubmit}>
                <input
                  name="title"
                  value={editing.title}
                  onChange={e => setEditing({ ...editing, title: e.target.value })}
                  required
                />
                <textarea
                  name="body"
                  value={editing.body}
                  onChange={e => setEditing({ ...editing, body: e.target.value })}
                  required
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditing(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <strong>{c.title}</strong>: {c.body}
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

export default ContentList; 