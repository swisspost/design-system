import { parse } from '../../../utils/sass-export';
import scss from './color.module.scss';

export const SCSS_VARIABLES = parse(scss);

export const ColorSwatch = (props: { name: string; color: string; noCSS?: boolean }) => {
  return (
    <article className="color-swatch">
      <div className="color-swatch__description">
        <h3 className="description__title h6">{props.name}</h3>
      </div>
      <div className="color-swatch__color">
        <div className="color__tile" style={{ backgroundColor: props.color }}>
          <ul className="list-unstyled ps-1 d-flex flex-column align-content-end">
            <li>
              <span className="white">white</span>
            </li>
            <li>
              <span className="black">black</span>
            </li>
          </ul>
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
          <dt>contrast to black</dt>
          <dd>
            <code>{SCSS_VARIABLES.contrast.black[props.name]}</code>
          </dd>
          <dt>contrast to white</dt>
          <dd>
            <code>{SCSS_VARIABLES.contrast.white[props.name]}</code>
          </dd>
        </dl>
      </div>
    </article>
  );
};
