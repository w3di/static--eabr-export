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
  '@graph': [
    {
      '@type': ['Organization', 'FinancialService'],
      '@id': `${SITE.baseUrl}/#organization`,
      name: SITE.name,
      alternateName: ['ЕАБР', 'EABR', 'Eurasian Development Bank'],
      url: `${SITE.baseUrl}/`,
      logo: `${SITE.baseUrl}/assets/images/logo-main.svg`,
      description: SITE.defaultDescription,
      foundingDate: '2006',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Алматы',
        addressCountry: 'KZ',
      },
      areaServed: [
        'Армения',
        'Беларусь',
        'Казахстан',
        'Кыргызстан',
        'Россия',
        'Таджикистан',
        'Узбекистан',
      ].map((c) => ({ '@type': 'Country', name: c })),
      knowsAbout: [
        'Финансирование развития',
        'Инвестиционные проекты',
        'Государственно-частное партнёрство',
        'ESG',
        'Исламское финансирование',
        'Техническое содействие',
      ],
      sameAs: [
        'https://www.linkedin.com/company/eurasian-development-bank/',
        'https://t.me/eabr_bank',
        'https://www.facebook.com/eabr.org/',
        'https://www.youtube.com/user/infoEABR',
        'https://www.instagram.com/eabr_official',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.baseUrl}/#website`,
      url: `${SITE.baseUrl}/`,
      name: SITE.name,
      inLanguage: 'ru',
      publisher: { '@id': `${SITE.baseUrl}/#organization` },
    },
  ],
});

const stripHtml = (s: string) =>
  s
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&laquo;|&raquo;/g, '"')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const extractBreadcrumb = (html: string): string[] => {
  const block = html.match(
    /<(?:div|nav)[^>]*class="(?:breadcrumbs|ap-crumbs)"[^>]*>([\s\S]*?)<\/(?:div|nav)>/,
  );
  if (!block) return [];
  const items: string[] = [];
  const re = /<(span|strong)[^>]*>([\s\S]*?)<\/\1>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(block[1]))) {
    const text = stripHtml(m[2]);
    if (text) items.push(text);
  }
  return items;
};

const extractFaq = (html: string): { q: string; a: string }[] => {
  const qs = [
    ...html.matchAll(
      /class="(?:fts-faq__q|inv-faq__q)"[^>]*>([\s\S]*?)<\/span>/g,
    ),
  ].map((m) => stripHtml(m[1]));
  const as = [
    ...html.matchAll(
      /class="(?:fts-faq__a|inv-faq__body)"[^>]*>([\s\S]*?)<\/div>/g,
    ),
  ].map((m) => stripHtml(m[1]));
  const out: { q: string; a: string }[] = [];
  for (let i = 0; i < Math.min(qs.length, as.length); i++) {
    if (qs[i] && as[i]) out.push({ q: qs[i], a: as[i] });
  }
  return out;
};

// Per-page schema.org graph for AI/answer engines (GEO/AEO): WebPage with a
// Speakable hint, a BreadcrumbList and a FAQPage built from the page's own DOM.
const buildPageLd = (
  html: string,
  url: string,
  title: string,
  desc: string,
): string => {
  const page: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description: desc,
    inLanguage: 'ru',
    isPartOf: { '@id': `${SITE.baseUrl}/#website` },
    about: { '@id': `${SITE.baseUrl}/#organization` },
    primaryImageOfPage: SITE.ogImage,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'main'],
    },
  };
  const graph: Record<string, unknown>[] = [page];

  const crumbs = extractBreadcrumb(html);
  if (crumbs.length) {
    page.breadcrumb = { '@id': `${url}#breadcrumb` };
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: crumbs.map((name, i) => {
        const li: Record<string, unknown> = {
          '@type': 'ListItem',
          position: i + 1,
          name,
        };
        if (i === 0) li.item = `${SITE.baseUrl}/`;
        else if (i === crumbs.length - 1) li.item = url;
        return li;
      }),
    });
  }

  const faq = extractFaq(html);
  if (faq.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
};

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
          const is404 = out === '404.html';
          const key = is404
            ? '404'
            : out.replace(/index\.html$/, '').replace(/\/$/, '');
          const url = is404
            ? `${SITE.baseUrl}/404.html`
            : `${SITE.baseUrl}/${key ? key + '/' : ''}`;
          const titleMatch = data.html.match(/<title[^>]*>([^<]*)<\/title>/);
          const title = (titleMatch ? titleMatch[1] : SITE.name).trim();
          const desc =
            PAGE_DESCRIPTIONS[key] !== undefined
              ? PAGE_DESCRIPTIONS[key]
              : SITE.defaultDescription;
          const robots =
            is404 || !SITE.indexable ? 'noindex, nofollow' : 'index, follow';
          const pageLd = buildPageLd(data.html, url, title, desc);

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
            `<script type="application/ld+json">${pageLd}</script>`,
          ].join('\n    ');

          if (!data.html.includes('name="description"')) {
            data.html = data.html.replace('</head>', `    ${tags}\n</head>`);
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

          if (!SITE.indexable) {
            compilation.emitAsset(
              'robots.txt',
              new RawSource('User-agent: *\nDisallow: /\n'),
            );
            return;
          }

          // AI / answer-engine crawlers are explicitly welcomed (GEO/AEO).
          const aiBots = [
            'GPTBot',
            'OAI-SearchBot',
            'ChatGPT-User',
            'ClaudeBot',
            'anthropic-ai',
            'Claude-Web',
            'PerplexityBot',
            'Google-Extended',
            'Applebot-Extended',
            'CCBot',
            'Bytespider',
          ];
          const aiSection = aiBots
            .map((b) => `User-agent: ${b}\nAllow: /\n`)
            .join('\n');
          const robots =
            `User-agent: *\nAllow: /\n\n` +
            `# AI and answer engines are welcome to crawl and cite EABR content\n` +
            `${aiSection}\n` +
            `Sitemap: ${SITE.baseUrl}/sitemap.xml\n`;
          compilation.emitAsset('robots.txt', new RawSource(robots));

          const urls = SITEMAP_ROUTES.map(
            (r) => `  <url><loc>${SITE.baseUrl}${r}</loc></url>`,
          ).join('\n');
          const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
          compilation.emitAsset('sitemap.xml', new RawSource(sitemap));

          // llms.txt — curated, machine-readable site overview for LLMs.
          const links = Object.entries(PAGE_DESCRIPTIONS)
            .filter(([key]) => key !== '')
            .map(([key, d]) => `- ${SITE.baseUrl}/${key}/: ${d}`)
            .join('\n');
          const llms =
            `# ${SITE.name} (ЕАБР)\n\n` +
            `> ${SITE.defaultDescription}\n\n` +
            `Официальный сайт: ${SITE.baseUrl}/\n\n` +
            `## Разделы\n\n${links}\n`;
          compilation.emitAsset('llms.txt', new RawSource(llms));
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
