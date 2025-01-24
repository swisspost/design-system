import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { getRequestInitJson } from './environment';

const url = 'https://cdn.post.ch/hcms/v2.0/entity/asset/2753/';
const output = 'public';
// https://cdn.post.ch/hcms/v2.0/entity/asset/352094/?values=all
//https://cdn.post.ch/hcms/v2.0/entity/asset?query=typeFilter%3D%22pictograms%22%26%28outputChannel%3D%5E%22root.brandingnet.post.%22%29&limit=5000
export const downloadExpHubIcons = async () => {
  try {
    const response = await fetch(url, getRequestInitJson());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    fs.writeFileSync(path.join(output, 'expHubReport.json'), JSON.stringify(data, null, 2));
    data;
    console.log(`exHubReport.json created`);
  } catch (error) {
    console.error('Download error:', error);
  }
};
