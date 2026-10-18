import type { MockVariant } from '../components/websites/SiteMock';

/**
 * Websites shown on the /websites gallery.
 *
 * The three entries below are CONCEPT sites: real, working websites designed and
 * built by Franklin for fictional businesses. They are labelled "Concept" on the
 * page. The sites themselves live in /public/concepts/<slug>/ and their
 * screenshots in /public/assets/websites/<slug>/.
 *
 * To add client work: add an entry with status 'Live', the real client name,
 * url and screenshots. Client work should go above the concepts.
 */

export type WebsiteCategory = 'Business' | 'Landing page' | 'Web app';

export interface Website {
  slug: string;
  client: string;
  /** One bold line: what the website does. */
  statement: string;
  category: WebsiteCategory;
  year: string;
  status: 'Live' | 'Concept';
  /** Link to the working site. Concept sites are served from /concepts/. */
  url?: string;
  /** What the browser bar shows in screenshots. */
  displayUrl?: string;
  role: string;
  location?: string;
  /** One sentence for the detail page. */
  summary: string;
  /** Desktop screenshot. */
  image?: string;
  /** Phone screenshots. */
  mobileImage?: string;
  mobileImage2?: string;
  /** More desktop screenshots for the detail page. */
  gallery?: string[];
  /** Drawn stand-in used when there is no screenshot. */
  mock: MockVariant;
  /** Backdrop colour of the tile ("product shot" stage). */
  stage: string;
  /** Glow colour on the tile. */
  glow: string;
  /** Show the phone view as the tile's main picture. */
  phoneFirst?: boolean;
  tilt?: number;
  featured?: boolean;
}

const shots = (slug: string) => ({
  image: `/assets/websites/${slug}/desktop.webp`,
  mobileImage: `/assets/websites/${slug}/mobile.webp`,
  mobileImage2: `/assets/websites/${slug}/mobile-2.webp`,
  gallery: [2, 3, 4].map((n) => `/assets/websites/${slug}/page-${n}.webp`)
});

export const websites: Website[] = [
  {
    slug: 'keja',
    client: 'Keja',
    statement: 'A property agency where the home rises through the clouds as you scroll.',
    category: 'Business',
    year: '2026',
    status: 'Concept',
    url: '/concepts/keja/index.html',
    displayUrl: 'concepts/keja',
    role: 'Design + build',
    location: 'Nairobi',
    summary:
      'A concept site for a Nairobi property agency: a scroll-driven hero, a search panel, listings and neighbourhood guides, built to feel calm and trustworthy.',
    ...shots('keja'),
    mock: 'saas',
    stage: '#bcd6ee',
    glow: '#ffffff',
    featured: true
  },
  {
    slug: 'ember-and-salt',
    client: 'Ember & Salt',
    statement: 'An open-fire restaurant whose name you scroll straight through, into the flames.',
    category: 'Business',
    year: '2026',
    status: 'Concept',
    url: '/concepts/ember-and-salt/index.html',
    displayUrl: 'concepts/ember-and-salt',
    role: 'Design + build',
    location: 'Nairobi',
    summary:
      'A concept site for an open-fire restaurant in Westlands: a scroll-driven hero, a menu that reads like the real thing, and booking in one line.',
    ...shots('ember-and-salt'),
    mock: 'warm',
    stage: '#1b1410',
    glow: '#f26a21',
    tilt: -2.5
  },
  {
    slug: 'nguvu',
    client: 'Nguvu',
    statement: 'A strength studio with classes that slide past as you scroll.',
    category: 'Business',
    year: '2026',
    status: 'Concept',
    url: '/concepts/nguvu/index.html',
    displayUrl: 'concepts/nguvu',
    role: 'Design + build',
    location: 'Nairobi',
    summary:
      'A concept site for a strength studio in Kilimani: bold type, black-and-white photography, a pinned class strip, the weekly timetable and plain-spoken pricing.',
    ...shots('nguvu'),
    mock: 'dashboard',
    stage: '#2747f5',
    glow: '#9fb0ff',
    phoneFirst: true
  }
];

/** Only the categories that have websites, so filters never lead to an empty page. */
const usedCategories = Array.from(new Set(websites.map((site) => site.category)));
export const websiteCategories: Array<'All' | WebsiteCategory> = ['All', ...usedCategories];
