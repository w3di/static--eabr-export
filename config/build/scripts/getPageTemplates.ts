import HtmlWebpackPlugin from 'html-webpack-plugin';
import { TemplatePageType, TemplateStringType } from './buildPagesList';
import { ROUTES } from '../../../src/main/lib/logic/routes';
import { INDUSTRIES } from '../../../src/main/data/industries';

const createPluginInstance = (
  data: TemplatePageType,
  path: string,
  widgets: TemplateStringType,
): HtmlWebpackPlugin => {
  const filename =
    data.name === 'index.html'
      ? 'index.html'
      : data.name.replace(/\.html$/, '/index.html');

  return new HtmlWebpackPlugin({
    template: path + '/' + data.path,
    filename,
    inject: 'body',
    widgets,
    routes: ROUTES,
    industries: INDUSTRIES,
  });
};

export default createPluginInstance;
