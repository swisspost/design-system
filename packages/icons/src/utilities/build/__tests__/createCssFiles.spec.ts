import { createCssFiles } from './../createCssFiles';
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';

jest.mock('fs');
jest.mock('prettier', () => ({
  format: jest.fn((content) => Promise.resolve(content)),
}));

describe('createCssFiles', () => {
  const mockIconOutputDirectory = '/test/icons';
  const mockCssOutputDirectory = '/test/css';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create CSS output directory if it does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    jest.spyOn(fs, 'mkdirSync').mockImplementation(() => undefined);
    jest.spyOn(fs, 'readdirSync').mockReturnValue([] as unknown as fs.Dirent[]);
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

    await createCssFiles(mockIconOutputDirectory, mockCssOutputDirectory);

    expect(fs.mkdirSync).toHaveBeenCalledWith(mockCssOutputDirectory, { recursive: true });
  });

  it('should remove existing CSS files before creating new ones', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'readdirSync').mockReturnValue(['old-icon.css', 'another-icon.css'] as unknown as fs.Dirent[]);
    jest.spyOn(fs, 'unlinkSync').mockImplementation(() => {});
    jest.spyOn(fs, 'mkdirSync').mockImplementation(() => undefined);
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

    await createCssFiles(mockIconOutputDirectory, mockCssOutputDirectory);

    expect(fs.unlinkSync).toHaveBeenCalledWith(path.join(mockCssOutputDirectory, 'old-icon.css'));
    expect(fs.unlinkSync).toHaveBeenCalledWith(path.join(mockCssOutputDirectory, 'another-icon.css'));
  });

  it('should create CSS files for each SVG icon', async () => {
    const mockSvgFiles = ['icon-1.svg', 'icon-2.svg'];
    
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'mkdirSync').mockImplementation(() => undefined);
    jest.spyOn(fs, 'readdirSync').mockImplementation((dir) => {
      if (dir === mockCssOutputDirectory) return [] as unknown as fs.Dirent[];
      return mockSvgFiles as unknown as fs.Dirent[];
    });
    jest.spyOn(fs, 'readFileSync').mockReturnValue('<svg><path d="M10 10"/></svg>');
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

    await createCssFiles(mockIconOutputDirectory, mockCssOutputDirectory);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.join(mockCssOutputDirectory, 'icon-1.css'),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.join(mockCssOutputDirectory, 'icon-2.css'),
      expect.any(String)
    );
  });

  it('should sanitize icon names for CSS variable names', async () => {
    const mockSvgFiles = ['icon@with#special$chars.svg'];
    
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'mkdirSync').mockImplementation(() => undefined);
    jest.spyOn(fs, 'readdirSync').mockImplementation((dir) => {
      if (dir === mockCssOutputDirectory) return [] as unknown as fs.Dirent[];
      return mockSvgFiles as unknown as fs.Dirent[];
    });
    jest.spyOn(fs, 'readFileSync').mockReturnValue('<svg><path d="M10 10"/></svg>');
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

    await createCssFiles(mockIconOutputDirectory, mockCssOutputDirectory);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.join(mockCssOutputDirectory, 'icon-with-special-chars.css'),
      expect.any(String)
    );
  });

  it('should convert SVG content to base64 data URL', async () => {
    const mockSvgContent = '<svg><path d="M10 10"/></svg>';
    const mockSvgFiles = ['test-icon.svg'];
    
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'mkdirSync').mockImplementation(() => undefined);
    jest.spyOn(fs, 'readdirSync').mockImplementation((dir) => {
      if (dir === mockCssOutputDirectory) return [] as unknown as fs.Dirent[];
      return mockSvgFiles as unknown as fs.Dirent[];
    });
    jest.spyOn(fs, 'readFileSync').mockReturnValue(mockSvgContent);
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

    await createCssFiles(mockIconOutputDirectory, mockCssOutputDirectory);

    const cssContent = (fs.writeFileSync as jest.Mock).mock.calls[0][1];
    expect(cssContent).toContain('--post-icon-test-icon');
    expect(cssContent).toContain('data:image/svg+xml;base64,');
  });

  it('should only process SVG files', async () => {
    const mockFiles = ['icon-1.svg', 'readme.md', 'icon-2.svg', 'package.json'];
    
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'mkdirSync').mockImplementation(() => undefined);
    jest.spyOn(fs, 'readdirSync').mockImplementation((dir) => {
      if (dir === mockCssOutputDirectory) return [] as unknown as fs.Dirent[];
      return mockFiles as unknown as fs.Dirent[];
    });
    jest.spyOn(fs, 'readFileSync').mockReturnValue('<svg><path d="M10 10"/></svg>');
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

    await createCssFiles(mockIconOutputDirectory, mockCssOutputDirectory);

    expect(fs.writeFileSync).toHaveBeenCalledTimes(2); // Only for the 2 SVG files
  });

  it('should handle empty icon directory', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'mkdirSync').mockImplementation(() => undefined);
    jest.spyOn(fs, 'readdirSync').mockImplementation((dir) => {
      if (dir === mockCssOutputDirectory) return [] as unknown as fs.Dirent[];
      return [] as unknown as fs.Dirent[];
    });
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

    await createCssFiles(mockIconOutputDirectory, mockCssOutputDirectory);

    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });

  it('should format CSS content with prettier', async () => {
    const mockSvgFiles = ['test-icon.svg'];
    
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'mkdirSync').mockImplementation(() => undefined);
    jest.spyOn(fs, 'readdirSync').mockImplementation((dir) => {
      if (dir === mockCssOutputDirectory) return [] as unknown as fs.Dirent[];
      return mockSvgFiles as unknown as fs.Dirent[];
    });
    jest.spyOn(fs, 'readFileSync').mockReturnValue('<svg><path d="M10 10"/></svg>');
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

    await createCssFiles(mockIconOutputDirectory, mockCssOutputDirectory);

    expect(prettier.format).toHaveBeenCalledWith(
      expect.stringContaining('--post-icon-test-icon'),
      { parser: 'css' }
    );
  });
});
