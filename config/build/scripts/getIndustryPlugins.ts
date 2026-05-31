import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { ROUTES } from '../../../src/main/lib/logic/routes';
import { INDUSTRIES } from '../../../src/main/data/industries';
import { TemplateStringType } from './buildPagesList';

const getIndustryPlugins = (
  templatesDir: string,
  widgets: TemplateStringType,
): HtmlWebpackPlugin[] => {
  const template = path.join(templatesDir, 'industry.html');
  return INDUSTRIES.map(
    (industry) =>
      new HtmlWebpackPlugin({
        template,
        filename: `${industry.slug}/index.html`,
        inject: 'body',
        widgets,
        routes: ROUTES,
        industries: INDUSTRIES,
        industry,
      }),
  );
};

export default getIndustryPlugins;
