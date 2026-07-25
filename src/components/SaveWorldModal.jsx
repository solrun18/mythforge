import React, { useEffect, useState } from 'react';

/**
 * Prompts for a name before saving a world, prefilled with the
 * auto-derived default (the world premise title) so accepting the
 * default is a single click, but renaming is just as easy.
 */
export default function SaveWorldModal({ isOpen, defaultName, saving, error, onCancel, onConfirm }) {
  const [name, setName] = useState(defaultName);

  useEffect(() => {
    if (isOpen) setName(defaultName);
  }, [isOpen, defaultName]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onCancel();
    }
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onConfirm(trimmed);
  }

  return (
    <div className="modal-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="modal" role="dialog" aria-modal="true">
        <button type="button" className="modal__close" onClick={onCancel} aria-label="Close">✕</button>
        <form onSubmit={handleSubmit}>
          <h2>Save this world</h2>
          <p className="gen-block__hint">Give it a name, or keep the one we picked.</p>
          <label className="field">
            <span>World name</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required autoFocus />
          </label>
          {error && <p className="auth-modal__error">{error}</p>}
          <div className="account-panel__actions">
            <button type="button" className="btn btn-ghost-small" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary-small" disabled={saving || !name.trim()}>
              {saving ? 'Saving…' : 'Save World'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
