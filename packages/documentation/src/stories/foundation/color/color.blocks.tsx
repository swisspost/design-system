import { parse } from '../../../utils/sass-export';
import scss from './color.module.scss';

export const SCSS_VARIABLES = parse(scss);

export const ColorSwatch = (props: { name: string; color: string; noCSS?: boolean }) => {
  let contrastWhite: Number = SCSS_VARIABLES.contrast.white[props.name];
  let contrastBlack: Number = SCSS_VARIABLES.contrast.black[props.name];
  return (
    <article className="color-swatch">
      <div className="color-swatch__description">
        <h3 className="description__title h6">{props.name}</h3>
      </div>
      <div className="color-swatch__color">
        <div
          className="color__tile"
          style={{
            backgroundColor: props.color,
            color:
              contrastBlack >= contrastWhite
                ? SCSS_VARIABLES.brand.black
                : SCSS_VARIABLES.brand.white,
          }}
        >
          <div className="h-100 px-2 d-flex flex-column align-items-end justify-content-center">
            <div className="d-flex align-items-center">
              <span className="fs-tiny">{Number(contrastWhite).toFixed(2)}</span>
              <div className="h-mini w-mini ms-mini  white"></div>
            </div>
            <div className="d-flex align-items-center">
              <span className="fs-tiny">{Number(contrastBlack).toFixed(2)}</span>
              <div className="h-mini w-mini ms-mini black"></div>
            </div>
          </div>
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
