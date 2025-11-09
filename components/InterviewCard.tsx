'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { mappings } from '@/constants';

interface InterviewCardProps {
  id: string;
  title: string;
  date: string;
  score?: string;
  category: string;
  logoSrc?: string;
  logoColor?: string;
  isPractice?: boolean;
  techStack?: string[];
}

const companyDomains = [
  'google.com',
  'microsoft.com',
  'apple.com',
  'amazon.com',
  'meta.com',
  'netflix.com',
  'spotify.com',
  'slack.com',
  'dropbox.com',
  'airbnb.com',
  'uber.com',
  'github.com',
  'linkedin.com',
  'stripe.com',
  'zoom.us',
  'twitter.com',
  'paypal.com',
  'salesforce.com',
  'oracle.com',
  'intel.com',
  'samsung.com',
  'tencent.com',
  'bloomberg.com',
  'adobe.com',
  'squareup.com',
  'nvidia.com',
  'shopify.com',
  'vmware.com',
];

const getStableRandomIndex = (id: string, max: number) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % max;
};

const InterviewCard = ({
  id,
  title,
  date,
  score,
  category,
  logoSrc,
  logoColor = '#FF4C4C',
  isPractice = false,
  techStack = [],
}: InterviewCardProps) => {
  const defaultCompanyDomain = companyDomains[getStableRandomIndex(id, companyDomains.length)];
  const fallbackLogo = `https://www.google.com/s2/favicons?domain=${defaultCompanyDomain}&sz=128`;


  const defaultLogo = (
    <div
      className="flex items-center justify-center w-12 h-12 rounded-full"
      style={{ backgroundColor: logoColor }}
    >
      <span className="text-xl font-bold text-white">
        {title.charAt(0)}
      </span>
    </div>
  );

  const getCategoryBadgeColor = () => {
    switch (category) {
      case 'Technical':
        return 'bg-indigo-900/80 text-indigo-200';
      case 'Mixed':
        return 'bg-purple-900/80 text-purple-200';
      case 'Behavioral':
        return 'bg-blue-900/80 text-blue-200';
      case 'System Design':
        return 'bg-emerald-900/80 text-emerald-200';
      default:
        return 'bg-indigo-900/80 text-indigo-200';
    }
  };

  const getTechIcon = (tech: string) => {
    const normalized = tech.toLowerCase().replace(/\s+/g, '');
    const mapped = mappings[normalized] || normalized;
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${mapped}/${mapped}-original.svg`;
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/[0.05] border border-white/10 transition-all duration-300 hover:shadow-purple-900/20 hover:border-purple-500/30 hover:scale-[1.01] group cursor-pointer">
      <div className="absolute -top-40 -right-10 w-64 h-64 bg-purple-700/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-10 w-64 h-64 bg-indigo-700/20 rounded-full blur-3xl"></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-shrink-0">
            {logoSrc ? (
              <img
                src={logoSrc}
                alt={`${title} logo`}
                className="w-12 h-12 rounded-full object-cover border border-gray-700/50"
              />
            ) : (
              <img
                src={fallbackLogo}
                alt="Company Logo"
                className="w-12 h-12 rounded-full object-cover border border-gray-700/50"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/default-logo.png';
                }}
              />
            )}
          </div>
          <div className={cn("px-3 py-1 rounded-md text-xs font-medium", getCategoryBadgeColor())}>
            {category}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white mt-3 mb-1">{title}</h3>

        <div className="flex items-center text-xs text-gray-400 space-x-3 mb-4">
          <div className="flex items-center">
            <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{date}</span>
          </div>
          {score && (
            <div className="flex items-center">
              <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span>{score}/100</span>
            </div>
          )}
        </div>

        <p className="mt-2 text-sm text-gray-300">
            You haven't taken the interview yet. Take it now to improve your skills.
          </p>

        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 my-5">
            {techStack.map((tech) => (
              <div key={tech} className="bg-white/10 rounded-md p-1.5 flex items-center" title={tech}>
                <img
                  src={getTechIcon(tech)}
                  alt={tech}
                  className="w-5 h-5"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg`;
                  }}
                />
                <span className="text-xs text-gray-300 ml-1.5">{tech}</span>
              </div>
            ))}
          </div>
        )}

        
          
      

        <div className="flex justify-between items-center">
          <Link href={`/interviews/${id}`}>
            <button
              className="px-5 py-2 bg-purple-700/40 hover:bg-purple-700/20 text-white text-sm font-medium rounded-full transition-colors duration-300 z-10 relative"
            >
              Take Interview
            </button>
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-900/5 via-transparent to-purple-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default InterviewCard;
