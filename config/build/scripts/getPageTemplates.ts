import nodePath from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { TemplatePageType, TemplateStringType } from './buildPagesList';
import { ROUTES } from '../../../src/main/lib/logic/routes';
import { INDUSTRIES } from '../../../src/main/data/industries';
import { PAGE_DATA } from './pageData';

const resolveFilename = (relPath: string, name: string): string => {
  if (name === 'index.html') return 'index.html';

  const dir = nodePath.dirname(relPath);
  const base = nodePath.basename(relPath, '.html');

  if (base === '404') return '404.html';
  if (dir === '.') return `${base}/index.html`;
  if (base === nodePath.basename(dir)) return `${dir}/index.html`;
  return `${dir}/${base}/index.html`;
};

const createPluginInstance = (
  data: TemplatePageType,
  path: string,
  widgets: TemplateStringType,
): HtmlWebpackPlugin => {
  const filename = resolveFilename(data.path, data.name);
  const pageKey = filename.replace(/index\.html$/, '').replace(/\/$/, '');

  return new HtmlWebpackPlugin({
    template: path + '/' + data.path,
    filename,
    inject: 'body',
    widgets,
    routes: ROUTES,
    industries: INDUSTRIES,
    data: PAGE_DATA[pageKey] || {},
  });
};

export default createPluginInstance;
