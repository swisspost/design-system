import { ChangeEvent } from 'react';

const backgrounds = {
  'White': 'bg-white',
  'Yellow': 'bg-yellow',
  'Primary': 'bg-primary',
  'Nightblue Bright': 'bg-nightblue-bright',
  'Purple Bright': 'bg-purple-bright',
};

const onChange = (e: ChangeEvent<HTMLInputElement>) => {
  if (!e) return;
  document.querySelector('.color-switch')?.addEventListener('change', e => {
    document
      .querySelector('.elevation-container')
      ?.setAttribute('class', `elevation-container ${e.target?.value}`);
  });
};

export const ColorSwitch = () => {
  return (
    <fieldset className="color-switch">
      <legend>Background color</legend>
      {Object.entries(backgrounds).map(([key, value], index) => (
        <div key={key} className="color-chip">
          <input
            type="radio"
            name="elevation-background"
            value={value}
            id={`color-${key}`}
            onChange={onChange}
          />
          <label htmlFor={`color-${key}`}>{key}</label>
        </div>
      ))}
    </fieldset>
  );
};
