import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildLoaders(): webpack.RuleSetRule[] {
  const typeScriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  const slyleLoader = {
    test: /\.scss|css$/i,
    use: [
      
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: ['autoprefixer'],
          },
        },
      },
      'sass-loader',
    ],
  };

  const fontLoader = {
    test: /\.(woff(2)?|eot|ttf|otf)$/,
    type: 'asset/resource',
    generator: {
      filename: 'assets/fonts/[name][ext]',
    },
  };

  const svgLoader = {
    test: /\.svg$/,
    loader: 'svg-sprite-loader',
    options: {
      extract: true,
      spriteFilename: 'sprite-svg.svg',
      publicPath: '/assets/sprite/',
    },
  };

  return [typeScriptLoader, slyleLoader, fontLoader, svgLoader];
}
