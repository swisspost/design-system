import { mocked } from 'ts-jest/utils';
import fetch, { Response } from 'node-fetch';
import { Businessfield, Type, TypeFilter } from '../models/censhare-result-page.model';
import mockFs from 'mock-fs';
import { downloadSVG } from './downloadSVG';

jest.mock('node-fetch');

describe('downloadSVG', () => {
  it('should download an svg icon', async () => {
    const outputPath = './icons';
    mockFs({
      [outputPath]: {},
    });

    mocked(fetch).mockImplementationOnce(() =>
      Promise.resolve({
        text: () => Promise.resolve('<svg><path d="M16 8.4l-12.533 12.4z"></path></svg>'),
      } as Response),
    );

    const svg = await downloadSVG(
      {
        downloadLink: '/test',
        type: Type.PicturePictogram,
        contentInfo: { freeKeywords: '' },
        typeFilter: TypeFilter.Pictograms,
        name: 'test.svg',
        id: 1,
        postInfo: {
          businessfield: Businessfield.Kommunikation,
          year: '',
        },
        modifiedAt: new Date(),
      },
      outputPath,
    );

    mockFs.restore();

    expect(svg).toMatchSnapshot();
  });
});
