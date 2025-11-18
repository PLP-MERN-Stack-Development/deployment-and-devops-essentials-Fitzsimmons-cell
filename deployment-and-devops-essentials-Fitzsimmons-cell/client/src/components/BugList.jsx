import React from 'react';

export default function BugList({ bugs, onUpdate, onDelete }) {
  if (!bugs || !bugs.length) return <p>No bugs reported</p>;
  return (
    <ul>
      {bugs.map(b => (
        <li key={b._id || b.id} style={{ marginBottom: 8 }}>
          <strong>{b.title}</strong> - {b.priority} - {b.status}
          <button onClick={() => onUpdate(b._id || b.id, { status: 'in-progress' })}>Start</button>
          <button onClick={() => onUpdate(b._id || b.id, { status: 'resolved' })}>Resolve</button>
          <button onClick={() => onDelete(b._id || b.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
