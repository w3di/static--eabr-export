import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BuildOptions } from './types/config';
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin';
import { buildPagesList } from './scripts/buildPagesList';
import WatchExternalFilesPlugin from 'webpack-watch-files-plugin';
import { SITE, PAGE_DESCRIPTIONS, SITEMAP_ROUTES } from './scripts/seoMeta';

const esc = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const JSON_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  alternateName: 'ЕАБР',
  url: `${SITE.baseUrl}/`,
  logo: `${SITE.baseUrl}/assets/images/logo-main.svg`,
  sameAs: [
    'https://www.linkedin.com/company/eurasian-development-bank/',
    'https://t.me/eabr_bank',
    'https://www.facebook.com/eabr.org/',
    'https://www.youtube.com/user/infoEABR',
    'https://www.instagram.com/eabr_official',
  ],
});

// Injects per-page SEO meta (description, canonical, Open Graph, robots,
// structured data) derived from the page <title> + output path, and adds an id
// to <main> for the skip link. The public domain + indexability come from
// SITE (env-driven) so dev stays noindex and prod points to the real domain.
// Purely additive to <head>/<main> — no visual impact.
class SeoMeta {
  apply(compiler: webpack.Compiler) {
    compiler.hooks.compilation.tap('SeoMeta', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'SeoMeta',
        (data, cb) => {
          const out = data.outputName || '';
          const key = out.replace(/index\.html$/, '').replace(/\/$/, '');
          const url = `${SITE.baseUrl}/${key ? key + '/' : ''}`;
          const titleMatch = data.html.match(/<title[^>]*>([^<]*)<\/title>/);
          const title = (titleMatch ? titleMatch[1] : SITE.name).trim();
          const desc =
            PAGE_DESCRIPTIONS[key] !== undefined
              ? PAGE_DESCRIPTIONS[key]
              : SITE.defaultDescription;
          const robots = SITE.indexable ? 'index, follow' : 'noindex, nofollow';

          const tags = [
            `<meta name="description" content="${esc(desc)}">`,
            `<meta name="robots" content="${robots}">`,
            `<link rel="canonical" href="${esc(url)}">`,
            `<meta property="og:title" content="${esc(title)}">`,
            `<meta property="og:description" content="${esc(desc)}">`,
            `<meta property="og:url" content="${esc(url)}">`,
            `<meta property="og:image" content="${esc(SITE.ogImage)}">`,
            `<meta name="twitter:image" content="${esc(SITE.ogImage)}">`,
            `<script type="application/ld+json">${JSON_LD}</script>`,
          ].join('\n    ');

          if (!data.html.includes('name="description"')) {
            data.html = data.html.replace('</head>', `    ${tags}\n</head>`);
          }
          if (!/<main[^>]*\sid=/.test(data.html)) {
            data.html = data.html.replace(
              '<main ',
              '<main id="main-content" tabindex="-1" ',
            );
          }
          cb(null, data);
        },
      );
    });
  }
}

// Emits robots.txt + sitemap.xml at the site root using SITE (env-driven).
// Dev (not indexable) → robots Disallow + no sitemap so the stand isn't crawled.
class SiteFiles {
  apply(compiler: webpack.Compiler) {
    compiler.hooks.thisCompilation.tap('SiteFiles', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'SiteFiles',
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        () => {
          const { RawSource } = webpack.sources;
          const robots = SITE.indexable
            ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE.baseUrl}/sitemap.xml\n`
            : `User-agent: *\nDisallow: /\n`;
          compilation.emitAsset('robots.txt', new RawSource(robots));

          if (SITE.indexable) {
            const urls = SITEMAP_ROUTES.map(
              (r) => `  <url><loc>${SITE.baseUrl}${r}</loc></url>`,
            ).join('\n');
            const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
            compilation.emitAsset('sitemap.xml', new RawSource(sitemap));
          }
        },
      );
    });
  }
}

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
    new SeoMeta(),
    new SiteFiles(),
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
