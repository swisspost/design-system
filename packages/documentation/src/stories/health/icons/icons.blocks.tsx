import React from 'react';
import reportData from '../../../../node_modules/@swisspost/design-system-icons/public/report.json';
import { IconReport } from './icons-report';

const report = reportData as IconReport;

const checkIconCodesDuplicates = () => {
  const reportIconCodes = reportData.icons.map(icon => icon.file.basename);
  const duplicateIcons = reportIconCodes.filter(
    (title, index, self) => self.indexOf(title) !== index,
  );
  const duplicatesCount = duplicateIcons.length;
  return { duplicateIcons, duplicatesCount };
};

const { duplicateIcons, duplicatesCount } = checkIconCodesDuplicates();

export const StatusBlock: React.FC = () => (
  <div className="status">
    <strong>Version:</strong> {report.version}
    <br />
    <strong>Successful:</strong> {report.stats.success}
    <br />
    <strong>Errored:</strong> {report.stats.errors}
    <br />
    <strong>Not found:</strong> {report.stats.notFound}
    <br />
    <strong>No Keywords:</strong> {report.noKeywords.length}
    <br />
    <strong>Wrong ViewBox:</strong> {report.wrongViewBox.length}
    <br />
    <strong>Missing SVG:</strong> {report.noSVG.length}
    <br />
    <strong>Duplicates:</strong> {duplicatesCount}
    <br />
    <strong>Last updated:</strong> {new Date(report.created).toString()}
  </div>
);

export const IconsBlock: React.FC = () => (
  <section>
    <h2>Successful</h2>
    <div className="icons">
      {report.icons.map(icon => renderImage(icon.file.name, icon.file.basename))}
    </div>
  </section>
);

export const WrongViewBoxBlock: React.FC = () => {
  if (report.wrongViewBox.length === 0) return null;

  return (
    <section>
      <h2>Wrong ViewBox</h2>
      <p>The viewBox attribute of the incoming SVG file is not set to "0 0 32 32".</p>
      <div className="icons">
        {report.wrongViewBox.map(icon => renderImage(icon.file.name, icon.file.basename))}
      </div>
    </section>
  );
};

export const NoKeywordsBlock: React.FC = () => {
  if (report.noKeywords.length === 0) return null;

  return (
    <section>
      <h2>No Keywords</h2>
      <p>The incoming SVG file has no keywords specified.</p>
      <div className="icons">
        {report.noKeywords.map(icon => renderImage(icon.file.name, icon.file.basename))}
      </div>
    </section>
  );
};

export const ErroredBlock: React.FC = () => {
  if (report.errored.length === 0) return null;

  return (
    <section>
      <h2>Errored</h2>
      <ul>
        {report.errored.map((icon, i) => (
          <li key={icon.file.name + i}>
            <a href={icon.meta.downloadLink}>{icon.file.name}</a>
            <br />
            <pre>{icon.errorMessage}</pre>
          </li>
        ))}
      </ul>
    </section>
  );
};

export const NoSVGBlock: React.FC = () => {
  if (report.noSVG.length === 0) return null;

  return (
    <section>
      <h2>SVG file not found.</h2>
      <ul>
        {report.noSVG.map((icon, i) => (
          <li key={icon.file.basename + i}>{icon.file.basename}</li>
        ))}
      </ul>
    </section>
  );
};

function renderImage(name: string, baseName: string) {
  return (
    <div key={name} className="icon" title={`${baseName}`}>
      <img
        loading="lazy"
        src={`/post-icons/${name}`}
        alt="icon"
        width="24"
        height="24"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          setTimeout(() => {
            const src = currentTarget.src;
            currentTarget.src = '';
            currentTarget.src = src;
          }, Math.random() * 5000);
        }}
      />
      <span>{baseName}</span>
    </div>
  );
}

export const DuplicatesBlock: React.FC = () => {
  return (
    <section>
      <h2>Duplicate Icons</h2>
      <p>There are {duplicatesCount} duplicate icons within the SVG icon set.</p>
      <div className="icons">{duplicateIcons.map(icon => renderImage(`${icon}.svg`, icon))}</div>
    </section>
  );
};
