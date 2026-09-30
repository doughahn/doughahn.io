// Shared <head> metadata: title, description, canonical URL, Open Graph and
// Twitter tags. `key` lets vue-meta replace the site-wide defaults in main.js.

export const SITE_URL = 'https://doughahn.io';
export const SITE_NAME = 'Doug Hahn';
export const DEFAULT_IMAGE = '/og-card.jpg';

const absolute = path => (/^https?:\/\//.test(path) ? path : SITE_URL + path);

export default function pageMeta({
  title,
  description = '',
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  keywords,
}) {
  // the homepage title is already the site name, so skip the " — Doug Hahn" suffix
  const fullTitle = title === SITE_NAME ? title : `${title} — ${SITE_NAME}`;
  const url = absolute(path);
  const imageUrl = absolute(image);

  const meta = [
    { key: 'description', name: 'description', content: description },
    { key: 'og:type', property: 'og:type', content: type },
    { key: 'og:site_name', property: 'og:site_name', content: SITE_NAME },
    { key: 'og:title', property: 'og:title', content: fullTitle },
    { key: 'og:description', property: 'og:description', content: description },
    { key: 'og:url', property: 'og:url', content: url },
    { key: 'og:image', property: 'og:image', content: imageUrl },
    { key: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
    { key: 'twitter:title', name: 'twitter:title', content: fullTitle },
    { key: 'twitter:description', name: 'twitter:description', content: description },
    { key: 'twitter:image', name: 'twitter:image', content: imageUrl },
  ];
  if (keywords) meta.push({ key: 'keywords', name: 'keywords', content: keywords });

  return {
    title: fullTitle,
    titleTemplate: '%s',
    meta,
    link: [{ key: 'canonical', rel: 'canonical', href: url }],
  };
}
