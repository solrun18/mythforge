import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

/**
 * Combined login / sign up / forgot-password modal. Login is entirely
 * optional throughout the app — this only ever opens when the user
 * clicks "Log in" or tries to save a world while signed out.
 */
export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const { isConfigured, signUp, signIn, requestPasswordReset } = useAuth();
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError('');
      setNotice('');
    }
  }, [isOpen, initialMode]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function resetFields() {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setAboutMe('');
    setAvatarFile(null);
    setAvatarPreview(null);
  }

  function switchMode(next) {
    setMode(next);
    setError('');
    setNotice('');
  }

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const { error: err } = await signIn({ email, password });
    setSubmitting(false);
    if (err) {
      setError(err.message);
      return;
    }
    resetFields();
    onClose();
  }

  async function handleSignup(e) {
    e.preventDefault();
    setError('');
    if (!fullName.trim()) {
      setError('Full name is required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    setSubmitting(true);
    const { error: err, needsEmailConfirmation } = await signUp({
      email,
      password,
      fullName: fullName.trim(),
      aboutMe: aboutMe.trim(),
      avatarFile,
    });
    setSubmitting(false);
    if (err) {
      setError(err.message);
      return;
    }
    if (needsEmailConfirmation) {
      resetFields();
      setNotice('Account created — check your email to confirm it before logging in.');
      setMode('login');
      return;
    }
    resetFields();
    onClose();
  }

  async function handleForgot(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const { error: err } = await requestPasswordReset(email);
    setSubmitting(false);
    if (err) {
      setError(err.message);
      return;
    }
    setNotice('If that email has an account, a reset link is on its way.');
  }

  return (
    <div className="modal-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal auth-modal" role="dialog" aria-modal="true" ref={dialogRef}>
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close">✕</button>

        {!isConfigured ? (
          <div className="auth-modal__unavailable">
            <h2>Accounts aren't set up yet</h2>
            <p className="gen-block__hint">
              Login and saved worlds need a Supabase project connected — see
              SUPABASE_SETUP.md in the project for setup steps.
            </p>
          </div>
        ) : (
          <>
            {mode === 'login' && (
              <form onSubmit={handleLogin}>
                <h2>Log in</h2>
                {notice && <p className="auth-modal__notice">{notice}</p>}
                <label className="field">
                  <span>Email</span>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
                </label>
                <label className="field">
                  <span>Password</span>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                {error && <p className="auth-modal__error">{error}</p>}
                <button type="submit" className="btn btn-primary auth-modal__submit" disabled={submitting}>
                  {submitting ? 'Logging in…' : 'Log in'}
                </button>
                <div className="auth-modal__links">
                  <button type="button" className="btn-link" onClick={() => switchMode('forgot')}>Forgot password?</button>
                  <button type="button" className="btn-link" onClick={() => switchMode('signup')}>Need an account? Sign up</button>
                </div>
              </form>
            )}

            {mode === 'signup' && (
              <form onSubmit={handleSignup}>
                <h2>Sign up</h2>
                <p className="gen-block__hint">Free — your email is your username.</p>
                <div className="auth-modal__avatar-picker">
                  <div className="auth-modal__avatar-preview">
                    {avatarPreview
                      ? <img src={avatarPreview} alt="" />
                      : <span className="auth-modal__avatar-placeholder">✦</span>}
                  </div>
                  <label className="btn btn-ghost-small">
                    Choose photo (optional)
                    <input type="file" accept="image/*" onChange={handleAvatarChange} hidden />
                  </label>
                </div>
                <label className="field">
                  <span>Email</span>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label className="field">
                  <span>Full name</span>
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </label>
                <label className="field">
                  <span>Password</span>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                </label>
                <label className="field">
                  <span>Verify password</span>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6} />
                </label>
                <label className="field">
                  <span>About me <span className="badge-optional">optional</span></span>
                  <textarea value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} rows={3} />
                </label>
                {error && <p className="auth-modal__error">{error}</p>}
                <button type="submit" className="btn btn-primary auth-modal__submit" disabled={submitting}>
                  {submitting ? 'Creating account…' : 'Sign up'}
                </button>
                <div className="auth-modal__links">
                  <button type="button" className="btn-link" onClick={() => switchMode('login')}>Already have an account? Log in</button>
                </div>
              </form>
            )}

            {mode === 'forgot' && (
              <form onSubmit={handleForgot}>
                <h2>Reset password</h2>
                <p className="gen-block__hint">We'll email you a link to set a new password.</p>
                <label className="field">
                  <span>Email</span>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
                </label>
                {error && <p className="auth-modal__error">{error}</p>}
                {notice && <p className="auth-modal__notice">{notice}</p>}
                <button type="submit" className="btn btn-primary auth-modal__submit" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Send reset link'}
                </button>
                <div className="auth-modal__links">
                  <button type="button" className="btn-link" onClick={() => switchMode('login')}>Back to log in</button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
