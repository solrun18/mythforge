import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useWorldBibleActions } from '../../context/WorldBibleContext.jsx';

/**
 * Standalone dashboard of every world the current user has saved —
 * reached via the "Open dashboard" link in the account dropdown's
 * "My saved worlds" panel. Separate from that compact dropdown list:
 * this is the full-page version with room for a proper card layout.
 */
export default function MyWorldsPage({ onBack, onWorldLoaded }) {
  const { user } = useAuth();
  const { load } = useWorldBibleActions();
  const [worlds, setWorlds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);

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
    setBusyId(id);
    setError('');
    const { data, error: err } = await supabase.from('worlds').select('world_bible').eq('id', id).single();
    setBusyId(null);
    if (err) {
      setError(err.message);
      return;
    }
    load(data.world_bible);
    onWorldLoaded();
  }

  async function handleDelete(id) {
    setBusyId(id);
    const { error: err } = await supabase.from('worlds').delete().eq('id', id);
    setBusyId(null);
    if (err) {
      setError(err.message);
      return;
    }
    setWorlds((prev) => prev.filter((w) => w.id !== id));
  }

  return (
    <div className="step">
      <div className="step__intro">
        <h2>My Worlds</h2>
        <p>Every world you've saved to your account. Load one back in, or clear out ones you're done with.</p>
      </div>

      {loading && <div className="gen-block__loading">✦ gathering your worlds…</div>}
      {!loading && error && <p className="auth-modal__error">{error}</p>}

      {!loading && !worlds.length && (
        <p className="summary-empty">
          No saved worlds yet — build one and hit "Save World" on the Story Kit screen.
        </p>
      )}

      {!loading && worlds.length > 0 && (
        <div className="my-worlds-grid">
          {worlds.map((w) => (
            <div key={w.id} className="my-worlds-card">
              <h3>{w.name}</h3>
              <p className="my-worlds-card__date">Saved {new Date(w.created_at).toLocaleDateString()}</p>
              <div className="my-worlds-card__actions">
                <button
                  type="button"
                  className="btn btn-primary-small"
                  onClick={() => handleLoad(w.id)}
                  disabled={busyId === w.id}
                >
                  {busyId === w.id ? 'Loading…' : 'Load'}
                </button>
                <button
                  type="button"
                  className="btn-link"
                  onClick={() => handleDelete(w.id)}
                  disabled={busyId === w.id}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="step__actions">
        <button type="button" className="btn btn-ghost-small" onClick={onBack}>← Back to Mythforge</button>
      </div>
    </div>
  );
}
