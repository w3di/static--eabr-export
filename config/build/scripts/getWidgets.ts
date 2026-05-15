import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { BuildPaths } from '../types/config';
import { TemplateStringType } from './buildPagesList';
import { ROUTES } from '../../../src/main/lib/logic/routes';

const fileContents: TemplateStringType = {};

const renderWidget = (filePath: string): string => {
  const raw = fs.readFileSync(filePath, 'utf8');
  if (!raw.includes('<%')) return raw;
  const compiled = _.template(raw);
  return compiled({
    routes: ROUTES,
    htmlWebpackPlugin: { options: { routes: ROUTES } },
  });
};

const registerWidgetsIn = (dir: string) => {
  if (!fs.existsSync(dir)) return;
  const files: string[] = fs.readdirSync(dir);

  files.forEach((filename: string): void => {
    const filePath: string = path.join(dir, filename);
    const fileStat: fs.Stats = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      registerWidgetsIn(filePath);
    } else {
      const extension = path.extname(filename);

      if (extension === '.html') {
        const key = filename.split('.').shift()!;

        Object.defineProperty(fileContents, key, {
          configurable: true,
          get() {
            return renderWidget(filePath);
          },
        });
      }
    }
  });
};

const getWidgets = (paths: BuildPaths): TemplateStringType => {
  registerWidgetsIn(paths.htmlWidgets);

  const pagesDir = paths.htmlPages;
  if (fs.existsSync(pagesDir)) {
    fs.readdirSync(pagesDir).forEach((page) => {
      const componentsDir = path.join(pagesDir, page, 'components');
      if (fs.existsSync(componentsDir)) {
        registerWidgetsIn(componentsDir);
      }
    });
  }

  return fileContents;
};

export { getWidgets };
