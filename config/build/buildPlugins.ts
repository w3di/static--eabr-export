import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BuildOptions } from './types/config';
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin';
import { buildPagesList } from './scripts/buildPagesList';
import WatchExternalFilesPlugin from 'webpack-watch-files-plugin';

// Sprite is referenced by a fixed name (sprite-svg.svg) and cached hard by the
// CDN. Append ?v=<build hash> to those refs so each deploy busts the cache.
class SpriteCacheBust {
  apply(compiler: webpack.Compiler) {
    compiler.hooks.compilation.tap('SpriteCacheBust', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'SpriteCacheBust',
        (data, cb) => {
          const v = compilation.hash || '';
          data.html = data.html.replace(
            /\/assets\/sprite\/sprite-svg\.svg/g,
            `/assets/sprite/sprite-svg.svg?v=${v}`,
          );
          cb(null, data);
        },
      );
    });
  }
}

export function buildPlugins({
  paths,
}: BuildOptions): webpack.WebpackPluginInstance[] {
  return [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:4].css',
    }),
    new SpriteLoaderPlugin(),
    new SpriteCacheBust(),
    new CopyPlugin({
      patterns: [
        {
          from: paths.assets,
          to: paths.buildAssets,
          globOptions: { ignore: ['**/.DS_Store'] },
        },
      ],
    }),
    new WatchExternalFilesPlugin({
      files: ['src/**/*.html'],
    }),
    ...buildPagesList(paths),
  ];
}
