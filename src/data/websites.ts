import type { MockVariant } from '../components/websites/SiteMock';

/**
 * Client websites shown on the /websites gallery.
 *
 * Every entry below is a PLACEHOLDER (placeholder: true) until it is replaced
 * with a real website: set the real client, statement, year, url and add
 * screenshots (image = desktop, mobileImage = phone) in /public/assets/websites/.
 * When `image` is set the screenshot is shown; otherwise the drawn mock is used.
 */

export type WebsiteCategory = 'Business' | 'Landing page' | 'Web app';

export interface Website {
  slug: string;
  client: string;
  /** One bold line: what the website does for the client. */
  statement: string;
  category: WebsiteCategory;
  year: string;
  status: 'Live' | 'Concept';
  url?: string;
  role: string;
  location?: string;
  /** One sentence for the detail page. */
  summary: string;
  image?: string;
  mobileImage?: string;
  gallery?: string[];
  /** Drawn stand-in used while there is no screenshot. */
  mock: MockVariant;
  /** Backdrop colour of the tile ("product shot" stage). */
  stage: string;
  /** Glow colour on the tile. */
  glow: string;
  /** Show the phone view as the tile's main picture. */
  phoneFirst?: boolean;
  tilt?: number;
  featured?: boolean;
  placeholder?: boolean;
}

export const websites: Website[] = [
  {
    slug: 'example-hospitality',
    client: '[Client name]',
    statement: '[One line on what the website does for them]',
    category: 'Business',
    year: '[Year]',
    status: 'Live',
    url: '#',
    role: 'Design + build',
    location: '[City]',
    summary: '[One sentence: what the business needed, and what the website now does for them.]',
    mock: 'warm',
    stage: '#1c140f',
    glow: '#f59e0b',
    featured: true,
    placeholder: true
  },
  {
    slug: 'example-launch',
    client: '[Client name]',
    statement: '[One line: a launch page that turned visitors into sign-ups]',
    category: 'Landing page',
    year: '[Year]',
    status: 'Live',
    url: '#',
    role: 'Build',
    summary: '[One sentence: what the business needed, and what the website now does for them.]',
    mock: 'saas',
    stage: '#0d1b3e',
    glow: '#007bff',
    tilt: -3,
    placeholder: true
  },
  {
    slug: 'example-mobile-first',
    client: '[Client name]',
    statement: '[One line: a business site built for customers on their phones]',
    category: 'Business',
    year: '[Year]',
    status: 'Live',
    url: '#',
    role: 'Design + build',
    summary: '[One sentence: what the business needed, and what the website now does for them.]',
    mock: 'teal',
    stage: '#042f2c',
    glow: '#14b8a6',
    phoneFirst: true,
    placeholder: true
  },
  {
    slug: 'example-premium-brand',
    client: '[Client name]',
    statement: '[One line: a premium brand that finally looks the part online]',
    category: 'Business',
    year: '[Year]',
    status: 'Live',
    url: '#',
    role: 'Design + build',
    summary: '[One sentence: what the business needed, and what the website now does for them.]',
    mock: 'gold',
    stage: '#1a1305',
    glow: '#d6b56d',
    placeholder: true
  },
  {
    slug: 'example-web-app',
    client: '[Client name]',
    statement: '[One line: a web app that replaced their spreadsheets]',
    category: 'Web app',
    year: '[Year]',
    status: 'Live',
    url: '#',
    role: 'Build',
    summary: '[One sentence: what the business needed, and what the website now does for them.]',
    mock: 'dashboard',
    stage: '#0b1220',
    glow: '#22c55e',
    tilt: 2.5,
    placeholder: true
  }
];

export const websiteCategories: Array<'All' | WebsiteCategory> = ['All', 'Business', 'Landing page', 'Web app'];
