import { setup } from './../setup';
import fs from 'fs';
import path from 'path';

jest.mock('fs');

describe('build/setup', () => {
  const mockIconOutputDir = '/test/output/icons';
  const mockReportOutputDir = '/test/output/reports';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should remove existing icon output directory if it exists', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'rmSync').mockImplementation();
    jest.spyOn(fs, 'mkdirSync').mockImplementation();
    jest.spyOn(fs, 'unlinkSync').mockImplementation();

    setup(mockIconOutputDir, mockReportOutputDir);

    expect(fs.existsSync).toHaveBeenCalledWith(mockIconOutputDir);
    expect(fs.rmSync).toHaveBeenCalledWith(mockIconOutputDir, { recursive: true });
  });

  it('should remove existing report files if they exist', () => {
    const reportPath = path.join(mockReportOutputDir, 'report.json');
    const minReportPath = path.join(mockReportOutputDir, 'report.min.json');

    jest.spyOn(fs, 'existsSync').mockImplementation((p) => {
      return p === reportPath || p === minReportPath;
    });
    jest.spyOn(fs, 'unlinkSync').mockImplementation();
    jest.spyOn(fs, 'mkdirSync').mockImplementation();
    jest.spyOn(fs, 'rmSync').mockImplementation();

    setup(mockIconOutputDir, mockReportOutputDir);

    expect(fs.unlinkSync).toHaveBeenCalledWith(reportPath);
    expect(fs.unlinkSync).toHaveBeenCalledWith(minReportPath);
  });

  it('should create icon output directory if it does not exist', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    jest.spyOn(fs, 'mkdirSync').mockImplementation();

    setup(mockIconOutputDir, mockReportOutputDir);

    expect(fs.mkdirSync).toHaveBeenCalledWith(mockIconOutputDir, { recursive: true });
  });

  it('should handle case when no existing files or directories exist', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    jest.spyOn(fs, 'mkdirSync').mockImplementation();
    jest.spyOn(fs, 'rmSync').mockImplementation();
    jest.spyOn(fs, 'unlinkSync').mockImplementation();

    setup(mockIconOutputDir, mockReportOutputDir);

    expect(fs.rmSync).not.toHaveBeenCalled();
    expect(fs.unlinkSync).not.toHaveBeenCalled();
    expect(fs.mkdirSync).toHaveBeenCalledWith(mockIconOutputDir, { recursive: true });
  });
});