import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function ProfileEditForm({ onDone }) {
  const { profile, updateProfile } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [aboutMe, setAboutMe] = useState(profile?.about_me || '');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(profile?.avatar_url || null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!fullName.trim()) {
      setError('Full name is required.');
      return;
    }
    setSaving(true);
    const { error: err } = await updateProfile({ fullName: fullName.trim(), aboutMe: aboutMe.trim(), avatarFile });
    setSaving(false);
    if (err) {
      setError(err.message);
      return;
    }
    onDone();
  }

  return (
    <form onSubmit={handleSubmit} className="profile-edit-form">
      <div className="auth-modal__avatar-picker">
        <div className="auth-modal__avatar-preview">
          {avatarPreview ? <img src={avatarPreview} alt="" /> : <span className="auth-modal__avatar-placeholder">✦</span>}
        </div>
        <label className="btn btn-ghost-small">
          Change photo
          <input type="file" accept="image/*" onChange={handleAvatarChange} hidden />
        </label>
      </div>
      <label className="field">
        <span>Full name</span>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      </label>
      <label className="field">
        <span>About me <span className="badge-optional">optional</span></span>
        <textarea value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} rows={3} />
      </label>
      {error && <p className="auth-modal__error">{error}</p>}
      <div className="account-panel__actions">
        <button type="button" className="btn btn-ghost-small" onClick={onDone}>Cancel</button>
        <button type="submit" className="btn btn-primary-small" disabled={saving}>
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </form>
  );
}
