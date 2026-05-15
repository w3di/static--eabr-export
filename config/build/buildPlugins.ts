import webpack from 'webpack';
import { BuildOptions } from './types/config';
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin';
import { buildPagesList } from './scripts/buildPagesList';
import WatchExternalFilesPlugin from 'webpack-watch-files-plugin';

export function buildPlugins({
  paths,
}: BuildOptions): webpack.WebpackPluginInstance[] {
  return [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:4].css',
    }),
    new webpack.ProgressPlugin(),
    // @ts-expect-error svg-sprite-loader plugin types are incompatible with webpack 5
    new SpriteLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: paths.assets,
          to: paths.buildAssets,
        },
        // {
        //     from: paths.favicons,
        //     to: paths.buildFavicons,
        // },
      ],
    }),
    new WatchExternalFilesPlugin({
      files: ['src/**/*.html'],
    }),
    ...buildPagesList(paths),
  ];
}
