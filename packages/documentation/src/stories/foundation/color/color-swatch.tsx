import { parse } from '../../../utils/sass-export';
import scss from './color.styles.scss';

export const SCSS_VARIABLES = parse(scss);

export const ColorSwatch = (props: { name: string; color: string; noCSS?: boolean }) => {
  return (
    <article className="color-swatch">
      <div className="color-swatch__description">
        <h3 className="description__title h6">{props.name}</h3>
      </div>
      <div className="color-swatch__color">
        <div className="color__tile" style={{ backgroundColor: props.color }}></div>
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
