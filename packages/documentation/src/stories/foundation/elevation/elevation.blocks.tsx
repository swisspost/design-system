import { parse } from '@/utils/sass-export';
import scss from './elevation.module.scss';

export const SCSS_VARIABLES = parse(scss);

export const ElevationTile = (props: { level: string }) => {
  return (
    <div className={`elevation-tile ${props.level}`}>
      <h2 className="h3">{props.level.replace('-', ' ')}</h2>
      <dl>
        <dt>Class</dt>
        <dd>
          <code>.{props.level}</code>
        </dd>
        <dt>Sass</dt>
        <dd>
          <code>post.${props.level}</code>
        </dd>
      </dl>
    </div>
  );
};
