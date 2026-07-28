'use client';

import { useState } from 'react';

const plans = [
  {
    name: 'Starter',
    tagline: 'For businesses ready to build a consistent online presence.',
    monthly: '$2,999',
    annual: '$2,699',
    annualTotal: '$32,388',
    featured: false,
    inherits: 'Your complete marketing foundation:',
    groups: [
      {
        title: 'Strategy',
        items: [
          'Dedicated Account Manager',
          'Monthly strategy meeting',
          'Custom reporting dashboard',
          'Monthly performance reporting',
        ],
      },
      {
        title: 'Advertising',
        items: [
          'Google Search campaign management',
          'Meta Ads management (Facebook & Instagram)',
          'Management of Google & Meta advertising campaigns',
        ],
      },
      {
        title: 'SEO & AI Search',
        items: [
          'SEO for up to 10 keywords',
          '2 SEO-optimised blog articles per month',
          'AI Search Optimisation (ChatGPT, Gemini & other AI search platforms)',
        ],
      },
      {
        title: 'Creative & Website',
        items: [
          'Website management',
          'Unlimited digital creative design',
          'Landing page optimisation',
        ],
      },
    ],
  },
  {
    name: 'Growth',
    tagline: 'For businesses ready to scale consistently.',
    monthly: '$4,499',
    annual: '$4,049',
    annualTotal: '$48,588',
    featured: true,
    inherits: 'Everything in Starter, plus:',
    groups: [
      {
        title: 'Strategy',
        items: [
          'Quarterly competitor analysis',
          'Priority support',
        ],
      },
      {
        title: 'Advertising',
        items: [
          'Google Display advertising management',
          'Management of one additional advertising platform (LinkedIn or TikTok)',
          'Conversion tracking & analytics',
        ],
      },
      {
        title: 'SEO & AI Search',
        items: [
          'SEO for up to 20 keywords',
          '4 SEO-optimised blog articles per month',
          'Enhanced AI Search Optimisation',
        ],
      },
      {
        title: 'Creative & Website',
        items: [
          'Unlimited digital creative design',
          '2 branded short-form videos per month',
          'Conversion Rate Optimisation (CRO) recommendations',
        ],
      },
    ],
  },
  {
    name: 'Dominate',
    tagline: 'For businesses serious about owning their market.',
    monthly: '$9,999',
    annual: '$8,999',
    annualTotal: '$107,988',
    featured: false,
    inherits: 'Everything in Growth, plus:',
    groups: [
      {
        title: 'Strategy',
        items: [
          'Dedicated Senior Marketing Strategist',
          'Monthly executive strategy workshop',
          'Quarterly marketing roadmap',
          'Priority creative turnaround',
        ],
      },
      {
        title: 'Advertising',
        items: [
          'Google Search, Display & Performance Max management',
          'Meta Ads management (Facebook, Instagram & Threads)',
          'TikTok Ads management',
          'LinkedIn Ads management',
          'Advanced conversion optimisation',
          'Multi-location campaign management',
        ],
      },
      {
        title: 'SEO & AI Search',
        items: [
          'SEO for up to 40 keywords',
          '8 SEO-optimised blog articles per month',
          'AI Search Authority Optimisation',
        ],
      },
      {
        title: 'Creative & Website',
        items: [
          'Unlimited digital creative design',
          '4 branded videos per month',
          'Ongoing website optimisation & content updates',
        ],
      },
    ],
  },
];

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="wdsp-area pt-110 pb-110">
      <div className="container chy-container-1">

        <div className="section-title-wrap mb-40 text-center">
          <h5 className="chy-subtitle-1 wow fadeInDown">our service plans</h5>
          <h2 className="chy-title-1 chy-split-in-right chy-split-text">Simple, All-Inclusive Rates. No Nasty Surprises.</h2>
          <p className="chy-section-para-1 wow fadeInUp" style={{ maxWidth: '680px', margin: '10px auto 0' }}>
            Every plan includes strategy, execution, creative and reporting, all handled by one senior team. Advertising spend is billed separately, so every dollar of it goes straight into your campaigns. Pick your pace:
          </p>
        </div>

        {/* ── Monthly / Annually toggle ── */}
        <div className="wdsp-toggle-wrap wow fadeInUp">
          <div className="wdsp-toggle">
            <button className={`wdsp-tog-btn${!annual ? ' active' : ''}`} onClick={() => setAnnual(false)}>
              Monthly
            </button>
            <button className={`wdsp-tog-btn${annual ? ' active' : ''}`} onClick={() => setAnnual(true)}>
              Annually
              <span className="wdsp-save-tag">Save 10%</span>
            </button>
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="wdsp-grid">
          {plans.map((plan, i) => (
            <div key={plan.name} className={`wdsp-card${plan.featured ? ' wdsp-card--featured' : ''} wow fadeInUp`} data-wow-delay={`${i * 0.12}s`}>

              {plan.featured && <div className="wdsp-badge">★ Best Value</div>}

              <div className="wdsp-name">{plan.name}</div>
              <p className="wdsp-tagline">{plan.tagline}</p>
              <div className="wdsp-price-row">
                <span className="wdsp-price">{annual ? plan.annual : plan.monthly}</span>
                <span className="wdsp-per">/month + GST</span>
                {annual && <span className="wdsp-was">{plan.monthly}</span>}
              </div>
              <p className="wdsp-bill">
                {annual
                  ? `${plan.annualTotal} + GST billed annually`
                  : 'Billed monthly, no lock-in contract'}
              </p>

              <a href="/contact-us" className={`wdsp-cta${plan.featured ? ' wdsp-cta--filled' : ''}`}>
                Book a Strategy Call <i className="fa-solid fa-right-long"></i>
              </a>

              <div className="wdsp-divider">
                <span>What&apos;s included every month</span>
              </div>

              {plan.inherits && <p className="wdsp-inherits">{plan.inherits}</p>}

              <div className="wdsp-feats">
                {plan.groups.map((group) => (
                  <div key={group.title} className="wdsp-feat-group">
                    <h4 className="wdsp-feat-group-title">{group.title}</h4>
                    <ul className="wdsp-feat-list">
                      {group.items.map((item) => (
                        <li key={item}>
                          <i className="flaticon-check"></i>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <p className="wdsp-note">Ad spend billed separately.</p>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
