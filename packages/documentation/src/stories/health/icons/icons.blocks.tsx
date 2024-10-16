// icons.blocks.tsx
import React from 'react';
import reportData from '../../../../node_modules/@swisspost/design-system-icons/public/report.json';
import { IconReport } from './icons-report';

const report = reportData as IconReport;

export const StatusBlock: React.FC = () => (
  <div className="status">
    <strong>Version:</strong> {report.version}
    <br />
    <strong>Successful:</strong> {report.stats.success}
    <br />
    <strong>Errored:</strong> {report.stats.errors}
    <br />
    <strong>Not found:</strong> {report.stats.notFound} <br />
    <strong>Last updated:</strong> {new Date(report.created).toString()}
  </div>
);

export const IconsBlock: React.FC = () => (
  <section>
    <div className="icons">
      {report.icons.map(icon => (
        <div key={icon.file.name} className="icon">
          <img src={`./post-icons/${icon.file.name}`} alt="icon" />
          <span>{icon.file.basename}</span>
        </div>
      ))}
    </div>
  </section>
);

export const WrongViewBoxBlock: React.FC = () => {
  if (report.wrongViewBox.length === 0) return null;

  return (
    <section>
      <h1>Wrong ViewBox</h1>
      <p>The viewBox attribute of the incoming SVG file is not set to "0 0 32 32".</p>
      <div className="icons">
        {report.wrongViewBox.map(icon => (
          <div key={icon.file.name} className="icon">
            <img src={`./post-icons/${icon.file.name}`} alt="icon" />
            <span>{icon.file.basename}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export const NoKeywordsBlock: React.FC = () => {
  if (report.noKeywords.length === 0) return null;

  return (
    <section>
      <h1>No Keywords</h1>
      <p>The incoming SVG file has no keywords specified.</p>
      <div className="icons">
        {report.noKeywords.map(icon => (
          <div key={icon.file.name} className="icon">
            <img src={`./post-icons/${icon.file.name}`} alt="icon" />
            <span>{icon.file.basename}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export const ErroredBlock: React.FC = () => {
  if (report.errored.length === 0) return null;

  return (
    <section>
      <h1>Errored</h1>
      <ul>
        {report.errored.map(icon => (
          <li key={icon.file.name}>
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
      <h1>SVG file not found.</h1>
      <ul>
        {report.noSVG.map(icon => (
          <li key={icon.file.basename}>{icon.file.basename}</li>
        ))}
      </ul>
    </section>
  );
};
