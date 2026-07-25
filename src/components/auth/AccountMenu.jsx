import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import AuthModal from './AuthModal.jsx';
import ProfileEditForm from './ProfileEditForm.jsx';
import ChangePasswordForm from './ChangePasswordForm.jsx';
import SavedWorldsList from './SavedWorldsList.jsx';

/**
 * Fixed top-right indicator — always pinned to the viewport corner (not
 * just once you've scrolled), so it's available from anywhere in the
 * app. Shows "Log in" when signed out, or an avatar + name that opens a
 * dropdown with profile editing, password change, and saved worlds
 * when signed in.
 */
export default function AccountMenu({ onWorldLoaded }) {
  const { isConfigured, loading, user, profile, signOut } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panel, setPanel] = useState('menu');
  const rootRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    function handleKey(e) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKey);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [menuOpen]);

  function toggleMenu() {
    setPanel('menu');
    setMenuOpen((v) => !v);
  }

  async function handleSignOut() {
    await signOut();
    setMenuOpen(false);
  }

  if (!isConfigured || loading) return null;

  if (!user) {
    return (
      <>
        <div className="account-menu">
          <button type="button" className="account-menu__login-btn" onClick={() => setAuthOpen(true)}>
            Log in
          </button>
        </div>
        <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialMode="login" />
      </>
    );
  }

  const displayName = profile?.full_name || user.email;

  return (
    <div className="account-menu" ref={rootRef}>
      <button type="button" className="account-menu__trigger" onClick={toggleMenu} aria-expanded={menuOpen}>
        <span className="account-menu__avatar">
          {profile?.avatar_url
            ? <img src={profile.avatar_url} alt="" />
            : <span className="account-menu__avatar-fallback">{displayName.charAt(0).toUpperCase()}</span>}
        </span>
        <span className="account-menu__name">{displayName}</span>
        <span className="account-menu__caret">▾</span>
      </button>

      {menuOpen && (
        <div className="account-panel">
          {panel === 'menu' && (
            <>
              <div className="account-panel__header">
                <span className="account-menu__avatar account-menu__avatar--lg">
                  {profile?.avatar_url
                    ? <img src={profile.avatar_url} alt="" />
                    : <span className="account-menu__avatar-fallback">{displayName.charAt(0).toUpperCase()}</span>}
                </span>
                <div>
                  <p className="account-panel__name">{displayName}</p>
                  <p className="account-panel__email">{user.email}</p>
                </div>
              </div>
              {profile?.about_me && <p className="account-panel__about">{profile.about_me}</p>}
              <div className="account-panel__menu">
                <button type="button" className="account-panel__menu-item" onClick={() => setPanel('edit')}>Edit profile</button>
                <button type="button" className="account-panel__menu-item" onClick={() => setPanel('password')}>Change password</button>
                <button type="button" className="account-panel__menu-item" onClick={() => setPanel('worlds')}>My saved worlds</button>
                <button type="button" className="account-panel__menu-item account-panel__menu-item--danger" onClick={handleSignOut}>Log out</button>
              </div>
            </>
          )}

          {panel === 'edit' && (
            <>
              <h3 className="account-panel__title">Edit profile</h3>
              <ProfileEditForm onDone={() => setPanel('menu')} />
            </>
          )}

          {panel === 'password' && (
            <>
              <h3 className="account-panel__title">Change password</h3>
              <ChangePasswordForm onDone={() => setPanel('menu')} />
            </>
          )}

          {panel === 'worlds' && (
            <>
              <h3 className="account-panel__title">My saved worlds</h3>
              <SavedWorldsList onLoadWorld={() => { setMenuOpen(false); onWorldLoaded?.(); }} />
              <button type="button" className="btn-link account-panel__back" onClick={() => setPanel('menu')}>Back</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
