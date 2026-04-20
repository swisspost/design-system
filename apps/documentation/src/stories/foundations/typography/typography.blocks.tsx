import React from 'react';

export function FontFaceWrapper(props: { children: React.ReactElement[] | null }) {
  return <div className="sb-fontface-wrapper">{props.children}</div>;
}

export function FontFace(props: { face: string; family: string; weight: string; style: string }) {
  return (
    <article className="sb-fontface">
      <div
        className={`sb-fontface__typo font-${props.family} fw-${props.weight} fst-${props.style}`}
      >
        Aa
      </div>

      <div
        className={`sb-fontface__chars font-${props.family} fw-${props.weight} fst-${props.style}`}
      >
        ABCDEFGHIJKLMNOPQRSTUVWXYZ
        <br />
        abcdefghijklmnopqrstuvwxyz
        <br />
        1234567890(,.;:?!$&*)
      </div>

      <div className="sb-fontface__settings">
        <div className="settings__face">{props.face}</div>
        <div className="settings__weight">
          <span>Weight:</span> {props.weight}
        </div>
        <div className="settings__style">
          <span>Style:</span> {props.style}
        </div>
      </div>
    </article>
  );
}
