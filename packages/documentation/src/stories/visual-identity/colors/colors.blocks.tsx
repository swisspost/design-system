import { parse } from '@/utils/sass-export';
import scss from './colors.module.scss';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const SCSS_VARIABLES: any = parse(scss);

export const ColorSwatch = (props: {
  name: string;
  color: string;
  noCSS?: boolean;
  dark?: boolean;
  deprecated?: boolean;
}) => {
  const contrast = {
    text: SCSS_VARIABLES.contrast.color[props.name],
    white: Number(SCSS_VARIABLES.contrast.white[props.name]).toFixed(2),
    black: Number(SCSS_VARIABLES.contrast.black[props.name]).toFixed(2),
  };

  return (
    <article className="color-swatch">
      <div className="color-swatch__description">
        <h3 className="description__title h6">
          {props.name}
          {props.deprecated ? ' (deprecated)' : null}
        </h3>
        <p className="description__value">
          <span className="visually-hidden">CSS value: </span>
          {props.color}
        </p>
      </div>
      <div className={['color-swatch__color', props.dark ? 'bg-dark' : ''].join(' ')}>
        <div
          className="color__tile"
          style={{
            backgroundColor: props.color,
            color: contrast.text,
          }}
        >
          {contrast.text
            ? [
                <div key="contrast-white">
                  <div>{contrast.white}</div>
                  <div className="white"></div>
                </div>,
                <div key="contrast-black">
                  <div>{contrast.black}</div>
                  <div className="black"></div>
                </div>,
              ]
            : null}
        </div>
      </div>
      <div className="color-swatch__props">
        <dl>
          {!props.noCSS && [
            <dt key="title">CSS</dt>,
            <dd key="data">
              <code>var(--post-{props.name})</code>
            </dd>,
          ]}
          <dt>Sass</dt>
          <dd>
            <code>post.${props.name}</code>
          </dd>
        </dl>
      </div>
    </article>
  );
};
