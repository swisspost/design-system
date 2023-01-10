import { h } from '@stencil/core';

export const LogoSprite = () => (
  <svg aria-hidden="true" style={{ display: 'none' }}>
    <symbol id="favicon" viewBox="0 0 48 48">
      <g clip-path="url(#a)">
        <path fill="#FC0" d="M47.2 0H0v47.2h47.2V0Z" />
        <path
          fill="#fff"
          fill-rule="evenodd"
          d="m18.68 35.91 1.48-7.02H6.42l-1.47 7.02h13.73Z"
          clip-rule="evenodd"
        />
        <path
          fill="#000"
          fill-rule="evenodd"
          d="M16.96 16.56c-.47-.07-.94-.1-1.42-.1H11.6L8.5 31.1h3.1l.95-4.47h1.8c.74.02 1.48-.07 2.18-.27a5.8 5.8 0 0 0 4-4.59c.49-2.73-.87-4.76-3.57-5.2Zm.47 5.06a2.63 2.63 0 0 1-2.06 2.22c-.33.06-.66.1-1 .1h-1.25l1-4.78h1.36c.31-.01.62.03.92.11.77.26 1.24 1.03 1.03 2.35"
          clip-rule="evenodd"
        />
        <path
          fill="red"
          fill-rule="evenodd"
          d="m34.5 16.43 1.86-8.84H24.63l-2.45 11.58h2.9l1.87-8.84h5.93L31 19.17h8.8l-1.17 5.53h-8.75l-1.75 8.28H21.5l-.57 2.78h9.54l1.75-8.3h8.72l2.34-11.03H34.5Z"
          clip-rule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h47.2v47.2H0z" />
        </clipPath>
      </defs>
    </symbol>
  </svg>
);

export const FaviconSvg = (props: { className?: string }) => (
  <svg viewBox="0 0 48 48" class={props.className} aria-hidden="true">
    <use href="#favicon" />
  </svg>
);
