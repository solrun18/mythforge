import React from 'react';

export default function OptionCard({ option, isSelected, onSelect }) {
  return (
    <button
      type="button"
      className={`option-card${isSelected ? ' option-card--selected' : ''}`}
      onClick={() => onSelect(option)}
    >
      <span className="option-card__corner option-card__corner--tl" />
      <span className="option-card__corner option-card__corner--tr" />
      <span className="option-card__corner option-card__corner--bl" />
      <span className="option-card__corner option-card__corner--br" />
      <h4 className="option-card__title">{option.title}</h4>
      <p className="option-card__desc">{option.description}</p>
    </button>
  );
}
