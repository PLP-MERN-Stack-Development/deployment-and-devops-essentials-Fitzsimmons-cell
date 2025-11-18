import React, { useState } from 'react';

export default function BugForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('medium');

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onCreate({ title, description: desc, priority });
    setTitle(''); setDesc('');
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 20 }}>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
      <select value={priority} onChange={e=>setPriority(e.target.value)}>
        <option>low</option>
        <option>medium</option>
        <option>high</option>
      </select>
      <button type="submit">Report Bug</button>
    </form>
  );
}
