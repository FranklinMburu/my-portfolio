import type { Website } from '../../data/websites';
import { DesktopMock, PhoneMock } from './SiteMock';

/** The website's desktop screenshot, or its drawn stand-in. */
export const DesktopShot = ({ site, className = '' }: { site: Website; className?: string }) =>
  site.image ? (
    <img src={site.image} alt={`${site.client} website on desktop`} className={`h-full w-full object-cover object-top ${className}`} loading="lazy" />
  ) : (
    <div className={`h-full w-full ${className}`} aria-hidden="true">
      <DesktopMock variant={site.mock} />
    </div>
  );

/** The website's phone screenshot, or its drawn stand-in. */
export const PhoneShot = ({ site, alt = false }: { site: Website; alt?: boolean }) =>
  site.mobileImage ? (
    <img src={site.mobileImage} alt={`${site.client} website on a phone`} className="h-full w-full object-cover object-top" loading="lazy" />
  ) : (
    <div className="h-full w-full" aria-hidden="true">
      <PhoneMock variant={site.mock} alt={alt} />
    </div>
  );
