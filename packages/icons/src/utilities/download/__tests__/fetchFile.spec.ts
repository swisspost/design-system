import {
  Businessfield,
  Type,
  TypeFilter,
  VariantMIME,
} from '../../../models/censhare-result-page.model';
import fs from 'fs';
import path from 'path';
import { fetchFile } from './../fetchFile';
import { fetch } from '../../fetch';

jest.mock('../../fetch');

describe('fetchFile', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should download an svg icon', async () => {
    const outputPath = './icons';
    const writeFile = jest.spyOn(fs, 'writeFileSync').mockImplementation();

    jest.mocked(fetch).mockImplementationOnce(() =>
      Promise.resolve({
        text: () => Promise.resolve('<svg><path d="M16 8.4l-12.533 12.4z"></path></svg>'),
      } as Awaited<ReturnType<typeof fetch>>),
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

    expect(writeFile).toHaveBeenCalledTimes(1);
    expect(writeFile).toHaveBeenCalledWith(path.join(outputPath, 'test.svg'), svg);
    expect(svg).toMatchSnapshot();
  });
});
