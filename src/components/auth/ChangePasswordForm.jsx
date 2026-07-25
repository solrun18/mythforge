import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

/**
 * Used in two places: the account dropdown (change password while
 * logged in) and the password-recovery screen reached via the "forgot
 * password" email link — both just call the same changePassword(), the
 * only difference is the surrounding copy and what happens on success.
 */
export default function ChangePasswordForm({ onDone, recoveryMode = false }) {
  const { changePassword } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    setSaving(true);
    const { error: err } = await changePassword(password);
    setSaving(false);
    if (err) {
      setError(err.message);
      return;
    }
    onDone();
  }

  return (
    <form onSubmit={handleSubmit} className="profile-edit-form">
      {recoveryMode && <p className="gen-block__hint">Choose a new password for your account.</p>}
      <label className="field">
        <span>New password</span>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} autoFocus />
      </label>
      <label className="field">
        <span>Verify new password</span>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6} />
      </label>
      {error && <p className="auth-modal__error">{error}</p>}
      <div className="account-panel__actions">
        {!recoveryMode && <button type="button" className="btn btn-ghost-small" onClick={onDone}>Cancel</button>}
        <button type="submit" className="btn btn-primary-small" disabled={saving}>
          {saving ? 'Saving…' : 'Set new password'}
        </button>
      </div>
    </form>
  );
}
