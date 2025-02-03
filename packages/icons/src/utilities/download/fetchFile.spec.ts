import fetch, { Response } from 'node-fetch';
import {
  Businessfield,
  Type,
  TypeFilter,
  VariantMIME,
} from '../../models/censhare-result-page.model';
import mockFs from 'mock-fs';
import { fetchFile } from './fetchFile';

jest.mock('node-fetch');

describe('fetchFile', () => {
  it('should download an svg icon', async () => {
    const outputPath = './icons';
    mockFs({
      [outputPath]: {},
    });

    jest.mocked(fetch).mockImplementationOnce(() =>
      Promise.resolve({
        text: () => Promise.resolve('<svg><path d="M16 8.4l-12.533 12.4z"></path></svg>'),
      } as Response),
    );

    const svg = await fetchFile(
      {
        uuid: '00000000-0000-0000-0000-000000000000',
        id: 0,
        type: Type.PicturePictogram,
        typeFilter: TypeFilter.Pictograms,
        meta: {
          downloadLink: '/test',
          businessfield: Businessfield.Kommunikation,
          keywords: ['Test', 'Test2'],
          year: '',
        },
        file: {
          mime: VariantMIME.ImageSVGXML,
          name: 'test.svg',
          basename: 'test',
          ext: '.svg',
          size: {
            width: 32,
            dpi: 72,
            height: 32,
          },
        },
        createdAt: new Date(),
        modifiedAt: new Date(),
      },
      outputPath,
    );

    mockFs.restore();

    expect(svg).toMatchSnapshot();
  });
});
