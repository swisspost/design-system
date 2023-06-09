import { parse } from '../../../utils/sass-export';
import scss from './background.components.scss';

export const SCSS_VARIABLES = parse(scss);

export function BackgroundContainer(props: { name: string; color: string }) {
  return (
    <article className="background-container">
      <div className="background-container__description">
        <h3 className="description__title h6">{props.name}</h3>
      </div>
      <div className="background-container__background">
        <div className={`background__tile bg-${props.name}`}>Text</div>
      </div>
      <div className="background-container__props">
        <dl>
          <dt>Class</dt>
          <dd>
            <code>.bg-{props.name}</code>
          </dd>
        </dl>
      </div>
    </article>
  );
}
