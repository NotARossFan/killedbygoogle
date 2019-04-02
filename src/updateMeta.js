import { format, parseISO } from 'date-fns';

export default (grave) => {
  // Description
  [
    'meta[name="description"]',
    'meta[itemprop="description"]',
    'meta[name="twitter:description"]',
    'meta[name="og:description"]',
  ].forEach((selector) => {
    document.querySelector(selector).setAttribute('content', grave.description);
  });

  // Titles
  [
    'meta[itemprop="name"]',
    'meta[name="twitter:title"]',
    'meta[name="og:title"]',
  ].forEach((selector) => {
    document.querySelector(selector).setAttribute('content', `${grave.name}: ${format(parseISO(grave.dateOpen), 'yyyy')} - ${format(parseISO(grave.dateClose), 'yyyy')}`);
  });
};
