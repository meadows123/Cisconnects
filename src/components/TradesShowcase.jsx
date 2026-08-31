import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * "Recent builds" showcase for the Trades Website page.
 *
 * Photo-first: drop screenshots at /showcase-1.jpg and /showcase-2.jpg (roughly
 * 16:10, homepage top-of-fold) and they are used automatically. Until then each
 * card shows a tidy placeholder.
 *
 * Edit the SITES array below: name, trade, town, a one-line result, and the
 * live URL (leave url empty to hide the link).
 */

const SITES = [
  {
    name: 'Ground Cover',
    trade: 'Grounds maintenance',
    town: 'Bristol & South West',
    result: 'Clean, credible site with a gallery, click-to-call and a one-tap "Get free consultation".',
    url: 'https://groundcovergardencare.com/',
    img: '/showcase-1.jpg',
  },
  {
    name: 'Wild Adventure Coach',
    trade: 'Outdoor retreats',
    town: 'UK & Alps',
    result: 'Built around a single clear action so visitors go straight to exploring the retreats.',
    url: 'https://www.wildadventurecoach.com/',
    img: '/showcase-2.jpg',
  },
];

const prettyUrl = (u) => u.replace(/^https?:\/\//, '').replace(/\/$/, '') || 'yoursite.co.uk';

const Card = ({ site }) => {
  const [failed, setFailed] = useState(false);
  const Wrapper = site.url ? 'a' : 'div';
  const wrapperProps = site.url
    ? { href: site.url, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group block rounded-xl border border-indigo-900/60 overflow-hidden bg-[#0b0b2e] shadow-2xl transition hover:border-amber-500/50"
    >
      {/* browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-900/80 border-b border-slate-700/60">
        <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
        <span className="ml-2 text-[11px] text-gray-400 truncate">{prettyUrl(site.url)}</span>
      </div>

      {!failed ? (
        <img
          src={site.img}
          alt={`${site.trade} website built by Conxiea`}
          onError={() => setFailed(true)}
          className="w-full aspect-[16/10] object-cover object-top block"
        />
      ) : (
        <div className="w-full aspect-[16/10] flex items-center justify-center bg-gradient-to-br from-slate-800 to-[#0b0b2e]">
          <span className="text-sm text-gray-500 font-medium">Screenshot coming soon</span>
        </div>
      )}

      <div className="p-4">
        <p className="text-sm font-bold text-white">{site.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{site.trade} · {site.town}</p>
        <p className="text-sm text-amber-300 font-semibold mt-2 leading-snug">{site.result}</p>
        {site.url && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-300 mt-2 group-hover:text-blue-200">
            View the site <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        )}
      </div>
    </Wrapper>
  );
};

const TradesShowcase = () => (
  <div>
    <div className="flex items-center justify-center gap-3 mb-5 sm:mb-6">
      <div className="h-px flex-1 bg-slate-700" />
      <h2 className="text-center text-lg sm:text-xl font-bold text-white whitespace-nowrap">Recent builds</h2>
      <div className="h-px flex-1 bg-slate-700" />
    </div>
    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
      {SITES.map((site, i) => (
        <Card key={i} site={site} />
      ))}
    </div>
    <p className="mt-3 text-center text-xs sm:text-sm text-gray-500">Built for the trade, hosted and looked after by us.</p>
  </div>
);

export default TradesShowcase;
