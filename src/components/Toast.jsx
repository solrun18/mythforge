import React from 'react';

export default function Toast({ show, children }) {
  if (!show) return null;
  return <div className="toast" role="status">{children}</div>;
}
