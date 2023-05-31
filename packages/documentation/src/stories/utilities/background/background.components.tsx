import { parse } from '../../../utils/sass-export';
import { forEach } from '../../../utils/react';
import scss from './background.components.scss';

const SCSS_VARIABLES = parse(scss);

const BACKGROUND_COLOR_KEYS = Object.keys(SCSS_VARIABLES.background);
const CONTEXTUAL_COLOR_KEYS = Object.keys(SCSS_VARIABLES.contextual).filter(cKey =>
  BACKGROUND_COLOR_KEYS.includes(cKey),
);
const ACCENT_COLOR_KEYS = Object.keys(SCSS_VARIABLES.accent).filter(cKey =>
  BACKGROUND_COLOR_KEYS.includes(cKey),
);
const BASE_COLOR_KEYS = BACKGROUND_COLOR_KEYS.filter(
  cKey => !CONTEXTUAL_COLOR_KEYS.includes(cKey) && !ACCENT_COLOR_KEYS.includes(cKey),
);

export function BackgroundContainer(props: { color: string }) {
  return (
    <article className={['docs-background-container', `bg-${props.color}`].join(' ')}>
      .bg-{props.color}
    </article>
  );
}

export function BackgroundContainers() {
  return (
    <div className="docs-background-containers">
      {ACCENT_COLOR_KEYS.length > 0 || CONTEXTUAL_COLOR_KEYS.length > 0 ? (
        <h4 className="mt-4">Base</h4>
      ) : null}
      <div className="row mt-n3 g-3">
        {forEach(BASE_COLOR_KEYS, (data: { key: string; value: any }) => (
          <div className="col-rg-6 col-md-4 col-lg-3">
            {BackgroundContainer({ color: data.value })}
          </div>
        ))}
      </div>

      {ACCENT_COLOR_KEYS.length > 0 ? (
        <div>
          <h4 className="mt-4">Accent</h4>
          <div className="row mt-n3 g-3">
            {forEach(ACCENT_COLOR_KEYS, (data: { key: string; value: any }) => (
              <div className="col-rg-6 col-md-4 col-lg-3">
                {BackgroundContainer({ color: data.value })}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {CONTEXTUAL_COLOR_KEYS.length > 0 ? (
        <div>
          <h4 className="mt-4">Contextual</h4>
          <div className="row mt-n3 g-3">
            {forEach(CONTEXTUAL_COLOR_KEYS, (data: { key: string; value: any }) => (
              <div className="col-rg-6 col-md-4 col-lg-3">
                {BackgroundContainer({ color: data.value })}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
