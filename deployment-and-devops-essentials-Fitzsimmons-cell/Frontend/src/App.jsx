import React, { useEffect, useState } from 'react';
import api from './services/api.js';
import BugForm from './components/BugForm.jsx';   
import BugList from './components/BugList.jsx';   
function App() {
  const [bugs, setBugs] = useState([]);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const res = await api.getBugs();
      setBugs(res.data);
    } catch (e) {
      setError('Failed to load bugs');
      console.error('Error fetching products:', e);
    }
  };

  useEffect(() => { load(); }, []);

  const createBug = async (data) => {
    try {
      const res = await api.createBug(data);
      setBugs(prev => [res.data, ...prev]);
    } catch (e) {
      setError('Failed to create bug');
      console.error('Error adding bug:', e);
    }
  };

  const updateBug = async (id, patch) => {
    try {
      const res = await api.updateBug(id, patch);
      setBugs(prev => prev.map(b => (b._id === id ? res.data : b)));
    } catch (e) { setError('Failed to update'); console.error(e); }
  };

  const deleteBug = async (id) => {
    try {
      await api.deleteBug(id);
      setBugs(prev => prev.filter(b => b._id !== id));
    } catch (e) { setError('Failed to delete'); console.error(e); }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Bug Tracker</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <BugForm onCreate={createBug} />
      <BugList bugs={bugs} onUpdate={updateBug} onDelete={deleteBug} />
    </div>
  );
}

export default App;
