import type { MockVariant } from '../components/websites/SiteMock';

/**
 * Websites shown on the /websites gallery.
 *
 * The entries below are CONCEPT sites: real, working websites designed and built
 * by Franklin to show what he can build for different industries. They are
 * labelled "Concept" on the page. The sites live in /public/concepts/<slug>/ and
 * their screenshots in /public/assets/websites/<slug>/.
 *
 * To add client work: add an entry with status 'Live', the real client name,
 * url and screenshots. Client work should go above the concepts.
 */

export type WebsiteCategory = 'Business' | 'Online store' | 'Landing page' | 'Web app';

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
    slug: 'enkare',
    client: 'Enkare',
    statement: 'A safari camp where you scroll from the dark into a Mara sunrise.',
    category: 'Business',
    year: '2026',
    status: 'Concept',
    url: '/concepts/enkare/index.html',
    displayUrl: 'concepts/enkare',
    role: 'Design + build',
    location: 'Maasai Mara',
    summary:
      'A concept site for a safari camp: night turns to sunrise as you scroll, a day at camp told hour by hour, seasonal rates and a booking request.',
    ...shots('enkare'),
    mock: 'warm',
    stage: '#14202a',
    glow: '#e7a03c',
    tilt: 2
  },
  {
    slug: 'tabasamu',
    client: 'Tabasamu Dental Studio',
    statement: 'A dental studio where the page opens with a smile, then books you in two minutes.',
    category: 'Business',
    year: '2026',
    status: 'Concept',
    url: '/concepts/tabasamu/index.html',
    displayUrl: 'concepts/tabasamu',
    role: 'Design + build',
    location: 'Nairobi',
    summary:
      'A concept site for a dental studio: a smile-shaped hero, clear treatment prices and a booking widget with treatments, days and time slots.',
    ...shots('tabasamu'),
    mock: 'teal',
    stage: '#d3f0e8',
    glow: '#0e9f87',
    phoneFirst: true
  },
  {
    slug: 'mlima',
    client: 'Mlima Coffee Roasters',
    statement: 'A coffee shop online, from the cherry on the branch to the cart.',
    category: 'Online store',
    year: '2026',
    status: 'Concept',
    url: '/concepts/mlima/index.html',
    displayUrl: 'concepts/mlima',
    role: 'Design + build',
    location: 'Nairobi',
    summary:
      'A concept online store for a Kenyan coffee roaster: product pages with sizes and grinds, a working cart, a brew guide and subscriptions.',
    ...shots('mlima'),
    mock: 'warm',
    stage: '#a8132b',
    glow: '#ffb3a8',
    tilt: -2
  },
  {
    slug: 'akiba',
    client: 'Akiba',
    statement: 'A savings app launch, with the phone screens built right into the page.',
    category: 'Landing page',
    year: '2026',
    status: 'Concept',
    url: '/concepts/akiba/index.html',
    displayUrl: 'concepts/akiba',
    role: 'Design + build',
    location: 'Nairobi',
    summary:
      'A concept launch page for a savings app: live app screens that change as you scroll, a savings calculator and the answers people look for before they sign up.',
    ...shots('akiba'),
    mock: 'gold',
    stage: '#ffd23f',
    glow: '#ffffff',
    phoneFirst: true
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
  },
  {
    slug: 'mwangaza',
    client: 'Mwangaza Academy',
    statement: 'A school where the headline finishes itself as you scroll.',
    category: 'Business',
    year: '2026',
    status: 'Concept',
    url: '/concepts/mwangaza/index.html',
    displayUrl: 'concepts/mwangaza',
    role: 'Design + build',
    location: 'Nairobi',
    summary:
      'A concept site for a day school: the school day in pictures, each section explained, admissions step by step, fees per term and tour booking.',
    ...shots('mwangaza'),
    mock: 'saas',
    stage: '#eef3fa',
    glow: '#f5c443',
    tilt: 2
  },
  {
    slug: 'mwamba',
    client: 'Mwamba Advocates',
    statement: 'A law firm that opens like a file, onto the city at night.',
    category: 'Business',
    year: '2026',
    status: 'Concept',
    url: '/concepts/mwamba/index.html',
    displayUrl: 'concepts/mwamba',
    role: 'Design + build',
    location: 'Nairobi',
    summary:
      'A concept site for a law firm: type-led and calm, with practice areas that open in place, how the firm works and a confidential consultation request.',
    ...shots('mwamba'),
    mock: 'dashboard',
    stage: '#0a0a0b',
    glow: '#a07f3f'
  }
];

/** Only the categories that have websites, so filters never lead to an empty page. */
const usedCategories = Array.from(new Set(websites.map((site) => site.category)));
export const websiteCategories: Array<'All' | WebsiteCategory> = ['All', ...usedCategories];
