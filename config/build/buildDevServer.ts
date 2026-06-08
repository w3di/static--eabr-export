import { BuildOptions } from './types/config';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { ServerResponse } from 'http';
import path from 'path';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port,
    host: '0.0.0.0',
    allowedHosts: 'all',
    open: false,
    hot: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
    compress: false,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    watchFiles: [
      './src/**/*.ts',
      './src/**/*.js',
      './src/**/*.css',
      './src/**/*.scss',
      './src/**/*.html',
    ],
    // Serve the built 404.html (with a 404 status) for any unmatched route —
    // mirrors prod intent locally, like a framework dev server.
    setupMiddlewares: (middlewares, devServer) => {
      const { compiler } = devServer as unknown as {
        compiler: {
          outputPath: string;
          outputFileSystem: {
            readFile(
              p: string,
              cb: (e: Error | null | undefined, d?: Buffer) => void,
            ): void;
          };
        };
      };

      middlewares.push({
        name: 'fallback-404',
        middleware: (_req: unknown, res: ServerResponse) => {
          const file = path.join(compiler.outputPath, '404.html');
          compiler.outputFileSystem.readFile(file, (err, data) => {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(err || !data ? 'Not Found' : data);
          });
        },
      });

      return middlewares;
    },
  };
}
