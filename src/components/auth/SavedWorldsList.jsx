import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useWorldBibleActions } from '../../context/WorldBibleContext.jsx';

export default function SavedWorldsList({ onLoadWorld }) {
  const { user } = useAuth();
  const { load } = useWorldBibleActions();
  const [worlds, setWorlds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchWorlds() {
      setLoading(true);
      const { data, error: err } = await supabase
        .from('worlds')
        .select('id, name, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (cancelled) return;
      if (err) setError(err.message);
      else setWorlds(data || []);
      setLoading(false);
    }
    fetchWorlds();
    return () => { cancelled = true; };
  }, [user.id]);

  async function handleLoad(id) {
    setLoadingId(id);
    setError('');
    const { data, error: err } = await supabase.from('worlds').select('world_bible').eq('id', id).single();
    setLoadingId(null);
    if (err) {
      setError(err.message);
      return;
    }
    load(data.world_bible);
    onLoadWorld();
  }

  async function handleDelete(id) {
    const { error: err } = await supabase.from('worlds').delete().eq('id', id);
    if (err) {
      setError(err.message);
      return;
    }
    setWorlds((prev) => prev.filter((w) => w.id !== id));
  }

  if (loading) return <p className="gen-block__hint">Loading your worlds…</p>;
  if (error) return <p className="auth-modal__error">{error}</p>;
  if (!worlds.length) return <p className="summary-empty">No saved worlds yet — save one from the Story Kit screen.</p>;

  return (
    <ul className="saved-worlds-list">
      {worlds.map((w) => (
        <li key={w.id} className="saved-worlds-list__item">
          <button type="button" className="saved-worlds-list__load" onClick={() => handleLoad(w.id)} disabled={loadingId === w.id}>
            <span className="saved-worlds-list__name">{w.name}</span>
            <span className="saved-worlds-list__date">{new Date(w.created_at).toLocaleDateString()}</span>
          </button>
          <button type="button" className="btn-link saved-worlds-list__delete" onClick={() => handleDelete(w.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
